import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-create-device',
  templateUrl: './create-device.component.html',
  styleUrls: ['./create-device.component.scss']
})
export class CreateDeviceComponent {
  addDevice!: FormGroup;;
  subVehicleTypeList: any;
  assetsSubId: any;
  id: any;
  assetsno: any;
  imei: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  button: string = 'Add';
  alertMessage:string = 'Added';
  selectedValue:any

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ){}

  ngOnInit() {
    this.setInitialValue();
    this.getVehicleSubType()
  }

  setInitialValue() {
    this.addDevice = this.fb.group({
      imei: ['', [Validators.required, Validators.pattern('')]],
      deviceId: ['', [Validators.required, Validators.pattern('')]],
      deviceVendor: ['', [Validators.required, Validators.pattern('')]],
      deviceModel: ['', [Validators.required, Validators.pattern('')]],
      assetsNo: ['', [Validators.required, Validators.pattern('')]],
      assestType: ['', [Validators.required, Validators.pattern('')]],
      assetsVendor: ['', [Validators.required, Validators.pattern('')]],
      assetsModel: ['', [Validators.required, Validators.pattern('')]],
      ipAdd: ['', [Validators.required, Validators.pattern('')]],
      portno: ['', [Validators.required, Validators.pattern('')]],
      poll_interval: ['', [Validators.required, Validators.pattern('')]],
      com_pwd: ['', [Validators.required, Validators.pattern('')]],
      phn: ['', [Validators.required, Validators.pattern('')]],
      simVendor: ['', [Validators.required, Validators.pattern('')]],
      simNumber: ['', [Validators.required, Validators.pattern('')]],
      apn: ['', [Validators.required, Validators.pattern('')]],
      hour: ['', [Validators.required, Validators.pattern('')]],
      minute: ['', [Validators.required, Validators.pattern('')]],
      speed_corr: ['', [Validators.required, Validators.pattern('')]],
      status: ['', [Validators.required, Validators.pattern('')]],

    })
  }

  getVehicleSubType() {
    let newData = {
      value: '',
      text: '',
    }
    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "FLAG": 1,
    }

    this.registrationService.subVehicleType(payload).subscribe((res: any) => {
      let data = res?.body?.data;

      this.subVehicleTypeList = data.map((val: any) =>
        newData = {
          value: val?.asseT_SUB_ID,
          text: val?.asseT_SUB_NAME
        }
      )

    })
  }

  confirm(event: any) {
    this.addDevice.controls['assestType'].setValue(event.id)
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    let payload: any;
    if (this.id) {
      payload = {
        'ID': parseInt(this.id || ''),
        "STATUS": parseInt(formvalue.status || ''),
        "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
        "IMEI": formvalue.imei,
        "DEVICE_ID": formvalue.deviceId,
        "DEVICE_VENDOR": formvalue.deviceVendor,
        "DEVICE_MODEL": formvalue.deviceModel,
        "SIM_VENDOR": formvalue.simVendor,
        "MOBILE_NO": formvalue.phn.toString(),
        "SIM_NO": formvalue.simNumber,
        "ASSET_ID": 0,
        "ASSET_SUB_ID": parseInt(formvalue.assestType || ''),
        "ASSET_VENDOR": formvalue.assetsVendor,
        "ASSET_MODEL": formvalue.assetsModel,
        "ASSET_NO": formvalue.assetsNo,
        "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
        "SPEED_CORRECTION": formvalue.speed_corr,
        "GMT_HOUR": formvalue.hour,
        "GMT_MNT": formvalue.minute,
        "IP": formvalue.ipAdd,
        "PORT": formvalue.portno,
        "GPRS_INTERVAL": formvalue.poll_interval,
        "Current_Password": formvalue.com_pwd,
        "APN": formvalue.apn,
        "DESTINATION": "",
        "USER_NAMES": "",
        "ConsentNotRequired": 0,
        "RESULT": ""
      }
    } else {
      payload = {
        "STATUS": parseInt(formvalue.status || ''),
        "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
        "IMEI": formvalue.imei,
        "DEVICE_ID": formvalue.deviceId,
        "DEVICE_VENDOR": formvalue.deviceVendor,
        "DEVICE_MODEL": formvalue.deviceModel,
        "SIM_VENDOR": formvalue.simVendor,
        "MOBILE_NO": formvalue.phn.toString(),
        "SIM_NO": formvalue.simNumber,
        "ASSET_ID": 0,
        "ASSET_SUB_ID": parseInt(formvalue.assestType || ''),
        "ASSET_VENDOR": formvalue.assetsVendor,
        "ASSET_MODEL": formvalue.assetsModel,
        "ASSET_NO": formvalue.assetsNo,
        "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
        "SPEED_CORRECTION": formvalue.speed_corr,
        "GMT_HOUR": formvalue.hour,
        "GMT_MNT": formvalue.minute,
        "IP": formvalue.ipAdd,
        "PORT": formvalue.portno,
        "GPRS_INTERVAL": formvalue.poll_interval,
        "Current_Password": formvalue.com_pwd,
        "APN": formvalue.apn,
        "DESTINATION": "",
        "USER_NAMES": "",
        "ConsentNotRequired": 0,
        "RESULT": ""
      }
    }

    this.registrationService.deviceregitation(payload).subscribe((res: any) => {
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
        this.assetsSubId = 0; this.id = 0; this.assetsno = 0; this.imei = 0
        this.addDevice.reset();
        this.button = 'Add';
      } else {
        this.alertData = {
          message: `Device Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
    this.addDevice.reset();
    this.alertMessage = 'Added'
    this.selectedValue = {
      value: '',
      text: ''
    }

  }

  cancel(){
    this.addDevice.reset()
    this.selectedValue = {
      value: '',
      text: ''
    }
  }
}
