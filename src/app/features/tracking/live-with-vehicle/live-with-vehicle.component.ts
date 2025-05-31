import { isPlatformBrowser, Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import * as L from 'leaflet';
import {
  catchError,
  EMPTY,
  from,
  interval,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { SharedService } from '../../http-services/shared.service';
import 'leaflet-routing-machine';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-live-with-vehicle',
  templateUrl: './live-with-vehicle.component.html',
  styleUrls: ['./live-with-vehicle.component.scss'],
})
export class LiveWithVehicleComponent {
  map: L.Map | any;
  spinnerLoading: boolean = false;
  subscription: Subscription | any;
  countdown: number | undefined;
  counter: number = 10;
  counterInterval: any = null;
  liveDeviceData: any;
  private markers: L.Marker[] = [];
  private infoVehicleWindows: L.Popup[] = [];
  private clickedMarker: L.Marker | any = null;
  dynamicFsvalue: any = 0;
  id: any;
  fsValueData = -1;
  trackListData: any;
  routelist: any;
  mapList: any;
  vehicleData: any;
  trackList: any;
  liveData: any;
  livemap: any;
  confirmedVehicleId: string | null = null;
  polyline: L.Polyline | null = null;
  routeControl: L.Routing.Control | null = null;
  selectedVehicleValue: any;
  vehicleListshow: boolean = true;
  liveTime: boolean = false;
  animationRequest: any;
  allVehicle: any;
  selectedStaus: any = -1;
  routeID: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private router : Router,
    private activeRoute : ActivatedRoute,
    private location : Location
    
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
    this.getVehicledata();
    this.routeID = this.activeRoute.snapshot.paramMap.get("id");
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
    const  osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});;

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
}


  /**
   * vehicle list in dropdown
   */
  getVehicledata() {
    let newData = {
      value: '',
      text: '',
    };
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

    this.spinnerLoading = true;
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = timer(0, 10000)
      .pipe(
        tap((value) => {
          this.countdown = value % 10 === 0 ? 0 : 10 - (value % 10);
          this.counter = 10;
          clearInterval(this.counterInterval);
          this.counterInterval = setInterval(() => {
            this.counter--;
          }, 1000);
        }),
        switchMap(() => this.dashboardService.mapview2(payload)),
        tap((res: any) => {
          this.spinnerLoading = false;
          let data = res?.body?.data?.list_map_view;
          this.allVehicle = data?.sort((a: any, b: any) => {
            return b.asseT_NO.localeCompare(a.asseT_NO);
          });
          this.mapList = this.allVehicle;
          this.trackList = res?.body?.data?.list_track_sta;
          // this.vehicleData = data;
          this.sendFilteredData();
        }),
        // switchMap(() => this.storageService.getItem('status')),
        tap((status: any) => {
          // this.selectedStatus = status;
          this.filterout(this.allVehicle);
          // this.onConfirm.emit(true);
          this.plotVehicleonMap();
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error('Error fetching vehicle data:', error);
          this.spinnerLoading = false;
        }
      );
  }

  private destroy$ = new Subject<void>();

  plotVehicleonMap() {
    if (this.liveData) {
      return;
    }
    const vehicleObs$ = from(this.vehicleData);

    vehicleObs$
      .pipe(
        switchMap((vehicle: any, index: number) => {
          if (!vehicle || (!vehicle?.lat && !vehicle?.lon)) {
            return EMPTY;
          }

          const existingMarkerIndex = this.findExistingMarkerIndex(vehicle.asseT_NO);

          let previousLat, previousLon;
          if (existingMarkerIndex !== -1) {
            previousLat = this.markers[existingMarkerIndex].getLatLng().lat;
            previousLon = this.markers[existingMarkerIndex].getLatLng().lng;
          }

          const currentLat = vehicle?.lat;
          const currentLon = vehicle?.lon;

          let heading = 0;
          if (previousLat && previousLon) {
            heading = this.calculateHeading(previousLat, previousLon, currentLat, currentLon);
          }

          const canvas = document.createElement('canvas');
          const context: any = canvas.getContext('2d');
          const img = new Image();
          img.src = this.onCheckVehicleDevice(vehicle);

          return new Promise((resolve) => {
            img.onload = () => {
              const canvasWidth = Math.max(img.width, img.height);
              const canvasHeight = canvasWidth;

              canvas.width = canvasWidth;
              canvas.height = canvasHeight;

              context.clearRect(0, 0, canvasWidth, canvasHeight);
              context.translate(canvasWidth / 2, canvasHeight / 2);
              context.rotate((heading * Math.PI) / 180);
              context.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);
              context.rotate((-heading * Math.PI) / 180);
              context.translate(-canvasWidth / 2, -canvasHeight / 2);

              const icon = L.icon({
                iconUrl: canvas.toDataURL(),
                iconSize: [40, 40],
                iconAnchor: [20, 20],
              });

              const newPosition = L.latLng(vehicle?.lat, vehicle?.lon);
              resolve({ vehicle, icon, newPosition, existingMarkerIndex });
            };
          }).then((data: any) => {
            const { vehicle, icon, newPosition, existingMarkerIndex } = data;

            if (existingMarkerIndex !== -1) {
              // Update marker if it already exists
              this.markers[existingMarkerIndex].setIcon(icon);
              this.markers[existingMarkerIndex].setLatLng(newPosition);
              const popup = this.infoVehicleWindows[existingMarkerIndex];

              if (popup && this.clickedMarker === this.markers[existingMarkerIndex]) {
                const clickedMarkerTooltip = this.clickedMarker.getTooltip();
                const clickedMarkerText = clickedMarkerTooltip.getContent();
                const vehicleInfo = this.vehicleData.find((vehicle: any) => vehicle.asseT_NO === clickedMarkerText);

                if (vehicleInfo) {

                  const initialContent = this.generateInfoWindowContent(vehicle);

                  popup.setContent(initialContent).setLatLng(newPosition);

                  
                  if (this.clickedMarker === this.markers[existingMarkerIndex] && !this.clickedMarker.popupManuallyClosed) {
                    popup.openOn(this.map);
                  }
                }
              }
            } else {
              const popup = L.popup();
              this.createMarker(vehicle, index, icon, popup);
              this.infoVehicleWindows.push(popup);
            }
            return Promise.resolve();
          });
        }),
        switchMap(() => interval(10000).pipe(takeUntil(this.destroy$))),
        take(1)
      )
      .subscribe(() => {
        this.cdr.detectChanges();
      });
  }

  calculateHeading(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const toDegrees = (radian: number) => radian * (180 / Math.PI);

    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

    let heading = toDegrees(Math.atan2(y, x));

    heading = (heading + 360) % 360;

    return heading;
  }

  findExistingMarkerIndex(vehicleNo: string): any {
    return this.markers.findIndex(
      (marker: any) => marker.getTooltip()?.getContent() === vehicleNo
    );
  }

  createMarker(vehicle: any, index: number, icon: any, popup: L.Popup) {
    const newPosition = L.latLng(vehicle?.lat, vehicle?.lon);

    const marker:any = L.marker(newPosition, {
      icon: icon,
    }).addTo(this.map);

    marker.bindTooltip(`${vehicle.asseT_NO}`, {
      direction: 'bottom',
      className: 'map-label',
      permanent: true,
    });

    marker.popupManuallyClosed = false;

    popup.on('close', () => {
      marker.popupManuallyClosed = true;
    });

    marker.on('click', () => {
      if (marker.popupManuallyClosed) {
        marker.openPopup();
        marker.popupManuallyClosed = false;
      }
      this.clickedMarker = marker;

      const initialContent = this.generateInfoWindowContent(vehicle);

      popup.setContent(initialContent).setLatLng(newPosition).openOn(this.map);
    });
    this.addPopupListeners(popup, vehicle);

    this.markers.push(marker);

    const bounds = L.latLngBounds(this.markers.map((m) => m.getLatLng()));
    this.map.fitBounds(bounds);
  }

  onCheckVehicleDevice(vehicle: any) {
    if (vehicle?.fS_VALUE == 1) {
      return 'assets/rp_marker_bus_green.png';
    } else if (vehicle?.fS_VALUE == 2) {
      return 'assets/rp_marker_bus_blue.png';
    } else if (vehicle?.fS_VALUE == 3) {
      return 'assets/rp_marker_bus_gray.png';
    } else if (vehicle?.fS_VALUE == 4) {
      return 'assets/rp_marker_bus_yellow.png';
    }

    return 'NA';
  }

  generateInfoWindowContent(vehicle: any) {
    const generateIcon = (
      icon: string,
      label: string,
      status: any,
      noData = ''
    ) => {
      if (icon === 'fa-key') {
        if (status === null || status === '0') {
          return `<li><a><i class="fa ${icon}" style="color:red !important"></i><br/><span class="live-value" style="color:black !important">${label}</span></a></li>`;
        }
        if (status === '1') {
          return `<li><a><i class="fa ${icon}" style="color:green !important"></i><br/><span class="live-value" style="color:black !important">${label}</span></a></li>`;
        }
      }
      if (status === '') {
        return `<li><a><i class="fa ${icon}" style="color:red !important"></i><br/><span class="live-value" style="color:black !important">${label}</span></a></li>`;
      }
      if (status === '0') {
        return `<li><a><i class="fa ${icon}" style="color:red !important"></i><br/><span class="live-value" style="color:black !important">${label}</span></a></li>`;
      }
      if (status === '1') {
        return `<li><a><i class="fa ${icon}" style="color:green !important"></i><br/><span class="live-value" style="color:black !important">${label}</span></a></li>`;
      }
      return '';
    };

    return `
      <div class="">
        <div class="live-data pl-2 mt-1">
          <div class="row mb-2">
        <div class="col-md-6">
          <span style="font-size:16px"><strong>${
            vehicle.asseT_NO ?? 'NA'
          }</strong></span>
        </div>
        <div class="col-md-6">
          <span> <strong>Driver:</strong> ${vehicle.driver}
      </span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
        <span> <strong>Date:</strong> ${vehicle.timeg}
        </div>
        <div class="col-md-6">
        <span><strong>Status:</strong> ${this.formatVehicleStatusDuration(
          vehicle
        )}</span>          
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <span><strong>Speed:</strong> ${vehicle?.speed}</span>
        </div>
        <div class="col-md-6">
          <span> <strong>Mileage:</strong>  ${vehicle?.milage}</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <span>  <strong>IMEI:</strong> ${vehicle?.device}</span>
        </div>
        <div class="col-md-6">
          <span> <strong>Route:</strong> ${vehicle?.route}</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-12 location-part">
          <span style="color: black" class="address"><strong>Stop:</strong> ${
            vehicle?.place
          }</span>
        </div>
      </div>
      <hr />          
        <div class="icon-part">
            <ul class="icon">
              ${generateIcon('fa-key', 'Ignition', vehicle?.ign)}
              ${generateIcon('fa fa-map-marker', 'GPS', vehicle?.gps)}
              ${generateIcon('fa-plug', 'Power', vehicle?.pwr)}
               ${
                 vehicle?.voltage
                   ? `<li><a title="Voltage"><i class="fa fa-bolt" aria-hidden="true"></i><br/><span class="live-value" style="color:black !important">${vehicle?.voltage}</span></a></li>`
                   : ''
               }              
              <li><a  id="playId" title="Live" style="cursor:pointer"><i class="fa fa-play" ></i><br/><span class="live-value" style="color:black !important">Live</span></a></li>
              <li><a  id="replayId" title="History" style="cursor:pointer"><i class="fa fa-undo" ></i><br/><span class="live-value" style="color:black !important">Replay</span></a></li>
            </ul>
        </div>
      </div>`;
  }

  formatVehicleStatusDuration(vehicle: any) {
    if (vehicle?.fS_VALUE == 1) {
      return `Running ${vehicle?.speed}`;
    } else if (vehicle?.fS_VALUE == 2) {
      return `Stopped `;
    } else if (vehicle?.fS_VALUE == 3) {
      return `Offline `;
    } else if (vehicle?.fS_VALUE == 4) {
      return `Long Stay `;
    }
    return 'Offline';
  }
  
  closeAllInfoWindows() {
    for (const infoWindow of this.infoVehicleWindows) {
      infoWindow.remove();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  confirm(event: any) {
    this.closeAllInfoWindows();
    this.livemap = [];
    if (this.markers && this.markers.length > 0) {
      this.markers.forEach((marker: any) => {
        marker.remove();
      });
      this.markers = [];
    }

    if (this.polyline) {
      this.polyline.remove();
      this.polyline = null;
    }
     // Cancel the ongoing animation if needed
     if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }
    this.liveData = event;
    if (event && event.id) {
      this.confirmedVehicleId = event.id;
      this.sendFilteredData();
    }
  }

  sendFilteredData() {
    if (!this.confirmedVehicleId) return;
    if (this.confirmedVehicleId) {
      this.vehicleData?.forEach((vehicle: any) => {
        if (!vehicle) {
          return;
        }

        if (vehicle?.id == this.confirmedVehicleId) {
          this.selectedVehicleValue = vehicle;

          const latestLatLng = L.latLng(vehicle?.lat, vehicle?.lon);

          this.map.setView(latestLatLng, 17);

          const newLocationComing = {
            lat: vehicle?.lat,
            lon: vehicle?.lon,
          };
          this.livemap.push(newLocationComing);

          this.updateMarker(latestLatLng, vehicle);
        }
      });
    }
  }

  updateMarker(latestLatLng: L.LatLng, data: any, prevLatLng?: L.LatLng) {
    const existingMarkerIndex = this.findExistingMarkerIndex(data.asseT_NO);
  
    let previousLat, previousLon;
    if (existingMarkerIndex !== -1) {
      previousLat = this.markers[existingMarkerIndex].getLatLng().lat;
      previousLon = this.markers[existingMarkerIndex].getLatLng().lng;
    }
  
    const currentLat = data?.lat;
    const currentLon = data?.lon;
  
      const deltaLat = currentLat - previousLat;
      const deltaLng = currentLon - previousLon;

      let heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
  
    const canvas = document.createElement('canvas');
    const context: any = canvas.getContext('2d');
    const img = new Image();
    img.src = this.onCheckVehicleDevice(data);
  
    img.onload = () => {
      const canvasWidth = Math.max(img.width, img.height);
      const canvasHeight = canvasWidth;
  
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.translate(canvasWidth / 2, canvasHeight / 2);
      context.rotate(((heading || 0) * Math.PI) / 180);
      context.drawImage(
        img,
        -img.width / 2,
        -img.height / 2,
        img.width,
        img.height
      );
      context.rotate((-(heading || 0) * Math.PI) / 180);
      context.translate(-canvasWidth / 2, -canvasHeight / 2);
  
      const iconDataUrl = canvas.toDataURL();
      const icon = L.icon({
        iconUrl: iconDataUrl,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      const vehicleLabel = `${data?.asseT_NO}`;
  
      // Ensure polyline is created once
      if (!this.polyline) {
        this.polyline = L.polyline([latestLatLng], {
          color: 'green',
          weight: 3,
          opacity: 2.0,
        }).addTo(this.map);
      }
  
      // Update markers
      if (this.markers && this.markers.length > 0) {
        this.markers.forEach((marker: any) => {
          const startLatLng = marker.getLatLng();
          const animationDuration = 5000;
          const startTime = performance.now();
  
          if (!marker.popupManuallyClosed) {
            let popup = L.popup();
            this.addPopupListener(popup, data);
            popup
              .setContent(this.generateInfoWindowContent(data))
              .setLatLng(startLatLng);
          }
  
          if (marker.getPopup() && marker.getPopup().isOpen()) {
            marker.getPopup().setContent(this.generateInfoWindowContent(data));
          }
  
          // Animation logic
          const animate = (time: number) => {
            const progress = Math.min(
              (time - startTime) / animationDuration,
              1
            );
            const intermediateLat =
              startLatLng.lat + (latestLatLng.lat - startLatLng.lat) * progress;
            const intermediateLng =
              startLatLng.lng + (latestLatLng.lng - startLatLng.lng) * progress;
  
            const intermediateLatLng = L.latLng(intermediateLat, intermediateLng);
            marker.setLatLng(intermediateLatLng);
  
            if (marker.getPopup() && marker.getPopup().isOpen()) {
              marker.getPopup().setLatLng(intermediateLatLng);
            }
            this.polyline?.addLatLng(intermediateLatLng);
  
            if (progress < 1) {
              this.animationRequest = requestAnimationFrame(animate);
            } else {
              marker.setLatLng(latestLatLng);
              if (marker.getPopup() && marker.getPopup().isOpen()) {
                marker.getPopup().setLatLng(latestLatLng);
              }
            }
          };
  
          // Start animation
          this.animationRequest = requestAnimationFrame(animate);
          marker.setIcon(icon);
          marker.bindTooltip(vehicleLabel, {
            permanent: false,
            direction: 'bottom',
            className: 'map-label',
          });
        });
      } else {
        // Add new marker if no markers exist
        const newMarker: any = L.marker(latestLatLng, { icon });
        newMarker.bindTooltip(vehicleLabel, {
          permanent: false,
          direction: 'bottom',
          className: 'map-label',
        });
        newMarker.popupManuallyClosed = false;
  
        newMarker.addTo(this.map);
        this.markers = [newMarker];
        this.polyline?.addLatLng(latestLatLng);
  
        let popup = L.popup()
          .setContent(this.generateInfoWindowContent(data))
          .setLatLng(latestLatLng);
        newMarker.bindPopup(popup).openPopup();
  
        popup.on('close', () => {
          newMarker.popupManuallyClosed = true;
        });
  
        newMarker.on('click', () => {
          if (newMarker.popupManuallyClosed) {
            newMarker.openPopup();
            newMarker.popupManuallyClosed = false;
          }
        });
  
        this.addPopupListener(popup, data);
      }
    };
  
    img.onerror = () => {
      console.error('Error loading image for marker icon.');
    };
  }


  addPopupListener(popup: L.Popup, data: any) {
    setTimeout(() => {
      const playButton = document.getElementById('playId');
      const replyButton = document.getElementById('replayId')
      if (playButton) {
        playButton.addEventListener('click', (event) =>
          this.handlePlayClickData(event, data)
        );
      }
      if (replyButton) {
        replyButton.addEventListener('click', (event) =>
          this.handleRePlayClick(event, data)
        );
      }
    }, 0);
  }

  addPopupListeners(popup: any, vehicle: any) {
    popup.on('contentupdate', () => {
      const playLink = document.getElementById('playId');
      if (playLink) {
        playLink.addEventListener('click', (event) =>
          this.handlePlayClickData(event, vehicle)
        );
      }

      const replayLink = document.getElementById('replayId');
      if (replayLink) {
        replayLink.addEventListener('click', (event) =>
          this.handleRePlayClick(event, vehicle)
        );
      }
    });
  }

  handlePlayClickData(event: MouseEvent, vehicle: any) {
    this.liveData = vehicle;
    this.confirm(this.liveData);
    event.preventDefault();
    this.vehicleListshow = false;
    this.liveTime = true;
  }

  handleRePlayClick(event: MouseEvent, vehilce?: any) {
    this.liveData = vehilce;
    console.log("check live", this.liveData);
    
    let url = `Tracking/Tracking_History/${this.liveData?.id}`;
    this.router.navigateByUrl(url);
  }

  closeTab() {
    this.selectedStaus = -1;
    this.clearMap()
  }

  clearMap() {
    this.confirmedVehicleId = null;
    this.routeID = null;
    this.liveData = null;
    this.vehicleData = [];
    this.infoVehicleWindows = [];
    if (this.markers && this.markers.length > 0) {
      this.markers.forEach((marker: any) => {
        marker.remove();
      });
      this.markers = [];
    }

    if (this.animationRequest) {
      cancelAnimationFrame(this.animationRequest);
    }

    if (this.polyline) {
      this.polyline.remove();
      this.polyline = null;
    }

    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map = null;
    }

    this.initializeMap().then(() => {
      console.log('Map has been reset and reinitialized.');
    });

    this.subscription?.unsubscribe();
    this.vehicleListshow = true;
    this.liveTime = false;
    this.getVehicledata();
  }

  isRouteIDProcessed = false;
  filterout(data: any) {
    if (this.selectedStaus == -1) {
      this.vehicleData = data;
    } else {
      this.vehicleData = data
        .filter((val: any) => val?.fS_VALUE == this.selectedStaus)
        .sort((a: any, b: any) => b.asseT_NO.localeCompare(a.asseT_NO));
    }
  
    if (this.routeID && !this.isRouteIDProcessed) {
      const selectedVehicleValue = this.vehicleData?.find(
        (vehicle: any) => vehicle?.id == this.routeID
      );
      
      if (selectedVehicleValue) {
        this.confirm(selectedVehicleValue);
        this.isRouteIDProcessed = true; 
      }
    }
  }

  getStatus(event:any) {
    this.selectedStaus = event.fS_VALUE;
    this.filterout(this.allVehicle);
     this.clearMap()
  }
}
