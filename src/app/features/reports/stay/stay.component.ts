import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ReportsService } from '../services/reports.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-stay',
  templateUrl: './stay.component.html',
  styleUrls: ['./stay.component.scss']
})
export class StayComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  vehicleData: any;
  stayReportForm!: FormGroup;
  tableData: any;
  isloading= false;
  page= 1;
  count= 0;
  tableSize= 25;
  tableSizes= [25, 50, 100, 500, 1000];
  searchKeyword: any;
  stayReportData: any;
  selectedValue: { value: string; text: string; };
  selectedVehicle:any

  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private reportService: ReportsService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.setInitialValue();
    this.setInitialTable();
    this.submit('')
  }

  setInitialValue() {
    this.stayReportForm = this.fb.group({
      toDate: [new Date(), [Validators.required, Validators.pattern('')]],
      fromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      intervel: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  setInitialTable() {
    this.tableData = [
      {key:'', value: 'Vehicle'},
      {key:'', value: 'From Time'},
      {key:'', value: 'To Time'},
      {key:'', value: 'Duration'},
      {key:'', value: 'place'},
    ]
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

  submit(formvalue: any) {
    this.page= 1;
    this.isloading = true;
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "ID": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
      "Interval": formvalue.intervel ? parseInt(formvalue.intervel) : 5,
      "PageNo": 1,
      "PageSize": 1000,
      "FromDate": formvalue.fromDate? formatDate(formvalue.fromDate, 'yyyy-MM-dd hh:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "ToDate": formvalue.toDate ? formatDate(formvalue.toDate, 'yyyy-MM-dd hh:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US')
    }

    this.reportService.stayReport(payload).subscribe((res:any) => {
      this.stayReportData = res?.body?.data
      this.isloading = false;      
    })
    
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
  cancel(){
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.stayReportForm.reset();
    this.submit('')
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
}
