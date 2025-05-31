import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-shift-status',
  templateUrl: './shift-status.component.html',
  styleUrls: ['./shift-status.component.scss']
})
export class ShiftStatusComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;

  tableData: any
    isloading= false;
    page= 1;
    count= 0;
    tableSize= 25;
    tableSizes= [25, 50, 100, 500, 1000];

  shiftStatusReport: any;
  searchKeyword: any;
  myDate = new Date()


  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  excelData: any;
  constructor(
    private reportService: ReportsService,
    private excelService: ExcelFormatService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Route No_Srn' },
      { key: 'keyValue', val: 'Bus No' },
      { key: 'keyValue', val: 'Driver' },
      { key: 'keyValue', val: 'Shift On' },
      { key: 'keyValue', val: 'Depo Out' },
      { key: 'keyValue', val: 'Depo Out Odo' },
      { key: 'keyValue', val: 'Depo Out SOC' },
      { key: 'keyValue', val: 'Depo IN' },
      { key: 'keyValue', val: 'Depo IN Odo' },
      { key: 'keyValue', val: 'Depo IN SOC' },
      { key: 'keyValue', val: 'Depo Out Status' },
      { key: 'keyValue', val: 'Depo IN Status' },
      { key: 'keyValue', val: 'Shift Off Status' },
      { key: 'keyValue', val: 'Shift ON Status' },
      { key: 'keyValue', val: 'Shift Off' },
      { key: 'keyValue', val: 'Schedule Trip' },
      { key: 'keyValue', val: 'Total Trip' },
      { key: 'keyValue', val: 'Schedule Km' },
      { key: 'keyValue', val: 'GPS Km' },
      { key: 'keyValue', val: 'Odometer Km' },
      { key: 'keyValue', val: 'Route Violation KM' },
      { key: 'keyValue', val: 'Total Vehicles' },
      { key: 'keyValue', val: 'Total Drivers' },
    ]
  }

  showReport() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;

    if (!this.myDate) {
      this.isloading = false;
      this.shiftStatusReport = [];
      return; 
    }
    let payload = {
      "MODE": 0,
      "DATE": formatDate(this.myDate, 'yyyy-MM-dd', 'en-US'),
      "DEPT_ID":parseInt(localStorage.getItem('dept_id') || '') ,
      "USER_ID": parseInt(localStorage.getItem('user_Id') || '') ,
      
    }
    this.reportService.statusReport(payload).subscribe((res:any) => {
      this.isloading = false;
      this.shiftStatusReport = res?.body?.data;      
    })
    
  }

  
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  ExportTOExcel() {
    this.excelData = this.shiftStatusReport.map((item: any) => {
      {
        return {
           'S NO' : item?.sn,
           'Shift' : item?.shift_type,
           'Date' : item?.r_Att_Date,
           'Route No_Srn' : item?.routE_NO,
           'Bus No' : item?.asseT_NO,
           'Driver' : item?.driver_SCH === item?.driver ? item?.driver : item?.driver + ' '+ item?.driver_SCH,
           'Shift On' : item?.shift_on_SCH ? item?.shift_on + ' '+ item?.shift_on_SCH  : item?.shift_on,
           'Depo Out' : item?.depo_out_SCH ? item?.depo_out + ' '+ item?.depo_out_SCH : item?.depo_out,
           'Depo Out-Odo' : item?.odometer_Depo_Out,
           'Depo Out SOC' : item?.soC_Percentage_Depo_Out,
           'Depo IN' : item?.depo_in_SCH ? item?.depo_in + ' '+ item?.depo_in_SCH : item?.depo_in,
           'Depo IN Odo' : item?.odometer_Depo_IN,
           'Depo IN SOC' : item?.soC_Percentage_Depo_In,
           'Depo Out Status' : item?.depot_OUT_Status,
           'Depo IN Status' : item?.depot_IN_Status,
           'Shift Off Status' : item?.shift_OFF_Status,
           'Shift ON Status' : item?.shift_ON_Status,
           'Shift Off' : item?.shift_off_SCH ? item?.shift_off + ' '+ item?.shift_off_SCH : item?.shift_off,
           'Schedule Trip' : item?.scheduleD_TRIPS,
           'Total Trip' : item?.totaL_TRIPS,
           'Schedule Km' : item?.scheduleD_KM,
           'GPS Km' : item?.gpS_KM,
           'Odometer Km' : item?.odometer_KM,
           'Route Violation KM' : item?.routE_VIOLATION_KM,
           'Total Vehicles' : item?.no_Of_Vehicles,
           'Total Drivers' : item?.no_Of_Driver,
        };
      }
    })

    this.excelService.excelService(this.excelData,'Shift Status Report')

  }


}
