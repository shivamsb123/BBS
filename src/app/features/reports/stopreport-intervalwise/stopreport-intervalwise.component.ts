import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { FormateTimeService } from '../../http-services/formate-time.service';

@Component({
  selector: 'app-stopreport-intervalwise',
  templateUrl: './stopreport-intervalwise.component.html',
  styleUrls: ['./stopreport-intervalwise.component.scss']
})
export class StopreportIntervalwiseComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  vehicleData: any;
  locationReportForm: any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  selectedValue: { value: string; text: string; };
  selectedVehicle: any
  excelData: any;
  stopReport: any;
  searchKeyword:any
  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private ReportsService: ReportsService,
    private excelService: ExcelFormatService,
    private formateTime: FormateTimeService
  ) { }

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.setAccidentVehicleValue();
    this.setInitialvalue();
    this.submit('')
  }

  setInitialvalue() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle Number' },

      { key: 'keyValue', val: 'Report Date' },
      { key: 'keyValue', val: 'Place' },
      { key: 'keyValue', val: 'From Date' },
      { key: 'keyValue', val: 'To Date' },
      { key: 'keyValue', val: 'Interval in mint' }

    ]
  }

  setAccidentVehicleValue() {
    this.locationReportForm = this.fb.group({
      fromDate: [this.formateTime.formatFromDate(new Date()), [Validators.required, Validators.pattern('')]],
      toDate: [this.formateTime.formatToDate(new Date()), [Validators.required, Validators.pattern('')]],
      record_interval: [5, [Validators.required, Validators.pattern('')]]
    })
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  confirm(event: any) {
    this.selectedVehicle = event.id
  }

  submit(formvalue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if (formvalue) {

      this.isloading = true;
      let payload = {
        "DeptId": parseInt(localStorage.getItem('dept_id')),
        "UserId": parseInt(localStorage.getItem('user_Id') || ''),
        "VehicleId": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
        "PageNo": 1,
        "PageSize": 1000,
        "FromDate": this.shardService.formatedTime(formvalue?.fromDate),
        "ToDate": this.shardService.formatedTime(formvalue?.toDate),
        "INTERVAL": formvalue?.record_interval ? formvalue?.record_interval : 5
      }
      this.ReportsService.stopreportintervalwise(payload).subscribe((res: any) => {
        this.stopReport = res?.body?.data;
        this.isloading = false;
      })
    }

  }

  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.locationReportForm.reset();
    this.submit('')
  }

  ExportTOExcel() {
    this.excelData = this.stopReport.map((item: any) => {
      {
        return {
          'Vehicle Number': item?.vehicleNo,
          'Report Date': item?.reportDate,
          'Place': item?.place,
          'From Date': item?.fromDate,
          'To Date': item?.toDate,
          'Interval in mint': item?.interval
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Interval wise stop Report')
  }

  formattedDate(date: any) {
    return this.shardService.formatDateValue(date)
  }

  formattedDateTime(date: any) {
    return this.shardService.formatedDateTimeHtml(date)
  }
}
