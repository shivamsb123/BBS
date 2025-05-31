import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../../registration/services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ReportsService } from '../services/reports.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LocationTrackPopupComponent } from '../location-track-popup/location-track-popup.component';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-driver-trip-report',
  templateUrl: './driver-trip-report.component.html',
  styleUrls: ['./driver-trip-report.component.scss']
})
export class DriverTripReportComponent {
  vehicleData: any;
  selectedValue: { value: string; text: string; };
  routeList: any
  driverList: any;
  driverTripForm !: FormGroup
  driverTrip: any;
  searchKeyword: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  isloading: boolean = false;
  tableData:any
  excelData: any;


  constructor(
    private sharedService: SharedService,
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private reportsService : ReportsService,
    private modalService : BsModalService,
    private excelService : ExcelFormatService
  ) { }

  ngOnInit(): void {
    this.setInitialvalue()
    this.getRouteList()
    this.getVehicleZoneData();
    this.getDriverDetail()
    this.setInitialTable()
  }

  setInitialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Route' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Driver Name' },
      { key: 'keyValue', val: 'Shift Type' },
      { key: 'keyValue', val: 'Start Stop Name' },
      { key: 'keyValue', val: 'Trip Start Time' },
      { key: 'keyValue', val: 'End Stop Name' },
      { key: 'keyValue', val: 'Trip End Time' },

    ]
  }

  setInitialvalue() {
    this.driverTripForm = this.fb.group({
      "RouteNo": [null, [Validators.required]],
      "ShiftType": ['', [Validators.required]],
      "VehicleId": [null, [Validators.required]],
      "DriverId": [null, [Validators.required]],
      "date": [new Date(), [Validators.required]]
    })
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getRouteList() {
    let newData = {
      value: "",
      text: ""
    }

    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME + ' /' + val?.routE_NO
        }
      )
    })
  }

  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  confirm(event: any) {
    if (event.selectType == 'route') {
      this.driverTripForm.controls['RouteNo'].setValue(event.id);
    } else if (event.selectType == 'Driver') {
      this.driverTripForm.controls['DriverId'].setValue(event.id);
    } else if (event.selectType == 'Vehicle') {
      this.driverTripForm.controls['VehicleId'].setValue(event.id);
    }
  }

  submit(formvalue: any) {
    this.isloading = true;
    let payload = {
      "RouteNo": formvalue.RouteNo ? formvalue.RouteNo : 0,
      "ShiftType": formvalue?.ShiftType,
      "VehicleId": formvalue?.VehicleId ? parseInt(formvalue?.VehicleId) : 0,
      "DriverId": formvalue?.DriverId ? parseInt(formvalue?.DriverId) : 0,
      "trndate": formatDate(formvalue?.date, 'yyyy-MM-dd', 'en-US')
    }

    this.reportsService.driverTripReport(payload).subscribe((res:any) => {
      this.isloading = false;
      this.driverTrip = res?.body?.data
    })

  }

  onTableDataChange(event: any) {
    this.page = event;
  };

  bsModalRef: BsModalRef

  openMapView(data: any, type :any) {  
    let lat :any;
    let lon :any;
    if(type = 'start') {
      lat = data?.startLat;
      lon = data?.startLon
    } else {
      lat = data?.endLat,
      lon = data?.endLon
    }
    const initialState: ModalOptions = {
      initialState: {
        data: {
          place : data?.startStopName,
          vehicleNo : data?.asseT_NO,
          lat : lat,
          lon : lon
        },
      },
    };
    this.bsModalRef = this.modalService.show(
      LocationTrackPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  ExportTOExcel() {
    this.excelData = this.driverTrip.map((item: any) => {
      {
        return {
        'Date': item?.serverTime,
         'Route': item?.routE_NAME + ' / '+ item?.tripNo,
         'Vehicle No': item?.asseT_NO,
         'Driver Name': item?.fName + ' ' + item?.lName,
         'Shift Type': item?.shiftType,
         'Start Stop Name': item?.startStopName,
         'Trip Start Time': item?.tripStartTime,
         'End Stop Name': item?.endStopName,
         'Trip End Time': item?.tripEndTime,
        };
      }
    })
  
    this.excelService.excelService(this.excelData,'Driver Trip Report')
  }
}
