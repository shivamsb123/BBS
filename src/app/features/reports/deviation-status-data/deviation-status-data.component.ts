import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DashboardService } from '../../dashboard/services/dashboard.service';
@Component({
  selector: 'app-deviation-status-data',
  templateUrl: './deviation-status-data.component.html',
  styleUrls: ['./deviation-status-data.component.scss']
})
export class DeviationStatusDataComponent implements OnInit{
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
    } else if (this.flag == '4') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[3].active = true; 
    }
    this.setInitialTable()
    // this.outshelding()
    console.log(this.flag);

  }
  setInitialTable() {
    this.tableData = [
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
    ],
    this.tableData2 = [
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

    this.tableData3 = [
      { key: '', value: 'Attendance Date' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Route No' },
      { key: '', value: 'Normal Speed Limit' },
      { key: '', value: 'Current Speed' },
      { key: '', value: 'Over Speed' },
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
