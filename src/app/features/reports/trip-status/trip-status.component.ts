import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../registration/services/registration.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-trip-status',
  templateUrl: './trip-status.component.html',
  styleUrls: ['./trip-status.component.scss']
})
export class TripStatusComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  myTime = new Date()
  tripReportData: any;
  tableData: any;
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  selectedValue: any;
  selectedVehicle: any;
  vehicleData: any;
  tripReportForm!: FormGroup;
  routeList: any;
  selectedRouteValue: any;
  selectedRoute: any;
  excelData: any;
  searchKeyword :any

  constructor(
    private reportService: ReportsService,
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private excelService: ExcelFormatService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialtableData()
    this.getVehicleZoneData()
    // this.getRouteList()
  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Route' },
      { key: 'keyValue', val: 'Duty No' },
      { key: 'keyValue', val: 'Direction' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Driver Code' },
      { key: 'keyValue', val: 'Driver Name' },
      { key: 'keyValue', val: 'Trip Number' },
      { key: 'keyValue', val: 'From Stop' },
      { key: 'keyValue', val: 'To Stop' },
      { key: 'keyValue', val: 'Trip Start' },
      { key: 'keyValue', val: 'Trip End' },
      { key: 'keyValue', val: 'Trip Duration' },
      { key: 'keyValue', val: 'Odometer Km' },
      { key: 'keyValue', val: 'Route Violation KM' },
      // { key: 'keyValue', val: 'Trip Status' }

    ]
  }

  getTripReport() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    if (!this.myTime) {
      this.isloading = false;
      this.tripReportData = [];
      return; 
    }
    let payload = {
      "R_Att_Date": formatDate(this.myTime, 'yyyy-MM-dd', 'en-US'),
      "R_ID": 0,
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "VehicleID": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
    }

    this.reportService.tripReport(payload).subscribe((res: any) => {
      this.tripReportData = res?.body?.data;
      this.isloading = false;
    })
  }


  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  confirm(event: any) {
    this.selectedVehicle = event.id
  }

  ExportTOExcel() {
    this.excelData = this.tripReportData.map((item: any) => {
      {
        return {
          'Date': item?.date,
          'Shift': item?.shift,
          'Route': item?.route,
          'Duty No': item?.dutyNo,
          'Direction': item?.direction,
          'Vehicle No': item?.vehicleNo,
          'Driver Code': item?.driverCode,
          'Driver Name': item?.driverName,
          'Trip Number': item?.tripNumber,
          'From Stop': item?.fromStop,
          'To Stop': item?.toStop,
          'Trip Start': item?.tripStart,
          'Trip End': item?.tripEnd,
          'Trip Duration': item?.tripDuration,
          'Odometer Km': item?.gpskMs,
          'Route Violation KM': item?.routeViolationKMs,
        };
      }
    })

    this.excelService.excelService(this.excelData,'Trip Status Report')

  }

  cancel() {
    this.selectedRouteValue = {
      value: '',
      text: ''
    }
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.tripReportForm.reset()
  }

}
