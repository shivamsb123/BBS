import { Component, HostListener } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeocodingService } from '../../http-services/geocoding.service';


@Component({
  selector: 'app-add-location-map',
  templateUrl: './add-location-map.component.html',
  styleUrls: ['./add-location-map.component.scss'],
})
export class AddLocationMapComponent {
  stateList: any;
  statesWithCoordinates: any;
  stateData: any;
  stopList: any;
  addLocation!: FormGroup;
  searchKeyword: any
  statelistdiv: boolean = false;
  stateId: any;
  districtListData: any;
  stopName: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  googleMap: any;
  googleMapOptions = {
    center: { lat: 20.3428, lng: 85.7377 },
    zoom: 13,
  };
  selecteddistrictValue: any;
  selectedstypValue:any
  company: any;
  selectedDepartment:any
  constructor(
    private ragistrationService: RegistrationService,
    private fb: FormBuilder,
    private route: Router,
    private shardService: SharedService,
    private geocodingService: GeocodingService
  ) { }

  ngOnInit(): void {
    this.getStateList();
    this.getStopTypeList();
    this.getInitialValue()
    this.createGoogleMap()
    this.getCompany()
  }
  createGoogleMap() {
    this.googleMap = new google.maps.Map(document.getElementById('googleMap'), this.googleMapOptions);
  }
  getInitialValue() {
    this.addLocation = this.fb.group({
      // state: ['', [Validators.required, Validators.pattern('')]],
      // ditrict: ['', [Validators.required, Validators.pattern('')]],
      departmentNo: ['', [Validators.required, Validators.pattern('')]],
      stopType: ['', [Validators.required, Validators.pattern('')]],
      locationName: ['', [Validators.required, Validators.pattern('')]],
      lat: ['', [Validators.required]],
      long: ['', [Validators.required]],
    })
  }

  getCompany() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  getStateList() {
    let newData = {
      value: '',
      text: '',
      lat: '',
      long: ''
    };
    let payload = {
      USER_ID: parseInt(localStorage.getItem('user_Id') || ''),
      TextToSearch: '',
    };
    this.ragistrationService.stateList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      const stateCoordinates: any = {
        'Andhra Pradesh': {
          latitude: 15.9129,
          longitude: 79.74,
        },
        'Arunachal Pradesh': {
          latitude: 27.533,
          longitude: 93.8248,
        },
        Assam: {
          latitude: 26.2006,
          longitude: 92.9376,
        },
        Bihar: {
          latitude: 25.0961,
          longitude: 85.3131,
        },
        Chhattisgarh: {
          latitude: 21.2787,
          longitude: 81.8661,
        },
        Delhi: {
          latitude: 28.7041,
          longitude: 77.1025,
        },
        Goa: {
          latitude: 15.2993,
          longitude: 74.124,
        },
        Gujarat: {
          latitude: 22.2587,
          longitude: 71.1924,
        },
        Haryana: {
          latitude: 29.0588,
          longitude: 76.0856,
        },
        'Himachal Pradesh': {
          latitude: 31.1048,
          longitude: 77.1734,
        },
        'Jammu and Kashmir': {
          latitude: 33.7782,
          longitude: 76.5762,
        },
        Jharkhand: {
          latitude: 23.6102,
          longitude: 85.2799,
        },
        Karnataka: {
          latitude: 15.3173,
          longitude: 75.7139,
        },
        Kerala: {
          latitude: 10.8505,
          longitude: 76.2711,
        },
        'Madya Pradesh': {
          latitude: 22.9734,
          longitude: 78.6569,
        },
        Maharashtra: {
          latitude: 19.7515,
          longitude: 75.7139,
        },
        Manipur: {
          latitude: 24.6637,
          longitude: 93.9063,
        },
        Meghalaya: {
          latitude: 25.467,
          longitude: 91.3662,
        },
        Mizoram: {
          latitude: 23.1645,
          longitude: 92.9376,
        },
        Nagaland: {
          latitude: 26.1584,
          longitude: 94.5624,
        },
        Orissa: {
          latitude: 20.9517,
          longitude: 85.0985,
        },
        Punjab: {
          latitude: 31.1471,
          longitude: 75.3412,
        },
        Rajasthan: {
          latitude: 27.0238,
          longitude: 74.2179,
        },
        Sikkim: {
          latitude: 27.533,
          longitude: 88.5122,
        },
        'Tamil Nadu': {
          latitude: 11.1271,
          longitude: 78.6569,
        },
        Telagana: {
          latitude: 18.1124,
          longitude: 79.0193,
        },
        Tripura: {
          latitude: 23.9408,
          longitude: 91.9882,
        },
        'Uttar Pradesh': {
          latitude: 26.8467,
          longitude: 80.9462,
        },
        Uttaranchal: {
          latitude: 30.0668,
          longitude: 79.0193,
        },
        'West Bengal': {
          latitude: 22.9868,
          longitude: 87.855,
        },
      };
      if (data) {
        this.statesWithCoordinates = data.map((state: any) => {
          const stateName = state.stateName;
          const coordinates = stateCoordinates[stateName];
          return {
            stateID: state.stateID,
            stateName: stateName,
            status: state.status,
            latitude: coordinates?.latitude,
            longitude: coordinates?.longitude,
          };
        });
      } else {
        console.log('Invalid state data');
      }
    });
    // Iterate over the state data and add latitude and longitude
  }
  filterFunction() {
    this.statelistdiv = true
  }
  @HostListener("document:click")
  clickedOut() {
    this.statelistdiv = false;
  }

  onSelectData(data: any) {    
    this.searchKeyword = data?.stateName;
    this.stateId = data?.stateID;
    this.getDistrictList();
    this.addLocation.controls['state'].setValue(data?.stateID)
    this.setmapView(data,this.zoomvalue)
  }
  map: google.maps.Map | any;
  zoomvalue = 10
  marker: any;
  currentInfoWindow: google.maps.InfoWindow | null = null;
setmapView(data : any ,zoomvalue : any){
 const lat = data?.latitude
  const long = data?.longitude;
  const mapOptions = {
    center: { lat: data?.latitude, lng: data?.longitude }, // India's center coordinates
    zoom: zoomvalue
  };

  this.map = new google.maps.Map(document.getElementById('googleMap') as HTMLDivElement, mapOptions);
  this.marker = new google.maps.Marker({
    position: {lat, lng: long },
    map: this.map,
    icon: {
      url: '/assets/mapicon.png', // Replace with the URL of your custom icon
      scaledSize: new google.maps.Size(50, 50), // Adjust the size of the icon
    },
  });
  const infoWindowContent = `
  <div>
    <p><b>Latitude:</b> ${data.latitude}</p>
    <p><b>Longitude:</b> ${data.longitude}</p>
<center><h2>${data?.stateName} </h2> </center>
  </div>
`;

const infoWindow = new google.maps.InfoWindow({
  content: infoWindowContent
});

  this.marker.addListener('click', () => {
  // Close the previous info window, if any
  if (this.currentInfoWindow) {
    this.currentInfoWindow.close();
  }

  infoWindow.open(this.map, this.marker);
  this.currentInfoWindow = infoWindow;
});
}
  
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getDistrictList() {
    let newData: any
    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "STATE_ID": this.stateId,
      "TextToSearch": ""

    }
    this.ragistrationService.districtList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.districtListData = data.map((val: any) =>
        newData = {
          value: val?.district_ID,
          text: val?.district_Name
        }
      )
    })
  }


  getStopTypeList() {
    let newData: any
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "User_ID": parseInt(localStorage.getItem('user_Id') || '')
    }
    this.ragistrationService.stopTypeList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.stopList = data.map((val: any) =>
        newData = {
          value: val?.stopType_ID,
          text: val?.stopType_Name
        }
      )
    })
  }
  confirm(event: any) {
    if (event.selectType == 'Stop_Type') {
      this.addLocation.controls['stopType'].setValue(event.id);
      this.stopName = event.assets_no
    }else if(event.selectType == 'company'){
      this.addLocation.controls['departmentNo'].setValue(event.id);
    }else {
      this.addLocation.controls['ditrict'].setValue(event.id);
    }
  }



  changeLngValue(event:any) {
    if(this.addLocation.value.lat){
      let data  = {
        latitude : parseFloat(this.addLocation.value.lat),
        longitude : parseFloat(event.target.value), 
        stateName: ''
      }

      this.geocodingService.reverseGeocode(data.latitude, data.longitude).subscribe(reverseGeocodeResponse => {
        console.log('Reverse Geocoding response:', reverseGeocodeResponse);
        data.stateName = reverseGeocodeResponse?.results[1]?.formatted_address;
        this.setmapView(data,10)

        // Extract and use the relevant information from the response
      }, error => {
        console.error('Reverse Geocoding error:', error);
      });
    }  
  }


  submit(formvalue: any) {    
    let payload = {
      "StopID": 0,
      "StopNo": "",
      "StopName":formvalue.locationName,
      "Lat":parseFloat(formvalue.lat) ,
      "Lon": parseFloat( formvalue.long),
      "DEPT_ID": parseInt(formvalue.departmentNo || ''),
      "ZONE_ID": 0,
      "BLOCK_ID": 0,
      "STATUS": 1,
      "StopType": formvalue.stopType ? parseInt(formvalue.stopType || '') : 0,
      "State_ID": 0,
      "District_ID": 0,
      "StopID_NEW": "0",
      "Result": ""
    }
 
    this.ragistrationService.addLocation(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.addLocation.reset();
        this.selecteddistrictValue = {
          value: '',
          text: ''
        }
        this.selectedstypValue = {
          value: '',
          text: ''
        }
        setTimeout(() => {          
          this.route.navigateByUrl('/Registration/Location_Master')
        }, 2000);

      } else {
          this.alertData = {
            message: res?.body?.alert,
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
    })
  }

  cancel() {
    this.selecteddistrictValue = {
      value: '',
      text: ''
    }
    this.selectedstypValue = {
      value: '',
      text: ''
    }
    this.addLocation.reset()
  }
}