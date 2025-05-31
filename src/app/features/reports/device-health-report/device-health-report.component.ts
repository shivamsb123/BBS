import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { ReportsService } from '../services/reports.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-device-health-report',
  templateUrl: './device-health-report.component.html',
  styleUrls: ['./device-health-report.component.scss']
})
export class DeviceHealthReportComponent {
  vehicleData: any;
  selectedValue: { value: string; text: string; };
  selectedVehicle: any;
  deviceHealthform!: FormGroup
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
    this.getVehicleZoneData()
  }

  setInitailvalue() {
    this.tableData = [
      { key: 'keyValue', val: 'Department' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'IMEI' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Last Recieved Date' },
      { key: 'keyValue', val: 'Total Count' },
    ]
  }

  setInitialForm() {
    const today = new Date();
    this.deviceHealthform = this.fb.group({
      deviceId: [null],
      deviceType: ['GPS', [Validators.required]],
      fromDate: [today, [Validators.required]],
      toDate: [today, [Validators.required]],
    }, {
      validators: this.dateRangeValidator
    });

    this.deviceHealthform.get('fromDate')?.valueChanges.subscribe((fromDate: Date) => {
      this.updateToDate(fromDate);
    });

    this.deviceHealthform.get('toDate')?.valueChanges.subscribe((toDate: Date) => {
      const fromDate = this.deviceHealthform.get('fromDate')?.value;
      this.validateToDate(fromDate, toDate);
    });
  }

  updateToDate(fromDate: Date) {
    const today = new Date();
    const from = new Date(fromDate);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    if (from >= sevenDaysAgo && from <= today) {
      this.deviceHealthform.patchValue({ toDate: today }, { emitEvent: false });
    } else {
      const oneWeekLater = new Date(from);
      oneWeekLater.setDate(from.getDate() + 7);
      this.deviceHealthform.patchValue({ toDate: oneWeekLater }, { emitEvent: false });
    }
  }

  validateToDate(fromDate: Date, toDate: Date) {
    const today = new Date();
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const oneWeekLater = new Date(from);
    oneWeekLater.setDate(from.getDate() + 7);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    this.deviceHealthform.setErrors(null);
    if (fromDate && toDate) {
      const timeDiff = Math.abs(new Date(toDate).getTime() - new Date(fromDate).getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dayDiff > 7) {
        this.deviceHealthform.setErrors({ dateRangeExceeded: true });
      }
    }

    if (to > oneWeekLater) {
      this.deviceHealthform.setErrors({ dateRangeExceeded: true });
    }
  }

  dateRangeValidator(group: FormGroup) {
    const fromDate = group.get('fromDate')?.value;
    const toDate = group.get('toDate')?.value;

    if (fromDate && toDate) {
      const timeDiff = Math.abs(new Date(toDate).getTime() - new Date(fromDate).getTime());
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (dayDiff > 7) {
        return { dateRangeExceeded: true };
      }
    }
    return null;
  }



  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  confirm(event: any) {
    this.deviceHealthform.get('deviceId').patchValue(event.id);
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.deviceHealthform.reset();
  this.setInitialForm()

  }

  submit(formvalue: any) {
    this.isloading = true;
    let PayLoad = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "USER_ID": parseInt(localStorage.getItem('user_Id')),
      "ID": formvalue.deviceId ? parseInt(formvalue.deviceId) : 0,
      "DeviceType": formvalue.deviceType,
      "FromDate": formatDate(formvalue.fromDate, 'yyyy-MM-dd', 'en-US'),
      "ToDate": formatDate(formvalue.toDate, 'yyyy-MM-dd', 'en-US'),
      "PageNo": 1,
      "PageSize": 1000
    }
    this.ReportsService.deviceHealth(PayLoad).subscribe((res: any) => {
      this.isloading = false;
      this.deviceHealthData = res?.body?.data

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
          'Department': item?.deptName,
         'Vehicle Number': item?.vehicleNo,
         'IMEI': item?.imei,
         'Date': item?.selectedDate,
         'Last Recieved Date ': item?.lastDataRecievedDate,
         'Total Count': item?.totalDataCount,
        };
      }
    })
  
    this.excelService.excelService(this.excelData,'Device Health Report')
  }
}
