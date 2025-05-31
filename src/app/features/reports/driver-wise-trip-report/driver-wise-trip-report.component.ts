import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/features/http-services/notification.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
@Component({
  selector: 'app-driver-wise-trip-report',
  templateUrl: './driver-wise-trip-report.component.html',
  styleUrls: ['./driver-wise-trip-report.component.scss']
})
export class DriverWiseTripReportComponent {
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
  driverList: any;
  data: any;
  excelData: any;
  searchKeyword:any;
  constructor(private ReportsService: ReportsService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private NotificationService: NotificationService,
    private excelService: ExcelFormatService
  ) {

  }

  ngOnInit(): void {
    this.setInitialtableData()
    this.setSpeedVehicleForm();
    this.getDriverDetail()

  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Driver Name' },
      { key: 'keyValue', val: 'Vehicle' },
      { key: 'keyValue', val: 'Route Name' },
      { key: 'keyValue', val: 'Trip Date' },
      { key: 'keyValue', val: 'Shift Type' },
      { key: 'keyValue', val: 'Completed Trip' },
      { key: 'keyValue', val: 'Miss Trip' },
    ]
  }

  setSpeedVehicleForm() {
    this.speedForm = this.fb.group({
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      shift: ["0", [Validators.required, Validators.pattern('')]],
      driver: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  showReport(formValue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if (formValue.shift == "") {

      this.NotificationService.showError(
        'Please select required Field'
      );
      return
    }
    this.isloading = true;
    let payload = {
      Trip_Date: formatDate(this.speedForm.value.date, 'yyyy-MM-dd', 'en-US'),
      "Shift_Type": formValue.shift,
      "Emp_Id": formValue.driver ? parseInt(formValue.driver) : 0,

    }




    this.ReportsService.DriverWiseTripReport(payload).subscribe((res: any) => {
      this.data = res?.body?.data;
      this.isloading = false;
    })
  }

  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Driver') {
      this.speedForm.controls['driver'].setValue(event.id);
      console.log(this.speedForm.controls['driver'].setValue(event.id));

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


  ExportTOExcel() {
    this.excelData = this.data.map((item: any) => {
      {
        return {
          'Driver Name': item?.driver_name,
          'Vehicle': item?.asseT_NO,
          'Route Name': item?.routE_NAME,
          'Trip Date': item?.trip_Date,
          'Shift Type': item?.shift_Type,
          'Completed Trip': item?.completed,
          'Miss Trip': item?.short_Trip,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Driver Trip Report')
  }

  formatevalue(date: any) {
  return  this.sharedService.formatDateValue(date)
  }
}
