import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { TrackingService } from '../tracking.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SharedService } from '../../http-services/shared.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Style, Icon, Stroke } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';
import { PolylineDecorator } from 'leaflet-polylinedecorator';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
declare const google: any; // Declare Google Maps as an external library
@Component({
  selector: 'app-trackinglive',
  templateUrl: './trackinglive.component.html',
  styleUrls: ['./trackinglive.component.scss'],
})
export class TrackingliveComponent implements OnInit, OnDestroy {
  vehicleData: any;
  busStops: any;
  historylist: any;
  public livemap: any = [];
  debounceTimer: any;
  currentStopIndex: number = 0;
  distanceCovered: number = 0;
  alerts: any[] = [];
  selectedVehicle: any;
  isloading: boolean = true;
  selectedValue: any
  vehicleDataList: any;
  pageNameValue:any

  constructor(
    private trackingService: TrackingService,
    private shardService: SharedService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit() {
    this.getVehicleData();

    this.mapOptions = {
      center: { lat: 20.5937, lng: 78.9629 },
      zoom: 12
    };
    const map = new google.maps.Map(document.getElementById('mapp') as HTMLElement, this.mapOptions);
    this.map = map;

    let routeID = this.activeRoute.snapshot.paramMap.get("id");

    if (routeID) {
      this.selectedVehicle = routeID;
      this.livemap = [];
      this.alerts = [];
      this.busStops = [];
      this.getlist();
      this.busSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

  }

  ngOnDestroy() {
    // this.getlist()
    clearTimeout(this.debounceTimer);
  }



  getVehicleData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleDataList = res?.body?.data;
      if (this.selectedVehicle) {
        let newVehicleData = this.vehicleDataList?.filter((ele: any) => ele?.value == this.selectedVehicle);

        newVehicleData.forEach((data: any) => {
          this.selectedValue = data;
          this.livetrackingData();
        });
      }
    });
  }

  nextStopDistance: number = 0;
  nearestStop: any; // New property to store the nearest stop

  livetrackingData() {
    this.isloading = true;
    let payload = {
      id: parseInt(this.selectedVehicle || ''), // route_id
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    };
    this.trackingService.getLive(payload).subscribe((res: any) => {
      this.vehicleData = res?.body;
      this.busStops = this.vehicleData[0]?.listVehicleStopDetails;
      this.isloading = false;
    });
  }

  findNearestStopIndex(currentLocation: any): number {
    let nearestIndex = 0;
    let nearestDistance = Number.MAX_VALUE;
    for (let i = 0; i < this.busStops.length; i++) {
      const stop = this.busStops[i];
      const distance = this.calculateDistance(currentLocation, stop);
      if (distance < nearestDistance) {
        nearestIndex = i;
        nearestDistance = distance;
      }
    }
    return nearestIndex;
  }

  calculateTotalDistance(): number {
    let totalDistance = 0;
    for (let i = 0; i < this.busStops?.length - 1; i++) {
      const currentStop = this.busStops[i];
      const nextStop = this.busStops[i + 1];
      totalDistance += this.calculateDistance(currentStop, nextStop);
    }
    return totalDistance;
  }

  calculateDistance(location: any, stop1: any, stop2?: any): number {
    const R = 6371; // Radius of the earth in kilometers
    const lat1 = location.lat;
    const lon1 = location.lon;
    const lat2 = stop1?.lat;
    const lon2 = stop1?.lon;

    const dLat = this.degToRad(lat2 - lat1);
    const dLon = this.degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(lat1)) *
      Math.cos(this.degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }
  calculateEstimatedArrivalTime(distance: number): number {
    const averageSpeed = 40; // Replace with the average speed of the vehicle in km/h
    const time = distance / averageSpeed; // Time in hours
    const minutes = time * 60; // Convert time to minutes
    return minutes;
  }

  getlist(): void {
    let payload = {
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      id: parseInt(this.selectedVehicle) || 0,
      RecordType: 0,
    };

    this.trackingService.livetrackinghistory(payload).subscribe((res: any) => {
      this.historylist = res?.body?.data;
      console.log('live=>', this.historylist);
      const newLocation = {
        lat: this.historylist.lat,
        lon: this.historylist.lon,
        speed: this.historylist.speed,
        driver: this.historylist.driver,
        time: this.historylist.lasT_GPS_UPDATE,
        place: this.historylist.place,
        vehicleNo: this.historylist.routE_NO
      };
      this.livemap.push(newLocation);
      const pathCoordinate = [parseFloat(newLocation.lat), parseFloat(newLocation.lon), newLocation.speed];
      // if (!this.isDuplicateCoordinate(pathCoordinate)) {
      //   this.pathCoordinates.push(pathCoordinate);
      // }


      console.log(this.livemap);
      this.currentloation();
      this.callAlert();
      this.checkAlerts();

      // this.addBusMarker();
      // this.animateMarker();
      if (Array.isArray(this.livemap)) {
        this.livemap.forEach((bus: any) => {
          const busLatLng = new google.maps.LatLng(bus.lat, bus.lon, bus.speed);
          const rotationAngle = 45; // Replace with your desired rotation angle in degrees

          // Create a marker with a custom icon
          const marker = new google.maps.Marker({
            position: busLatLng,
            map: this.map,
            icon: {
              url: bus.speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png',
              scaledSize: new google.maps.Size(20, 20),
              rotation: rotationAngle
            },
            title: this.livemap.name
          });
          marker.addListener('click', () => {
            this.openInfoWindow(bus, marker);
          });
          this.markers?.push(marker);
        });

        this.updatePolyline();

        if (this.livemap.length > 0) {
          const latestBus = this.livemap[this.livemap.length - 1];
          const latestLatLng = new google.maps.LatLng(latestBus.lat, latestBus.lon);
          this.map.setCenter(latestLatLng);
          this.map.setZoom(19);
        }
      } else if (typeof this.livemap === 'object') {
        const busLatLng = new google.maps.LatLng(this.livemap.lat, this.livemap.lon);
        const marker = new google.maps.Marker({
          position: busLatLng,
          map: this.map,
          icon: {
            url: this.livemap.speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png',
            scaledSize: new google.maps.Size(20, 20)
          },
          title: this.livemap.name
        });
        marker.addListener('click', () => {
          this.openInfoWindow(this.livemap, marker);
        });
        this.markers.push(marker);

        const latestLatLng = new google.maps.LatLng(this.livemap.lat, this.livemap.lon);
        this.map.setCenter(latestLatLng);
        this.map.setZoom(19);
      } else {
        console.error('Invalid historylist data:', this.livemap);
      }

      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.getlist();
      }, 2000);
    });
  }

  // isDuplicateCoordinate(newCoordinate: number[]): boolean {
  //   return this.pathCoordinates.some(coordinate => {
  //     return coordinate[0] === newCoordinate[0] && coordinate[1] === newCoordinate[1];
  //   });
  // }
  currentloation() {
    const currentLocation = {
      lat: this.livemap[this.livemap.length - 1].lat,
      lon: this.livemap[this.livemap.length - 1].lon,
    };

    const previousStopIndex = this.currentStopIndex;
    this.currentStopIndex = this.findNearestStopIndex(currentLocation);
    console.log(this.currentStopIndex, previousStopIndex);

    if (this.currentStopIndex > previousStopIndex) {
      console.log('Bus is moving up');
      this.busStops = this.busStops.reverse();
      this.currentStopIndex = this.busStops.length - 1 - this.currentStopIndex;
    } else if (this.currentStopIndex < previousStopIndex) {
      console.log('Bus is moving down');
    } else {
      console.log('Bus is at the same stop');
    }

    // Update the nearest stop
    this.nearestStop = this.busStops[this.currentStopIndex];

    if (this.currentStopIndex < this.busStops.length - 1) {
      const currentStop = this.busStops[this.currentStopIndex];
      const nextStop = this.busStops[this.currentStopIndex + 1];
      const latestBusLocation = this.livemap[this.livemap.length - 1];
      const busLocation = {
        lat: latestBusLocation.lat,
        lon: latestBusLocation.lon,
      };

      this.nextStopDistance = this.calculateDistance(
        busLocation,
        currentStop,
        nextStop
      );

      console.log('Next bus stop distance: ', this.nextStopDistance);
    }

    // Check for alerts at the current stop
    this.checkAlerts();
  }


  callAlert(): void {
    // Display an alert for each new location pushed to the livemap
    const newLocation = this.livemap[this.livemap.length - 1];
    const alertMessage = `New location: Latitude: ${newLocation.lat}, Longitude: ${newLocation.lon}`;
    this.alerts.push({ type: 'info', message: alertMessage });

    // Check if the specific index is reached
    const specificIndex = 18; // Replace with the desired index
    if (this.livemap.length === specificIndex + 1) {
      // Update the next stop distance
      const currentStop = this.busStops[this.currentStopIndex];
      const nextStop = this.busStops[this.currentStopIndex + 1];
      const busLocation = {
        lat: newLocation.lat,
        lon: newLocation.lon,
      };
      this.nextStopDistance = this.calculateDistance(
        busLocation,
        currentStop,
        nextStop
      );
    }
  }
  hasDisplayedToast = false;
  toastRef: any;
  checkAlerts(): void {
    this.alerts = [];

    const currentStop = this.busStops[this.currentStopIndex];
    const nextStop = this.busStops[this.currentStopIndex + 1];
    if (this.currentStopIndex === 0) {
      // // Bus has not started yet (at stop 0)

      //   this.toastr.info('This is an info message', 'Info');
      //   this.toastRef.clear();
    }
    if (this.distanceCovered > 0.05) {
      this.alerts.push({
        type: 'warning',
        message: 'Distance covered is greater than 50 meters.',
      });
    }
    const latestBusLocation = this.livemap[this.livemap.length - 1];
    const busLocation = {
      lat: latestBusLocation.lat,
      lon: latestBusLocation.lon,
    };

    const distanceToNextStop = this.calculateDistance(busLocation, nextStop);
    console.log('next stop value===>', distanceToNextStop);

    if (distanceToNextStop > 0.05) {
      this.alerts.push({ type: 'info', message: 'Bus is within 50 meters of the next stop.' });
    } else {
      this.alerts.push({ type: 'info', message: 'Bus has not started yet.' });
    }

    if (currentStop?.stopName === 'Madhapar Chowk') {
      this.alerts.push({ type: 'danger', message: 'Reached specific stop.' });
    }
    if (this.nearestStop) {
      this.alerts.push({
        type: 'info',
        message: 'Nearest stop: ' + this.nearestStop?.stopName,
      });
    }
  }
  @ViewChild('busSection') busSection: ElementRef;
  confirm(event: any): void {

    this.selectedVehicle = event.id;
    this.livemap = [];
    this.alerts = [];
    this.busStops = [];
    this.getlist();
    this.livetrackingData();
    this.busSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  /** leaflet work here */
  map: google.maps.Map<HTMLElement> | any;
  pathFeature: google.maps.Polyline | any;
  updateInterval = 2000;
  busCoordinates: any = [];
  markers: google.maps.Marker[] = [];
  mapOptions: { center: { lat: number; lng: number; }; zoom: number; } | any;
  busMarker: google.maps.Marker | any;
  polyline: google.maps.Polyline | any;
  infoWindow: google.maps.InfoWindow | undefined;


  updatePolyline() {
    const path = this.livemap.map((bus: any) => ({
      lat: bus.lat,
      lng: bus.lon
    }));

    this.polyline = new google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: 'black', // Replace with your desired route color
      strokeOpacity: 3.0,
      strokeWeight: 2,
      icons: [
        {
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 2, // Adjust arrow size as needed
            fillColor: 'black', // Replace with your desired arrow color
            fillOpacity: 1.0
          },
          offset: '100%', // Place arrow at the end of the polyline
          repeat: '100px' // Repeat the arrow every 100 pixels
        }
      ]
    });

    this.polyline.setMap(this.map);
  }

  openInfoWindow(bus: any, marker: any): void {
    console.log("check bus", bus);

    if (this.infoWindow) {
      this.infoWindow.close();
    }

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div>
                  <strong>Driver:</strong> <span class="badge badge-primary">${bus.driver ? bus.driver : 'NA'}</span><br/>
                  <strong>Vehicle No:</strong>${bus.vehicleNo}<br/>
                  <strong>Time:</strong> ${bus.time} <i class="fa fa-clock-o" aria-hidden="true"></i><br/>
                  <strong>Location:</strong> ${bus.place}<br/>
                  <strong>Lat:</strong> ${bus.lat} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
                  <strong>Long:</strong> ${bus.lon} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
                  <strong>Speed:</strong> ${bus.speed} <i class="fa fa-tachometer" aria-hidden="true"></i>
                </div>`
    });

    this.infoWindow.open(this.map, marker);
  }

}
