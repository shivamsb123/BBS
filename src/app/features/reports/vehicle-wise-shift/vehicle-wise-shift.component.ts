import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-vehicle-wise-shift',
  templateUrl: './vehicle-wise-shift.component.html',
  styleUrls: ['./vehicle-wise-shift.component.scss']
})
export class VehicleWiseShiftComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  myTime = new Date();
  tableData: any;
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  excelData: any;
  shiftType:string ="0"
  vehicleWiseShift: any;
  selectedDate: number;
  isInputEnabled:boolean = false
  searchKeyword:any;
  constructor(
    private reportService: ReportsService,
    private excelService : ExcelFormatService
  ) {
  }

  ngOnInit(): void {
    this.setInitialtableData()
  }

  setInitialtableData() {
    this.tableData = [
      { key: '', value: 'Roaster Date' },
      { key: '', value: 'Route Name' },
      { key: '', value: 'Shift Type' },
      { key: '', value: 'Scheduled Vehicle' },
      { key: '', value: 'Scheduled Driver' },
      { key: '', value: 'Actual Vehicle' },
      { key: '', value: 'Actual Driver' },
      { key: '', value: 'Scheduled Shift On' },
      { key: '', value: 'Shift On' },
      { key: '', value: 'Depo Out' },
      { key: '', value: 'Diff. In Shift On' },
      { key: '', value: 'Scheduled Shift Off' },
      { key: '', value: 'Depo In' },
      { key: '', value: 'Shift Off' },
      { key: '', value: 'Diff. In Shift Off' },
      { key: '', value: 'Odometer Depo Out' },
      { key: '', value: 'Odometer Depo In' }
    ]
  }

  showReport() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    let payload = {
      "Date":  this.selectedDate ? formatDate(new Date(), 'yyyy-MM-dd', 'en-US') : formatDate(this.myTime, 'yyyy-MM-dd', 'en-US'),
      "rtype":this.selectedDate,
      "shifttype":this.shiftType
    }    
    this.reportService.vehileShiftreport(payload).subscribe((res: any) => {
      this.vehicleWiseShift = res?.body?.data;
      this.isloading = false;
    })
  }

  changeSelection(event:any){
    this.selectedDate = event.target.checked ? 1 : 0;  
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  ExportTOExcel() {
    this.excelData = this.vehicleWiseShift.map((item: any) => {
      {
        return {
           'Roaster Date' : item?.rosterDate,
           'Route Name' : item?.routE_NAME,
           'Shift Type' : item?.shiftType,
           'Scheduled Vehicle' : item?.busNo_S,
           'Scheduled Driver' : item?.driver_Name_S,
           'Actual Vehicle' : item?.bus_Act,
           'Actual Driver' : item?.driverName_Act,
           'Scheduled Shift On' : item?.act_shift_on,
           'Shift On' : item?.shift_on,
           'Depo Out' : item?.depo_out,
           'Diff. In Shift On' : item?.diff_Shift_Start,
           'Scheduled Shift Off' : item?.act_shift_off,
           'Depo In' : item?.depo_in,
           'Shift Off' : item?.shift_off,
           'Diff. In Shift Off' : item?.diff_Shift_End,
           'Odometer Depo Out' : item?.odometer_Depo_Out,
           'Odometer Depo In' : item?.odometer_Depo_IN,
        };
      }
    })

    this.excelService.excelService(this.excelData,'Vehicle Wise Shift Report')
  }
}
