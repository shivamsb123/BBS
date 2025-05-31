import { Component } from '@angular/core';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { GeocodingService } from '../../http-services/geocoding.service';
import { GeocoderResponse } from '../../models/geocoder-response.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegistrationService } from '../services/registration.service';
import { NotificationService } from '../../http-services/notification.service';

@Component({
  selector: 'app-add-new-stop',
  templateUrl: './add-new-stop.component.html',
  styleUrls: ['./add-new-stop.component.scss']
})
export class AddNewStopComponent {
  markerOptions: { draggable: boolean; animation: google.maps.Animation; };
  centerLatitude = LAT;
  centerLongitude = LNG;
  markerLatitude: number;
  markerLongitude: number;
  infoWindowContent: string;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };
  isMarkerDraggable: boolean;
  searchAddress: any;
  searchSelectedRoute: any;
  formattedAddressData: any = []
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  stopType: any=-1;

  constructor(
    private geocodingService: GeocodingService,
    private modalService: BsModalService,
    private registrationService: RegistrationService,
    private NotificationService: NotificationService
  ) { }

  onMapClick(event: any): void {
    console.log(event);

    this.markerOptions = {
      draggable: true,
      animation: google.maps.Animation.DROP,
    };
    const location = {
      lat: event.coords.lat,
      lng: event.coords.lng
    };



    // Using Observable
    this.geocodingService.getLocation(`${location.lat},${location.lng}`).subscribe(response => {
      this.handleGeocodingResponse(response);
    }, error => {
      console.error('Geocoding error using Observable:', error);
    });

    // Reverse geocoding
    this.geocodingService.reverseGeocode(location.lat, location.lng).subscribe(reverseGeocodeResponse => {
      console.log('Reverse Geocoding response:', reverseGeocodeResponse);
      // Extract and use the relevant information from the response
    }, error => {
      console.error('Reverse Geocoding error:', error);
    });

    // Update marker position
    this.markerLatitude = location.lat;
    this.markerLongitude = location.lng;
    this.infoWindowContent = null;
    this.isMarkerDraggable = this.shouldMarkerBeDraggable(location);
    console.log('isMarkerDraggable:', this.isMarkerDraggable);
  }


  private shouldMarkerBeDraggable(location: { lat: number, lng: number }): boolean {
    // Your condition to determine whether the marker should be draggable
    // For example, you might check if the latitude is above a certain threshold
    return location.lat > 20.0;
  }

  onMarkerDragEnd(event: any): void {
    this.markerLatitude = event.coords.lat;
    this.markerLongitude = event.coords.lng;
    console.log('Marker Drag End. New position:', this.markerLatitude, this.markerLongitude);

    // You can perform any additional actions here, such as reverse geocoding
    this.geocodingService.reverseGeocode(this.markerLatitude, this.markerLongitude).subscribe(reverseGeocodeResponse => {
      console.log('Reverse Geocoding response after marker drag:', reverseGeocodeResponse);
      // Extract and use the relevant information from the response
    }, error => {
      console.error('Reverse Geocoding error after marker drag:', error);
    });
  }



  private handleGeocodingResponse(response: GeocoderResponse): void {
    let address: any = {
      place: '',
      lat: '',
      lng: ''
    }

    if (response.status === 'OK') {
      console.log('Geocoding results:', response.results);
      this.infoWindowContent = `<strong>Address:</strong> ${response.results[0]?.formatted_address}`;

      for (var i = 0; i < response.results[0].address_components.length; i++) {
        if (response.results[0].address_components[i].types[1] == "sublocality") {
          if (response.results[0].address_components[i].short_name) {
            address = {
              StopName: response.results[0].address_components[i].short_name,
              Lat: response.results[0]?.geometry?.location?.lat,
              Long: response.results[0]?.geometry?.location?.lng,
              "StopType": 23,
              "Zone": 46,
              "Status": 0
            }

          }
        }
      }
if(address.place == ''){
  this.NotificationService.showError(
    'Please  select proper adress for stop'
  );
}
else{
  const alreadyData =  this.formattedAddressData.findIndex((val: any) => val?.StopName == address?.StopName);
if(alreadyData !== -1){
  this.NotificationService.showError(
    ' Stop Already Added'
  );
}
else{
  this.formattedAddressData.push(address)
}
}
      

    } else {
      console.error('Geocoding failed. Status:', response.status, 'Error Message:', response.error_message);
      // Handle the error as needed
    }
  }

  addStop() {
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "DepID": parseInt(localStorage.getItem('dept_id')),
      "StopCollection": this.formattedAddressData
    }
   
    this.registrationService.addStopData(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200 ) {
        this.alertData = {
          message: 'Stop Added Successfully'
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.modalService.hide();
        }, 2000);

      } else {
        this.alertData = {
          message: 'Stop Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  findeAddressValue() {
    this.geocodingService.getLocation(this.searchAddress).subscribe((res: any) => {
      console.log("check res", res.results[0]?.geometry?.location);
      const formattedAddress = res.results[0]?.formatted_address;
      this.infoWindowContent = `<strong>Address:</strong> ${formattedAddress}`;
      this.markerOptions = {
        draggable: true,
        animation: google.maps.Animation.DROP,
      };
      // const location = {
      //   lat: event.coords.lat,
      //   lng: event.coords.lng
      // };

    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
  deleteRow(i:any){
    this.formattedAddressData.splice(i,1)
  }

  editRow(index:any){
    this.stopType=index;
  }

  cancel() {
    this.modalService.hide();
  }
}
