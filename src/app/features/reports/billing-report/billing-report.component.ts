import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-billing-report',
  templateUrl: './billing-report.component.html',
  styleUrls: ['./billing-report.component.scss']
})
export class BillingReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  currentDate = new Date()
  tableData: any;
  odometerReport:any
  vehicleData: any;
  selectedValue:any
  selectedVehicle: any;
  speedForm:any
  driverList: any;
  data: any;
  excelData: any;
  searchKeyword:any;
  constructor(private ReportsService: ReportsService,
    private sharedService: SharedService,
    private fb:FormBuilder,
    private NotificationService: NotificationService,
    private excelService : ExcelFormatService
    ) {
 
  }

  ngOnInit(): void {
    this.setInitialtableData()
    this.setSpeedVehicleForm();
this.getVehicleZoneData()
   
  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Row No.' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Route No.' },
      { key: 'keyValue', val: 'Route Name' },
      { key: 'keyValue', val: 'Schedule No.' },
      { key: 'keyValue', val: ' Vehicle No.' },
      { key: 'keyValue', val: 'Schedule Km' },
      { key: 'keyValue', val: 'Loss Km' },
      { key: 'keyValue', val: 'Opportunity Charg Km' },
      { key: 'keyValue', val: 'Start Odo Meter' },
      { key: 'keyValue', val: 'End Odo Meter' },
      { key: 'keyValue', val: 'Odometer Km' },
      { key: 'keyValue', val: 'Schedule Trip' },
      { key: 'keyValue', val: 'Actual Trip' },
      { key: 'keyValue', val: 'Remark' },
      { key: 'keyValue', val: 'Billing km' },
      
    ]
  }

  setSpeedVehicleForm() {
    this.speedForm = this.fb.group({
      date: [new Date(), [Validators.required, Validators.pattern('')]],
   
    })
  }
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  showReport(formValue:any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if(formValue.date == ""){

      this.NotificationService.showError(
        'Please select required Field'
      );
      return
    }
    this.isloading = true;
    let payload = {
      FromDate:formatDate(this.speedForm.value.date, 'yyyy-MM-dd', 'en-US'), 
      "UserId": parseInt(localStorage.getItem('user_Id') || ''), 
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''), 
      "VehicleId": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
    }
    this.ReportsService.BillingReportDateWise(payload).subscribe((res: any) => {
      this.data = res?.body?.data;
      console.log(this.data);
      
      this.isloading = false;
    })
  }


  confirm(event: any) {
    this.selectedVehicle = event.id
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
    this.excelData = this.data.map((item: any) => {
      {
        return {
          'Row No.': item?.row_No,
          'Date': item?.trip_Date,
          'Route No.': item?.routE_NO,
          'Route Name': item?.routE_NAME,
          'Schedule No.': item?.scheduleNo,
          ' Vehicle No.': item?.asseT_NO,
          'Schedule Km': item?.scheduled_KM,
          'Loss Km': item?.loss_Km,
          'Opportunity Charg Km': item?.opportunityChargingKm,
          'Start Odo Meter': item?.startOdo,
          'End Odo Meter': item?.endOdo,
          'Odometer Km': item?.diff_Odo,
          'Schedule Trip': item?.scheduledTrip,
          'Actual Trip': item?.actualTrip,
          'Remark': item?.remarks,
          'Billing km': item?.billing_Km,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Billing Report')
  }
}
