import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-real-data-access-status',
  templateUrl: './real-data-access-status.component.html',
  styleUrls: ['./real-data-access-status.component.scss']
})
export class RealDataAccessStatusComponent implements OnInit{
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;

  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  constructor(private dashboardService: DashboardService,
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
    } 
    this.setInitialTable()
    // this.outshelding()
    console.log(this.flag);

  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Driver No' },
      { key: '', value: 'Route On' },
      { key: '', value: 'Shift off' },
      { key: '', value: 'Depo In' },
      { key: '', value: 'Depo Out' },
      { key: '', value: 'Lunch Start' },
      { key: '', value: 'Lunch End' },
      { key: '', value: 'Start Time' },
      { key: '', value: 'End Time' },
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
      { key: '', value: 'OffRoad_Date time' },
      { key: '', value: 'OffRoad_Odometer' },
      { key: '', value: 'Mobile Number' },
      { key: '', value: 'Assets No' },
      { key: '', value: 'Speed Correction' },
      { key: '', value: 'Destination' },
    ]

    this.tableData4 = [
      { key: '', value: 'Attendance Date' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Shift On' },
      { key: '', value: 'Shift off' },
      { key: '', value: 'Depo In' },
      { key: '', value: 'Depo Out' },
      { key: '', value: 'Lunch Start' },
      { key: '', value: 'Lunch End' },
      { key: '', value: 'Start Time' },
      { key: '', value: 'End Time' },
    ]
  }
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  outshelding() {
    let newDta: any;
    let payload = {
      "flag": parseInt(this.tabId) || '',
      "emp_id": parseInt(localStorage.getItem('user_Id') || ''),
      "view": 1,
      "MenuVersion": "v1"

    }
    this.dashboardService.dashboardAllStatus(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data
    });
  }

  onTablValue(id: any) {
    this.tabId = id;
    // this.outshelding()
  }
}
