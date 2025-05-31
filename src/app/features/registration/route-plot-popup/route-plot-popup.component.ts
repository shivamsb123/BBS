import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';

@Component({
  selector: 'app-route-plot-popup',
  templateUrl: './route-plot-popup.component.html',
  styleUrls: ['./route-plot-popup.component.scss']
})
export class RoutePlotPopupComponent {

 data: any;
 centerLatitude = LAT;
 centerLongitude = LNG;
 markers: google.maps.Marker[] = [];
 routeName:any
constructor(private modalService: BsModalService){}
  cancel(){
    this.modalService.hide();
  }
  onMapReady(map: any) {
    this.map = map;
    this.plotStopsOnGoogleMap()

  }
   ngOnInit(){

    console.log(this.data,'all data');
    
   }
   map: any;
   zoom: number = 15;
   polyline: any;
   plotStopsOnGoogleMap() {
   console.log('cming here');
   
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];
    const map = this.map; 
    if (this.polyline) {
      this.polyline.setMap(null);
    }
    if (this.markers) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];
    }
  
    this.data?.forEach(stop => {
      const iconSize = new google.maps.Size(20, 20);
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lon },
        map: map,
        title: stop.stopName,
        icon: {
          url: 'assets/images/stop-icon.png',
          scaledSize: iconSize
        }
      });
  
      pathCoordinates.push({ lat: stop.lat, lng: stop.lon }); // Add coordinates to the path

  
      const infoWindowContent = `
        <div>
        <p><strong>Stop Name:</strong> ${stop.stopName}</p>
        <p><strong>Latitude:</strong> ${stop.lat}</p>
        <p><strong>Longitude:</strong> ${stop.lon}</p>
        <p><strong>Sequence:</strong> ${stop.sequenceNo}</p>
          
        </div>
      `;
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });
  
      // Store the markers in an array
      this.markers.push(marker);
    });
  
    // Create a new polyline and set its path
    this.polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#FF4500',
      strokeOpacity: 1.0,
      strokeWeight: 4
    });
  
    // Set the new polyline on the map
    this.polyline.setMap(map);
  
    // Fit the map to the bounds of the polyline's path
    const bounds = new google.maps.LatLngBounds();
    pathCoordinates.forEach(coord => {
      bounds.extend(coord);
    });
    map.fitBounds(bounds);
  }

}
