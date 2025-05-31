import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-over-speeding-report',
  templateUrl: './over-speeding-report.component.html',
  styleUrls: ['./over-speeding-report.component.scss']
})
export class OverSpeedingReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  currentDate = new Date()
  tableData: any;
  overSpeedReport:any
  vehicleData: any;
  selectedValue:any
  selectedVehicle: any;
  speedForm:any
  excelData: any;
  searchKeyword:any
  constructor(private ReportsService: ReportsService,
    private shardService: SharedService,
    private fb:FormBuilder,
    private excelService: ExcelFormatService
    ) {
 
  }

  ngOnInit(): void {
    this.setInitialtableData()
    this.setSpeedVehicleForm();
    this.getVehicleZoneData()
  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Driver Name' },
      { key: 'keyValue', val: 'Route Name' },
      { key: 'keyValue', val: 'Speed' },
      { key: 'keyValue', val: 'Location' },
    ]
  }

  setSpeedVehicleForm() {
    this.speedForm = this.fb.group({
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      speed: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  showReport(formValue:any) {
    this.isloading = true;
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    let payload = {
      DATE:formatDate(this.speedForm.value.date, 'yyyy-MM-dd', 'en-US'), 
      ASSET_NO:this.selectedVehicle ? (this.selectedVehicle) : "0",
      SPEED:parseInt(this.speedForm.value.speed)
        
    }
    
    this.ReportsService.overSpeed(payload).subscribe((res: any) => {
      this.overSpeedReport = res?.body?.data;
      this.isloading = false;
    })
  }


  getVehicleZoneData() {
    console.log("check data");
    
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    
    });
  }


  confirm(event: any) {
    this.selectedVehicle = event.id
    this.speedForm.controls['vehicle'].setValue(event.id)
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

ExportTOExcel() {
  this.excelData = this.overSpeedReport.map((item: any) => {
    {
      return {

        'Date': item?.timeRecorded,
        'Vehicle No.': item?.asseT_NO,
        'Driver Name': item?.fName+' '+ item?.lName,
        'Route Name': item?.routE_NAME,
        'Speed': item?.speed,
        'Location': item?.place,
      };
    }
  })

  this.excelService.excelService(this.excelData,'Over Speed Report')
}

formateDate(date:any) {
 return this.shardService.formatedDateTimeHtml(date)
}
}
