import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { FormateTimeService } from '../../http-services/formate-time.service';
@Component({
  selector: 'app-distance-report',
  templateUrl: './distance-report.component.html',
  styleUrls: ['./distance-report.component.scss']
})
export class DistanceReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  vehicleSelection : 'Select Vehicle'
  vehicleData: any;
  locationReportForm: any;
  locationReportData: any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  selectedValue: { value: string; text: string; };
  selectedVehicle:any
  excelData: any;
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
      { key: 'keyValue', val: 'Vehicle Number ' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Start Odo Meter ' },
      { key: 'keyValue', val: 'End Odo Meter' },
      { key: 'keyValue', val: 'Odometer Difference' },
      // { key: 'keyValue', val: 'Total distance travelled' }
    ]
  }

  setAccidentVehicleValue() {
    this.locationReportForm = this.fb.group({      
      fromDate: [this.formateTime.formatFromDate(new Date()), [Validators.required, Validators.pattern('')]],
      toDate: [this.formateTime.formatToDate(new Date()), [Validators.required, Validators.pattern('')]],
   
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
if(formvalue){
  
    this.isloading = true;
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "VehicleID": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
      "PageNo": 1,
      "PageSize": 1000,
      "FromDateTime":this.shardService.formatedTime(formvalue?.fromDate),
      "ToDateTime":this.shardService.formatedTime(formvalue?.toDate)
    }
    this.ReportsService.distancereport(payload).subscribe((res: any) => {
      this.locationReportData = res?.body?.data;
      console.log(this.locationReportData);
      
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
    this.excelData = this.locationReportData.map((item: any) => {
      {
        return {

         'Vehicle Number': item?.busNumber,
         'Date': item?.reportDate,
         'Start Odo Meter ': item?.startOdo,
         'End Odo Meter': item?.endOdo,
         'Odometer Difference': item?.odoDiff,
        };
      }
    })
  
    this.excelService.excelService(this.excelData,'Distance Report')
  }
}
