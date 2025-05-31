import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { ManagementService } from '../services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-on-road-offroad',
  templateUrl: './on-road-offroad.component.html',
  styleUrls: ['./on-road-offroad.component.scss']
})
export class OnRoadOffroadComponent implements OnInit {

  depoOnRoad = {
    isVehicleOnRoad: true,
    isVehicleOffRoad: true,
  }
  markOnRoadForm!: FormGroup;
  markOffRoadForm!: FormGroup
  department: any;
  vehicleList: any;
  vehicleId: any;
  onOffRoadVehicleData: any;
    alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  type: any;
  constructor(
    private shardService: SharedService,
    private managementService: ManagementService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setInitialValue()
    this.getOnOffRoadVehicle();
  }

  setInitialValue() {
    this.markOnRoadForm = this.fb.group({
      offRoadVehicle: ['', [Validators.required,Validators.pattern('')]],
      onRoadOdd: ['', [Validators.required,Validators.pattern('')]],
      onRoadRemark: ['', [Validators.required,Validators.pattern('')]],
      onRoadDateTime: [new Date(), [Validators.required,Validators.pattern('')]],
    });

    this.markOffRoadForm = this.fb.group({
      onRoadVehicle: ['', [Validators.required,Validators.pattern('')]],
      offRoadReason: ['1', [Validators.required,Validators.pattern('')]],
      offRoadOdd: ['', [Validators.required,Validators.pattern('')]],
      offRoadRemark: ['', [Validators.required,Validators.pattern('')]],
      offRoadDateTime: [new Date(), [Validators.required,Validators.pattern('')]],
    })
  }



  getOnOffRoadVehicle() {
    let payload = {
      "UserId":  parseInt(localStorage.getItem('user_Id') || ''),
      "ZoneId": 0,
      "ShowDeviceId": 0

    }
    this.managementService.onOffRoadVehicle(payload).subscribe((res: any) => {
      this.vehicleList = res?.body?.data;
    })
  }


  confirm(event:any) {
    if(event.selectType == 'OffVehicle') {
      this.markOnRoadForm.controls['offRoadVehicle'].setValue(event.id);
      this.getOnOffVehicle(event.id, 'OnRoad')
    } else {
      this.markOffRoadForm.controls['onRoadVehicle'].setValue(event.id);
      this.getOnOffVehicle(event.id, 'OFFRoad')
    }
  }

  getOnOffVehicle(id:any, type:any) {
    this.type = type
    let payload = {
      "VehicleId":parseInt(id)
    }
    this.managementService.onOffRoadKms(payload).subscribe((res:any) => {
      this.onOffRoadVehicleData = res?.body?.data
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }



  markOnRoad(formvalue:any) {
    let payload = {
      "VehicleId":parseInt(formvalue.offRoadVehicle),
    "OnRoadDateTime": formatDate(formvalue.onRoadDateTime, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
    "OnRoadOdometer":parseInt(formvalue.onRoadOdd),
    "OnRoadRemark": formvalue.onRoadRemark,
    "OnRoadBy":75
    }
    this.managementService.markOnRoad(payload).subscribe((res:any) => {
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
       this.stopAlert();
     } else {
       this.alertData = {
         message: res?.body?.alert,
       };
       this.alertType = "danger";
       this.alertTrigger = true;
       this.stopAlert();
     }
    })
    
  }

  MarkOffRoad(formvalue:any) {
    let payload = {
      "VehicleId":parseInt(formvalue.onRoadVehicle),
      "OffRoadTypeId": parseInt(formvalue.offRoadReason),
      "OffRoadDateTime":formatDate(formvalue.offRoadDateTime, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "OffRoadOdometer": parseInt(formvalue.offRoadOdd),
      "OffRoadRemark":formvalue.offRoadRemark,
      "OffRoadBy":75
    }
    this.managementService.markOffRoad(payload).subscribe((res:any) => {
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
       this.stopAlert();
     } else {
       this.alertData = {
         message: res?.body?.alert,
       };
       this.alertType = "danger";
       this.alertTrigger = true;
       this.stopAlert();
     }
    })
  }

}
