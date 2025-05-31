import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { SessionService } from '../../http-services/session.service';
import { DashboardService } from '../services/dashboard.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { OBUPopupComponent } from '../../shared/components/obu-popup/obu-popup.component';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-can-data',
  templateUrl: './can-data.component.html',
  styleUrls: ['./can-data.component.scss']
})
export class CanDataComponent {
  @ViewChild('TABLE') tableList!: ElementRef;

  refreshSecond = [
    {id: '1', value: "Refresh In 60 Sec"},
    {id: '2', value: "Refresh In 120 Sec"},
    {id: '3', value: "Refresh In 180 Sec"},
    {id: '4', value: "Do Not Refresh"},
  ];
  refreshValue = "Do Not Refresh";
  currentTimeInterval:any = null;
  tableData:any;
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
        last_GPS:'',
        Speed: '',
      }
    ]
  };
  mapList:any;
  id: number = 0;
  fsValueData:any = 0;
  bsModalRef?: BsModalRef; 
  deviceData: any;
  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private modalService: BsModalService,
    private location : Location,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.deviceData = this.location.getState();    
    this.initialTable()
    this.getdata();
  }

  initialTable() {
    this.tableData = [
      {key: 'keyValue',val: 'S NO'},
      {key: 'keyValue',val: 'Device'},
      {key: 'keyValue',val: 'Vehicle'},
      {key: 'keyValue',val: 'Last Update'},
      {key: 'keyValue',val: 'Location'},
      {key: 'keyValue',val: 'SOC'},
      {key: 'keyValue',val: 'Milage'},
      {key: 'keyValue',val: 'Charging status'},
      {key: 'keyValue',val: 'Total Voltage'},
      {key: 'keyValue',val: 'Total Current'},
      {key: 'keyValue',val: 'Battery 1,2,3,4 Temperature'},
      {key: 'keyValue',val: 'Battery 5,6,7,8 Temperature'},

    ]
  }


  getdata() {
    this.vehiclelistData.isloading =  true;
    let payload = {
      id: this.id,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      zone_id: 0,
      vehicle_type: 0,
      vehicle_no: '',
      page_no: 1,
      page_size: 150,
      location: "0",
      trip_start_date: '',
      district: "0",
      fs_value: this.fsValueData,
      customer: '',
      depo_name: '',
    };

    if(this.deviceData?.device){
      payload['device_id'] = this.deviceData?.device
    }

    this.dashboardService.canData(payload).subscribe((res: any) => {      
      this.mapList = res?.body?.data?.listCANdata
      this.vehiclelistData.trackList = res?.body?.data?.listBoxData;
      this.vehiclelistData.isloading =  false;
    });
  }

  selectedMapList(value:any) {
    this.fsValueData = value;
    this.getdata();
  }

  
  /**
   * get vehicle id based on tracklist 
   * @param id 
   */
  vehicleListBasedOnTrackList(route_id: any ,fs_value: any) {        
    // this.id = id;
    // this.mapList =[];
    // this.vehiclelistData.location = []
    // this.vehiclelistData.isloading = true;
    // setTimeout(() => {
    //   this.getdata()
    //   this.onChangeRefreshSec(event);
    // }, 500);
    console.log(route_id,fs_value);
 
    
    const initialState: ModalOptions = {
      initialState: {
        routeid :route_id,
        fs_value  : fs_value

      },
    };
    this.bsModalRef = this.modalService.show(
      OBUPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }



    /**
   * Change refresh time behalf on selected time
   * @param event 
   */
    onChangeRefreshSec(event:any) {
      this.refreshValue = event.target.value;
      let refreshValueData = this.refreshValue;
      if(refreshValueData === 'Refresh In 60 Sec'){
        this.currentTimeInterval = setInterval(() => {
           this.getdata();
        }, 60000)
      }
      
      if(refreshValueData === 'Refresh In 120 Sec'){
        this.currentTimeInterval = setInterval(() => {
          this.getdata();
        }, 120000)
      }
      
      if(refreshValueData === 'Refresh In 180 Sec') {
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

    ExportTOExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'SheetJS.xlsx');
  
    }

    newOBUPage() {
      this.route.navigateByUrl('Dashboard/new-obu')
    }
}
