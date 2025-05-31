import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from '../services/management.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-trip-complaint',
  templateUrl: './trip-complaint.component.html',
  styleUrls: ['./trip-complaint.component.scss']
})
export class TripComplaintComponent {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  hstep = 1;
  mstep = 15;
  mytime: Date = new Date();
  company: any;
  driverList: any;
  routeList: any;
  addGeneralComplain!: FormGroup
  complainTypeData: any;
  

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private managementService: ManagementService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialValue();
    this.getCompany();
    this.getRouteListData();
    this.getDriverDetail();
    this.getTripComplainType();
  }

  setInitialValue() {
    this.addGeneralComplain = this.fb.group({
      bus_serch: ['', [Validators.required, Validators.pattern('')]],
      type_of_complain: ['', [Validators.required, Validators.pattern('')]],
      complain_name: ['', [Validators.required, Validators.pattern('')]],
      contect_no: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.pattern('')]],
      complain_date: ['', [Validators.required, Validators.pattern('')]],
      complain_time: ['', [Validators.required, Validators.pattern('')]],
      remarks: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  getRouteListData() {
    this.sharedService.getRoutelist().subscribe((res: any) => {
      this.routeList = res?.body?.data
    })
  }


  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  getTripComplainType() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "User_ID": parseInt(localStorage.getItem('user_Id') || '')
    }
    this.managementService.complainType(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.complainTypeData = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.complaintName
        }
      )


    })
  }

  confirm(event: any) {
    this.addGeneralComplain.controls['type_of_complain'].setValue(event.assets_no)
  }

  changed() {
    this.addGeneralComplain.controls['complain_time'].setValue(this.mytime)
  }

  submit(formValue: any) {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "vehicle_no": formValue?.bus_serch,
      "Routeid": 0,
      "complaintype": formValue?.type_of_complain,
      "ComplainerName": formValue?.complain_name,
      "contactno": formValue?.contect_no,
      "Email": formValue?.email,
      "driverid": 0,
      "Complaindate": formatDate(formValue?.complain_date, 'dd/MM/yyyy', 'en-US'),
      "Complaintime": formatDate(formValue?.complain_time, 'hh:mm', 'en-US'),
      "Mode": 0,
      "remarks": formValue.remarks,
      "number": formValue?.contect_no,
      "Result": "",
      "Compalin_Number": ""

    }
    this.managementService.addGeneralComplain(payload).subscribe((res:any) => {
      console.log("check form value", res);
      
    })
  }

}
