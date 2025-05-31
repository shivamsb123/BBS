import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-out-shelding',
  templateUrl: './out-shelding.component.html',
  styleUrls: ['./out-shelding.component.scss']
})
export class OutSheldingComponent {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  @ViewChild('TABLE') tableList!: ElementRef;

  outsheldingdata: any;
  flag: string;

  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  excelData: any;
  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private excelService: ExcelFormatService,
    private shardService: SharedService
  ) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[3].active = true;
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true;
    } else if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true;
    } else if (this.flag == '4') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true;
    }
    this.setInitialTable()
    this.outshelding()
    console.log(this.flag);

  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Attendance Date' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Shift On' },
      // { key: '', value: 'Depo Out' },
      // { key: '', value: 'Lunch Start' },
      // { key: '', value: 'Lunch End' },
      // { key: '', value: 'Depo In' },
      // { key: '', value: 'Shift off' },
    ],

      this.tableData2 = [
        { key: '', value: 'OffRoad Date time' },
        { key: '', value: 'OffRoad Odometer' },
        { key: '', value: 'Mobile Number' },
        { key: '', value: 'Vehicle No' },
        { key: '', value: 'Speed Correction' },
        { key: '', value: 'Destination' },
      ]

    this.tableData3 = [
      { key: '', value: 'Attendance Date' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Shift On' },
      { key: '', value: 'Depo Out' },
      { key: '', value: 'Lunch Start' },
      { key: '', value: 'Lunch End' },
      { key: '', value: 'Depo In' },
      { key: '', value: 'Shift off' },
    ]

    this.tableData4 = [
      { key: '', value: 'Route' },
      { key: '', value: 'Vehicle' },
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Date' },
      { key: '', value: 'Case Of Accident' },
      { key: '', value: 'Remark' },
    ]
  }
  isloading: boolean = false;
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
  outshelding() {
    this.isloading = true;
    let newDta: any;
    let payload = {
      "flag": parseInt(this.tabId) || '',
      "emp_id": parseInt(localStorage.getItem('user_Id') || ''),
      "view": 1,
      "MenuVersion": "v1"

    }
    this.dashboardService.dashboardAllStatus(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data;
      this.isloading = false;
    });
  }

  onTablValue(id: any) {
    this.page = 1
    this.tabId = id;
    this.outshelding()
  }


  ExportTOExcel() {
    let data: any
    this.excelData = this.outsheldingdata.map((item: any) => {
      {
        if (this.tabId == '3') {
          data = {
            'Attendance Date': item?.r_Att_Date,
            'Vehicle No': item?.vehical_no,
            'Shift On': item?.shift_on
          };
        } else if (this.tabId == '4') {
          data = {
            'Attendance Date': item?.r_Att_Date,
            'Vehicle No': item?.vehical_no,
            'Shift On': item?.shift_on,
            'Depo Out': item?.depo_out,
            'Lunch Start': item?.lunch_start,
            'Lunch End': item?.lunch_end,
            'Depo In': item?.depo_in,
            'Shift off': item?.shift_off,
          };
        } else if (this.tabId == '2') {
          data = {
            'OffRoad Date time': item?.offRoad_DateTime,
            'OffRoad Odometer': item?.offRoad_Odometer,
            'Mobile Number': item?.mobilE_NO,
            'Vehicle No': item?.asseT_NO,
            'Speed Correction': item?.speeD_CORRECTION,
            'Destination': item?.destination,
          }

        } else if (this.tabId == '1') {
          data = {}
        }

        return data
      }
    })

    this.excelService.excelService(this.excelData, 'On Trip Status')
  }

}
