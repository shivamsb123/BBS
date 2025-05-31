import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-outshedding-dashboard',
  templateUrl: './outshedding-dashboard.component.html',
  styleUrls: ['./outshedding-dashboard.component.scss']
})
export class OutsheddingDashboardComponent implements OnInit{
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;

  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  quality: any;
  isloading: boolean = false;
  depoInData: any;
  depoOutData: any;
  depoQualityData: any;
  time:any = new Date();
  intervalId;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true; 
    } else if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true; 
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true; 
    } 
    this.setInitialTable()
    this.getdata()
    console.log(this.flag);
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  setInitialTable() {
    this.tableData = [
      {
        key: '', value: 'Start Time'
      },
      {
        key: '', value: 'Route No.'
      },
      {
        key: '', value: 'Bus No'
      },
    ],

      this.tableData2 = [
      {
        key: '', value: 'Start Time'
      },
      {
        key: '', value: 'Route & Bus'
      },
      {
        key: '', value: 'Driver'
      },
      
    ]

    this.tableData3 = [
      {
        key: '', value: 'End Time'
      },
      {
        key: '', value: 'Route & Bus'
      },
      {
        key: '', value: 'Driver'
      },
      // {
      //   key: '', value: 'Action'
      // },
    ]
  }
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
   getdata() {
    this.isloading = true;
    let payload = {
      UserID: parseInt(localStorage.getItem('user_Id') || ''),
      MenuVersion: "v1"

    };
    this.dashboardService.OutsheddingDashboardData(payload).subscribe((res: any) => {
      this.depoInData = res?.body?.data?.list_DepoIn;
      this.depoOutData = res?.body?.data?.list_DepoOut
      this.depoQualityData = res?.body?.data?.list_QualityTesting;
      this.isloading = false

    });
  }

  onTablValue(id: any) {
    this.page = 1
    this.tabId = id;
     this.getdata()
  }

  navigateUrl(path:any, id:any){
    let url = path.replace('id', id)
    this.router.navigateByUrl(url)
  }
}
