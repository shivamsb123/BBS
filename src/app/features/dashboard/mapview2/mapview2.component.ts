
import { SharedService } from '../../http-services/shared.service';
import { SessionService } from '../../http-services/session.service';
import { DashboardService } from '../services/dashboard.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Cluster, Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { BusService } from '../services/bus.service';

import { Icon, Style, Fill, Text, Stroke } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';
import { Overlay } from 'ol';
import { fromEvent } from 'rxjs';
import { boundingExtent } from 'ol/extent';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MapView2PopupComponent } from '../../shared/components/map-view2-popup/map-view2-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MapViewLightboxComponent } from '../../shared/components/map-view-lightbox/map-view-lightbox.component';
import { ViewportScroller } from '@angular/common';
import { RouteWiseMapComponent } from '../../shared/components/route-wise-map/route-wise-map.component';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';


@Component({
  selector: 'app-mapview2',
  templateUrl: './mapview2.component.html',
  styleUrls: ['./mapview2.component.scss']
})
export class Mapview2Component {
  markers: Feature | any;
  bsModalRef?: BsModalRef;
  mapList: any;
  id: number = 0;
  map: Map | any;
  busData: any;
  isOpenlocationData: boolean = false;
  filteredData: any;
    payload = {
    id: this.id,
    user_id: parseInt(localStorage.getItem('user_Id') || ''),
    dept_id: parseInt(localStorage.getItem('dept_id') || ''),
    zone_id: 46,
    vehicle_type: 2,
    vehicle_no: '',
    page_no: 1,
    page_size: 150,
    location: '',
    trip_start_date: '',
    district: '',
    fs_value: 0,
    customer: '',
    depo_name: '',
  };
  isloading: boolean = false;
  lastIndex = 100;
  showTxt = "Show More"

  /**
   * Elements that make up the popup.
   */
  container = document.getElementById('popup') || '';
  closer = document.getElementById('popup-closer');

  /**
   * Create an overlay to anchor the popup to the map.
   */
  overlays: Overlay | null = null; // Update the type declaration
  overlay = new Overlay({

    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  refreshSecond = [
    { id: '1', value: "Refresh In 60 Sec" },
    { id: '2', value: "Refresh In 120 Sec" },
    { id: '3', value: "Refresh In 180 Sec" },
    { id: '4', value: "Do Not Refresh" },
  ];
  refreshValue = "Do Not Refresh";
  currentTimeInterval: any = null;
  tableData: any
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 100,
    tableSizes: [100, 500, 1000],
    location: [
      {
        latitude: 0,
        longitude: 0,
        place: '',
        vehicle: '',
        Time: '',
        last_GPS: '',
        Speed: '',
      }
    ]
  };
  searchKeyword:any;
  counter = 50;
  show = -1


  @ViewChild('mapContainer', { static: true }) mapContainer: ElementRef | any;
  @ViewChild('TABLE') tableList!: ElementRef;

  fsValueData:any = 0;
  readMoreId: any;
  public showFullDescription: { [key: number]: boolean } = {};
  excelData: any;
  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private modalService: BsModalService,
    private activeUrl : ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
    private excelService: ExcelFormatService
  ) { }
  ngOnInit(): void {
    let id = parseInt(this.activeUrl.snapshot.paramMap.get("id"))
    if(id) {
      this.fsValueData = id
    }
    this.initialTable();
    // this.initializeMap()
    this.getdata();
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Device' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Speed' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Last Update' },
      { key: 'keyValue', val: 'Power' },
      { key: 'keyValue', val: 'IGN' },
      { key: 'keyValue', val: 'Voltage' },
      { key: 'keyValue', val: 'GPS Update' },
      { key: 'keyValue', val: 'SOS' },
      { key: 'keyValue', val: 'Route' },
      { key: 'keyValue', val: 'OBU' },
      { key: 'keyValue', val: 'Live Tracking' },
      { key: 'keyValue', val: 'History' },
      { key: 'keyValue', val: 'Mileage' },
      { key: 'keyValue', val: 'Charging Status' },
      { key: 'keyValue', val: 'Total Voltage' },
      { key: 'keyValue', val: 'Total Current' },
      { key: 'keyValue', val: 'Battery percentage' },
      { key: 'keyValue', val: 'Temperature'},
    ]
  }

  getdata() {
    this.isloading = true;
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
      fs_value: this.fsValueData,
      customer: '',
      depo_name: '',
    };
    this.dashboardService.mapview2(payload).subscribe((res: any) => {

      this.mapList = res?.body?.data?.list_map_view
      this.vehiclelistData.trackList = res?.body?.data?.list_track_sta;
      this.vehiclelistData.isloading = false;
      this.isloading = false;
    });
  }


  /**
   * get vehicle id based on tracklist 
   * @param id 
   */
  vehicleListBasedOnTrackList(fsvalue: any, routeId: any ) {
 
    // const initialState: ModalOptions = {
    //   initialState: {
    //     fs_value  : fsvalue

    //   },
    // };
    // this.bsModalRef = this.modalService.show(
    //   MapView2PopupComponent,
    //   Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    // );

    this.router.navigateByUrl('Tracking/Tracking_Live', {state : {
      dynamicFsvalue : fsvalue
    }})
  }


  selectedMapList(value:any) {
    this.scroller.scrollToAnchor("datatable_wrapper");
    this.fsValueData = value;
    this.getdata();
  }


  /**
 * Change refresh time behalf on selected time
 * @param event 
 */
  onChangeRefreshSec(event: any) {
    this.refreshValue = event.target.value;
    let refreshValueData = this.refreshValue;
    if (refreshValueData === 'Refresh In 60 Sec') {
      this.currentTimeInterval = setInterval(() => {
        this.getdata();
      }, 60000)
    }

    if (refreshValueData === 'Refresh In 120 Sec') {
      this.currentTimeInterval = setInterval(() => {
        this.getdata();
      }, 120000)
    }

    if (refreshValueData === 'Refresh In 180 Sec') {
      this.currentTimeInterval = setInterval(() => {
        this.getdata();
      }, 180000)
    }
  }


  /**
   * tabel size chage method
   * @param event 
   */
  onTableSizeChange(event: any): void {
    this.vehiclelistData.tableSize = event.target.value;
    this.vehiclelistData.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.vehiclelistData.page = event;
  };

  /**
 * reset all filter
 */

  resetFilter() {
    this.id = 0;
    this.refreshValue = "Do Not Refresh";
    this.mapList = [];
    this.fsValueData = 0;
    this.vehiclelistData.location = [];
    this.vehiclelistData.isloading = true;
    if (this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval);
    }

    setTimeout(() => {
      this.getdata();
    }, 500)
  }

  // redirectToRoute(id:any, routeId:any, vehicleId:any,lat : any, lon : any, vehicle) {  
  //     const initialState: ModalOptions = {
  //       initialState: {
  //         routeid :id,
  //         fs_value  : routeId,
  //         vehicle_id : vehicleId,
  //         lat : lat,
  //         lon :lon,
  //         selectedvehicleData : vehicle,
  //         bsModalRef : this.modalService
  //       },
  //     };

  //     this.bsModalRef = this.modalService.show(
  //       RouteWiseMapComponent,
  //       Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
  //     );

  //     // return this.bsModalRef
      
  //   // this.router.navigateByUrl('/Dashboard/FleetStatus_DMS_RouteWise_v2', { state: { id: id, routeId: routeId, vehicleId: vehicleId } })
  // }

  redirectToRoute(id:any, vehicleId:any, type:any) {
    this.router.navigateByUrl('Tracking/Tracking_Live', {state : {
      id: id, 
      vehicleId: vehicleId,
      type: type
    }})
  }

  redirectToTracking(vehicleId:any, type:any) {
    this.router.navigateByUrl(`Tracking/Tracking_Live/${vehicleId}`, {state : {
      vehicleId: vehicleId,
      type: type
    }})
  }

 
  ExportTOExcel() {
    this.excelData = this.mapList.map((item: any) => {
      {
        return {
           'S NO' : item?.sn,
           'Device' : item?.device,
           'Vehicle No' : item?.asseT_NO,
           'Speed' : item?.speed,
           'Location' : item?.place,
           'Last Update' : item?.timeu,
           'Power' : item?.pwr,
           'IGN' : item?.ign,
           'Voltage' : item?.voltage,
           'GPS Update' : item?.timeg,
           'SOS' : item?.sos,
           'Route' : item?.route,
           'OBU' : item?.obU_ASSET_NO,
           'Mileage' : item?.milage,
           'Charging Status' : item?.charging_Status,
           'Total Voltage' : item?.total_Voltage,
           'Total Current' : item?.total_Current,
           'Battery percentage' : item?.battery1_Temp +', '+item?.battery2_Temp +', ' +item?.battery3_Temp +', '+item?.battery4_Temp+', '+ item?.battery5_Temp +', '+item?.battery6_Temp +', ' +item?.battery7_Temp +', '+item?.battery8_Temp, 
           'Temperature': '',

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Dynamic Status')
  }

  redirectToGPS(path:any) {
    this.router.navigateByUrl(path)
  }

  toggleDescription(id: number): void {
    
    this.showFullDescription[id] = !this.showFullDescription[id];
    console.log("cjheslkdfj", this.showFullDescription);
  }

  /** map work  */
  // initializeMap() {   
  //   const popup = new Overlay({
  //     element: document.getElementById('popup') as HTMLElement,
  //     autoPan: true,
  //     // autoPanAnimation: {
  //     //   duration: 250
  //     // }
  //   });
  //   this.map.addOverlay(popup);
  //   this.dashboardService.mapview1(this.payload).subscribe((res: any) => {
  //     console.log('bus data =======>', res.body?.data?.list_map_view);
  //     this.busData = res.body?.data?.list_map_view
  //     this.markers = this.busData.map((bus: any, index: number) => {
  //       const coordinates = fromLonLat([bus.longitude, bus.latitude,]);
  //       const marker = new Feature({
  //         geometry: new Point(fromLonLat([bus.lon, bus.lat])),
  //         index: index
  //       })
  //       console.log('check marker =>', marker);;
  //       const iconStyle = new Style({
  //         image: new Icon({
  //           src: bus.type == 'BUS' ? 'http://103.190.95.186/dms/images/ASSET_TYPE/2/19_0.png' : 'http://103.190.95.186/dms/images/ASSET_TYPE/9/19_0.png',
  //           scale: 0.9, // Adjust the scale as needed for individual icons

  //         }),
  //         stroke: new Stroke({
  //           color: 'red',
  //           width: 2
  //         })

  //       });
  //       marker.setStyle(iconStyle);

  //       return marker;
  //     }
  //     );
  //     const clusterStyle = new Style({
  //       image: new Icon({
  //         src: '/assets/cluster1.png',
  //         scale: 0.1 // Adjust the scale as needed for cluster icon
  //       }),
  //       text: new Text({
  //         text: '',
  //         fill: new Fill({
  //           color: 'black',
  //         }),

  //         font: 'bold 15px Arial',
  //         offsetY: -11
  //       }),
  //       zIndex: 1
  //     });
  //     const markerSource = new VectorSource({
  //       features: this.markers
  //     });

  //     const clusterSource = new Cluster({
  //       distance: 20,
  //       source: markerSource
  //     });
  //     const clusterLayer = new VectorLayer({
  //       source: clusterSource,
  //       style: function (feature) {
  //         const size = feature.get('features').length;

  //         if (size > 1) {
  //           clusterStyle.getText().setText(size.toString());
  //           return clusterStyle;
  //         } else {
  //           return feature.get('features')[0].getStyle();
  //         }
  //       }
  //     });

  //     // Add custom CSS class to the cluster layer
  //     clusterLayer.set('class', 'custom-cluster');
  //     this.map.addLayer(clusterLayer);
  //     this.map.on('click', (e: { pixel: any; }) => {
  //       clusterLayer.getFeatures(e.pixel).then((clickedFeatures: string | any[]) => {
  //         if (clickedFeatures.length) {
  //           // Get clustered Coordinates
  //           const features = clickedFeatures[0].get('features');
  //           console.log(features);
  //           if (features.length > 1) {
  //             const extent = boundingExtent(
  //               features.map((r: { getGeometry: () => { (): any; new(): any; getCoordinates: { (): any; new(): any; }; }; }) => r.getGeometry().getCoordinates())
  //             );
  //             this.map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
  //           }
  //         }
  //       });
  //     });
  //     this.map.on('singleclick', (evt: { coordinate: any; }) => {
  //       const clickedFeatures: any[] = [];
  //       // Get the pixel coordinate from the clicked coordinate
  //       const pixel = this.map.getPixelFromCoordinate(evt.coordinate);
  //       // Check if the clicked pixel intersects with any clustered features
  //       clusterLayer.getFeatures(pixel).then((features: any) => {
  //         if (features.length) {
  //           clickedFeatures.push(...features);
  //         }
  //         if (clickedFeatures.length > 0) {
  //           // Get the first clicked feature
  //           const clickedFeature = clickedFeatures[0];
  //           if (clickedFeature.get('features').length > 1) {
  //             // Multiple features in the cluster
  //             const clusterFeatures = clickedFeature.get('features');
  //             if (clusterFeatures.length >= 5) {
  //               const extent = boundingExtent(
  //                 clusterFeatures.map((feature: any) => feature.getGeometry().getCoordinates())
  //               );
  //               this.map.getView().fit(extent, { duration: 500, padding: [100, 100, 100, 100] });
  //             } else {
  //               // Open the cluster without zooming
  //               if (clusterFeatures[clusterFeatures.length - 5] === clickedFeature) {
  //                 // Last cluster, control the zoom level here
  //                 const extent = boundingExtent(
  //                   clusterFeatures.map((feature: any) => feature.getGeometry().getCoordinates())
  //                 );
  //                 this.map.getView().fit(extent, { duration: 500, padding: [500, 500, 500, 500] });
  //                 // Set the maximum zoom level after the animation completes
  //                 setTimeout(() => {
  //                   this.map.getView().setZoom(Math.min(this.map.getView(1).getZoom(), 1));
  //                 }, 500);
  //               } else {
  //                 // Cluster with fewer features, handle accordingly
  //                 console.log('Cluster features:', clusterFeatures);
  //                 // Open the cluster logic goes here
  //               }
  //             }
  //           } else {
  //             // Single feature in the cluster
  //             const feature = clickedFeature.get('features')[0];
  //             console.log('get feature =======>', feature);
  //             const index = feature.get('index');
  //             console.log(index);
  //             // Retrieve the corresponding bus data using the index
  //             this.filteredData = this.busData[index];
  //             console.log(this.filteredData);
  //             this.isOpenlocationData = true;
  //             // Update the content of the popup or any other logic
  //             const content = `<p>Bus Driver: ${this.filteredData?.driver}</p>`;
  //             popup.setElement(this.myDiv.nativeElement);
  //             popup.setPosition(evt.coordinate);
  //             this.myDiv.nativeElement.innerHTML = content;
  //           }
  //         }
  //       });
  //     });
      
      
  //   });
  // }
}
