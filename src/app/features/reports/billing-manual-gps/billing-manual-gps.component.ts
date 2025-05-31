import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment';
import { ExcelFormatService } from '../../http-services/excel-format.service';


@Component({
  selector: 'app-billing-manual-gps',
  templateUrl: './billing-manual-gps.component.html',
  styleUrls: ['./billing-manual-gps.component.scss']
})
export class BillingManualGpsComponent {
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 50;
  tableSizes = [25, 50, 100, 500, 1000];
  tableData: any;
  searchKeyword: any
  vehicleData: any;
  selectedVehicle: any;
  myDate = new Date();
  selectedValue: any
  biilingreportData: any;
  excelData: any;

  constructor(
    private reportService: ReportsService,
    private shardService: SharedService,
    private excelService: ExcelFormatService
  ) { }
  ngOnInit() {
    this.initialTable()
    this.getVehicleZoneData()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'SNo' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Route Name' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Start Odometer' },
      { key: 'keyValue', val: 'End Odometer' },
      { key: 'keyValue', val: 'Odometer Km' },
      { key: 'keyValue', val: 'Start Odometer Manual' },
      { key: 'keyValue', val: 'End Odometer Manual' },
      { key: 'keyValue', val: 'Odometer Manual Km' },
      { key: 'keyValue', val: 'Odometer Difference' },
      { key: 'keyValue', val: 'Billing Km' },
      { key: 'keyValue', val: 'Remarks' }
    ]
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  confirm(event: any) {
    this.selectedVehicle = event.id;
  }

  getManularGpsData() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id')),
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "VehicleId": this.selectedVehicle ? Number(this.selectedVehicle) : 0,
      "FromDate": formatDate(this.myDate, 'yyyy-MM-dd', 'en-US')
    }
    this.reportService.reportManualVsGPS(payload).subscribe((res: any) => {
      this.biilingreportData = res?.body?.data
      this.isloading = false;
    })

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
    this.myDate = new Date();
    this.searchKeyword = '';
    this.selectedVehicle = 0;
    this.biilingreportData = []
  }

  formatDate(dateString) {
  return this.shardService.formatDateValue(dateString)
  }

  ExportTOExcel() {
    this.excelData = this.biilingreportData.map((item: any) => {
      {
        return {
          'SNo': item?.rowNo,
          'Vehicle No': item?.vehicleNo,
          'Route Name': item?.routeName,
          'Date': item?.reportDate,
          'Start Odometer': item?.startOdometer,
          'End Odometer': item?.endOdometer,
          'Odometer Km': item?.odometerKM,
          'Start Odometer Manual': item?.startOdometerManual,
          'End Odometer Manual': item?.endOdometerManual,
          'Odometer Manual Km': item?.odometerManualKM,
          'Odometer Difference': item?.odometerDiff,
          'Billing Km': item?.billingKM,
          'Remarks': item?.remarks
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Manual Vs GPS Billing Report')
  }
}
