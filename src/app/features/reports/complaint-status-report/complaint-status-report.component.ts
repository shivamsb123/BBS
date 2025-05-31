import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-complaint-status-report',
  templateUrl: './complaint-status-report.component.html',
  styleUrls: ['./complaint-status-report.component.scss']
})
export class ComplaintStatusReportComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  unitData: any;
  complaintData: any;
  excelData: any;
  complaintForm!: FormGroup
  driverList: any;
  vehicleData: any;
  selectedValue: any;
  selectedDriverValue: any
  company: any;
  selectedDepartment: any

  constructor(
    private reportService: ReportsService,
    private excelService: ExcelFormatService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.setInitialValue()
    this.initialTable();
    this.getCompany();
    this.getDriverDetail();
    this.getVehicleZoneData();
  }

  setInitialValue() {
    this.complaintForm = this.fb.group({
      FromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      ToDate: [new Date(), [Validators.required, Validators.pattern('')]],
      deptId: ['', [Validators.required, Validators.pattern('')]],
      VehicleId: ['', [Validators.required, Validators.pattern('')]],
      DriverId: ['', [Validators.required, Validators.pattern('')]],
      ComplaintStatus: ['2', [Validators.required, Validators.pattern('')]],
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'ComplaintId' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Complaint' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Complaint Date' }

    ]
  }

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  getDriverDetail() {
    this.isloading = true;
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
      this.isloading = false;
    })
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }


  confirm(event: any) {
    if (event.selectType == 'Company') {
      this.complaintForm.controls['deptId'].setValue(event.id)
    } else if (event.selectType == 'Vehicle') {
      this.complaintForm.controls['deptId'].setValue(event.id)
    } else {
      this.complaintForm.controls['DriverId'].setValue(event.id)
    }
  }

  getComplaint(formValue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    let payload = {
      "DeptId": formValue.deptId ? Number(formValue.deptId) : 0,
      "VehicleId": formValue.VehicleId ? Number(formValue.VehicleId) : 0,
      "DriverId": formValue.DriverId ? Number(formValue.DriverId) : 0,
      "ComplaintStatus": 2,
      "FromDate": formatDate(formValue.FromDate, 'yyyy-MM-dd', 'en-US'),
      "ToDate": formatDate(formValue.ToDate, 'yyyy-MM-dd', 'en-US'),
      "PageNo": 1,
      "PageSize": 1000
    }

    this.reportService.complaintReport(payload).subscribe((res: any) => {
      this.complaintData = res?.body;
      console.log("check res", res?.body);

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

  ExportTOExcel() {
    this.excelData = this.complaintData.map((item: any) => {
      {
        return {
          'ComplaintId': item?.complaintId,
          'Vehicle No': item?.busNumber,
          'Complaint': item?.complaints,
          'Status': item?.vehicleStatus,
          'Complaint Date': item?.recordedTime

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Complaint Report')
  }
}
