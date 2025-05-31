import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import Map, { MapOptions } from 'ol/Map';
import { SharedService } from '../../http-services/shared.service';@Component({
  selector: 'app-replay-vehicle-wise',
  templateUrl: './replay-vehicle-wise.component.html',
  styleUrls: ['./replay-vehicle-wise.component.scss']
})
export class ReplayVehicleWiseComponent {
  map: google.maps.Map<HTMLElement> | any;
  historyVehicleForm!: FormGroup;
  markers: google.maps.Marker[] = [];
  mapOptions: { center: { lat: number; lng: number; }; zoom: number; } | any;
  vehicleData: any;
  bsValue = new Date();
  bsRangeValue: Date[] | any;
  maxDate = new Date();
  currentIndex = 0;
  updateInterval = 2000; // Update interval in milliseconds
  busCoordinates: any = [];
  busMarker: google.maps.Marker | any;
  pathFeature: google.maps.Polyline | any;
  animationInterval: any;

  constructor(
    private trackingService: TrackingService,
    private shardService: SharedService,
    private fb: FormBuilder
  ) {
    // Initialize other properties...
  }

  setInitialValue() {
    this.historyVehicleForm = this.fb.group({
      fromDate: ['', [Validators.required, Validators.pattern('')]],
      toDate: ['', [Validators.required, Validators.pattern('')]]
    });
  }

  submit(formValue: any) {
    this.getTrackingHistory(formValue);
  }


  ngOnInit(): void {
    this.setInitialValue();
    this.getVehicleZoneData();
    this.mapOptions = {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12,
    };

    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
    this.map = map;
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    });
  }

  selectedVehicle: any;
  historylist: any;
  getTrackingHistory(formValue: any) {
    const payload = {
     
      "id": parseInt(this.selectedVehicle),
        "user_id": parseInt(localStorage.getItem('user_Id') || ''),
        "from_date": formatDate(formValue.fromDate, 'yyyy-MM-dd hh:MM', 'en-US'),
        "to_date":formatDate(formValue.toDate, 'yyyy-MM-dd hh:MM', 'en-US')
}
    this.trackingService.replay(payload).subscribe((res: any) => {
      this.historylist = res?.body?.data;
      console.log('historylist', this.historylist);
      this.clearMarkers(); // Clear previous markers
      this.clearPolyline(); // Clear previous polyline

      if (this.historylist.length > 0) {    
        const latestBus = this.historylist[0];
        const lastPosition = this.historylist[this.historylist.length - 1];
        const startPosition = new google.maps.LatLng(latestBus.lat, latestBus.lon);
        const endPosition = new google.maps.LatLng(lastPosition.lat, lastPosition.lon);
        const busSpeed = this.historylist.speed
        // Create polyline
        const polyline = new google.maps.Polyline({
          map: this.map,
          path: [],
          geodesic: true,
          strokeColor: 'black',
          strokeOpacity: 3.0,
          strokeWeight: 2,
          icons: [
            {
              icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 2,
                fillColor: 'black',
                fillOpacity: 1.0
              },
              offset: '100%', 
              repeat: '30px' 
            }
          ]
        });
  
        this.pathFeature = polyline;
        this.historylist.forEach((bus: any) => {
          const position = new google.maps.LatLng(bus.lat, bus.lon);
          this.busCoordinates.push([bus.lon,bus.lat ]);
        });
  
        this.startBusTracking(startPosition, endPosition,busSpeed);
      } else {
      
      }
    });
  }

  moveBus(marker: google.maps.Marker, position: google.maps.LatLng) {
    const animationOptions = {
      duration: this.updateInterval,
     
    };
    marker.setPosition(position);
    this.map.panTo(position, animationOptions);
  }
  
  startBusTracking(startPosition: google.maps.LatLng, endPosition: google.maps.LatLng , speed : any) {
    const busMarkerStart = new google.maps.Marker({
      position: startPosition,
      map: this.map,
      icon: {
        url: '/assets/pin.png',
        scaledSize: new google.maps.Size(25, 25),
      },
      title: 'Bus Start'
    });
  
    const busMarkerEnd = new google.maps.Marker({
      position: endPosition,
      map: this.map,
      icon: {
        url: '/assets/pin.png',
        scaledSize: new google.maps.Size(20, 20),
      },
      title: 'Bus End'
    });
  
    this.markers.push(busMarkerStart, busMarkerEnd);
  
    const animateBus = () => {
      if (this.currentIndex >= this.busCoordinates.length) {
        clearInterval(this.animationInterval / 2);
        return;
      }
  
      const nextCoordinate = new google.maps.LatLng(
        this.busCoordinates[this.currentIndex][1],
        this.busCoordinates[this.currentIndex][0]
      );
      this.moveBus(this.busMarker, nextCoordinate);
      this.map.setZoom(19);
      const pathCoordinates = this.busCoordinates
        .slice(0, this.currentIndex + 1)
        .map(coordinate => new google.maps.LatLng(coordinate[1], coordinate[0]));
      this.pathFeature.setPath(pathCoordinates);
  
      // Create a new bus marker at the current coordinate
      const busMarker = new google.maps.Marker({
        position: nextCoordinate,
        map: this.map,
        icon: {
          url:speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png',
          scaledSize: new google.maps.Size(20, 20),
        },
        title: speed
      });
  
      this.markers.push(busMarker);
  
      this.currentIndex++;
    };
  
    this.currentIndex = 0;
    this.busMarker = new google.maps.Marker({
      map: this.map,
      icon: {
        url: '/assets/greenbus.png',
        scaledSize: new google.maps.Size(20, 20),
      },
      title: 'Bus'
    });
  
    animateBus();
  
    this.animationInterval = setInterval(animateBus, this.updateInterval);
  }
  
  
  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  clearPolyline() {
    if (this.pathFeature) {
      this.pathFeature.setMap(null);
      this.pathFeature = null;
    }
  }

  ngOnDestroy() {
    clearInterval(this.animationInterval);
  }

  confirm(event: any) {
    this.selectedVehicle = event.id;
  }
}
