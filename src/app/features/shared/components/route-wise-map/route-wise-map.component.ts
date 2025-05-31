

import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TrackingService } from 'src/app/features/tracking/tracking.service';
import * as L from 'leaflet';
import { PolylineDecorator } from 'leaflet-polylinedecorator';
import { of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import flowplayer from 'flowplayer'; // Import Flowplayer library
import flvjs from 'flv.js';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Mapview2Component } from 'src/app/features/dashboard/mapview2/mapview2.component';
@Component({
  selector: 'app-route-wise-map',
  templateUrl: './route-wise-map.component.html',
  styleUrls: ['./route-wise-map.component.scss']
})
export class RouteWiseMapComponent implements OnInit {
  vehicleData: any;
  busStops: any;
  vehicle_id: any;
  map: any;
  lat: any;
  lon: any
  busMarker: L.Marker<any>;
  directionUpValue: boolean;
  public video: HTMLVideoElement;
  public player: any;
  selectedvehicleData: any;
  bsModalRef : any;
  isMapShow: boolean = true;


  constructor(private trackingService: TrackingService,
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private route: Router,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {  
    this.livetrackingData();
    console.log("selectedvehicleData", this.selectedvehicleData);
    
  }

  livetrackingData() {
    let payload = {
      id: parseInt(this.vehicle_id || ''), // route_id
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    };
    this.trackingService.getLive(payload).subscribe((res: any) => {
      this.vehicleData = res?.body;
      this.busStops = this.vehicleData[0]?.listVehicleStopDetails;
      this.plotBusStopsOnMap();
    });
  }

  plotBusStopsOnMap() {        
    if (this.busStops && this.busStops.length > 0) {
      const latlngs = this.busStops.map((stop: any) => [stop.lat, stop.lon]);
      const mapCenter = latlngs[10];
      this.map = L.map('map').setView(mapCenter, 18);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
      const customIcon = L.icon({
        iconUrl: 'assets/bustop.png',
        iconSize: [25, 25],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
      for (const stop of this.busStops) {
        L.marker([stop.lat, stop.lon], { icon: customIcon }).addTo(this.map).bindPopup(stop.stopName);
      }
      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);
      const busLocationIcon = L.icon({
        iconUrl:  this.selectedvehicleData?.speed !== '0 Km/hr' ? '/assets/greenbus.png' : '/assets/yellowbus.png',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });

      // Adding the bus marker on the map
      if (this.lat && this.lon) {
        this.busMarker = L.marker([this.lat, this.lon], { icon: busLocationIcon }).addTo(this.map);
        const popupContent = `
          <div>
            <strong>Driver:</strong> <span class="badge badge-primary">${this.selectedvehicleData.driver}</span><br/>
            <strong>Vehicle No:</strong> ${this.selectedvehicleData.asseT_NO} <i class="fa fa-tachometer" aria-hidden="true"></i><br/>
            <strong>Location:</strong> ${this.selectedvehicleData.place}<br/>
            <strong>Last GPS Update:</strong> ${this.selectedvehicleData.timeg} <br/>
            <strong>Time:</strong> ${this.selectedvehicleData.timeu} <br/>
            <strong>Total Current:</strong> ${this.selectedvehicleData.total_Current} <br/>
            <strong>Total Voltage:</strong> ${this.selectedvehicleData.total_Voltage} <br/>
            <strong>Speed:</strong> ${this.selectedvehicleData.speed} <br/>            
          </div>
        `;

        this.busMarker.bindPopup(popupContent);
      }

      this.map.fitBounds(polyline.getBounds());
      this.map.setView([this.lat, this.lon], 18); // Fit the map view to show all bus stops and the polyline
    }
  }
  showRoute() {
    if (this.busMarker) {
      this.busMarker.removeFrom(this.map);
      this.busMarker = null; // Reset the busMarker property
    }

    if (this.busStops && this.busStops.length > 0) {
      const latlngs = this.busStops.map((stop: any) => [stop.lat, stop.lon]);
      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(this.map);

      // Fit the map view to show the polyline (route) only
      this.map.fitBounds(polyline.getBounds());
    }
  }

  locateBus() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    this.plotBusStopsOnMap();
  }

  modify(data) {
    this.checkdirection(data)
    const resultString: string = data.split('/')[0];
    return resultString
  }

  checkdirection(data: any) {
    if (data.includes("Down")) {

      this.directionUpValue = true
    }
  }
  videoUrl = 'http://49.248.198.102:12061/live.flv?devid=0088035BDE&chl=2&svrid=127.0.0.1&svrport=17891&st=1&audio=1';

  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;

  // ngAfterViewInit(): void {
  //   // console.log("chechck sdfas", this.bsModalRef);
  //   const videoElement: HTMLVideoElement = this.videoPlayer?.nativeElement;
  //   const flvPlayer = flvjs?.createPlayer({
  //     type: 'flv',
  //     url: this.videoUrl
  //   });
  //   flvPlayer.attachMediaElement(videoElement);
  //   flvPlayer.load();
  //   flvPlayer.play();

  // }

  redirectTo() {
    this.isMapShow = false;
    this.bsModalRef?.hide()    
    this.route.navigateByUrl('Dashboard/Dashboard_Can', {
      state: {
        device: this.selectedvehicleData?.obU_DEVICE_ID
      }
    })
  }

}
