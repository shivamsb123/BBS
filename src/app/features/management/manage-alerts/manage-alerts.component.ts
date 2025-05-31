import { Component } from '@angular/core';
import { UserService } from '../../shared/user/services/user.service';
import { ManagementService } from '../services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-alerts',
  templateUrl: './manage-alerts.component.html',
  styleUrls: ['./manage-alerts.component.scss']
})
export class ManageAlertsComponent {

  alertTypeData: any;
  alertypeValue: any;
  alertAssignedList: any;
  isloading: boolean = false;
  alertList: any;
  selectedvehicleIndex: any
  selectedZoneId: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  selectedVehicleForm!: FormGroup;
  notselectedVehicleForm!: FormGroup

  constructor(
    private managementService: ManagementService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.getAlertList();
    this.setInitialValue()
  }

  setInitialValue() {
    this.selectedVehicleForm = this.fb.group({
      alertvalue: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.pattern('')]],
      phn: ['', [Validators.required, Validators.pattern('')]],
      repatafter: ['', [Validators.required, Validators.pattern('')]],
      emailHigher: ['', [Validators.required, Validators.pattern('')]],
      phnHigher: ['', [Validators.required, Validators.pattern('')]],
      repeatHigher: ['', [Validators.required, Validators.pattern('')]],
    })

    this.notselectedVehicleForm = this.fb.group({
      overSpeed: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.pattern('')]],
      phn: ['', [Validators.required, Validators.pattern('')]],
      repatafter: ['', [Validators.required, Validators.pattern('')]],
      emailHigher: ['', [Validators.required, Validators.pattern('')]],
      phnHigher: ['', [Validators.required, Validators.pattern('')]],
      repeatHigher: ['', [Validators.required, Validators.pattern('')]],
    })
  }
  getAlertList() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "AlertId": 20,
      "Value": "0"
    }
    this.managementService.manageAlertList(payload).subscribe((res: any) => {
      this.alertTypeData = res?.body.data;

    });
  }

  getAssignedList() {
    this.isloading = true;
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "AlertId": parseInt(this.alertypeValue),
      "Value": "0"
    }
    this.managementService.manageAssignedNotAssigned(payload).subscribe((res: any) => {
      this.alertList = res?.body?.data;
      this.isloading = false;
    })
  }

  confirm(event: any) {
    if (event.selectType == 'alert_type') {
      this.alertypeValue = event.id;
      this.getAssignedList();
      this.getContectDetails()
      
    }

  }

  changeVehicleSelection(event: any, index: any, data: any) {
    this.selectedZoneId = data.value;
    this.selectedvehicleIndex = event.target.checked ? index : undefined;
    this.ShowAlertSettingsData()
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  ShowAlertSettingsData() {
    let payload = {
      "VehicleId": parseInt(this.selectedZoneId),
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "AlertId": parseInt(this.alertypeValue),
      "Value": "0"
    }
    this.managementService.ShowAlertSettings(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      data.forEach((val: any) => {
        this.selectedVehicleForm = this.fb.group({
          alertvalue: [val?.alertId, [Validators.required, Validators.pattern('')]],
          email: [val?.emailIds, [Validators.required, Validators.pattern('')]],
          phn: [val?.mobileNos, [Validators.required, Validators.pattern('')]],
          repatafter: [val?.repeatAfter, [Validators.required, Validators.pattern('')]],
          emailHigher: [val?.emailIdsL1, [Validators.required, Validators.pattern('')]],
          phnHigher: [val?.mobileNosL1, [Validators.required, Validators.pattern('')]],
          repeatHigher: [val?.repeatAfterL1, [Validators.required, Validators.pattern('')]],
        })
      })
    })
  }

  removeAlert() {
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "Id": parseInt(this.selectedZoneId),
      "StrIds": 0,
      "AlertId": parseInt(this.alertypeValue),
      "Value": "0",
      "UserId": parseInt(localStorage.getItem('user_Id') || '')
    }
    this.managementService.RemoveAlertSettings(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
      } else {
        this.alertData = {
          message: 'Alert Not Removed',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }



  update(formvalue: any) {
    let payload = {
      "VehicleId": parseInt(this.selectedZoneId),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "SettingId": 0,
      "GeoFenceId": 0,
      "StrIds": 0,
      "AlertId": parseInt(this.alertypeValue),
      "EmailIds": formvalue.email,
      "MobileNos": formvalue.phn,
      "RepeatAfter": parseInt(formvalue.repatafter),
      "Value": "0",
      "UpdateContactSettings": 0,
      "EmailIdsL1": formvalue.emailHigher,
      "MobileNosL1": formvalue.phnHigher,
      "RepeatAfterL1": parseInt(formvalue.repeatHigher),
      "Param1": "",
      "Param2": ""
    }
    this.managementService.UpdateAlertSettings(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
      } else {
        this.alertData = {
          message: 'Alert Not Updated',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  getContectDetails() {
    let payload = {
      "UserId":parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId":parseInt(localStorage.getItem('dept_id') || ''),
      "AlertId": parseInt(this.alertypeValue)  
    }
    this.managementService.GetContactDetailsForAlert(payload).subscribe((res:any) => {
      let data = res?.body?.data;
      this.notselectedVehicleForm = this.fb.group({
        overSpeed: ['', [Validators.required, Validators.pattern('')]],
        email: [data?.emails, [Validators.required, Validators.pattern('')]],
        phn: [data?.mobiles, [Validators.required, Validators.pattern('')]],
        repatafter: [data?.repeatAfter, [Validators.required, Validators.pattern('')]],
        emailHigher: [data?.emailsL1, [Validators.required, Validators.pattern('')]],
        phnHigher: [data?.mobilesL1, [Validators.required, Validators.pattern('')]],
        repeatHigher: [data?.repeatAfterL1, [Validators.required, Validators.pattern('')]],
      })
    })
  }

  addAlert(formvalue:any) {
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "Id": parseInt(this.selectedZoneId),
      "StrIds": 0,
      "AlertId": parseInt(this.alertypeValue),
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "EmailIds": formvalue.email,
      "MobileNos": formvalue.phn,
      "RepeatAfter": parseInt(formvalue.repatafter),
      "Value": "0",
      "UpdateContactSettings": 0,
      "EmailIdsL1": formvalue.emailHigher,
      "MobileNosL1": formvalue.phnHigher,
      "RepeatAfterL1": parseInt(formvalue.repeatHigher)
    }
    this.managementService.AddAlertSettings(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
      } else {
        this.alertData = {
          message: 'Alert Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }


}
