import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { SharedService } from '../../http-services/shared.service';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import * as L from 'leaflet';
import 'leaflet-polylinedecorator';
import { ActivatedRoute } from '@angular/router';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { RegistrationService } from '../../registration/services/registration.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';


@Component({
  selector: 'app-history-vehicle-wise',
  templateUrl: './history-vehicle-wise.component.html',
  styleUrls: ['./history-vehicle-wise.component.scss']
})
export class HistoryVehicleWiseComponent implements OnInit {
  map: any;
  historyVehicleForm!: FormGroup;
  markers: google.maps.Marker[] = [];
  mapOptions: { center: { lat: number; lng: number; }; zoom: number; } | any;
  vehicleData: any;
  bsValue = new Date();
  bsRangeValue: Date[] | any;
  maxDate = new Date();
  currentIndex = 0;
  updateInterval = 1000; // Update interval in milliseconds
  busCoordinates: any = [];
  livemap: any = [];
  busMarker: google.maps.Marker | any;
  pathFeature: google.maps.Polyline | any;
  animationInterval: any;
  isloading: boolean = false;
  routeID: any;
  selectedValue: any;
  selectedMapType: any = 'google';
  selectedVehicle: any;
  historylist: any = [];
  private busSource: VectorSource<Point> | any;
  private busLayer: VectorLayer<VectorSource<Point>> | any;
  private playButtonDisabled = false;
  private pauseButtonDisabled = true;
  private pathSource: VectorSource<LineString> | any;
  private pathLayer: VectorLayer<VectorSource<LineString>> | any;
  @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef | any;
  private animationSpeed = 4.10; //medium 
  pathCoordinates: any = [];
  selectedSpeed: string = '';
  max: any;
  speedMultiplier = 1;
  polyline: google.maps.Polyline;
  higestSpeedValue: any;
  infoWindow: any;
  startPosition: google.maps.LatLng;
  endPosition: google.maps.LatLng;
  busSpeed: any;
  routeList: any;
  selectedRoute: any = 0;
  listVehicleStopDetails: any;
  id: number = 0;
  fsvalue = -1;
  trackListData: any;
  buslocation: any;
  RouteWiseVehicle: any;
  selectedType: string;
  centerLatitude = LAT;
  centerLongitude = LNG;
  responseroute: any = [];
  polylinePath: any;
  zoom = 11
  speedGraph: any = [];
  graphType: any;

  view: any = [1500, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Speed';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  data: any[];
  polylines: google.maps.Polyline;
  wapointmarker: google.maps.Marker;
  wapointmarkerpolylines: google.maps.Polyline;
  historyData: any;
  isPlay: boolean = false;
  busRoute: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  speedTime: any;


  onMapReady(map: any) {
    this.map = map;

  }

  constructor(
    private trackingService: TrackingService,
    private shardService: SharedService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private registrationService: RegistrationService,
    private dashboardService: DashboardService
  ) {
    // Initialize other properties...
  }

  ngOnInit(): void {
    //this.map = new google.maps.Map(document.getElementById('historyMap') as HTMLElement, this.mapOptions);
    this.setInitialValue();
    this.getVehicleZoneData();
    this.getRouteList();

    this.routeID = this.activeRoute.snapshot.paramMap.get("id");
    if (this.routeID) {
      this.selectedVehicle = this.routeID;
      this.getTrackingHistory(this.historyVehicleForm.value)
    }

  }

  setInitialValue() {
    let differnceDate = this.bsValue.setMinutes(this.bsValue.getMinutes() - 30)
    let getDate = formatDate(differnceDate, 'yyyy/MM/dd hh:mm', 'en-Us');

    this.historyVehicleForm = this.fb.group({
      fromDate: [new Date(differnceDate), [Validators.required, Validators.pattern('')]],
      toDate: [new Date(), [Validators.required, Validators.pattern('')]]
    });
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
      if (this.routeID) {
        let newVehicleData = this.vehicleData?.filter((ele: any) => ele?.value == this.selectedVehicle);

        newVehicleData.forEach((data: any) => {
          this.selectedValue = data;
        });

      }
    });
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
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME + ' /' + val?.routE_NO
        }
      )
    })

  }

  submit(formValue: any) {
    this.clearMap();
    this.clearMarkers()
    this.historylist = [];
    clearInterval(this.animationInterval);
    this.isPlay = false
    if (this.wapointmarkerpolylines) {
      this.wapointmarkerpolylines.setMap(null);
    }
    if (this.wapointmarker) {
      this.wapointmarker.setMap(null);
    }
    this.getTrackingHistory(formValue);
    this.updatePolyline()
  }

  getTrackingHistory(formValue: any) {
    this.isloading = true;
    this.speedGraph = []
    let graphValue: any = [];
    let graph: any = {
      "name": "",
      "value": 0
    }


    const payload = {
      "id": parseInt(this.selectedVehicle),
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "from_date": this.shardService.formatedTime(formValue.fromDate),
      "to_date": this.shardService.formatedTime(formValue.toDate),
      "RecordType": 2
    };

    this.trackingService.livetrackinghistory(payload).subscribe((res: any) => {      
      this.historylist = res?.body?.data?.listTrackingHistory;
      this.historyData = res?.body?.data?.trackingHistorySum
      this.mockDirections()


      this.historylist.forEach((bus: any) => {
        const busLatLng = new google.maps.LatLng(bus.lat, bus.lon);
        const rotationAngle = 45;
        // const newLocation = {
        //   lat: bus.lat,
        //   lon: bus.lon,
        // };
       

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
        this.markers.push(marker);
        // this.livemap.push(newLocation)
      });


      this.historylist?.forEach((val: any) => {
        
        graph = {
          name: val?.timE_RECORDED,
          value: val?.speed
        }
        graphValue.push(graph)
      

      })
      this.speedGraph.push({
        "name": 'Speed',
        "series": graphValue
      })
      this.graphType = 'Graphvalue';

      this.isloading = false;
      this.pathCoordinates = this.historylist?.map((bus: any) => {
        return [bus.lat, bus.lon, bus.speed];
      });

      let highestSpeed = this.historylist?.map(data => {
        return data?.speed;
      })

      if (highestSpeed) {
        this.higestSpeedValue = Math.max(...highestSpeed)
      }
      this.updatePolyline()
      //  this.googlemapwork();
    });
   
  }

  mockDirections() {
    if (this.wapointmarkerpolylines) {
      this.wapointmarkerpolylines.setMap(null);
    }
    if (this.wapointmarker) {
      this.wapointmarker.setMap(null);
    }

    const origin = new google.maps.LatLng(this.historylist[0]?.lat, this.historylist[0]?.lon);
    const destination = new google.maps.LatLng(this.historylist[this.historylist.length - 1]?.lat, this.historylist[this.historylist.length - 1]?.lon);
    const maxWaypoints = 16; // Maximum number of waypoints allowed per request
    const waypointsData = this.historylist
      .slice(1, -1) // Exclude start and end points
      .filter((_, index) => index % Math.ceil(this.historylist.length / maxWaypoints) === 0) // Select every nth waypoint
      .map(route => ({
        location: new google.maps.LatLng(route.lat, route.lon),
        stopover: false
      }));
    console.log("check way", waypointsData);

    // Process each chunk of waypoints
    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypointsData.slice(1, waypointsData.length - 1),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setMap(this.map);
        this.directionsRenderer.setDirections(response);
        const routePath = response.routes[0].overview_path;

        this.wapointmarkerpolylines = new google.maps.Polyline({
          path: routePath,
          geodesic: true,
          strokeColor: '', // Set your desired stroke color
          strokeOpacity: 1, // Adjust opacity as needed
          strokeWeight: 2, // Adjust weight as needed
          map: this.map
        });

        this.responseroute = response.routes[0].overview_path;
      }
    });
  }

  play() {
    // clearInterval(this.animationInterval);
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.isPlay = true
    this.busRoute = this.historylist.map((bus: any) => ({
      lat: parseFloat(bus.lat),
      lng: parseFloat(bus.lon)
    }));

    this.animateMarkers();
  }

  //   animateMarkers(startIndex: number = 0) {
  //     const route = this.wapointmarkerpolylines.getPath();
  //     console.log(route);

  //     let speed :any
  //     let color : any
  //     let index = startIndex;


  //     this.animationInterval = setInterval(() => {
  //       const nextPosition = route.getAt(index);
  //       if(this.isPlay) {
  //         speed = this.historylist[index].speed; 
  //         color = this.getColorForSpeed(speed);
  //      }      

  //       const previousPosition = route.getAt(index === 0 ? route.getLength() - 1 : index - 1);
  //       const heading = google.maps.geometry.spherical.computeHeading(previousPosition, nextPosition);
  //       const rotation = (heading * Math.PI) / 180;

  //       var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";

  //       var icon = {
  //         path: car,
  //         scale: 0.7,
  //         strokeColor: 'white',
  //         strokeWeight: 0.1,
  //         fillOpacity: 1,
  //         fillColor: color,
  //         offset: '5%',
  //         rotation: rotation,
  //         anchor: new google.maps.Point(10, 25),
  //       };
  //       icon.rotation = heading;
  //       this.wapointmarker?.setPosition(nextPosition);
  //       this.wapointmarker?.setIcon(icon);

  //       index = (index + 1) % route.getLength();
  //       const mapBounds = this.map.getBounds();
  //       if (!mapBounds.contains(nextPosition)) {
  //         this.map.panTo(nextPosition);
  //       }

  //       if (index === 0) {
  //         // Check if we reached the last point in the route
  //         clearInterval(this.animationInterval);
  //       }
  //     }, 1000 / this.speedMultipliers);
  // }

  animateMarkers(startIndex: number = 0) {
    let index = startIndex;
    if (!this.infoWindow) {
      this.infoWindow = new google.maps.InfoWindow();
  }
    this.animationInterval = setInterval(() => {
      const nextPosition = this.busRoute[index];
      const previousPosition = this.busRoute[index === 0 ? this.busRoute.length - 1 : index - 1];
      const heading = google.maps.geometry.spherical.computeHeading(previousPosition, nextPosition);
      const rotation = (heading * Math.PI) / 180;

      const speed = this.historylist[index].speed;
      const time = this.historylist[index].timE_RECORDED
      const color = this.getColorForSpeed(speed);

      const car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";

      const icon = {
        path: car,
        scale: 0.7,
        strokeColor: 'white',
        strokeWeight: 0.1,
        fillOpacity: 1,
        fillColor: color,
        offset: '5%',
        rotation: rotation,
        anchor: new google.maps.Point(10, 25),
      };
      icon.rotation = heading;
      this.wapointmarker?.setPosition(nextPosition);
      this.wapointmarker?.setIcon(icon);
      const infoWindowContent = `
      <div>
          <h4>${time}</h4>
          <p>Speed: ${speed} km/h</p>
      </div>
  `;
  this.infoWindow.setContent(infoWindowContent);

  // Open the info window

      index = (index + 1) % this.busRoute.length;
      const mapBounds = this.map.getBounds();
      if (!mapBounds.contains(nextPosition)) {
        this.map.panTo(nextPosition);
      }

      if (index === 0) {
        // Check if we reached the last point in the route
        clearInterval(this.animationInterval);
      }
    }, 1000 / this.speedMultipliers);
    this.infoWindow.open(this.map, this.wapointmarker);

  }

  // Function to chunk an array into smaller arrays
  chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }



  showInfoWindow(marker, stopName) {
    const infowindow = new google.maps.InfoWindow({
      content: `<div><strong>Stop Name:</strong> ${stopName}</div>`
    });

    infowindow.open(this.map, marker);
  }


  mapMarkers: google.maps.Marker[] = [];

  clearMap() {
    this.mapMarkers.forEach(marker => marker.setMap(null));
    this.mapMarkers = [];
    this.directionsRenderer.setMap(null);
  }

  speedMultipliers = 1;
  car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
  carIcon = {
    path: this.car,
    scale: 0.7,
    strokeColor: 'white',
    strokeWeight: 0.10,
    fillOpacity: 1,
    fillColor: '#404040',
    offset: '5%',
    anchor: new google.maps.Point(10, 25),

  };
  marker: any;
  initRoute() {
    const map = this.map;
    if (this.wapointmarkerpolylines) {
      this.wapointmarkerpolylines.setMap(null);
    }
    if (this.wapointmarker) {
      this.wapointmarker.setMap(null);
    }

    const waypoints = this.responseroute;
    this.wapointmarkerpolylines = new google.maps.Polyline({
      path: waypoints,
      geodesic: true,
      strokeColor: '',
      strokeOpacity: 0,
      map: map
    });
    this.wapointmarker = new google.maps.Marker({
      map: this.map,
      icon: this.carIcon,
      position: waypoints[0],
      optimized: false
    });

  }

  getColorForSpeed(speed: any) {
    if (speed === 0) {
      return 'yellow'; // or any other color you prefer
    } else if (speed > 0 && speed <= 50) {
      return 'green';
    } else {
      return 'red';
    }
  }


  currentAnimationIndex = 0;
  pause() {
    clearInterval(this.animationInterval);
    this.currentAnimationIndex = this.getCurrentAnimationIndex();
  }

  resume() {
    clearInterval(this.animationInterval);

    this.animateMarkers(this.currentAnimationIndex);
  }
  // Helper function to get the current animation index
  getCurrentAnimationIndex(): number {
    const route = this.wapointmarkerpolylines.getPath();
    const totalPoints = route.getLength();

    const currentLatLng = this.wapointmarker.getPosition(); // Use wapointmarker instead of marker
    if (!currentLatLng) return 0; // Handle cases where marker position is not available

    for (let i = 0; i < totalPoints; i++) {
      const point = route.getAt(i);
      // Compare the distance between currentLatLng and the point
      if (google.maps.geometry.spherical.computeDistanceBetween(currentLatLng, point) < 1) {
        return i;
      }
    }
    return 0;
  }
  reset() {
    clearInterval(this.animationInterval);
    this.play();
  }

  fast() {
    this.speedMultipliers *= 2;
    if (this.animationInterval) {
      const currentIndex = this.getCurrentAnimationIndex();
      this.pause();
      this.resumeFromIndex(currentIndex); // Double the speed by passing 2 as the speedMultiplier
    }
  }

  slow() {
    this.speedMultipliers = Math.max(1, this.speedMultipliers / 2);
    if (this.animationInterval) {
      const currentIndex = this.getCurrentAnimationIndex();
      this.pause();
      this.resumeFromIndex(currentIndex);
    }
  }

  // Helper function to resume from a specific index
  resumeFromIndex(index: number) {
    clearInterval(this.animationInterval);
    this.animateMarkers(index);
  }


  resetSpeed() {
    // Update the speed display and restart the animation with the new speed
    document.getElementById('speed').textContent = `Speed: ${this.speedMultipliers}x`;
    this.reset();
  }

  clearMarkers() {
    // this.mapOptions = {
    //   center: { lat: LAT, lng: LNG },
    //   zoom: 16,
    // };
    // this.map = new google.maps.Map(document.getElementById('historyMap') as HTMLElement, this.mapOptions);
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
    this.clearMap()
    if (this.wapointmarkerpolylines) {
      this.wapointmarkerpolylines.setMap(null);
    }
    if (this.wapointmarker) {
      this.wapointmarker.setMap(null);
    }

    if (event.selectType == "Vehicle") {
      this.selectedVehicle = event.id;
    } else if (event.selectType == "route") {
      this.vehicleData = [];
      this.listVehicleStopDetails = [];
      this.selectedRoute = event.id
      this.selectedType = 'route';
      this.getRouteWiseVehicle();
      this.getRouteOnMap();
      if (!event.id) {
        this.clearMap();
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }
        this.centerLatitude = null;
        this.centerLongitude = null;
        this.zoom = 0;
        console.log("Reloading AGM map...");
        setTimeout(() => {
          this.getVehicleZoneData();
        }, 100);
      }
    }
  }

  getRouteOnMap() {
    let payload = {
      route_id: this.selectedRoute,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      this.listVehicleStopDetails = res?.body?.data;
      console.log("check stop details", this.listVehicleStopDetails);

      this.plotStopsOnGoogleMap();
    })
  }

  updatePolyline() {
    
    const path = this.historylist.map((bus: any) => ({
      lat: bus.lat,
      lng: bus.lon
    }));
    console.log("path",path);
    
    const lastLocation = path[path.length - 1];
    const lastLocationLatLng = new google.maps.LatLng(lastLocation.lat, lastLocation.lng);
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

  plotStopsOnGoogleMap() {
    if (this.polyline) {
      this.polyline.setMap(null);
    }

    if (this.markers) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];
    }
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];
    this.zoom = 13
    // this.mapOptions = {
    //   center: { lat: LAT, lng: LNG },
    //   zoom: 14,
    // };
    this.listVehicleStopDetails?.forEach((stop: any) => {
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
      this.markers.push(marker);
    });



    // Create a polyline and set its path
    this.polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true, // Indicates if the path should be geodesic (curved lines)
      strokeColor: '#0B32CCD4', // Color of the polyline
      strokeOpacity: 1.0, // Opacity of the polyline
      strokeWeight: 4 // Width of the polyline
    });

    // Set the polyline on the map
    this.polyline.setMap(this.map);
    const bounds = new google.maps.LatLngBounds();
    pathCoordinates.forEach(coord => {
      bounds.extend(coord);
    });
    this.map.fitBounds(bounds);
  }

  getRouteWiseVehicle() {
    let newData = {
      value: "",
      text: ""
    }
    let payload = {
      "dept_id": parseInt(localStorage.getItem('dept_id') || ''),
      "fs_value": -1,
      "id": 0,
      "page_no": 1,
      "page_size": 150,
      "route_id": this.selectedRoute,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "vehicle_no": "",
      "vehicle_type": 2,
      "zone_id": 46

    }

    this.dashboardService.mapview1(payload).subscribe((res: any) => {
      let data = res?.body?.data?.list_map_view;
      this.vehicleData = data?.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.asseT_NO
        }
      )
      // this.showVehicleMap = res?.body?.data?.list_map_view
    });
  }








}
