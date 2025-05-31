import { Component } from '@angular/core';
import { GeocodingServiceService } from '../services/geocoding-service.service';

@Component({
  selector: 'app-new-geofence',
  templateUrl: './new-geofence.component.html',
  styleUrls: ['./new-geofence.component.scss']
})
export class NewGeofenceComponent {
  lat = 20.5937;
  searchText: string = "";
  long = 78.9629
  zoomvalue = 5
  checkvalue: boolean = false;
  filterValue: any;
  locationData: any;
  ngOnInit() {
    this.initializeMap(this.lat, this.long, this.zoomvalue);
  }
  constructor( private geocodingService: GeocodingServiceService){}
  map: google.maps.Map | any;
  marker: any;
  initializeMap(lat: any, long: any, zoomvalue: any) {
    const mapOptions = {
      center: { lat: lat, lng: long }, // India's center coordinates
      zoom: zoomvalue
    };

    this.map = new google.maps.Map(document.getElementById('map2') as HTMLDivElement, mapOptions);
    // this.marker = new google.maps.Marker({
    //   position: { lat, lng: long },
    //   map: this.map,
    //   icon: {
    //     url: '/assets/mapicon.png', // Replace with the URL of your custom icon
    //     scaledSize: new google.maps.Size(50, 50), // Adjust the size of the icon
    //   },
    // });
  }
  setSuffixData : any
  newData : any = []
async  getCordinates(address: any) {
    console.log(address);
    var requestOptions = {
      method: 'GET',
    };
  const res = await  fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=364a0a4931fe4a61925c1287875fe913`, requestOptions)
    const locationValue = await res.json();
   
      this.setSuffixData = locationValue?.features
      this.setSuffixData.forEach((item: any) => {
        this.newData.push(item?.properties);
      })


console.log(this.newData);


    
   
  }
  onSearchClear(event: any) {
    if (!event.target) {
      this.newData = []
    }
  }

  // getdata() {
  //    let payload ={
  //     id: this.id,
  //     "user_id":parseInt(localStorage.getItem('user_Id') || ''),
  //     "dept_id": parseInt(localStorage.getItem('dept_id') || ''),
  //     "zone_id":46,
  //     "vehicle_type":2,
  //     "vehicle_no":"",
  //     "page_no":1,
  //     "page_size":150,
  //     "location":"",
  //     "trip_start_date":"",
  //     "district":"",
  //     "fs_value":-1,
  //     "route_id":0
  
  //    }

  //   this.dashboardService.mapview1(payload).subscribe((res: any) => {
  //     this.mapList = res?.body?.data?.list_map_view
  //     this.vehiclelistData.trackList = res?.body?.data?.list_track_sta;      
  //     this.vehiclelistData.isloading =  false;

  //   });
  // }

}
