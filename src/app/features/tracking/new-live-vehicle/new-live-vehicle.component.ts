import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { TrackingService } from '../tracking.service';
import { ScrollService } from '../../http-services/scroll.service';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LiveVideoComponent } from '../live-video/live-video.component';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-new-live-vehicle',
  templateUrl: './new-live-vehicle.component.html',
  styleUrls: ['./new-live-vehicle.component.scss']
})
export class NewLiveVehicleComponent {

  @ViewChild('sessionsList') sessionsList: ElementRef;

  camera: any = [
    {
      id: 1,
      icon: 'fa fa-video-camera fa-2x',
      label: 'Cam 1',
      selected: false,
      src: 'assets/stream.gif'
    },
    {
      id: 2,
      icon: 'fa fa-video-camera fa-2x',
      label: 'Cam 2',
      selected: false,
      src: 'assets/stream.gif'
    },
    {
      id: 3,
      icon: 'fa fa-video-camera fa-2x',
      label: 'Cam 3',
      selected: false,
      src: 'assets/stream.gif'
    }
  ]
  activeCamera: any; // Property to store the active camera

  // Method to handle icon selection and activate the camera
  selectIcon(cam: any) {
    console.log(cam);
    this.camera[cam].selected = true;
    console.log(this.camera);
    this.openModal(this.camera[cam])
  }
  // live camera work from here
  bsModalRef!: BsModalRef
  openModal(data: any) {
    console.log(data);
    const initialState: ModalOptions = {
      initialState: {
        data: data,
        total: this.camera.length,
        completedata: this.camera,
      },
    };
    this.bsModalRef = this.modalService.show(
      LiveVideoComponent,
      Object.assign(initialState, { class: "modal-lg modal-right" })
    );


  }
  id: any;
  dynamicFsvalue: any = 0;
  mapList: any;
  trackList: any;
  plotonmap: any;
  vehicleData: any;
  map: google.maps.Map<HTMLElement> | any;
  mapOptions: any;
  vehicleId: any;
  divClass: string = "col-md-8";
  livemap: any = [];
  isloading: boolean = false;
  busStops: any;
  startingPoint: any;
  endPoint: any;
  historylist: any;
  infoWindow: any;
  polyline: google.maps.Polyline | any;
  markers: google.maps.Marker[] = [];
  debounceTimer: ReturnType<typeof setTimeout>;
  liveVehicleData: any
  selectedVehicleData: any;
  filterData: any;
  fsValueData = -1;
  trackListData: any;
  routelist: any;
  divroute: any = ""
  routeId: any;
  buslocation: any;
  listVehicleStopDetails: any;
  showVehicleMap: any;
  selectedType: any;
  vehicleSelected: any;
  currentStopIndex: number = 0;
  distanceCovered: number = 0;
  nearestStop: any;
  nextStopDistance: number = 0;
  alerts: any;
  selectedData: any;
  selectedValue: any;
  selectedRouteValue: any;
  fsvalue: number = -1;
  subscription: Subscription;
  responseroute: any;


  constructor(
    private dashboardService: DashboardService,
    private trackingService: TrackingService,
    private location: Location,
    private modalService: BsModalService,

  ) { }

  ngOnInit() {
    this.selectedData = this.location.getState();
    this.mapOptions = {
      center: { lat: LAT, lng: LNG },
      zoom: 14
    };
    const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
    this.map = map;
    this.getVehicledata();
    this.getRoutedata();
    if (this.selectedData.type == "RouteVehicle") {
      setTimeout(() => {
        this.selectedRouteFromDyamicStatus()
      }, 2000);
    } else if (this.selectedData.type == 'liveVehicle') {
      setTimeout(() => {
        this.selectedVehicleFromDyamicStatus()
      }, 2000);
    } else if (this.selectedData.type == "Route") {

      setTimeout(() => {
        this.allRouteData();
      }, 2000);
    }
  }

  // ngOnDestroy() {
  //   clearTimeout(this.debounceTimer);
  // }

  ngOnDestroy(): void {
    this.unsubscribe();
  }



  selectVehicleValue(value: any) {
    this.dynamicFsvalue = value;
    this.getVehicledata()
  }


  /**
   * vehicle list in dropdown
   */
  getVehicledata() {
    let newData = {
      value: '',
      text: ''
    }
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
      let data = res?.body?.data?.list_map_view;
      this.trackList = res?.body?.data?.list_track_sta;
      this.filterData = this.mapList?.find(item => item?.id === this.vehicleId);
      this.vehicleData = data?.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.asseT_NO
        }
      )
      this.clearMarkers();
      // if (this.selectedData.type !== "Route" &&  this.selectedData.type !== "RouteVehicle" &&  this.selectedData.type !== "liveVehicle") {
      //   for (const bus of this.plotonmap) {
      //     const lat = bus.lat;
      //     const lng = bus.lon;
      //     const speedValue = bus.speed.replace(/\D/g, '');
      //     const busLatLng = new google.maps.LatLng(bus.lat, bus.lon, bus.speed.replace(/\D/g, ''));
      //     const marker = new google.maps.Marker({
      //       position: busLatLng,
      //       map: this.map,
      //       animation: google.maps.Animation.DROP,
      //       icon: {
      //         url: bus.speed !== '0 Km/hr' && (!Boolean(bus.speed.charAt(0).match(/[a-zA-Z]/))) ? '/assets/greenbus.png' : '/assets/yellowbus.png',
      //         scaledSize: new google.maps.Size(30, 30),
      //       },
      //       title: this.livemap.name
      //     });
      //     marker.addListener('click', () => {
      //       this.openInfoWindow(bus, marker);
      //     });
      //     this.markers?.push(marker);
      //   }

      //   if (this.markers.length >= 5) {

      //     this.map.setZoom(7);
      //   }
      //   if(this.selectedData.type !== "RouteVehicle") {
      //     const cluster = new MarkerCluster(this.map, this.markers, {
      //       imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
      //       gridSize: 40,
      //     });
      //   }
      // }
    });
  }

  /**
* get all map view data
 */
  getRoutedata() {
    let newData = {
      value: '',
      text: ''
    }
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
      let data = res?.body?.data?.list_track_sta;
      this.routelist = data.map((val: any) =>
        newData = {
          value: val?.route_id,
          text: val?.ts_status
        }
      )
    });
  }

  /**
   * confirm button for select vehicle and route
   * @param event 
   */
  confirm(event: any) {
    if (event.selectType == "vehicle") {
      this.vehicleSelected = "vehicle"
      if (!event?.id) {
        if (this.selectedType == 'route' || this.selectedData.type == "Route") {
          clearTimeout(this.debounceTimer);
          this.selectedValue = {
            value: "",
            text: ""
          }
          this.startingPoint = '';
          this.endPoint = '';
          this.busStops = null;
          this.filterData = null;
          this.showVehicleMap = null;
          this.selectedVehicleData = null;
          this.divClass = 'col-md-8';
          this.divroute = ""
          this.mapOptions = {
            center: { lat: LAT, lng: LNG },
            zoom: 14
          };
          this.livemap = [];
          this.vehicleData = [];
          const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
          this.map = map;
          this.getRouteWiseVehicle();
          this.getRouteOnMap()
        } else {
          clearTimeout(this.debounceTimer);
          this.startingPoint = '';
          this.endPoint = '';
          this.busStops = null;
          this.filterData = null;
          this.showVehicleMap = null;
          this.selectedVehicleData = null;
          this.divClass = 'col-md-8';
          this.divroute = ""
          this.mapOptions = {
            center: { lat: LAT, lng: LNG },
            zoom: 14
          };
          this.livemap = []
          const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
          this.map = map;
        }
      } else {
        if (this.selectedType == 'route') {
          this.showVehicleMap = [];
          this.vehicleId = event?.id;
          this.filterData = this.mapList?.find(item => item?.id === event?.id);
          this.divClass = 'col-md-4';
          this.divroute = "col-md-4";
          this.clearMarkers();
          this.getlist();
          this.mapOptions = {
            center: { lat: LAT, lng: LNG },
            zoom: 14
          };
          this.livemap = []
          const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
          this.map = map;
          this.livetrackingData();
          this.getRouteOnMap();
        } else {
          this.vehicleId = event?.id;
          this.filterData = this.mapList?.find(item => item?.id === event?.id);
          this.showVehicleMap = null;
          this.divClass = 'col-md-4';
          this.divroute = "col-md-4"
          this.getlist()
          this.mapOptions = {
            center: { lat: LAT, lng: LNG },
            zoom: 14
          };
          this.livemap = []
          const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
          this.map = map;
          this.livetrackingData()
        }
      }
    } else if (event.selectType == "route") {
      console.log("check route------", event);
      this.routeId = event?.id;
      this.fsvalue = -1;
      if (!event?.id) {
        console.log("check route------44", this.selectedValue, event);

        this.selectedRouteValue = {
          value: "",
          text: ""
        }
        // this.selectedValue = {
        //   value: "",
        //   text: ""
        // }
        this.selectedType = "";
        this.busStops = null;
        this.divClass = 'col-md-8';
        this.divroute = "";
        this.filterData = null;

        clearTimeout(this.debounceTimer);
        setTimeout(() => {
          this.getVehicledata()
        }, 100);
        this.selectedVehicleData = null;
        this.startingPoint = '';
        this.endPoint = ''
        this.mapOptions = {
          center: { lat: LAT, lng: LNG },
          zoom: 14
        };
        this.livemap = []
        const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
      } else {
        console.log("check route------44", this.selectedValue, event);
        this.selectedType = event.selectType;
        this.divClass = 'col-md-8';
        this.divroute = "";
        this.busStops = null;
        this.filterData = null;
        this.selectedVehicleData = null;
        this.startingPoint = '';
        this.endPoint = ''
        clearTimeout(this.debounceTimer);
        this.mapOptions = {
          center: { lat: LAT, lng: LNG },
          zoom: 14
        };
        this.livemap = [];
        this.vehicleData = [];
        const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
        this.map = map;
        this.getRouteWiseVehicle();
        this.getRouteOnMap()
      }
    }
  }

  /**
   * clear all marker from map
   */
  clearMarkers() {
    this.markers?.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  /**
   * Bus stops, start point and end point
   */
  livetrackingData() {
    this.isloading = true;
    let payload = {
      id: this.vehicleId, // route_id
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    };
    this.trackingService.getLive(payload).subscribe((res: any) => {
      this.liveVehicleData = res?.body;
      this.busStops = this.liveVehicleData[0]?.listVehicleStopDetails;
      this.startingPoint = this.busStops[0]?.stopName;
      this.endPoint = this.busStops[this.busStops?.length - 1]?.stopName;

      this.isloading = false;
    });
  }

  /**
   * live vehicle data on map
   */
  getlist(): void {
    this.unsubscribe();
    let payload = {
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      id: parseInt(this.vehicleId) || 0,
      RecordType: 0,
    };

    this.subscription = this.trackingService.livetrackinghistory(payload).pipe(debounceTime(10000)).subscribe((res: any) => {
      this.historylist = res?.body?.data;      
      // this.handleApiResponse(res);
      // this.currentloation();
      // this.calculateAndDisplayRoute();      

      const newLocation = {
        id: this.historylist?.id,
        lat: this.historylist?.lat,
        lon: this.historylist?.lon,
        speed: this.historylist?.speed,
        driver: this.historylist?.driver,
        timeg: this.historylist?.timE_RECORDED,
        place: this.historylist?.place,
        asseT_NO: this.historylist?.asseT_NO,
        route: this.historylist?.route,
        timE_TAKEN_IN_UPDATE: this.historylist?.timE_TAKEN_IN_UPDATE,
        distance: this.historylist?.distance,
        fueL_STATUS: this.historylist?.fueL_STATUS,
        destination: this.historylist?.destination,
      };
      
      this.livemap.push(newLocation);
      const pathCoordinate = [parseFloat(newLocation?.lat), parseFloat(newLocation?.lon), newLocation?.speed];

       this.currentloation();
      //  this.calculateAndDisplayRoute()

      if (Array.isArray(this.livemap)) {
        this.livemap.forEach((bus: any) => {
          this.selectedVehicleData = bus;
          const busLatLng = new google.maps.LatLng(bus.lat, bus.lon, bus.speed);
          const rotationAngle = 45;

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
        this.scrollToCurrentStop()

        // if (this.livemap?.length > 0) {
        //   const latestBus = this.livemap[this.livemap?.length - 1];
        //   const latestLatLng = new google.maps.LatLng(latestBus?.lat, latestBus?.lon);
        //   this.map.setCenter(latestLatLng);
        //   this.map.setZoom(15);
        // }
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

        // const latestLatLng = new google.maps.LatLng(this.livemap.lat, this.livemap.lon);
        // this.map.setCenter(latestLatLng);
        // this.map.setZoom(15);
      } else {
        console.error('Invalid historylist data:', this.livemap);
      }

      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.getlist();
      }, 10000);
    });
  }

  handleApiResponse(res: any): void {
    this.historylist = res?.body?.data;
    if(res && res.body && res.body.data) {
        let newLocation = {
        id: res?.body?.data?.id,
        lat: res?.body?.data?.lat,
        lon: res?.body?.data?.lon,
        speed: res?.body?.data?.speed,
        driver: res?.body?.data?.driver,
        timeg: res?.body?.data?.lasT_GPS_UPDATE,
        place: res?.body?.data?.place,
        asseT_NO: res?.body?.data?.asseT_NO,
        route: res?.body?.data?.route,
        timE_TAKEN_IN_UPDATE: res?.body?.data?.timE_TAKEN_IN_UPDATE,
        distance: res?.body?.data?.distance,
        fueL_STATUS: res?.body?.data?.fueL_STATUS,
        destination: res?.body?.data?.destination,
      };
  

      this.livemap.push(newLocation);  
  
      // Clear existing markers
      if (Array.isArray(this.markers)) {
        this.markers.forEach(marker => {
          marker.setMap(null);
        });
        this.markers = [];
        this.livemap.forEach((bus: any) => {
          this.selectedVehicleData = bus;
          const busLatLng = new google.maps.LatLng(bus.lat, bus.lon);
          const rotationAngle = 45;
    
          const marker = new google.maps.Marker({
            position: busLatLng,
            map: this.map,
            icon: {
              url: bus.speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png',
              scaledSize: new google.maps.Size(20, 20),
              rotation: rotationAngle
            },
            title: 'Bus' // Update title if needed
          });
          marker.addListener('click', () => {
            this.openInfoWindow(bus, marker);
          });
          this.markers.push(marker);
        });
    
        this.scrollToCurrentStop()
    }

    }

    // Set custom markers
   
    // Set timeout for the next API call
    this.debounceTimer = setTimeout(() => {
      this.getlist();
    }, 10000);
  }

  unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  // Function to chunk an array into smaller arrays
  chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }



  calculateAndDisplayRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#black", // Set polyline color
        strokeOpacity: 3.0, // Set polyline opacity
        strokeWeight: 2, // Set polyline thickness
        icons: [{
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 2, // Adjust arrow size as needed
            fillColor: 'black', // Replace with your desired arrow color
            fillOpacity: 1.0 // Set arrow color
          },
          offset: "100%", // Set arrow position at the end of the line
          repeat: "100px" // Repeat arrow every 100 pixels
        }]
      }
    });
    const rotationAngle = 45;

    const origin = { lat: this.livemap[0].lat, lng: this.livemap[0].lon };
    const destination = { lat: this.livemap[this.livemap.length - 1].lat, lng: this.livemap[this.livemap.length - 1].lon };

    const lastLocation = this.livemap[this.livemap.length - 1];
    const lastLocationLatLng = new google.maps.LatLng(lastLocation.lat, lastLocation.lon);
    if (this.map.getZoom() < 15) {
      this.map.setCenter(lastLocationLatLng);
      this.map.setZoom(15); // Adjust the zoom level as needed
    }

    // Determine the URL of the icon based on the speed of the first and last livemap items
    const originIconUrl = this.livemap[0].speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png';
    const destinationIconUrl = this.livemap[this.livemap.length - 1].speed !== 0 ? '/assets/greenbus.png' : '/assets/yellowbus.png';

    const allWaypoints = this.livemap.map((route) => ({
      location: new google.maps.LatLng(route.lat, route.lon),
      stopover: false,
    }));

    const MAX_WAYPOINTS = 13;
    const chunkedWaypoints = this.chunkArray(allWaypoints, MAX_WAYPOINTS);

    const originMarker = new google.maps.Marker({
      position: origin,
      map: this.map,
      icon: {
        url: originIconUrl,
        scaledSize: new google.maps.Size(20, 20),
        rotation: rotationAngle
      },
      title: 'Origin'
    });

    const destinationMarker = new google.maps.Marker({
      position: destination,
      map: this.map,
      icon: {
        url: destinationIconUrl,
        scaledSize: new google.maps.Size(20, 20),
        rotation: rotationAngle
      },
      title: 'Destination'
    });


    directionsService.route(
      {
        origin: origin,
        destination: destination,
        // waypoints: waypoints.slice(1, waypoints.length - 1),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          directionsRenderer.setMap(this.map);
          this.responseroute = response.routes[0].overview_path;
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );

    // chunkedWaypoints.forEach((waypoints, index) => {
    //   const request = {
    //     origin: waypoints[0].location,
    //     destination: waypoints[waypoints.length - 1].location,
    //     waypoints: waypoints.slice(1, waypoints.length - 1),
    //     travelMode: google.maps.TravelMode.DRIVING,
    //   };

    //   directionsService.route(request, (response, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {

    //       directionsRenderer.setMap(this.map);
    //       directionsRenderer.setDirections(response);
    //       this.responseroute = response.routes[0].overview_path;


    //     }
    //   });
    // });
  }

  /**
   * open info popup of vehicle data
   * @param bus 
   * @param marker 
   */
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

  /**
   * update poly line in map
   */
  updatePolyline() {
    const path = this.livemap.map((bus: any) => ({
      lat: bus.lat,
      lng: bus.lon
    }));


    const lastLocation = this.livemap[this.livemap.length - 1];
    const lastLocationLatLng = new google.maps.LatLng(lastLocation.lat, lastLocation.lon);
    if (this.map.getZoom() < 15) {
      this.map.setCenter(lastLocationLatLng);
      this.map.setZoom(15); // Adjust the zoom level as needed
    }

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

  /**
   * route on map
   */
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

      const stopCoordinates = this.listVehicleStopDetails.map(stop => ({        
        lat: stop.lat,
        lng: stop.lon,
        stopName: stop.stopName
    }));

    this.plotStopsOnGoogleMap(stopCoordinates);
    })
  }

  plotStopsOnGoogleMap(stopCoordinates: any) {
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];

    // Plot stops
    stopCoordinates.forEach((coordinate, index) => {
        const iconSize = new google.maps.Size(20, 20);
        const marker = new google.maps.Marker({
            position: coordinate,
            map: this.map,
            title: `Stop ${index + 1}`,
            icon: {
                url: 'assets/images/stop-icon.png',
                scaledSize: iconSize
            }
        });

        // Add coordinates to the path
        pathCoordinates.push(coordinate);

        const infoWindowContent = `
            <div>
                <h3>Stop ${index + 1}</h3>
                <h5>${coordinate.stopName}</h5>
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

    // Plot route polyline
    const polyline = new google.maps.Polyline({
        path: pathCoordinates, // Set route coordinates as path
        geodesic: true, // Indicates if the path should be geodesic (curved lines)
        strokeColor: '#0B32CCD4', // Color of the polyline
        strokeOpacity: 1.0, // Opacity of the polyline
        strokeWeight: 4 // Width of the polyline
    });

    // Set the polyline on the map
    polyline.setMap(this.map);
}

  /**
   * route stop plot in map
   */
  // plotStopsOnGoogleMap() {
  //   let currentInfoWindow: google.maps.InfoWindow;
  //   const pathCoordinates = [];

  //   this.listVehicleStopDetails?.forEach(stop => {
  //     const iconSize = new google.maps.Size(20, 20);
  //     const marker = new google.maps.Marker({
  //       position: { lat: stop.lat, lng: stop.lon },
  //       map: this.map,
  //       title: stop.stopName,
  //       icon: {
  //         url: 'assets/images/stop-icon.png',
  //         scaledSize: iconSize
  //       }
  //     });

  //     pathCoordinates.push({ lat: stop.lat, lng: stop.lon }); // Add coordinates to the path

  //     const infoWindowContent = `
  //       <div>
  //         <h3>${stop.stopName}</h3>
  //         <p>Stop ID: ${stop.stopId}</p>
  //         <!-- Add more details as needed -->
  //       </div>
  //     `;
  //     const infoWindow = new google.maps.InfoWindow({
  //       content: infoWindowContent
  //     });
  //     marker.addListener('click', () => {
  //       if (currentInfoWindow) {
  //         currentInfoWindow.close();
  //       }
  //       infoWindow.open(this.map, marker);
  //       currentInfoWindow = infoWindow;
  //     });
  //   });

  //   // Create a polyline and set its path
  //   const polyline = new google.maps.Polyline({
  //     path: pathCoordinates,
  //     geodesic: true, // Indicates if the path should be geodesic (curved lines)
  //     strokeColor: '#0B32CCD4', // Color of the polyline
  //     strokeOpacity: 1.0, // Opacity of the polyline
  //     strokeWeight: 4 // Width of the polyline
  //   });

  //   // Set the polyline on the map
  //   polyline.setMap(this.map);
  // }

  /**
   * vehicle wise route on map
   */
  getRouteWiseVehicle() {
    let newData = {
      value: "",
      text: ""
    }
    let payload = {
      "dept_id": parseInt(localStorage.getItem('dept_id') || ''),
      "fs_value": this.fsvalue ? this.fsvalue : -1,
      "id": 0,
      "page_no": 1,
      "page_size": 150,
      "route_id": this.routeId,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "vehicle_no": "",
      "vehicle_type": 2,
      "zone_id": 46

    }

    this.dashboardService.mapview1(payload).subscribe((res: any) => {
      let data = res?.body?.data?.list_map_view;
      this.showVehicleMap = res?.body?.data?.list_map_view
      this.plotbusonselectedroute()

      this.vehicleData = data?.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.asseT_NO
        }
      )
    });
  }

  /**
   * plot selected bus on route
   */
  plotbusonselectedroute() {
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];

    this.showVehicleMap?.forEach(stop => {
      const iconSize = new google.maps.Size(20, 20);
      const marker = new google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lon },
        map: this.map,
        title: stop.route,
        icon: {
          url: stop.speed !== '0 Km/hr' && (!Boolean(stop.speed.charAt(0).match(/[a-zA-Z]/))) ? '/assets/greenbus.png' : '/assets/yellowbus.png',
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

  /**
   * current bus location on stops
   */
  currentloation() {
    const currentLocation: any = {
      lat: this.livemap[this.livemap?.length - 1]?.lat,
      lon: this.livemap[this.livemap?.length - 1]?.lon,
    };

    const previousStopIndex = this.currentStopIndex;
    this.currentStopIndex = this.findNearestStopIndex(currentLocation);
    console.log(this.currentStopIndex, previousStopIndex);

    if (this.currentStopIndex > previousStopIndex) {
      console.log('Bus is moving up');
      this.busStops = this.busStops?.reverse();
      this.currentStopIndex = this.busStops?.length - 1 - this.currentStopIndex;

    } else if (this.currentStopIndex < previousStopIndex) {
      console.log('Bus is moving down');
    } else {
      console.log('Bus is at the same stop');
    }

    // Update the nearest stop
    if (this.busStops) {
      this.nearestStop = this.busStops[this.currentStopIndex];
    }

    if (this.currentStopIndex < this.busStops?.length - 1) {
      const currentStop: any = this.busStops[this.currentStopIndex];
      const nextStop: any = this.busStops[this.currentStopIndex + 1];
      const latestBusLocation: any = this.livemap[this.livemap?.length - 1];
      const busLocation: any = {
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

  /**
   * find nearest stop 
   * @param currentLocation 
   * @returns 
   */
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

  /**
   * calculate distance current stop to next stop
   * @param location 
   * @param stop1 
   * @param stop2 
   * @returns 
   */
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

  /**
   * check alerts
   */
  checkAlerts(): void {
    this.alerts = [];
    let currentStop: any
    if (this.busStops) {
      currentStop = this.busStops[this.currentStopIndex];
    }
    let nextStop: any
    if (this.busStops) {
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

  /**
   * scoll method on current stop
   */
  scrollToCurrentStop() {
    const element = this.sessionsList?.nativeElement;
    const currentStopElement = element?.querySelector('#scrollElement');

    if (currentStopElement) {
      currentStopElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * selected route from dynamic status 
   */
  selectedRouteFromDyamicStatus() {
    this.routeId = this.selectedData.id;
    this.vehicleId = this.selectedData?.vehicleId;

    let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.value == this.vehicleId);

    newVehicleValue?.forEach((data: any) => {
      this.selectedValue = data
    });

    let newRouteValue = this.routelist?.filter((ele: any) => ele?.value == this.routeId);

    newRouteValue?.forEach((data: any) => {
      this.selectedRouteValue = data
    });

    this.divClass = 'col-md-4';
    this.divroute = 'col-md-4'

    // this.mapList = [];
    // this.plotonmap = []
    this.clearMarkers();
    this.getlist();
    this.mapOptions = {
      center: { lat: LAT, lng: LNG },
      zoom: 14
    };
    this.livemap = []
    const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
    this.map = map;
    this.livetrackingData();
    this.getRouteOnMap();
  }

  /**
   * selected vehicle from dynamic status
   */
  selectedVehicleFromDyamicStatus() {
    this.vehicleId = this.selectedData?.vehicleId;

    let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.value == this.vehicleId);
    newVehicleValue?.forEach((data: any) => {
      this.selectedValue = data
    });
    this.divClass = 'col-md-4';
    this.divroute = 'col-md-4'
    this.getlist()
    this.mapOptions = {
      center: { lat: LAT, lng: LNG },
      zoom: 14
    };
    this.livemap = []
    const map = new google.maps.Map(document.getElementById('liveMap') as HTMLElement, this.mapOptions);
    this.map = map;
    this.getVehicledata()
    this.livetrackingData();
  }

  /**
   * selected route and vehicle from Route status
   */
  allRouteData() {
    this.routeId = this.selectedData.id;
    let newRouteValue = this.routelist?.filter((ele: any) => ele?.value == this.routeId);

    newRouteValue?.forEach((data: any) => {
      this.selectedRouteValue = data
    });
    this.fsvalue = this.selectedData.fs_value;
    // this.vehicleNumber = this.selectedData.vehicle_ID
    this.getRoutedata();
    if (this.routeId) {
      this.divClass = 'col-md-8';
      this.getRouteWiseVehicle();
      this.getRouteOnMap();
    }
  }


}
