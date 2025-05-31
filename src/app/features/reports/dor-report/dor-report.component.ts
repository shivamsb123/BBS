import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { ReportsService } from '../services/reports.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-dor-report',
  templateUrl: './dor-report.component.html',
  styleUrls: ['./dor-report.component.scss']
})
export class DorReportComponent {
  vehicleData: any;
  selectedValue: { value: string; text: string; };
  selectedVehicle: any;
  dorform!: FormGroup
  deviceHealthData: any;
  isloading: boolean = false
  tableData: any;
  searchKeyword: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  excelData: any;
  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private ReportsService: ReportsService,
    private excelService : ExcelFormatService
  ) { }

  ngOnInit(): void {
    this.setInitialForm();
    this.setInitailvalue()
  }

  setInitailvalue() {
    this.tableData = [
      { key: 'keyValue', val: 'S No.' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Route No' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Driver Id' },
      { key: 'keyValue', val: 'Driver Name' },
      { key: 'keyValue', val: 'Schedule Km' },
      { key: 'keyValue', val: 'Schedule Trip' },
      { key: 'keyValue', val: 'Actual Trip' },
      { key: 'keyValue', val: 'Miss Trip' },
      { key: 'keyValue', val: 'Odometer KM (Out)' },
      { key: 'keyValue', val: 'SOC % (Out )' },
      { key: 'keyValue', val: 'Sch Out Time' },
      { key: 'keyValue', val: 'Actual Out Time' },
      { key: 'keyValue', val: 'Late In Minuts' },
      { key: 'keyValue', val: 'Late out Status' },
      { key: 'keyValue', val: 'Odometer KM (In)' },
      { key: 'keyValue', val: 'SOC % (In)' },
      { key: 'keyValue', val: 'Sch In Time' },
      { key: 'keyValue', val: 'Actual In Time' },
      { key: 'keyValue', val: 'Late In Status' },
      { key: 'keyValue', val: 'Running KM' },
      { key: 'keyValue', val: 'SOC Consumption %' },
      { key: 'keyValue', val: 'KWH' },
      { key: 'keyValue', val: 'SOC PER Km' },
      { key: 'keyValue', val: 'SCH VS ODO'},
      
    ]
  }

  setInitialForm() {
    const today = new Date();
    this.dorform = this.fb.group({
      date: [today, [Validators.required]],
    });
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  submit(formvalue: any) {
    this.isloading = true;
    let PayLoad = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "USER_ID": parseInt(localStorage.getItem('user_Id')),
      "MODE":0,
      "DATE":formatDate(formvalue.date, 'yyyy-MM-dd', 'en-US')
    }
    this.ReportsService.dorReport(PayLoad).subscribe((res: any) => {
      this.isloading = false;
      this.deviceHealthData = res?.body?.data;
      console.log(this.deviceHealthData);
      

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

  onTableDataChange(event: any) {
    this.page = event;
  };

  
  ExportTOExcel() {
    this.excelData = this.deviceHealthData.map((item: any) => {
      {
        return {
         'S No.':  item?.srNo,
         'Date':  item?.rosterDate,
         'Shift':  item?.shiftType == 'M' ? 'Morning' : 'Afternon',
         'Route No':  item?.routeNo,
         'Vehicle No': item?.assetNo,
         'Driver ID': item?.driver.split('_')[1],
         'Driver Name': item?.driver.split('_')[0],
         'Schedule Km': item?.scheduleKM,
         'Schedule Trip': item?.scheduleTrip,
         'Actual Trip': item?.totalTrip,
         'Miss Trip': item?.missTrip,
         'Odometer KM (Out)': item?.odometerDepoOut,
         'SOC % (Out )': item?.socPerDepoOut,
         'Sch Out Time': item?.depoOutSch,
         'Actual Out Time': item?.depoOut,
         'Late In Minuts': item?.depoOutLate,
         'Late out Status': item?.depoOutStatus,
         'Odometer KM (In)': item?.odometerDepoIn,
         'SOC % (In)': item?.socPerDepoIn,
         'Sch In Time': item?.depoInSch,
         'Actual In Time': item?.depoIn,
         'Late In Status': item?.depoInStatus,
         'Running KM': item?.odometerKM,
         'SOC Consumption %': item?.socConsumptionPerKm,
         'KWH': item?.kwh,
         'SOC PER Km': item?.socPerKM,
         'SCH VS ODO': item?.scheduleKM - item?.odometerKM,
        };
      }
    })
  
    this.excelService.excelService(this.excelData,'DOR Report')
  }
}
