import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { TrackingService } from '../../tracking/tracking.service';
import { LAT, LNG } from '../../shared/constant/API_CONSTANT';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GeocodingService } from '../../http-services/geocoding.service';
import { GeocoderResponse } from '../../models/geocoder-response.model';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';
import { SortablejsModule } from 'ngx-sortablejs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddNewStopComponent } from '../add-new-stop/add-new-stop.component';
import { MapsAPILoader } from '@agm/core';


import { map } from 'rxjs';
import { ViewportScroller } from '@angular/common';
import { RoutePlotPopupComponent } from '../route-plot-popup/route-plot-popup.component';

@Component({
  selector: 'app-route-registration',
  templateUrl: './route-registration.component.html',
  styleUrls: ['./route-registration.component.scss']
})
export class RouteRegistrationComponent implements OnInit {
  map: any;
  zoom: number = 15;
  // initial center position for the map
  lat: number = 51.512802;
  lng: number = -0.091324;
  marker: any;
  directionsService: any;
  directionsRenderer: google.maps.DirectionsRenderer;
  responseroute: any;
  polyline: any;
  infowindow: any;
  markers: google.maps.Marker | any;
  listVehicleStopDetailsformap: any;
  selectedRouteName: any;
  button: string = "Add Record";
  multiselected: any
  selectedStop: any = [];
  selectedRouteId: any;
  showMore: boolean = false;
  showCount: number = 30;
  isIconOpen : boolean = false;

  onMapReady(map: any) {
    this.map = map;
    // this.calcRoute();
    this.mockDirections()
    // this.initEvents();
  }
  // mockDirections() {
  //   if (!this.selectedRouteData || this.selectedRouteData.length < 2) {
  //     return;
  //   }
  //   this.selectedRouteData.forEach((route, index) => {
  //     const marker = new google.maps.Marker({
  //       position: new google.maps.LatLng(route.lat, route.lon),
  //       map: this.map,
  //       label: route.stopName.charAt(0).toUpperCase()
  //     });
  //     const infoWindow = new google.maps.InfoWindow({
  //       content: `<div><strong>Stop Name:</strong> ${route.stopName}</div>`,
  //     });
  //     marker.addListener('click', function() {
  //       infoWindow.open(this.map, marker);
  //     }.bind(this));
  //     this.mapMarkers.push(marker);
  //   });
  //   const waypoints = this.selectedRouteData.map(route => ({
  //     location: new google.maps.LatLng(route.lat, route.lon),
  //     stopover: true,
  //   }));
  //   const request = {
  //     origin: waypoints[0].location,
  //     destination: waypoints[waypoints.length - 1].location,
  //     waypoints: waypoints.slice(1, waypoints.length - 1),
  //     travelMode: google.maps.TravelMode.DRIVING,
  //   };
  //   this.directionsService.route(request, (response, status) => {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       this.directionsRenderer.setMap(this.map);
  //       this.directionsRenderer.setDirections(response);
  //       this.responseroute = response.routes[0].overview_path;
  //     }
  //   });
  // }
  mockDirections() {
    if (this.polyline) {
      this.polyline.setMap(null);
    }
    // Clear existing markers if they exist
    if (this.markers) {
      this.markers.forEach((marker: any) => {
        marker.setMap(null);
      });
      this.markers = [];
    }
    if (!this.selectedRouteData || this.selectedRouteData?.length < 2) {
      return;
    }
    this.clearMap();
    const markers = this.selectedRouteData?.map((route: any, index) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(route.lat, route.lon),
        label: route?.stopName.charAt(0).toUpperCase()
      });
      // Add click event listener to each marker
      marker.addListener('click', () => {
        this.showInfoWindow(marker, route?.stopName);
      });
      return marker;
    });
    this.markers?.push(...markers);
    const waypoints = this.selectedRouteData.map(route => ({
      location: new google.maps.LatLng(route.lat, route.lon),
      stopover: true,
    }));
    const request = {
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, waypoints.length - 1),
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsService.route(request, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setMap(this.map);
        this.directionsRenderer.setDirections(response);
        this.responseroute = response.routes[0].overview_path;
      }
    });
  }
  showInfoWindow(marker, stopName) {
    const infowindow = new google.maps.InfoWindow({
      content: `<div><strong>Stop Name:</strong> ${stopName}</div>`
    });
    infowindow.open(this.map, marker);
  }
  mapMarkers: google.maps.Marker | any;
  clearMap() {
    this.markers?.forEach((marker: any) => marker.setMap(null));
    this.markers = [];
    this.directionsRenderer.setMap(null);
  }
  speedMultiplier = 1;
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
  initRoute() {
    this.isIconOpen = true;
    this.selectedRouteName = '';
    const map = this.map;
    if (this.polyline) {
      this.polyline.setMap(null);
    }
    if (this.marker) {
      this.marker.setMap(null);
    }
    const waypoints = this.responseroute;
    this.polyline = new google.maps.Polyline({
      path: waypoints,
      geodesic: true,
      strokeColor: '',
      strokeOpacity: 0,
      map: map
    });
    this.marker = new google.maps.Marker({
      map: map,
      icon: this.carIcon,
      position: waypoints[0],
      optimized: false
    });
    // this.animateMarker();
  }
  
animateMarker(startIndex: number = 0) {
    const route = this.polyline.getPath();
    let index = startIndex;
    this.animationInterval = setInterval(() => {
      const nextPosition = route.getAt(index);
      console.log(nextPosition);
      this.marker.setPosition(nextPosition);
      if (this.isAtStop(nextPosition)) {
        const stopName = this.getStopName(nextPosition);
        // Perform any additional actions when the marker is at a stop
      }
      const previousPosition = route.getAt(index === 0 ? route.getLength() - 1 : index - 1);
      const heading = google.maps.geometry.spherical.computeHeading(previousPosition, nextPosition);
      const rotation = (heading * Math.PI) / 180;
      var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
      var icon = {
        path: car,
        scale: 0.7,
        strokeColor: 'white',
        strokeWeight: 0.1,
        fillOpacity: 1,
        fillColor: '#404040',
        offset: '5%',
        rotation: rotation,
        anchor: new google.maps.Point(10, 25),
      };
      icon.rotation = heading;
      this.marker.setIcon(icon);
      index = (index + 1) % route.getLength();
      const mapBounds = this.map.getBounds();
      if (!mapBounds.contains(nextPosition)) {
        this.map.panTo(nextPosition);
      }
      if (index == 0) {
        console.log('coming here');
        // Check if we reached the last point in the route
        clearInterval(this.animationInterval);
      }
      // this.map.panTo(nextPosition);
    }, 1000 / this.speedMultiplier);
  }

  isAtStop(position) {
    const stopTolerance = 50;// Set the value based on your specific use case
    for (const stop of this.responseroute) {
      const stopPosition = new google.maps.LatLng(stop.lat(), stop.lng());
      const distance = google.maps.geometry.spherical.computeDistanceBetween(stopPosition, position);
      if (distance < stopTolerance) {
        return true;
      }
      else {
        if (this.infowindow) {
          this.infowindow.close(this.map, this.marker);
        }
      }
    }
    return false;
  }

  getStopName(position) {
    const stopTolerance = 50; // Set the value based on your specific use case
    for (const stop of this.selectedRouteData) {
      const stopPosition = new google.maps.LatLng(stop.lat, stop.lon)
      const distance = google.maps.geometry.spherical.computeDistanceBetween(stopPosition, position);
      if (distance < stopTolerance) {
        if (this.infowindow) {
          // Close the existing InfoWindow
          this.infowindow.close();
        }
        // Create a new InfoWindow
        this.infowindow = new google.maps.InfoWindow({
          content: `<div><strong>Stop Name:</strong> ${stop.stopName}</div>`
        });
        // Open the new InfoWindow on the marker
        this.infowindow.open(this.map, this.marker);
        return stop.stopName;
      }
    }
    return null;
  }
  animationInterval;
  currentAnimationIndex = 0;

  play() {
    clearInterval(this.animationInterval);
    this.animateMarker();
  }

  pause() {
    clearInterval(this.animationInterval);
    this.currentAnimationIndex = this.getCurrentAnimationIndex();
  }

  resume() {
    clearInterval(this.animationInterval);
    this.animateMarker(this.currentAnimationIndex);
  }
  // Helper function to get the current animation index
  getCurrentAnimationIndex(): number {
    const route = this.polyline.getPath();
    const totalPoints = route.getLength();
    const currentLatLng = this.marker.getPosition();
    for (let i = 0; i < totalPoints; i++) {
      if (route.getAt(i).equals(currentLatLng)) {
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
    this.speedMultiplier *= 2;
    if (this.animationInterval) {
      const currentIndex = this.getCurrentAnimationIndex();
      this.pause();
      this.resumeFromIndex(currentIndex);
    } else {
      this.resetSpeed();
    }
  }

  slow() {
    this.speedMultiplier = Math.max(1, this.speedMultiplier / 2);
    if (this.animationInterval) {
      const currentIndex = this.getCurrentAnimationIndex();
      this.pause();
      this.resumeFromIndex(currentIndex);
    } else {
      this.resetSpeed();
    }
  }

  // Helper function to resume from a specific index
  resumeFromIndex(index: number) {
    clearInterval(this.animationInterval);
    this.animateMarker(index);
  }

  resetSpeed() {
    // Update the speed display and restart the animation with the new speed
    document.getElementById('speed').textContent = `Speed: ${this.speedMultiplier}x`;
    this.reset();
  }
  department: any;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 75];
  alertData: any = {
    message: "success",
  };
  stopdata: any = {
    count: 0,
    page: 1,
    tableSize: 10,
    tableSizes: [10, 20, 50]
  }
  selectedRoute: any = {
    count: 0,
    page: 1,
    tableSize: 10,
    tableSizes: [10, 20, 50]
  }
  alertType: any = "success";
  alertTrigger: any = false;
  isloading: boolean = false;
  addRoute!: FormGroup;
  selectedValue: any
  routeList: any;
  listVehicleStopDetails: any;
  isRouteLoading: boolean = false;
  tableData2: any;
  searchRoute: any;
  tableData3: any
  selectedZoneId: any;
  selectedRouteIndex: any;
  selectedRouteData: any = [];
  searchSelectedRoute: any;
  sortBy: string = 'orderBy'; // Default sort by ID
  sortOrder: number = 1;
  multiselection: boolean = true;
  closeDropdown: boolean = true;
  searchAddress: any
  bsModalRef?: BsModalRef;
  polygonCoordinates: google.maps.LatLng[] | any;
  routeId: any;
  stopDeatils: any;
  routeValue: any;
  toastr: any;
  markerOptions: { draggable: boolean; animation: google.maps.Animation; };
  isMarkerDraggable: boolean;

  getCardCenterX(index: number): string {
    // Calculate the center x position of the card
    const cardWidth = 150; // Adjust based on your card width
    return `${index * cardWidth + cardWidth / 2}`;
  }

  getCardCenterY(): string {
    // Assuming all cards are on the same y-axis position
    return '50%';
  }

  getPathBetweenCards(startIndex: number, endIndex: number): string {
    // Calculate a curved SVG path between the centers of two cards
    const startX = this.getCardCenterX(startIndex);
    const startY = this.getCardCenterY();
    const endX = this.getCardCenterX(endIndex);
    const endY = this.getCardCenterY();
    // Adjust the control point based on your desired curvature
    const controlPointX = (parseFloat(startX) + parseFloat(endX)) / 2;
    const controlPointY = parseFloat(startY) + 100; // Adjust the Y-coordinate for curvature
    return `M ${startX} ${startY} Q ${controlPointX} ${controlPointY} ${endX} ${endY}`;
  }

  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private trackingService: TrackingService,
    private http: HttpClient,
    private geocodingService: GeocodingService,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.setInitialValue()
    this.departmentData();
    this.setInitialTable();
    this.getRouteListData();
    this.getStoplist();
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    // this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=20.29573,85.82476&key=AIzaSyBcuET7Vey36x_ok8bidTwsiEWuOodEn8Y").subscribe((data: any) => {
    //   console.log("check lat lng",data);
    // });
  }

setInitialTable() {
    this.tableData = [
      { key: '', value: 'Route No' },
      { key: '', value: 'Route Name' },
      { key: '', value: 'Origin' },
      // { key: '', value: 'Destination' },
      { key: '', value: 'Scheduled KM' },
      { key: '', value: 'Action' }
    ]
  }

  setInitialValue() {
    this.addRoute = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      route_no: ['', [Validators.required, Validators.pattern('')]],
      route_name: ['', [Validators.required, Validators.pattern('')]],
      scheduelKm: ['', [Validators.required, Validators.pattern('')]],
      direction: ['BOTH', [Validators.required, Validators.pattern('')]],
      // scheduleTime: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  getRouteListData() {
    this.isRouteLoading = true
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 2,
      "bStatus": 1
    }
    this.registrationService.routeListData(payload).subscribe((res: any) => {
      this.routeList = res?.body?.data;
      this.isRouteLoading = false
    })
  }

  getStoplist() {
    let newData = {
      value: "",
      text: ""
    }
    this.isloading = true;
    let payload = {
      route_id: 0,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
      ReqFor: 2
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.stopDeatils = res?.body?.data;
      this.listVehicleStopDetails = data.map((val: any) =>
        newData = {
          value: val?.stopId,
          text: val?.stopName
        }
      )
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any, type: any): void {
    if (type == 'routepage') {
      this.tableSize = event.target.value;
      this.page = 1;
    } else if (type == 'stoppage') {
      this.stopdata.tableSize = event.target.value;
      this.stopdata.page = 1
    } else {
      this.selectedRoute.tableSize = event.target.value;
      this.selectedRoute.page = 1
    }
  }

  onTableDataChange(event: any, type: any) {
    if (type == 'routepage') {
      this.page = event;
    } else if (type == 'stoppage') {
      this.stopdata.page = event
    } else {
      this.selectedRoute.page = event
    }
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
  /**
*get department data
*/
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  confirm(event: any) { 
    this.isIconOpen = false   
    if (event.selectType == "Stop") {
      console.log("skjdfhjks");

      this.routeValue = event.assets_no
      this.routeId = event.id;
      this.changeSelection()
    } else if(event.selectType == "AllVehicle") {      
      this.formatAllVehicle(event)
    } else {
      this.addRoute.controls['company'].setValue(event.id)
    }
  }

  formatAllVehicle(event:any) {
    if (!event?.data || event.data == null) {
      this.selectedRouteData = [];
      this.selectedStop = []; 
      return;
    }
    
  const anyVehicleSelected = this.selectedRouteData.length !== this.stopDeatils.length;

  if (anyVehicleSelected) {
    this.selectedRouteData = [];
  }
  this.selectedRouteData = [...this.stopDeatils];
  setTimeout(() => {
    this.selectedStop = this.selectedRouteData.map((val => ({ StopId:val.stopId,StopName: val.stopName, ScheduledKM: this.addRoute.value?.scheduelKm})))
  }, 100);
  console.log("check selectedRouteData", this.selectedRouteData, this.stopDeatils.length);
    
  }

  cancel() {
    this.addRoute.reset();
    this.addRoute.controls['direction'].patchValue('BOTH')
    this.clearMap();
    if (this.polyline) {
      this.polyline.setMap(null);
    }
    this.selectedRouteData = [];
    this.multiselected = []
    // this.mapMarkers.setMap(null);
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.button = "Add Record";
  }

  changeSelection() {
    if (this.routeId && this.routeValue) {
      this.stopDeatils?.forEach((val: any) => {        
        if (val.stopId == this.routeId)
          this.selectedRouteData.push(val);
      })
    } else if (this.routeId && !this.routeValue) {
      let index = this.selectedRouteData?.findIndex((x: any) => x.stopId == this.routeId)
      this.selectedRouteData.splice(index, 1)
    }
    setTimeout(() => {
      this.selectedStop = this.selectedRouteData.map((val => ({ StopId:val.stopId,StopName: val.stopName, ScheduledKM: this.addRoute.value?.scheduelKm})))
      this.cdr.detectChanges();
    }, 100);
  }
  centerLatitude = LAT;
  centerLongitude = LNG;
  markerLatitude: number;
  markerLongitude: number;
  infoWindowContent: string;

  onMapClick(event: any): void {
    console.log(event);
    this.markerOptions = {
      draggable: true,
      animation: google.maps.Animation.DROP,
    };
    const location = {
      lat: event.coords.lat,
      lng: event.coords.lng
    };
    // Using Observable
    this.geocodingService.getLocation(`${location.lat},${location.lng}`).subscribe(response => {
      this.handleGeocodingResponse(response);
    }, error => {
      console.error('Geocoding error using Observable:', error);
    });
    // Reverse geocoding
    this.geocodingService.reverseGeocode(location.lat, location.lng).subscribe(reverseGeocodeResponse => {
      console.log('Reverse Geocoding response:', reverseGeocodeResponse);
      // Extract and use the relevant information from the response
    }, error => {
      console.error('Reverse Geocoding error:', error);
    });
    // Update marker position
    this.markerLatitude = location.lat;
    this.markerLongitude = location.lng;
    this.infoWindowContent = null;
    this.isMarkerDraggable = this.shouldMarkerBeDraggable(location);
    console.log('isMarkerDraggable:', this.isMarkerDraggable);
  }

  private shouldMarkerBeDraggable(location: { lat: number, lng: number }): boolean {
    // Your condition to determine whether the marker should be draggable
    // For example, you might check if the latitude is above a certain threshold
    return location.lat > 20.0;
  }
  onMarkerDragEnd(event: any): void {
    this.markerLatitude = event.coords.lat;
    this.markerLongitude = event.coords.lng;
    console.log('Marker Drag End. New position:', this.markerLatitude, this.markerLongitude);
    // You can perform any additional actions here, such as reverse geocoding
    this.geocodingService.reverseGeocode(this.markerLatitude, this.markerLongitude).subscribe(reverseGeocodeResponse => {
      console.log('Reverse Geocoding response after marker drag:', reverseGeocodeResponse);
      // Extract and use the relevant information from the response
    }, error => {
      console.error('Reverse Geocoding error after marker drag:', error);
    });
  }
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4,
  };

  private handleGeocodingResponse(response: GeocoderResponse): void {
    if (response.status === 'OK') {
      console.log('Geocoding results:', response.results);
      // Extract information for the info window
      const formattedAddress = response.results[0].formatted_address;
      this.infoWindowContent = `<strong>Address:</strong> ${formattedAddress}`;
    } else {
      console.error('Geocoding failed. Status:', response.status, 'Error Message:', response.error_message);
      // Handle the error as needed
    }
  }

findeAddressValue() {
    this.geocodingService.getLocation(this.searchAddress).subscribe((res: any) => {
      console.log("check res", res);
      const formattedAddress = res.results[0].formatted_address;
      this.infoWindowContent = `<strong>Address:</strong> ${formattedAddress}`;
    })
  }
  sortOrderr: any = 'asc'; // Default sorting order
  sortByy: any = 'index'; // Default property to sort by
  options: SortablejsModule = {
    group: 'test'
  };

  onDrop(event: any) {
    setTimeout(() => {
      this.selectedStop = this.selectedRouteData.map((val => ({ StopId:val.stopId,StopName: val.stopName, ScheduledKM: this.addRoute.value?.scheduelKm})))
      this.cdr.detectChanges();
    }, 100);
  }
  polylinePath: any;

  showStopOnmap() {
    this.selectedRouteName = '';
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.mockDirections();    
    this.polylinePath = this.selectedRouteData?.map((route: any) => ({ lat: route.lat, lng: route.lon }));
    console.log(this.polylinePath, this.selectedRouteData);
    this.cdr.detectChanges();
  }

  toggleShowMoreLess() {
    this.showMore = !this.showMore;
    this.showCount = this.showMore ? this.selectedRouteData.length : 30;
  }

  onAddNewStop() {
    const initialState: ModalOptions = {
      initialState: {
      },
    };
    this.bsModalRef = this.modalService.show(
      AddNewStopComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  getRouteOnMap(routeid: any, routeName: any, type: any) {
    this.selectedRouteName = routeName;
    let payload = {
      route_id: routeid,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
      ReqFor: 1
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      this.listVehicleStopDetailsformap = res?.body?.data;
      let newData = {
        value: "",
        text: ""
      }
      if (type == 'Edit') {
        this.plotStopsOnGoogleMap();
        this.selectedRouteData = this.listVehicleStopDetailsformap;
        this.multiselected = this.selectedRouteData.map((val: any) => {
          return newData = {
            value: val?.stopId,
            text: val?.stopName
          }
        })
        this.button = "Update Record"
      } else {
        this.showallTrack()
      }
    })
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  plotStopsOnGoogleMap() {
    this.viewportScroller.scrollToPosition([0, 0]);
    let currentInfoWindow: google.maps.InfoWindow;
    const pathCoordinates = [];
    const map = this.map;
    // Clear existing polyline if it exists
    this.clearMap()
    if (this.polyline) {
      this.polyline.setMap(null);
    }
    // Clear existing markers if they exist
    if (this.markers) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];
    }
    this.listVehicleStopDetailsformap?.forEach((stop: any) => {
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
      pathCoordinates?.push({ lat: stop.lat, lng: stop.lon }); // Add coordinates to the path
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
      marker?.addListener('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      });
      // Store the markers in an array
      this.markers?.push(marker);
    });
    // Create a new polyline and set its path
    this.polyline = new google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#0B32CCD4',
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

  showallTrack() {
    const initialState: ModalOptions = {
      initialState: {
        data: this.listVehicleStopDetailsformap,
        routeName: this.selectedRouteName
      },
    };
    this.bsModalRef = this.modalService.show(
      RoutePlotPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  submit(formvalue: any) {
    // return
    let payload = {
      "DeptId": parseInt(formvalue.company || ''),
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "RouteNo": formvalue.route_no,
      "RouteName": formvalue.route_name,
      "ScheduledKM": formvalue.scheduelKm,
      "NoOfStops": this.selectedStop ? this.selectedStop?.length : 0,
      "Direction": formvalue.direction,
      "listRoutesStops": this.selectedStop
    }
    let service: any;
    if (this.button === 'Update Record') {
      payload['RouteId'] = this.selectedRouteId;
      service = this.registrationService.updateRouteDetails(payload);
    } else {
      service = this.registrationService.addNewRoute(payload);
    } 
    service.subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getRouteListData();
        this.button = "Add Record";
        this.selectedRouteData = [];
        this.multiselected = [];
        this.clearMap();
        if (this.polyline) {
          this.polyline.setMap(null);
        }
        this.addRoute.reset();
        this.addRoute.controls['direction'].patchValue('BOTH')
        this.selectedValue = {
          value: '',
          text: ''
        }
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  onEditRoute(route: any) {
    this.selectedRouteId = route?.routE_ID
    let newData = {
      value: "",
      text: ""
    }
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id')),
      "RouteId": route?.routE_ID
    }
    this.trackingService.routeDetailsForEdit(payload).subscribe((res: any) => {
      let editData = res?.body?.data
      this.addRoute.controls['company'].setValue(editData?.deptId)
      this.addRoute.controls['route_no'].setValue(editData?.routeNo);
      this.addRoute.controls['route_name'].setValue(editData?.routeName)
      this.addRoute.controls['scheduelKm'].setValue(editData?.scheduledKM)
      this.addRoute.controls['direction'].setValue(editData?.direction)
      this.selectedRouteData = editData?.listRoutesStops;
      this.listVehicleStopDetailsformap = editData?.listRoutesStops;
      let newVehicleValue = this.department?.filter((ele: any) => ele?.value == editData?.deptId);
      newVehicleValue.forEach((data: any) => {
        this.selectedValue = data
      });
      this.multiselected = this.selectedRouteData.map((val: any) => {
        return newData = {
          value: val?.stopId,
          text: val?.stopName
        }
      })
      this.button = "Update Record";
      this.plotStopsOnGoogleMap();
    })
  }



}
