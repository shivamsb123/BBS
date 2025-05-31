import { formatDate, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../registration/services/registration.service';
import { SharedService } from '../../http-services/shared.service';
import { TrackingService } from '../tracking.service';
import * as L from 'leaflet';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-history',
  templateUrl: './new-history.component.html',
  styleUrls: ['./new-history.component.scss']
})
export class NewHistoryComponent {
  historyVehicleForm!: FormGroup;
  bsValue = new Date();
  routeList: any;
  vehicleData: any;
  routeID: any;
  selectedVehicle: any;
  selectedValue: any;
  isloading: boolean = false;
  speedGraph: any[];
  historylist: any;
  historyData: any;
  graphType: any;
  pathCoordinates: any = [];
  higestSpeedValue: number;
  selectedRoute: any = 0;
  selectedType: string;
  map: L.Map | any;
  polyline: L.Polyline | null = null;
  stoppolyline: L.Polyline | null = null;
  animatedMarker: L.Marker | any = null;
  markers: L.Marker | any = [];
  timeoutId: any = null;
  isPlaying: boolean = false;
  routeCoordinates: any[] = [];
  speed = [
    { id: 1, value: '1x' },
    { id: 2, value: '2x' },
    { id: 4, value: '3x' },
    { id: 16, value: '4x' },
    { id: 32, value: '5x' }
  ]
  selectedSpeed: number = 1;
  listVehicleStopDetails: any;
  
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


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private shardService: SharedService,
    private trackingService: TrackingService,
    private dashboardService: DashboardService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
    this.setInitialValue();
    this.getVehicleZoneData();
    this.getRouteList();

    this.routeID = this.activeRoute.snapshot.paramMap.get("id");
    if (this.routeID) {
      this.selectedVehicle = this.routeID;
      this.submit(this.historyVehicleForm.value)
    }
  }

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
      position: 'topleft'
    }).addTo(this.map);
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

  confirm(event: any) {
    if (event.selectType == "Vehicle") {
      this.selectedVehicle = null;
      this.clearMap()
      this.selectedVehicle = event.id;
    } else if (event.selectType == "route") {
      this.clearMap();
      this.selectedVehicle = null;
      this.vehicleData = [];
      this.listVehicleStopDetails = [];
      this.selectedRoute = event.id
      this.selectedType = 'route';
      this.getRouteWiseVehicle();
      this.getRouteOnMap();
      if (!event.id) {
        console.log("Reloading AGM map...");
        setTimeout(() => {
          this.getVehicleZoneData();
        }, 100);
      }
    }
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
    });
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
      this.plotStopsOnLeafletMap();
    })
  }


  submit(formValue: any) {
    this.clearMap();
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
      this.updatePolyline()

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
    });

  }
  startMarker: L.Marker | null = null;
  endMarker: L.Marker | null = null;

  updatePolyline() {
    const path = this.historylist?.map((bus: any) => [bus.lat, bus.lon]);
    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }
    if (this.startMarker) {
      this.map.removeLayer(this.startMarker);
    }
    if (this.endMarker) {
      this.map.removeLayer(this.endMarker);
    }

    this.polyline = L.polyline(path, {
      color: 'blue',
      weight: 2,
      opacity: 2.0,
    }).addTo(this.map);

    const firstLocation = path[0];
    if (firstLocation) {
      this.startMarker = L.marker(firstLocation).addTo(this.map);
    }

    const lastLocation = path[path.length - 1];
    if (lastLocation) {
      const flagIcon = L.divIcon({
        className: 'flag-icon',
        html: '<div style="font-size: 24px;"><i class="fa fa-flag-o"></i></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      this.endMarker = L.marker(lastLocation, { icon: flagIcon }).addTo(this.map);
    }

    this.map.setView(firstLocation, 15);
  }

  togglePlayPause(event: any): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      if (this.currentIndex >= this.historylist.length - 1) {
        this.currentIndex = 0; 
      }
      this.play();
    } else {
      this.pause();
    }
  }
  currentIndex: number = 0;

  play() {
    this.animateMarker(this.currentIndex);
  }

  pause() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  sliderValue: number = 0;
  maxValue: number = 100;

  private moveInterval = 1000;
  private stepsInSegment = 50;

  // animateMarker(startIndex: number) {
  //   const path = this.historylist?.map((bus: any) => [bus.lat, bus.lon]);
  //   this.routeCoordinates = path;

  //   if (path.length === 0) return;

  //   if (!this.animatedMarker) {
  //     this.animatedMarker = L.marker(path[startIndex]).addTo(this.map);
  //   }

  //   // Flag to track the state of the popup
  //   let popupOpened = true;

  //   const canvas = document.createElement('canvas');
  //   const context: any = canvas.getContext('2d');
  //   const img = new Image();

  //   let currentIndex = startIndex;
  //   const steps = path.length - 1;

  //   const animateStep = () => {
  //     if (currentIndex < path.length - 1) {
  //       const start = path[currentIndex];
  //       const end = path[currentIndex + 1];

  //       const previousLat = start[0];
  //       const previousLng = start[1];
  //       const currentLat = end[0];
  //       const currentLng = end[1];

  //       const deltaLat = currentLat - previousLat;
  //       const deltaLng = currentLng - previousLng;

  //       const heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);

  //       img.src = this.onCheckVehicleDevice();
  //       img.onload = () => {
  //         const canvasWidth = Math.max(img.width, img.height);
  //         const canvasHeight = canvasWidth;

  //         canvas.width = canvasWidth;
  //         canvas.height = canvasHeight;

  //         context.clearRect(0, 0, canvasWidth, canvasHeight);
  //         context.translate(canvasWidth / 2, canvasHeight / 2);
  //         context.rotate((heading * Math.PI) / 180);
  //         context.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
  //         context.rotate(-(heading * Math.PI) / 180);
  //         context.translate(-canvasWidth / 2, -canvasHeight / 2);

  //         const iconDataUrl = canvas.toDataURL();
  //         const icon = L.icon({
  //           iconUrl: iconDataUrl,
  //           iconSize: [30, 30],
  //           // iconAnchor: [20, 20],
  //         });

  //         let stepIndex = 0;

  //         const moveMarker = () => {
  //           if (stepIndex <= this.stepsInSegment) {
  //             const lat = start[0] + (end[0] - start[0]) * (stepIndex / this.stepsInSegment);
  //             const lng = start[1] + (end[1] - start[1]) * (stepIndex / this.stepsInSegment);
  //             this.animatedMarker.setLatLng([lat, lng]);
  //             this.animatedMarker.setIcon(icon);
  //             const popupContent = `
  //                   <div class="">
  //                     <div class="live-data pl-2 mt-1">
  //                       <div class="row mb-2">
  //                         <div class="col-md-6">
  //                           <span style="font-size:16px"><strong>${this.historylist[currentIndex].vehicleNo ?? 'NA'
  //               }</strong></span>
  //                         </div>
  //                       </div>
  //                     <div class="row mb-2">
  //                       <div class="col-md-6">
  //                       <span> <strong>Date:</strong> ${this.historylist[currentIndex].timE_RECORDED}
  //                       </div>
  //                       <div class="col-md-6">
  //                       <span><strong>speed:</strong> ${this.historylist[currentIndex].speed} Km/h</span>          
  //                       </div>
  //                     </div>
  //                     <div class="row mb-2">
  //                       <div class="col-md-12 location-part">
  //                         <span style="color: black" class="address"><strong>Place:</strong> ${this.historylist[currentIndex]?.place
  //               }</span>
  //                     </div>
  //                   </div>`;

  //             if (popupOpened) {
  //               this.animatedMarker.bindPopup(popupContent).openPopup();
  //               popupOpened = true;
  //             }

  //             this.map.setView([lat, lng], this.map.getZoom(), { animate: true });

  //             this.sliderValue = Math.round((currentIndex / steps) * this.maxValue);

  //             stepIndex++;
  //             this.timeoutId = setTimeout(moveMarker, this.moveInterval / this.stepsInSegment);
  //           } else {
  //             currentIndex++;
  //             this.currentIndex = currentIndex;
  
  //             if (currentIndex === steps) {
  //               this.sliderValue = currentIndex;
  //               this.isPlaying = false;
  //             }
  //             animateStep();
  //           }
  //         }

  //         moveMarker();
  //       };

  //       img.onerror = () => {
  //         console.error('Error loading image for animated marker icon.');
  //       };

  //       this.animatedMarker.on('popupclose', () => {
  //         popupOpened = false; // Reset the flag when the popup is closed
  //       });

  //       this.animatedMarker.on('click', () => {
  //         if (!popupOpened) {
  //           this.animatedMarker.openPopup();
  //           popupOpened = true;
  //         } else {
  //           const updatedContent = `
  //               <div class="">
  //                     <div class="live-data pl-2 mt-1">
  //                       <div class="row mb-2">
  //                         <div class="col-md-6">
  //                           <span style="font-size:16px"><strong> ${this.historylist[currentIndex]?.vehicleNo}</strong></span>
  //                         </div>
  //                       </div>
  //                     <div class="row mb-2">
  //                       <div class="col-md-6">
  //                       <span> <strong>Date:</strong> ${this.historylist[currentIndex].timE_RECORDED}
  //                       </div>
  //                       <div class="col-md-6">
  //                       <span><strong>speed:</strong> ${this.historylist[currentIndex].speed} Km/h</span>          
  //                       </div>
  //                     </div>
  //                     <div class="row mb-2">
  //                       <div class="col-md-12 location-part">
  //                         <span style="color: black" class="address"><strong>Place:</strong> ${this.historylist[currentIndex]?.place
  //             }</span>
  //                     </div>
  //                   </div>`;
  //           this.animatedMarker.getPopup().setContent(updatedContent);
  //         }
  //       });
  //     } else {
  //       this.timeoutId = null;
  //     }
  //   };

  //   animateStep();
  // }

  animateMarker(startIndex: number) {
    const path = this.historylist.map((bus: any) => [bus.lat, bus.lon]);
    this.routeCoordinates = path;
  
    if (path.length === 0) return;
  
    if (!this.animatedMarker) {
      this.animatedMarker = L.marker(path[startIndex]).addTo(this.map);
    }
  
    let popupOpened = true;
    const canvas = document.createElement('canvas');
    const context: any = canvas.getContext('2d');
    const img = new Image();
  
    let currentIndex = startIndex;
    const steps = path.length - 1;
  
    const animateStep = () => {
      if (currentIndex < path.length - 1) {
        const start = path[currentIndex];
        const end = path[currentIndex + 1];
  
        const deltaLat = end[0] - start[0];
        const deltaLng = end[1] - start[1];
        const heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
  
        img.src = this.onCheckVehicleDevice();
        img.onload = () => {
          const canvasWidth = Math.max(img.width, img.height);
          const canvasHeight = canvasWidth;
  
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
  
          context.clearRect(0, 0, canvasWidth, canvasHeight);
          context.translate(canvasWidth / 2, canvasHeight / 2);
          context.rotate((heading * Math.PI) / 180);
          context.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
          context.rotate(-(heading * Math.PI) / 180);
          context.translate(-canvasWidth / 2, -canvasHeight / 2);
  
          const iconDataUrl = canvas.toDataURL();
          const icon = L.icon({
            iconUrl: iconDataUrl,
            iconSize: [30, 30],
          });
  
          let stepIndex = 0;
          const moveMarker = () => {
            if (stepIndex <= this.stepsInSegment) {
              const lat = start[0] + (end[0] - start[0]) * (stepIndex / this.stepsInSegment);
              const lng = start[1] + (end[1] - start[1]) * (stepIndex / this.stepsInSegment);
              this.animatedMarker.setLatLng([lat, lng]);
              this.animatedMarker.setIcon(icon);

              const popupContent = `
                                <div class="">
                                  <div class="live-data pl-2 mt-1">
                                    <div class="row mb-2">
                                      <div class="col-md-6">
                                        <span style="font-size:16px"><strong>${this.historylist[currentIndex].vehicleNo ?? 'NA'
                            }</strong></span>
                                      </div>
                                    </div>
                                  <div class="row mb-2">
                                    <div class="col-md-6">
                                    <span> <strong>Date:</strong> ${this.historylist[currentIndex].timE_RECORDED}
                                    </div>
                                    <div class="col-md-6">
                                    <span><strong>speed:</strong> ${this.historylist[currentIndex].speed} Km/h</span>          
                                    </div>
                                  </div>
                                  <div class="row mb-2">
                                    <div class="col-md-12 location-part">
                                      <span style="color: black" class="address"><strong>Place:</strong> ${this.historylist[currentIndex]?.place
                            }</span>
                                  </div>
                                </div>`;
            
                          if (stepIndex === 0 && popupOpened) {
                            this.animatedMarker.bindPopup(popupContent).openPopup();
                            popupOpened = true;
                          }
  
              this.map.setView([lat, lng], this.map.getZoom(), { animate: true });
              this.sliderValue = currentIndex;              
              stepIndex++;
              this.timeoutId = setTimeout(moveMarker, this.moveInterval / this.stepsInSegment);
            } else {
              currentIndex++;
              this.currentIndex = currentIndex;
  
              if (currentIndex === steps) {
                this.sliderValue = currentIndex;
                this.isPlaying = false;
              }
              animateStep();
            }
          };
  
          moveMarker();
        };
  
        img.onerror = () => {
          console.error('Error loading image for animated marker icon.');
        };
  
        this.animatedMarker.on('popupclose', () => {
          popupOpened = false;
        });
  
        this.animatedMarker.on('click', () => {
          if (!popupOpened) {
            this.animatedMarker.openPopup();
            popupOpened = true;
          } else {
            const updatedContent = `
                <div class="">
                      <div class="live-data pl-2 mt-1">
                        <div class="row mb-2">
                          <div class="col-md-6">
                            <span style="font-size:16px"><strong> ${this.historylist[currentIndex]?.vehicleNo}</strong></span>
                          </div>
                        </div>
                      <div class="row mb-2">
                        <div class="col-md-6">
                        <span> <strong>Date:</strong> ${this.historylist[currentIndex].timE_RECORDED}
                        </div>
                        <div class="col-md-6">
                        <span><strong>speed:</strong> ${this.historylist[currentIndex].speed} Km/h</span>          
                        </div>
                      </div>
                      <div class="row mb-2">
                        <div class="col-md-12 location-part">
                          <span style="color: black" class="address"><strong>Place:</strong> ${this.historylist[currentIndex]?.place
              }</span>
                      </div>
                    </div>`;
            this.animatedMarker.getPopup().setContent(updatedContent);
          }
        });
      } else {
        this.timeoutId = null;
      }
    };
  
    animateStep();
  }



  changeSpeed(event: any) {
    const speedValue = Number(event.target.value);
    this.selectedSpeed = 1 * speedValue;
    this.moveInterval = 1000 / this.selectedSpeed;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.animateMarker(this.currentIndex);
    }
  }


  clearMap() {
    this.historylist = [];
    this.currentIndex = 0;
    this.sliderValue = 0;
    this.isPlaying = false;
    this.selectedSpeed = 1;
    this.moveInterval = 1000;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    if (this.polyline) {
      this.map.removeLayer(this.polyline);
    }
    if (this.startMarker) {
      this.map.removeLayer(this.startMarker);
    }
    if (this.endMarker) {
      this.map.removeLayer(this.endMarker);
    }
    if (this.animatedMarker) {
      this.map.removeLayer(this.animatedMarker);
      this.animatedMarker = null;
    }

    // if (this.map) {
    //   this.map.off();
    //   this.map.remove();
    //   this.map = null;
    // }

    // this.initializeMap().then(() => {
    //   console.log('Map has been reset and reinitialized.');
    // });
  }


  onCheckVehicleDevice() {
    return 'assets/arrow.png';
  }

  updateMarkerPosition(index: number) {
    this.sliderValue = index;
    if (this.routeCoordinates[index]) {
      // const position = this.routeCoordinates[index];
      // this.animatedMarker.setLatLng([position.lat, position.lng]);
      // this.map.setView([position.lat, position.lng], this.map.getZoom(), { animate: true });
      this.animateMarker(this.routeCoordinates[index])
    }
  }

  sliderChange(event: any) {
    this.sliderValue = 0
    this.sliderValue = Number(event.target.value);
    this.getslidervalue(this.sliderValue)
  }

  getslidervalue(event: any) {
    this.currentIndex = event;
    this.sliderValue = event;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      if (this.currentIndex >= this.historylist.length - 1) {
        this.currentIndex = 0; 
      }
      this.animateMarker(this.currentIndex);
    }
  }


  plotStopsOnLeafletMap() {
    // Clear existing polyline
    if (this.stoppolyline) {
      this.map.removeLayer(this.stoppolyline);
    }

    if (this.markers) {
      this.markers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
    }

    const pathCoordinates: [number, number][] = [];
    const bounds = L.latLngBounds(this.markers.map((m) => m.getLatLng()));

    this.listVehicleStopDetails?.forEach((stop: any) => {
      const marker: any = L.marker([stop.lat, stop.lon], {
        icon: L.icon({
          iconUrl: 'assets/images/stop-icon.png',
          iconSize: [20, 20] 
        })
      }).addTo(this.map);

      pathCoordinates.push([stop.lat, stop.lon]);

      bounds?.extend([stop.lat, stop.lon]);

      const popupContent = `
          <div>
              <h3>${stop.stopName}</h3>
              <p>Stop ID: ${stop.stopId}</p>
              <!-- Add more details as needed -->
          </div>
      `;
      marker.bindPopup(popupContent);

      this.markers.push(marker);
    });

    this.stoppolyline = L.polyline(pathCoordinates, {
      color: 'red', 
      weight: 4,
      opacity: 1.0
    }).addTo(this.map);

    this.map.setView(pathCoordinates[0], 12);
   

  }



}
