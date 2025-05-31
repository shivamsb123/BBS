import { Component } from '@angular/core';
import * as L from 'leaflet';
import { RegistrationService } from '../../registration/services/registration.service';
import { TrackingService } from '../tracking.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-plot-route',
  templateUrl: './plot-route.component.html',
  styleUrls: ['./plot-route.component.scss']
})
export class PlotRouteComponent {
  listVehicleStopDetails :any
  // Leaflet map properties
  leafletMap: any;
  leafletOptions = {
    center: [20.3428, 85.7377], // Center the map at a specific latitude and longitude
    zoom: 13
  };

  // Google Map properties
  googleMap: any;
  googleMapOptions = {
    center: { lat:20.3428, lng: 85.7377 },
    zoom: 13,
  };
  route: any;
  routeId:any

  constructor(
    private registrationService: RegistrationService,
    private TrackingService: TrackingService,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {
    this.createGoogleMap();
    this.getRouteList()
  }

  createGoogleMap() {
    this.googleMap = new google.maps.Map(document.getElementById('googleMap'), this.googleMapOptions);
  }

  getRouteList() {
    let newData = {
      value: "",
      text: ""
    }

    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.route = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME +' /' + val?.routE_NO
        }
      )
    })
  }

  confirm(event:any) {
    this.scroller.scrollToAnchor("datatable_wrapper");
    this.routeId = event.id;
    this.listVehicleStopDetails = [];
    this.createGoogleMap();
    this.getStopList()

  }

  getStopList () {
    let payload = {
      route_id : this.routeId,
      user_id:  parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    }
    this.TrackingService.getStopData(payload).subscribe((res:any) => {
      this.listVehicleStopDetails = res?.body?.data;
      this.plotStopsOnGoogleMap()
    })
  }

  plotStopsOnGoogleMap() {
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = []; // Array to store polyline path coordinates
  
    this.listVehicleStopDetails?.forEach(stop => {
      const iconSize = new google.maps.Size(20, 20);
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lon },
        map: this.googleMap,
        title: stop.stopName,
        icon: {
          url: 'assets/bustop.png',
          scaledSize: iconSize
        }
      });
  
      pathCoordinates.push({ lat: stop.lat, lng: stop.lon }); // Add coordinates to the path
  
      const infoWindowContent = `
        <div>
          <h3>${stop.stopName}</h3>
          <p>Stop ID: ${stop.stopId}</p>
          <!-- Add more details as needed -->
        </div>
      `;
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(this.googleMap, marker);
        currentInfoWindow = infoWindow;
      });
    });
  
    // Create a polyline and set its path
    const polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true, // Indicates if the path should be geodesic (curved lines)
      strokeColor: '#FF0000', // Color of the polyline
      strokeOpacity: 1.0, // Opacity of the polyline
      strokeWeight: 2 // Width of the polyline
    });
  
    // Set the polyline on the map
    polyline.setMap(this.googleMap);
  }
  
  
  
}
