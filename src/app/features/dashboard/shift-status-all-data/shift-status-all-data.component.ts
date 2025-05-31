import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-shift-status-all-data',
  templateUrl: './shift-status-all-data.component.html',
  styleUrls: ['./shift-status-all-data.component.scss']
})
export class ShiftStatusAllDataComponent implements OnInit {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  @ViewChild('TABLE') tableList!: ElementRef;
  outsheldingdata: any;
  flag: string;
  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  dutyTrackingData: any;
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
    this.getdata()
  }

  setInitialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Route No_Srn / Bus No' },
      { key: 'keyValue', val: 'Driver' },
      // {key: 'keyValue',val: 'Bus No'},
      { key: 'keyValue', val: 'Shift On' },
      { key: 'keyValue', val: 'Depo Out' },
      { key: 'keyValue', val: 'Depo Out - Odo & SOC' },
      { key: 'keyValue', val: 'Depo IN' },
      { key: 'keyValue', val: 'Depo IN - Odo & SOC' },
      { key: 'keyValue', val: 'Shift Off' },
      { key: 'keyValue', val: 'Schedule Km' },
      { key: 'keyValue', val: 'GPS Km' },
      { key: 'keyValue', val: 'Odometer Km' },
      { key: 'keyValue', val: 'Route Violation KM' },
      { key: 'keyValue', val: 'Total Vehicles' },
      { key: 'keyValue', val: 'Total Drivers' },
    ],

      this.tableData2 = [
        { key: '', value: 'Driver Name' },
        { key: '', value: 'Duty Start Date' },
        { key: '', value: 'Duty Start Time' },
        { key: '', value: 'Shift Type' },
        { key: '', value: 'Vehicle No' },
        { key: '', value: 'Route No' },
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

  getdata() {
    this.isloading = true;
    let payload = {
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      "mode": 1
    };
    this.dashboardService.shiftdata(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data;
      this.isloading = false;
    });
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

  getDutyTracking() {
    this.isloading = true;
    let payload = {
      "Result": ""
    }
    this.dashboardService.dutyTracking(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data
      this.isloading = false;

    })
  }

  onTablValue(id: any) {
    this.tabId = id;
    if (this.tabId == '1') {
      this.page = 1
      this.getdata()
    }
    else if (this.tabId == '3') {
      this.page = 1
      this.outshelding()
    } else if (this.tabId == '4') {
      this.page = 1
      this.outshelding()
    } else if (this.tabId == '2') {
      this.page = 1
      this.getDutyTracking()
    }
  }

  ExportTOExcel() {
    let data: any;
    let reportType: any
    this.excelData = this.outsheldingdata.map((item: any) => {
      {
        if (this.tabId == '1') {
          data = {
            'S NO': item?.serial_no,
            'Date': item?.date,
            'Shift': item?.shift_type,
            'Route No_Srn / Bus No': item?.route_no + ' / ' + item?.asset_no,
            'Driver': item?.driver_name_sch === item?.driver_name ? item?.driver_name : item?.driver_name + ' ' + item?.driver_name_sch,
            'Shift On': !item?.shift_on_sch ? item?.shift_on : item?.shift_on_sch + ' ' + item?.shift_on_sch,
            'Depo Out': !item?.depo_out_sch ? item?.depo_out : item?.depo_out_sch + ' ' + item?.depo_out,
            'Depo Out - Odo & SOC': item?.depo_out + ' - ' + item?.depo_out_odo + ' & ' + item?.depo_out_soc,
            'Depo IN': item?.depo_in_sch,
            'Depo IN - Odo & SOC': item?.depo_in_sch + ' - ' + item?.depo_in_odo + ' & ' + item?.depo_in_soc,
            'Shift Off': item?.shift_off_sch,
            'Schedule Km': item?.scheduled_km,
            'GPS Km': item?.gps_km,
            'Odometer Km': item?.odometer_km,
            'Route Violation KM': item?.route_violation_km,
            'Total Vehicles': item?.total_vehicles,
            'Total Drivers': item?.total_drivers,
          };
          reportType = 'Shift Status'
        } else if (this.tabId == '2') {
          data = {
            'Driver Name': item?.driverName,
            'Duty Start Date': item?.r_Att_Date,
            'Duty Start Time': item?.shift_on,
            'Shift Type': item?.shiftType,
            'Vehicle No': item?.asseT_NO,
            'Route No': item?.routE_NAME + ' / ' + item?.routE_NO,
          };
          reportType = 'Duty Tracking Status'
        } else if (this.tabId == '3') {
          data = {
            'Driver Name': item?.driver_name,
            'Vehicle No': item?.asset_no,
            'Change Driver Name': item?.driver_name_sch,
            'Reason': '',
            'Remark': '',
          };
          reportType = 'Driver Change Status'
        } else if (this.tabId == '4') {
          data = {
            'Vehicle No': item?.asset_no,
            'Route No': item?.route_no,
            'Shift Type': item?.shift_type,
            'Day': item?.date,
            'Old Vehicle Detail': item?.asset_no,
            'New Vehicle Detail': item?.asset_no_sch,
            'Remark': '',
          };
          reportType = 'Vehicle Change Status'
        }

        return data
      }
    })

    this.excelService.excelService(this.excelData, reportType)
  }
}
