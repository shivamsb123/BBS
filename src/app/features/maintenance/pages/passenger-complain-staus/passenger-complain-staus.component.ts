

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { DashboardService } from 'src/app/features/dashboard/services/dashboard.service';
@Component({
  selector: 'app-passenger-complain-staus',
  templateUrl: './passenger-complain-staus.component.html',
  styleUrls: ['./passenger-complain-staus.component.scss']
})
export class PassengerComplainStausComponent implements OnInit {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;

  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  complainData:any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];

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
    this.passengerList()
  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Bus No' },
      { key: '', value: 'Complain' },
      { key: '', value: 'Complain Date' },
      { key: '', value: 'Name' },
      { key: '', value: 'Mobile' },
      { key: '', value: 'Email' },
      { key: '', value: 'Status' },
    ],

      this.tableData2 = [
        { key: '', value: 'Bus No' },
        { key: '', value: 'Complain' },
        { key: '', value: 'Complain Date' },
        { key: '', value: 'Name' },
        { key: '', value: 'Mobile' },
        { key: '', value: 'Email' },
        { key: '', value: 'Status' },
      ]

    this.tableData3 = [
      { key: '', value: 'Bus No' },
      { key: '', value: 'Complain' },
      { key: '', value: 'Complain Date' },
      { key: '', value: 'Name' },
      { key: '', value: 'Mobile' },
      { key: '', value: 'Email' },
      { key: '', value: 'Status' },
    ]
  }
 
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
    this.dashboardService.passengerComplain(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data
    });
  }

  passengerList() {
    this.isloading = true ;
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Status": "1",
      "Mode": 1
    }
    if (this.tabId == '2') {
      payload['Status'] = "0"
      payload['Mode'] = 0
    } else if (this.tabId == '3') {
      payload['Status'] = "1"
      payload['Mode'] = 0
    }

    this.dashboardService.passengerComplain(payload).subscribe((res: any) => {
      this.complainData = res?.body?.data
      this.isloading = false ;
    });
  }

  onTablValue(id: any) {
    this.tabId = id;
    this.passengerList()
  }
}

