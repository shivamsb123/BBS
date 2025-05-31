import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DashboardService } from 'src/app/features/dashboard/services/dashboard.service';
@Component({
  selector: 'app-maintenance-all-status',
  templateUrl: './maintenance-all-status.component.html',
  styleUrls: ['./maintenance-all-status.component.scss']
})
export class MaintenanceAllStatusComponent implements OnInit{
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
    } else if (this.flag == '5') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[4].active = true; 
    }
    this.setInitialTable()
    // this.outshelding()
    console.log(this.flag);

  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Vehicle No' },
      { key: '', value: "Owner's Name" },
      { key: '', value: 'Mobile No' },
      { key: '', value: 'RC No' },
      { key: '', value: 'RC Permit Date'},
      { key: '', value: 'PC Expire Date'},
      { key: '', value: 'Authority'},

    ],

      this.tableData2 = [
        { key: '', value: 'Vehicle No' },
        { key: '', value: "Owner's Name" },
        { key: '', value: 'Mobile No' },
        { key: '', value: 'Pollution No' },
        { key: '', value: 'Pollution Permit Date'},
        { key: '', value: 'Pollution Expire Date'},
      ]

    this.tableData3 = [
      { key: '', value: 'Vehicle No' },
      { key: '', value: "Owner's Name" },
      { key: '', value: 'Mobile No' },
      { key: '', value: 'Insurance No' },
      { key: '', value: 'Insurance Permit Date'},
      { key: '', value: 'Insurance Expire Date'},
      { key: '', value: 'Authority'},
    ]

    this.tableData4 = [
      { key: '', value: 'Vehicle No' },
      { key: '', value: "Owner's Name" },
      { key: '', value: 'Mobile No' },
      { key: '', value: 'DL No' },
      { key: '', value: 'DL Permit Date'},
      { key: '', value: 'DL Expire Date'},
      { key: '', value: 'Authority'},
    ]
  }
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 75];
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
