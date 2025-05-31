import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { BsModalService } from 'ngx-bootstrap/modal';
import * as L from 'leaflet';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-location-track-popup',
  templateUrl: './location-track-popup.component.html',
  styleUrls: ['./location-track-popup.component.scss']
})
export class LocationTrackPopupComponent {
  centerLatitude = LAT;
  centerLongitude = LNG;
  data: any
  markers: any;
  address: any;
  datetime: any;
  vehicle: any;
  stopName: any;
  map: L.Map | any;
  constructor(private modalService: BsModalService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
    this.stopName = this.data.stopName
    this.address = this.data.place
    this.vehicle = this.data.vehicleNo
    this.datetime = this.data.datetime

    console.log("check th", this.data);

  }

  async initializeMap(): Promise<void> {
    const leafletModule = await import('leaflet');

    // Fallback coordinates if data is not available
    const defaultLatitude = 20.29573;
    const defaultLongitude = 85.82476;

    const latitude = this.data?.lat || defaultLatitude;
    const longitude = this.data?.lon || defaultLongitude;

    // Initialize the map with dynamic coordinates
    this.map = L.map('location_canvas', {
      center: [latitude, longitude],
      zoom: 15,
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
      position: 'topleft',
    }).addTo(this.map);

    // Add a marker to the map at the given latitude and longitude
    const marker = L.marker([latitude, longitude]).addTo(this.map);

    // Add a popup to the marker
  }

  cancel() {
    this.modalService.hide();
  }

}
