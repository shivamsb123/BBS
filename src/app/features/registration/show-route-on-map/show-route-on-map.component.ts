import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import * as L from 'leaflet';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-show-route-on-map',
  templateUrl: './show-route-on-map.component.html',
  styleUrls: ['./show-route-on-map.component.scss']
})
export class ShowRouteOnMapComponent {

  selectedStop:any
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private bsmodelSevice: BsModalService
  ) { }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }    
  }
  map: L.Map | any;
  polyline: L.Polyline | null = null;
  animatedMarker: L.Marker | any = null;

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');
    this.map = L.map('map_canvas', {
      center: [20.29573, 85.82476],
      zoom: 5,
      zoomControl: false,
    });

    const osmLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 21,
      }
    );

    const satelliteLayer = L.tileLayer(
      'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
      {
        attribution: 'Imagery © <a href="http://maps.google.com">Google</a>',
        maxZoom: 21,
      }
    );

    const googleLayer = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps',
      }
    ).addTo(this.map);

    // Esri Terrain and OpenTopoMap as alternatives to Stamen Terrain
    const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    });;

    const openTopoLayer = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)',
        maxZoom: 17,
      }
    );

    const baseMaps = {
      'Google Map': googleLayer,
      OpenStreetMap: osmLayer,
      Satellite: satelliteLayer,
      'osmHOT': osmHOT,
      'Graphic': openTopoLayer,
    };

    L.control.layers(baseMaps).addTo(this.map);
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
    this.addRouteToMap()
  }

  addRouteToMap() {
    const latLngs: L.LatLngExpression[] = [];
    const alphabet =  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
      41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  
    this.selectedStop.forEach((location, index) => {
      latLngs.push([location.lat, location.lng]);
  
      const label = alphabet[index] || ''; 
      const customIcon = L.divIcon({
        className: 'custom-marker-label',
        html: `<div style="background-color: #007bff; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">${label}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
  
      const marker = L.marker([location.lat, location.lng], { icon: customIcon }).addTo(this.map);
      marker.bindPopup(`<b>${location.name}</b>`);
    });
  
    this.polyline = L.polyline(latLngs, { color: 'blue', weight: 4 }).addTo(this.map);
  
    this.map.fitBounds(this.polyline.getBounds());
  }
  


  cancel() {
    this.bsmodelSevice.hide()
  }

}
