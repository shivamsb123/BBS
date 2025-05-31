import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { formatDate } from '@angular/common';
import { NotificationService } from '../../http-services/notification.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-accident',
  templateUrl: './add-accident.component.html',
  styleUrls: ['./add-accident.component.scss']
})
export class AddAccidentComponent {

  accidentForm!: FormGroup;
  formData!: FormData;
  mytime: Date = new Date();
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  vehicleData: any;
  route: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  routeList: any;
  driverList: any;
  selectedRouteValue: any;
  selectedVehicleValue: any;
  selectedDriverValue: any;


  constructor(
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private _coreEvent: NotificationService,
    private toastr: ToastrService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setAccidentVehicleValue();
    this.getVehicleZoneData();
    this.getRouteList()
    this.getDriverDetail()
  }


  setAccidentVehicleValue() {
    this.accidentForm = this.fb.group({
      Route: ['', [Validators.required, Validators.pattern('')]],
      cause_of_accident: ['', [Validators.required, Validators.pattern('')]],
      driver: ['', [Validators.required, Validators.pattern('')]],
      remark: ['', [Validators.required, Validators.pattern('')]],
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      date: [this.bsValue, [Validators.required, Validators.pattern('')]],
      photo: ['', [Validators.required, Validators.pattern('')]],
      time: [new Date(), [Validators.required, Validators.pattern('')]]
    })
  }

  /**
   * vehicle list here
   */
  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getRouteList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      if (data && data.length > 0) { }
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME +' /' + val?.routE_NO
        }
      )
    })
  }

  /**
   * when clicked on vehicle get vehicle data
   * @param event 
   */

  confirm(event: any) {
    // if(event.sele)
    console.log("check evetm", event);
    if(event.selectType == 'Vehicle') {
      this.accidentForm.controls['vehicle'].setValue(event.id)
    } else if (event.selectType == 'Driver'){
      this.accidentForm.controls['driver'].setValue(event.assets_no)
    } else {
      this.accidentForm.controls['Route'].setValue(event.id)
    }

  }

  changeDocument(event: any) {
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0].name);
  }



  submit(formvalue: any) {
    if (!formvalue) return;
    let payload = {
      "RouteNo": formvalue.Route.toString(),
      "VehicleNo": this.accidentForm.value.vehicle,
      "DriverName":formvalue.driver,
      "date": formatDate(formvalue.date, 'yyyy-MM-dd', 'en-US'),
      "time": formatDate(formvalue.time, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "photo": formvalue.photo,
      "COA": formvalue.cause_of_accident,
      "Remarks": formvalue.remark,
      "RESULT": ""
    }

    this.registrationService.Accidentregistration(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'Success') {

        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert()
        this.accidentForm.reset()
      } else {
        this.alertData = {
          message: 'Accident Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
    this.accidentForm.reset()
    this.selectedRouteValue = {
      value: '',
      text: ''
    }
    this.selectedDriverValue = {
      value: '',
      text: ''
    }
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
    
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
  cancel() {
    this.accidentForm.reset()
    this.selectedRouteValue = {
      value: '',
      text: ''
    }
    this.selectedDriverValue = {
      value: '',
      text: ''
    }
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
  }

  getDriverDetail() {
    this.shardService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }
}
