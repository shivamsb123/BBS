
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
import { MapViewLightboxComponent } from '../../shared/components/map-view-lightbox/map-view-lightbox.component';
import { Location, ViewportScroller } from '@angular/common';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss'],
})
export class MapviewComponent {
  markers: Feature | any;
  @ViewChild('myDiv', { static: false })  
  myDiv: ElementRef<HTMLDivElement> | any;
  @ViewChild('TABLE') tableList!: ElementRef;
  /**
   * Elements that make up the popup.
   */
  container = document.getElementById('popup') || '';
  closer = document.getElementById('popup-closer');
  bsModalRef?: BsModalRef;
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
    tableSize: 25,
    tableSizes: [25, 50, 100],
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
  mapList: any;
  id: number = 0;
  map: Map | any;
  busData: any;
  isOpenlocationData: boolean = false;
  filteredData: any;
  searchKeyword: any;
  tabId = '1';
  fsValueData = -1;

  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private busService: BusService,
    private modalService: BsModalService,
    private location: Location,
    private scroller: ViewportScroller,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.initialTable()
    this.getdata();
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Device' },
      { key: 'keyValue', val: 'Vehicle' },
      { key: 'keyValue', val: 'Speed' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Last Update' },
      { key: 'keyValue', val: 'Power' },
      { key: 'keyValue', val: 'IGN' },
      { key: 'keyValue', val: 'Voltage' },
      { key: 'keyValue', val: 'GPS Update' },
      { key: 'keyValue', val: 'SOS' },

    ]
  }

  selectedMapList(value: any) {
    this.scroller.scrollToAnchor("datatable_wrapper");
    this.fsValueData = value;
    this.getdata();
  }

  /**
  * get all map view data
   */
  getdata() {
    this.vehiclelistData.isloading = true;

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
      this.mapList = res?.body?.data?.list_map_view
      this.vehiclelistData.trackList = res?.body?.data?.list_track_sta;
      this.vehiclelistData.isloading = false;

    });
  }


  /**
   * get vehicle id based on tracklist 
   * @param id 
   */

  vehicleListBasedOnTrackList(route_id: any, fs_value: any, vehicleId: any) {
    // this.id = id;
    // this.mapList =[];
    // this.vehiclelistData.location = []
    // this.vehiclelistData.isloading = true;
    // setTimeout(() => {
    //   this.getdata()
    //   this.onChangeRefreshSec(event);
    // }, 500);
    console.log(route_id, fs_value);


    const initialState: ModalOptions = {
      initialState: {
        routeid: route_id,
        fs_value: fs_value,
        vehicle_id: vehicleId
      },
    };
    this.bsModalRef = this.modalService.show(
      MapViewLightboxComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
    // this.router.navigateByUrl('Tracking/Tracking_Live', {state : {
    //   id: route_id, 
    //   type: type, 
    //   vehicle_ID : vehicleId,
    //   fs_value: 0
    // }})

  }


  redirectVehicleToRoute(id:any, type:any) {
    this.router.navigateByUrl('Tracking/Tracking_Live', {state : {
      id: id, 
      type: type
    }})
  }

  /**
    * open tabs in click
    * @param id 
    */
  openTabs(id: any) {
    this.tabId = id;
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
  content: string | any;
  resetFilter() {
    this.id = 0;
    this.refreshValue = "Do Not Refresh";
    this.mapList = [];
    this.fsValueData = -1;
    this.vehiclelistData.location = [];
    this.vehiclelistData.isloading = true;
    if (this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval);
    }

    setTimeout(() => {
      this.getdata();
    }, 500)
  }

  modifycolour(colour: any) {

    const modifiedColour = colour.replace(/\_.*/g, "$'");

    return modifiedColour
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  redirectToRoute(id:any, vehicleId:any, type:any) {
    this.router.navigateByUrl('Tracking/Tracking_Live', {state : {
      id: id, 
      vehicleId: vehicleId,
      type: type
    }})
  }

}



