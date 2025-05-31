import { Component, ElementRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NewGeofenceComponent } from '../../registration/new-geofence/new-geofence.component';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { TrackingService } from '../tracking.service';
import { Location, ViewportScroller } from '@angular/common';

import MarkerCluster from '@google/markerclusterer';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fast-tracker',
  templateUrl: './fast-tracker.component.html',
  styleUrls: ['./fast-tracker.component.scss']
})
export class FastTrackerComponent {
  @ViewChild("currentStop") scrollEl: ElementRef;

  isDivVisible: boolean = false;
  divClass: string = 'col-md-9';
  bsModalRef?: BsModalRef;
  mapList: any;
  vehiclelistData: any;
  filterData: any = [];
  trackList: any;
  isloading: boolean = false
  vehicleId: any;
  directionUpValue: any;
  directionDownValue: any;
  id: number = 0;
  fsValueData = -1;
  ischecked: boolean = false
  isRouteShow: any = 'VehicleWise';
  trackListData: any
  openData: any;
  RouteWiseVehicle: any;
  routeId: any;
  showVehicleMap: any;
  historylist: any;
  livemap: any = [];
  debounceTimer: any;
  map: google.maps.Map<HTMLElement> | any;
  mapOptions: any;
  selectedData: any
  infoWindow: any;
  polyline: google.maps.Polyline | any;
  markers: google.maps.Marker[] = [];
  listVehicleStopDetails: any;
  googleMapOptions = {
    center: { lat: LAT, lng: LNG },
    zoom: 13,
  };
  speedData: any;
  selectedVehicleId: any;
  selectedTime: any;
  selectedVehicleData: any;
  busStops: any;
  vehicleData: any;
  plotonmap: any;
  buslocation: any;
  formattedVehicleSpeed: any;
  busMarker: L.Marker<any>;
  fsvalue: number = -1;
  vehicleNumber: number = 0
  dynamicFsvalue: any = 0;
  currentStopIndex: number = 0;
  distanceCovered: number = 0;
  alerts: any[] = [];
  nearestStop: any; 
  nextStopDistance: number = 0;
  newBusStop: any;
  startingPoint: any;
  endPoint: number;

  constructor(private modalService: BsModalService,
    private dashboardService: DashboardService,
    private trackingService: TrackingService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.selectedData = this.location.getState();
    if (this.selectedData.dynamicFsvalue) {
      this.dynamicFsvalue = this.selectedData.dynamicFsvalue
    }
    this.getdata();
    this.createGoogleMap();
    // this.livetrackingData();

    if (this.selectedData.type == "Route") {
      this.allRouteData();
    } else if (this.selectedData.type == "RouteVehicle") {
      this.routeId = this.selectedData.id
      this.vehicleId = this.selectedData?.vehicleId
      this.isDivVisible = true;
      this.divClass = 'col-md-6';
      this.openData = 'Vehicle'

      // this.mapList = [];
      // this.plotonmap = []
      this.clearMarkers();
      this.getlist();
      this.mapOptions = {
        center: { lat: LAT, lng: LNG },
        zoom: 12
      };
      this.livemap = []
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
      this.map = map;
      this.livetrackingData();
      this.getRouteOnMap();
    } else if(this.selectedData.type == "liveVehicle") {
      this.vehicleId = this.selectedData?.vehicleId;
      this.isDivVisible = true;
      this.divClass = 'col-md-6';
      this.openData ='Vehicle';
      this.getlist()
      this.mapOptions = {
        center: { lat: LAT, lng: LNG },
        zoom: 12
      };
      this.livemap = []
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
      this.map = map;
       this.livetrackingData()
    }


  }

  ngOnDestroy() {
    clearTimeout(this.debounceTimer);
  }

  createGoogleMap() {
    this.map = new google.maps.Map(document.getElementById('map'), this.googleMapOptions);
  }


  allVehcielData() {
    this.isRouteShow = "Vehicle";
    this.vehicleId = this.selectedData.id;
    this.getdata();
    if (this.vehicleId) {
      this.isDivVisible = true;
      this.openData = 'Vehicle'
      this.divClass = 'col-md-6';
    }
  }

  allRouteData() {
    this.isRouteShow = "RouteWise";
    this.routeId = this.selectedData.id;
    this.fsvalue = this.selectedData.fs_value;
    this.vehicleNumber = this.selectedData.vehicle_ID
    this.getRoutedata();
    if (this.routeId) {
      this.isDivVisible = true;
      this.openData = 'Route'
      this.divClass = 'col-md-6';
      this.getRouteWiseVehicle();
      this.getRouteOnMap();
    }
  }

  vehicleOnRoute(item:any, selectType:any) {
    console.log("check item", item, selectType);
    this.filterData = item
      this.vehicleId = item?.id
      this.isDivVisible = true;
      this.divClass = 'col-md-6';
      this.openData = 'Vehicle'
      
      // this.mapList = [];
      // this.plotonmap = []
      this.clearMarkers();
      this.getlist();
      this.mapOptions = {
        center: { lat: LAT, lng: LNG },
        zoom: 12
      };
      this.livemap = []
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
      this.map = map;
      this.livetrackingData();
      this.getRouteOnMap();
  }

  showDiv(id: any, status: any, routeId: any): void {
    this.filterData = this.mapList.find(item => item.asseT_NO === id);
    this.vehicleId = this.filterData?.id;
    this.isDivVisible = true;
    this.divClass = 'col-md-6';
    this.directionUpValue = this.filterData?.route.includes('Up');
    this.directionDownValue = this.filterData?.route.includes('Down');
    this.openData = status;
    this.routeId = routeId;

    if (this.openData == 'Route') {
      clearTimeout(this.debounceTimer);
      this.mapOptions = {
        center: { lat: LAT, lng: LNG },
        zoom: 13
      };
      this.livemap = []
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
      this.map = map;
      this.fsvalue = -1;
      this.vehicleNumber = 0
      this.getRouteWiseVehicle();
      this.getRouteOnMap()

    } else {
      this.getlist()
      this.mapOptions = {
        center: { lat: LAT, lng: LNG },
        zoom: 12
      };
      this.livemap = []
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, this.mapOptions);
      this.map = map;
       this.livetrackingData()
    }

  }


  opengeo() {
    const initialState: ModalOptions = {
      initialState: {
      },
    };
    this.bsModalRef = this.modalService.show(
      NewGeofenceComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  onChangeValue(event: any) {
    this.dynamicFsvalue = 0;
    if (this.isRouteShow == 'RouteWise') {
      this.getRoutedata()
    } else if (this.isRouteShow == 'VehicleWise') {
      this.getdata()
    }
  }


  /**
  * get all map view data
   */
  getRoutedata() {
    let payload = {
      id: this.id,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "dept_id": parseInt(localStorage.getItem('dept_id') || ''),
      "zone_id": 46,
      "vehicle_type": 2,
      "vehicle_no": "",
      "page_no": 1,
      "page_size": 150,
      "location": "",
      "trip_start_date": "",
      "district": "",
      "fs_value": this.fsValueData,
      "route_id": 0
    }

    this.dashboardService.mapview1(payload).subscribe((res: any) => {
      this.trackListData = res?.body?.data?.list_track_sta;

    });
  }

  getRouteWiseVehicle() {
    let payload = {
      "dept_id": parseInt(localStorage.getItem('dept_id') || ''),
      "fs_value": this.fsvalue ? this.fsvalue : -1,
      "id": this.vehicleNumber ? Number(this.vehicleNumber) : 0,
      "page_no": 1,
      "page_size": 150,
      "route_id": this.routeId,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "vehicle_no": "",
      "vehicle_type": 2,
      "zone_id": 46

    }

    this.dashboardService.mapview1(payload).subscribe((res: any) => {
      this.RouteWiseVehicle = res?.body?.data?.list_map_view;
      this.showVehicleMap = res?.body?.data?.list_map_view
      this.plotbusonselectedroute()
    });
  }

  camelCase(data: any) {
    const camelCaseOutput = data?.split(' ')
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ')
    return camelCaseOutput
  }


  getdata() {
    let payload = {
      id: this.id,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      zone_id: 0,
      vehicle_type: 0,
      vehicle_no: '',
      page_no: 1,
      page_size: 150,
      location: '',
      trip_start_date: '',
      district: '',
      fs_value: this.dynamicFsvalue,
      customer: '',
      depo_name: '',
    };

    this.dashboardService.mapview2(payload).subscribe((res: any) => {
      this.mapList = res?.body?.data?.list_map_view;
      this.trackList = res?.body?.data?.list_track_sta;
      this.plotonmap = res?.body?.data?.list_map_view;
      this.clearMarkers();

      if (this.selectedData.type !== "Route" &&  this.selectedData.type !== "RouteVehicle" &&  this.selectedData.type !== "liveVehicle") {
        for (const bus of this.plotonmap) {
          const lat = bus.lat;
          const lng = bus.lon;
          const speedValue = bus.speed.replace(/\D/g, '');
          const busLatLng = new google.maps.LatLng(bus.lat, bus.lon, bus.speed.replace(/\D/g, ''));
          const marker = new google.maps.Marker({
            position: busLatLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
            icon: {
              url: bus.speed !== '0 Km/hr' && (!Boolean(bus.speed.charAt(0).match(/[a-zA-Z]/))) ? '/assets/greenbus.png' : '/assets/yellowbus.png',
              scaledSize: new google.maps.Size(30, 30),
            },
            title: this.livemap.name
          });
          marker.addListener('click', () => {
            this.openInfoWindow(bus, marker);
          });
          this.markers?.push(marker);
        }

        // Check the number of markers
        if (this.markers.length >= 5) {

          this.map.setZoom(7);
        }
        if(this.selectedData.type !== "RouteVehicle") {
          const cluster = new MarkerCluster(this.map, this.markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 40,
          });
        }
      }
    });
  }

  clearMarkers() {
    this.markers?.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }



  getlist(): void {
    let payload = {
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      id: parseInt(this.vehicleId) || 0,
      RecordType: 0,
    };

    this.trackingService.livetrackinghistory(payload).subscribe((res: any) => {
      this.historylist = res?.body?.data;
      const newLocation = {
        id: this.historylist.id,
        lat: this.historylist.lat,
        lon: this.historylist.lon,
        speed: this.historylist.speed,
        driver: this.historylist.driver,
        timeg: this.historylist.lasT_GPS_UPDATE,
        place: this.historylist.place,
        asseT_NO: this.historylist.asseT_NO,
        route: this.historylist?.route,
        timE_TAKEN_IN_UPDATE: this.historylist.timE_TAKEN_IN_UPDATE,
        distance: this.historylist.distance,
        fueL_STATUS: this.historylist.fueL_STATUS,
        destination: this.historylist.destination,
      };


      this.livemap.push(newLocation);
      const pathCoordinate = [parseFloat(newLocation?.lat), parseFloat(newLocation?.lon), newLocation?.speed];

      this.currentloation();

      if (Array.isArray(this.livemap)) {
        this.livemap.forEach((bus: any) => {
          this.selectedVehicleId = bus.id;
          this.formattedVehicleSpeed = bus.id
          this.selectedTime = bus.time
          this.speedData = bus.speed;
          this.selectedVehicleData = bus;
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

        if (this.livemap?.length > 0) {
          const latestBus = this.livemap[this.livemap?.length - 1];
          const latestLatLng = new google.maps.LatLng(latestBus?.lat, latestBus?.lon);
          this.map.setCenter(latestLatLng);
          this.map.setZoom(18);
        }
      } else if (typeof this.livemap === 'object') {
        const busLatLng = new google.maps.LatLng(this.livemap?.lat, this.livemap?.lon);
        const marker = new google.maps.Marker({
          position: busLatLng,
          map: this.map,
          icon: {
            url: this.livemap.speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png',
            scaledSize: new google.maps.Size(20, 20)
          },
          title: this.livemap?.name
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

  loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBWV2nMndWfXL_FihC4xeNv3HbnvICaOrc&callback=initializeMap';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  openInfoWindow(bus: any, marker: any): void {

    if (this.infoWindow) {
      this.infoWindow.close();
    }

    this.infoWindow = new google.maps.InfoWindow({
      content: `<div>
                  <strong>Driver:</strong> <span class="badge badge-primary">${bus.driver ? bus.driver : 'NA'}</span><br/>
                  <strong>Vehicle No:</strong>${bus.asseT_NO}<br/>
                  <strong>Time:</strong> ${bus.timeg} <i class="fa fa-clock-o" aria-hidden="true"></i><br/>
                  <strong>Location:</strong> ${bus.place}<br/>
                  <strong>Lat:</strong> ${bus.lat} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
                  <strong>Long:</strong> ${bus.lon} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
                  <strong>Speed:</strong> ${bus.speed} <i class="fa fa-tachometer" aria-hidden="true"></i>
                </div>`
    });

    this.infoWindow.open(this.map, marker);
  }


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

  getRouteOnMap() {
    let payload = {
      route_id: this.routeId,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      this.listVehicleStopDetails = res?.body?.data;
      this.buslocation = res?.body?.data?.list_map_view;

      this.plotStopsOnGoogleMap();
    })
  }

  plotStopsOnGoogleMap() {
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];

    this.listVehicleStopDetails?.forEach(stop => {
      const iconSize = new google.maps.Size(20, 20);
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lon },
        map: this.map,
        title: stop.stopName,
        icon: {
          url: 'assets/images/stop-icon.png',
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
        infoWindow.open(this.map, marker);
        currentInfoWindow = infoWindow;
      });
    });

    // Create a polyline and set its path
    const polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true, // Indicates if the path should be geodesic (curved lines)
      strokeColor: '#0B32CCD4', // Color of the polyline
      strokeOpacity: 1.0, // Opacity of the polyline
      strokeWeight: 4 // Width of the polyline
    });

    // Set the polyline on the map
    polyline.setMap(this.map);
  }

  plotbusonselectedroute() {
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];

    this.RouteWiseVehicle?.forEach(stop => {
      const iconSize = new google.maps.Size(20, 20);
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lon },
        map: this.map,
        title: stop.route,
        icon: {
          url: 'assets/greenbus.png',
          scaledSize: iconSize
        }
      });

      pathCoordinates.push({ lat: stop.lat, lng: stop.lon }); // Add coordinates to the path

      const infoWindowContent = `<div>
      <strong>Driver:</strong> <span class="badge badge-primary">${stop.driver ? stop.driver : 'NA'}</span><br/>
      <strong>Vehicle No:</strong>${stop.asseT_NO}<br/>
      <strong>Time:</strong> ${stop.timeg} <i class="fa fa-clock-o" aria-hidden="true"></i><br/>
      <strong>Location:</strong> ${stop.place}<br/>
      <strong>Lat:</strong> ${stop.lat} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
      <strong>Long:</strong> ${stop.lon} <i class="fa fa-map-marker" aria-hidden="true"></i><br/>
      <strong>Speed:</strong> ${stop.speed} <i class="fa fa-tachometer" aria-hidden="true"></i>
    </div>`;
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(this.map, marker);
        currentInfoWindow = infoWindow;
      });
    });


  }

  livetrackingData() {
    this.isloading = true;
    let payload = {
      id: this.vehicleId, // route_id
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    };
    this.trackingService.getLive(payload).subscribe((res: any) => {
      this.vehicleData = res?.body;
      this.busStops = this.vehicleData[0]?.listVehicleStopDetails;
      this.startingPoint = this.busStops[0]?.stopName;
      this.endPoint = this.busStops[this.busStops?.length-1]?.stopName;
      
      this.isloading = false;
    });
  }


  formatSpeed(speedValue: any) {
    let newSpeedvalue = speedValue;
    if ((Boolean(newSpeedvalue.charAt(0).match(/[a-zA-Z]/)))) {
      newSpeedvalue = 0;
    }
    return newSpeedvalue;

  }

  showRoute() {
    this.clearMarkers();
    if (this.RouteWiseVehicle && this.RouteWiseVehicle.length > 0) {
      const latlngs = this.RouteWiseVehicle.map((stop: any) => [stop.lat, stop.lon]);
      console.log("check lat long", latlngs);


      // Fit the map view to show the polyline (route) only
      this.map.fitBounds(this.polyline.getBounds());
    }
  }


  locateBus() {
    if (this.map) {
      this.map?.remove();
      this.map = null;
    }
    this.plotStopsOnGoogleMap();
  }

  redirectToTracking(url: any, id: any) {
    let path = url.replace("id", id)
    this.router.navigateByUrl(path, {
      state: { pageName: 'Tracking_page' }
    });
  }


  currentloation() {
    const currentLocation:any = {
      lat: this.livemap[this.livemap?.length - 1]?.lat,
      lon: this.livemap[this.livemap?.length - 1]?.lon,
    };

    console.log("check current location", currentLocation);
    

    const previousStopIndex = this.currentStopIndex;
    this.currentStopIndex = this.findNearestStopIndex(currentLocation);
    console.log(this.currentStopIndex, previousStopIndex);

    if (this.currentStopIndex > previousStopIndex) {
      console.log('Bus is moving up');
      this.busStops = this.busStops?.reverse();
      this.currentStopIndex = this.busStops?.length - 1 - this.currentStopIndex;
      
      this.scrollEl?.nativeElement?.scrollIntoView({ behavior: "smooth", block: "start" });

    } else if (this.currentStopIndex < previousStopIndex) {
      console.log('Bus is moving down');
    } else {
      console.log('Bus is at the same stop');
    }

    // Update the nearest stop
    if(this.busStops) {
      this.nearestStop =  this.busStops[this.currentStopIndex];
    }

    if (this.currentStopIndex < this.busStops?.length - 1) {
      const currentStop:any = this.busStops[this.currentStopIndex];
      const nextStop:any = this.busStops[this.currentStopIndex + 1];      
      const latestBusLocation:any = this.livemap[this.livemap?.length - 1];
      const busLocation:any = {
        lat: latestBusLocation?.lat,
        lon: latestBusLocation?.lon,
      };

      this.nextStopDistance = this.calculateDistance(
        busLocation,
        currentStop,
        nextStop
      );

    }

    // Check for alerts at the current stop
    this.checkAlerts();
  }

  findNearestStopIndex(currentLocation: any): number {
    let nearestIndex = 0;
    let nearestDistance = Number.MAX_VALUE;
    for (let i = 0; i < this.busStops?.length; i++) {
      const stop = this.busStops[i];
      const distance = this.calculateDistance(currentLocation, stop);
      if (distance < nearestDistance) {
        nearestIndex = i;
        nearestDistance = distance;
      }
    }
    return nearestIndex;
  }

  checkAlerts(): void {
    this.alerts = [];
    let currentStop :any
    if(this.busStops) {
       currentStop = this.busStops[this.currentStopIndex];
    }
    let nextStop:any
    if(this.busStops) {
       nextStop = this.busStops[this.currentStopIndex + 1];
    }
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
    const latestBusLocation = this.livemap[this.livemap?.length - 1];
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



}
