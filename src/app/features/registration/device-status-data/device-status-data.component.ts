import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { RegistrationService } from '../services/registration.service';
@Component({
  selector: 'app-device-status-data',
  templateUrl: './device-status-data.component.html',
  styleUrls: ['./device-status-data.component.scss']
})
export class DeviceStatusDataComponent implements OnInit {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;
  searchKeyword: any;
  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  vechileMaster: any;
  tableData1: any;
  mapList: any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  obuData = {
    page: 1,
    count: 0,
    tableSize: 10,
    tableSizes: [25, 50, 100]
  }
  gpsList: any;
  obuList: any;


  constructor(private dashboardService: DashboardService, private RegistrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true;
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true;
    } else if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true;
    } else if (this.flag == '4') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[3].active = true;
    }
    this.setInitialTable()
    this.getVechileList()

  }

  setInitialTable() {

    this.tableData = [
      { key: 'keyValue', val: 'Company' },
      { key: 'keyValue', val: 'Chessie Number ' },
      { key: 'keyValue', val: 'Vechile Number ' },
      { key: 'keyValue', val: 'Assest Type ' },
      { key: 'keyValue', val: 'Vender ' },
      { key: 'keyValue', val: 'RC Owner Name   ' },
      { key: 'keyValue', val: 'RC Present Address   ' },
      { key: 'keyValue', val: 'Status' },
    ]

    this.tableData1 = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Device' },
      { key: 'keyValue', val: 'Vehicle' },
      { key: 'keyValue', val: 'Last Update' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'SOC' },
      { key: 'keyValue', val: 'Milage' },
      { key: 'keyValue', val: 'Charging status' },
      { key: 'keyValue', val: 'Total Voltage' },
      { key: 'keyValue', val: 'Total Current' },
      { key: 'keyValue', val: 'Battery 1,2,3,4 Temperature' },
      { key: 'keyValue', val: 'Battery 5,6,7,8 Temperature' },
    ],

      this.tableData2 = [
        { key: '', value: 'OffRoad_Date time' },
        { key: '', value: 'OffRoad_Odometer' },
        { key: '', value: 'Mobile Number' },
        { key: '', value: 'Assets No' },
        { key: '', value: 'Speed Correction' },
        { key: '', value: 'Destination' },
      ]

    this.tableData3 = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Device' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Speed' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Last Update' },
      { key: 'keyValue', val: 'GPS Update' },
      { key: 'keyValue', val: 'OBU' },
      { key: 'keyValue', val: 'Mileage' },
      { key: 'keyValue', val: 'Charging Status' },
      { key: 'keyValue', val: 'Total Voltage' },
      { key: 'keyValue', val: 'Total Current' },
      { key: 'keyValue', val: 'Battery percentage' },
    ]

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }

  onTablValue(id: any) {
    this.tabId = id;

    if (this.tabId == '1') {
      this.page = 1
      this.getVechileList()

    } else if (this.tabId == '2') {
      this.page = 1
      this.getdata();

    } else if (this.tabId == '4') {
      this.page = 1
      this.getGpsdata()
    }
  }

  getVechileList() {
    this.isloading = true;
    let payload = {
      "PageNo": 1,
      "PageSize": 100,
      "Id": 0
    }
    this.RegistrationService.vechileMasterList(payload).subscribe((result: any) => {
      this.vechileMaster = result.body.data;
        this.isloading = false;
    })
  }

  getdata() {
    this.isloading = true;
    let payload = {
      id: 0,
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
      fs_value: 0,
      customer: '',
      depo_name: '',
    };

    this.dashboardService.canData(payload).subscribe((res: any) => {
      this.obuList = res?.body?.data?.listCANdata
      this.isloading = false;
    });
  }

  getGpsdata() {
    this.isloading = true;
    let payload = {
      id: 0,
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
      fs_value: 0,
      customer: '',
      depo_name: '',
    };
    this.dashboardService.mapview2(payload).subscribe((res: any) => {
      this.gpsList = res?.body?.data?.list_map_view
      this.isloading = false;
    });
  }
}


