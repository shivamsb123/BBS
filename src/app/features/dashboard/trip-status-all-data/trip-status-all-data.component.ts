import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-trip-status-all-data',
  templateUrl: './trip-status-all-data.component.html',
  styleUrls: ['./trip-status-all-data.component.scss']
})
export class TripStatusAllDataComponent implements OnInit {
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
    private excelService: ExcelFormatService
  ) { }

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
    this.outshelding()

  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Route No' },
      { key: '', value: 'Date' },
      { key: '', value: 'Shift Type' },
      { key: '', value: 'Shift On' },
      { key: '', value: 'Depo Out' },
      { key: '', value: 'Lunch Start' },
      { key: '', value: 'Lunch End' },
      { key: '', value: 'Depo In' },
      { key: '', value: 'Shift off' },
      { key: '', value: 'Schedule Km' },
    ]

    this.tableData2 = [
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Route No' },
      { key: '', value: 'Date' },
      { key: '', value: 'Shift Type' },
      { key: '', value: 'Shift On' },
      { key: '', value: 'Depo Out' },
      { key: '', value: 'Lunch Start' },
      { key: '', value: 'Lunch End' },
      { key: '', value: 'Depo In' },
      { key: '', value: 'Shift off' },
      { key: '', value: 'Schedule Km' },
    ]

    this.tableData3 = [
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Route No' },
      { key: '', value: 'Shift Type' },
      { key: '', value: 'Day' },
      { key: '', value: 'Old Vehicle Detail' },
      { key: '', value: 'New Vehicle Detail' },
      { key: '', value: 'Remark' }
    ]

    this.tableData4 = [
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Change Driver Name' },
      { key: '', value: 'Reason' },
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
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "Dept_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "SelectDate": formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "flag": parseInt(this.tabId)

    }
    this.dashboardService.allTripStatus(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data;
      this.isloading = false;

    });
  }

  onTablValue(id: any) {
    this.tabId = id;
    if (this.tabId == id) {
      this.page = 1
      this.outshelding()
    }
  }


  ExportTOExcel() {
    let data: any;
    let reportType :any
    this.excelData = this.outsheldingdata.map((item: any) => {
      {
        if (this.tabId == '1') {
          data = {
            'Driver Name': item?.driver_name_sch === item?.driver_name ? item?.driver_name : item?.driver_name + ' ' + item?.driver_name_sch,
            'Vehicle No': item?.asset_no_sch === item?.asset_no ? item?.asset_no : item?.asset_no + ' ' + item?.asset_no_sch,
            'Route No': item?.route_no,
            'Date': item?.date,
            'Shift Type': item?.shift_type,
            'Shift On': item?.shift_on,
            'Depo Out': item?.depo_out,
            'Lunch Start': item?.lunch_start,
            'Lunch End': item?.lunch_end,
            'Depo In': item?.depo_in,
            'Shift off': item?.shift_off,
            'Schedule Km': item?.scheduled_km,
          };
          reportType = 'On Time Status'
        } else if (this.tabId == '2') {
          data = {
            'Driver Name': item?.driver_name_sch === item?.driver_name ? item?.driver_name : item?.driver_name + ' ' + item?.driver_name_sch,
            'Vehicle No': item?.asset_no,
            'Route No': item?.route_no,
            'Date': item?.date,
            'Shift Type': item?.shift_type,
            'Shift On': item?.shift_on_sch === item?.shift_on ? item?.shift_on : item?.shift_on + ' ' + item?.shift_on_sch,
            'Depo Out': item?.depo_out_sch === item?.depo_out ? item?.depo_out : item?.depo_out + ' ' + item?.depo_out_sch,
            'Lunch Start': item?.lunch_start,
            'Lunch End': item?.lunch_end,
            'Depo In': item?.depo_in_sch === item?.depo_in ? item?.depo_in : item?.depo_in + ' ' + item?.depo_in_sch,
            'Shift off': item?.shift_off_sch === item?.shift_off ? item?.shift_off : item?.shift_off + ' ' + item?.shift_off_sch,
            'Schedule Km': item?.scheduled_km,
          };
          reportType = 'Running Late Status'
        } else if (this.tabId == '3') {
          data = {
            'Vehicle No': item?.asset_no,
            'Route No': item?.route_no,
            'Shift Type': item?.shift_type,
            'Day': item?.date,
            'Old Vehicle Detail': item?.asset_no,
            'New Vehicle Detail': item?.asset_no_sch,
            'Remark': ''
          }
          reportType = 'Bus Replacement Status'

        } else if (this.tabId == '4') {
          data = {
            'Driver Name': item?.driver_name,
            'Vehicle No': item?.asset_no,
            'Change Driver Name': item?.driver_name_sch,
            'Reason': '',
            'Remark': '',
          }
          reportType = 'Driver Replacement Status'

        }

        return data
      }
    })

    this.excelService.excelService(this.excelData, reportType)
  }
}
