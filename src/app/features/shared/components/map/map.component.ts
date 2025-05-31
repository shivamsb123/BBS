import { Component } from '@angular/core';


declare const google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  map: any;
  coords: any[] = [];
  polygon: any;
  polygonMarkers: any[] = [];
  kmlLayerArray: any[] = [];

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    const LAT = 28.6304490752263;
    const LON = 77.2169351577758;
    const ZoomLevel = 12;

    const mapOptions = {
      center: new google.maps.LatLng(LAT, LON),
      zoom: ZoomLevel,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('Gmap'), mapOptions);

    google.maps.event.addListener(this.map, 'click', (event: any) => {
      const latLng = event.latLng;
      this.addMarker(latLng.lat(), latLng.lng(), 'images/google_icons/mm_20_black.png', '');

      this.coords.push(latLng);

      if (this.polygon) {
        this.polygon.setMap(null);
      }

      this.polygon = new google.maps.Polygon({
        paths: this.coords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      this.polygon.setMap(this.map);
    });

    // Initialize other parts of the map here
  }

  addMarker(pLAT: number, pLON: number, pICON: string, pType: string) {
    let marker: any;

    if (marker) {
      marker.setPosition(new google.maps.LatLng(pLAT, pLON));
    } else {
      if (pICON === '') {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(pLAT, pLON),
          map: this.map
        });
      } else {
        const iconPath = pICON;
        const image = new google.maps.MarkerImage(
          iconPath,
          new google.maps.Size(20, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34)
        );

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(pLAT, pLON),
          icon: iconPath,
          map: this.map
        });
      }
    }

    if (pType === 'POINT') {
      return;
    }

    google.maps.event.addListener(marker, 'click', (event: any) => {
      // Marker click event handling here
    });

    this.polygonMarkers.push(marker);
  }
}
