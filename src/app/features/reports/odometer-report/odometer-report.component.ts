import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-odometer-report',
  templateUrl: './odometer-report.component.html',
  styleUrls: ['./odometer-report.component.scss']
})
export class OdometerReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  currentDate = new Date()
  tableData: any;
  odometerReport: any
  vehicleData: any;
  selectedValue: any
  selectedVehicle: any;
  speedForm: any
  excelData: any;
  searchKeyword:any;

  constructor(private ReportsService: ReportsService,
    private shardService: SharedService,
    private fb: FormBuilder,
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
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Start Odo Meter' },
      { key: 'keyValue', val: 'End Odo Meter' },
      { key: 'keyValue', val: 'Gps Odo Meter Difference' },
      { key: 'keyValue', val: 'Manual Start Odo Meter' },
      { key: 'keyValue', val: 'Manual End Odo Meter' },
      { key: 'keyValue', val: 'Manual Difference' },
    ]
  }

  setSpeedVehicleForm() {
    this.speedForm = this.fb.group({
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  showReport(formValue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    let payload = {
      DATE: formatDate(this.speedForm.value.date, 'yyyy-MM-dd', 'en-US'),
      VehicleID: parseInt(this.selectedVehicle) ? parseInt(this.selectedVehicle) : 0,


    }

    this.ReportsService.odometerreport(payload).subscribe((res: any) => {
      this.odometerReport = res?.body?.data;
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
    this.excelData = this.odometerReport.map((item: any) => {
      {
        return {
           'Vehicle No.': item?.busNumber,
           'Start Odo Meter': item?.gpsStartOdo,
           'End Odo Meter': item?.gpsEndOdo,
           'Gps Odo Meter Difference': item?.gpsOdoDiff,
           'Manual Start Odo Meter': item?.manStartOdo,
           'Manual End Odo Meter': item?.manEndOdo,
           'Manual Difference': item?.manOdoDiff,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Odometer Report')
  }
}
