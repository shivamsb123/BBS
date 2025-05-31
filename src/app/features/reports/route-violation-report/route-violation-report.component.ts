import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { FormateTimeService } from '../../http-services/formate-time.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-route-violation-report',
  templateUrl: './route-violation-report.component.html',
  styleUrls: ['./route-violation-report.component.scss']
})
export class RouteViolationReportComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;

  @Input() requestType: any
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  vehicleData: any;
  getRouteform!: FormGroup;
  tableData: any;
  searchKeyword:any
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false;
  routeVoilationData: any;
  selectedValue: { value: string; text: string; };
  selectedVehicle:any
  excelData: any;
  data: any;

  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private reportService: ReportsService,
    private formateTime : FormateTimeService,
    private excelService: ExcelFormatService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.setInitialValue();
    this.setInitialTbale();
    this.submit('')
  }

  setInitialTbale() {
    this.tableData = [
      { key: '', value: 'S No' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Route Name' },
      { key: '', value: 'Violation Time' },
      { key: '', value: 'Location' },

    ]
  }

  setInitialValue() {
    this.getRouteform = this.fb.group({
      fromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      toDate: [new Date(), [Validators.required, Validators.pattern('')]]
    })
  }
  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  confirm(event: any) {
    this.selectedVehicle = event.id
  }

  submit(formValue: any) {
    this.page = 1;
    this.tableSize = 25
    this.getRoutVoilation(formValue)
  }

  getRoutVoilation(formValue:any) {
    if(formValue){
      this.isloading = true;
      let payload = {
        "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
        "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
        "ID": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
        "PageNo": this.page,
        "PageSize": this.tableSize,
        "FromDate":formatDate(formValue?.fromDate, 'yyyy-MM-dd', 'en-US'),
        "ToDate":formatDate(formValue?.fromDate, 'yyyy-MM-dd', 'en-US')
      }
  
      this.reportService.getRouteVoilationReport(payload).subscribe((res: any) => {
        this.routeVoilationData = res?.body?.data;
        this.count = res?.body?.totalRrcords
        this.isloading = false;
  
      })
    }
  }

  onTableSizeChange(event: any) {    
    this.tableSize = parseInt(event.target.value);
    this.page = 1;    
    this.getRoutVoilation(this.getRouteform.value)
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getRoutVoilation(this.getRouteform.value)
  }

  cancel() {
    this.getRouteform.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.submit('');
    this.setInitialValue()
  }

  ExportTOExcel() {
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "ID": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
      "PageNo": 1,
      "PageSize": 5000,
      "FromDate":formatDate(this.getRouteform.value.fromDate, 'yyyy-MM-dd', 'en-US'),
      "ToDate":formatDate(this.getRouteform.value.fromDate, 'yyyy-MM-dd', 'en-US')
    }

    this.reportService.getRouteVoilationReport(payload).subscribe((res: any) => {
      this.data = res?.body?.data;
      this.excelData = this.data.map((item: any) => {
        {
          return {
          'S No': item?.srNo,
          'Vehicle No': item?.vehicleNo,
          'Route Name': item?.routeName,
          'Violation Time': item?.timeRecorded,
          'Location': item?.loc
          };
        }
      })
  
      this.excelService.excelService(this.excelData, 'Route Violation Report')
    })
  }
}
