import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from '../../http-services/scroll.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;

  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false
  tableData: any;
  deviceList: any;
  searchKeyword: any
  subVehicleTypeList: any;
  addDevice!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  assetsSubId: any;
  id: any;
  assetsno: any;
  imei: any;
  asstesTypeNo: any;
  selectedValue: any;
  button: string = 'Add';
  alertMessage: string = 'Added'
  excelData: any;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private scrollService: ScrollService,
    private route: Router,
    private excelService: ExcelFormatService
  ) { }
  ngOnInit(): void {
    this.setInitialTbale();
    this.setInitialValue()
    this.getDeviceList();
    this.getVehicleSubType();
  }

  setInitialTbale() {
    this.tableData = [
      { key: '', value: 'DEPARTMENT' },
      { key: '', value: 'STATUS' },
      { key: '', value: 'IMEI NUMBER' },
      { key: '', value: 'ASSET NO' },
      { key: '', value: 'GMT HOURS' },
      { key: '', value: 'GMT MINS' },
      { key: '', value: 'SPEED CORR' },
      { key: '', value: 'IP' },
      { key: '', value: 'PORT' },
      { key: '', value: 'DEVICE VENDOR' },
      { key: '', value: 'DEVICE MODEL' },
      { key: '', value: 'SIM NO' },
      { key: '', value: 'SIM VENDOR' },
      { key: '', value: 'APN' },
      { key: '', value: 'ASSET TYPE' },
      { key: '', value: 'ASSET VENDOR' },
      { key: '', value: 'ASSET MODEL' },
      { key: '', value: 'GPRS INTERV' },
      { key: '', value: 'CURR PWD' },
      { key: '', value: 'Action' },
    ]
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

  getDeviceList() {
    this.isloading = true;
    let payload: any;
    if (this.assetsSubId || this.id || this.assetsno || this.imei) {
      payload = {
        "PageNo": 1,
        "PageSize": 100,
        User_ID: parseInt(localStorage.getItem('user_Id') || ''),
        DEPT_ID: parseInt(localStorage.getItem('dept_id') || ''),
        "ASSET_NO": "",
        "MOBILE_NO": "",
        "DEVICE_ID": "",
        "asseT_SUB_ID": this.assetsSubId,
        "id": this.id,
        "asseT_NO": this.assetsno,
        "imei": this.imei
      }
    } else {
      payload = {
        "PageNo": 1,
        "PageSize": 100,
        "ASSET_NO": "",
        "MOBILE_NO": "",
        "DEVICE_ID": "",
        User_ID: parseInt(localStorage.getItem('user_Id') || ''),
        DEPT_ID: parseInt(localStorage.getItem('dept_id') || ''),
      }
    }

    this.registrationService.deviceList(payload).subscribe((res: any) => {
      this.deviceList = res?.body?.data;
      this.isloading = false;

    })
  }

  /**
  * clear search keyword
  */
  clearSearchField() {
    this.searchKeyword = '';
    this.deviceList = [];
    setTimeout(() => {
      this.getDeviceList();
    }, 100)
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  update(asstesSub: any, id: any, assetsNo: any, imeino: any) {
    this.assetsSubId = asstesSub;
    this.id = id;
    this.assetsno = assetsNo;
    this.imei = imeino;
    this.button = 'Update';
    this.alertMessage = 'Updated';
    this.scrollService.scrollToElementById('content');

    this.deviceList.forEach((val: any) => {
      if (this.id == val?.id) {
        let newVehicleType = this.subVehicleTypeList?.filter((ele: any) => ele?.value == val?.asseT_SUB_ID);
        newVehicleType.forEach((data: any) => {
          this.selectedValue = data
        });
        this.asstesTypeNo = val?.asseT_SUB_ID
        this.addDevice = this.fb.group({
          imei: [val?.imei, [Validators.required, Validators.pattern('')]],
          deviceId: [val?.devicE_ID, [Validators.required, Validators.pattern('')]],
          deviceVendor: [val?.devicE_VENDOR, [Validators.required, Validators.pattern('')]],
          deviceModel: [val?.devicE_MODEL, [Validators.required, Validators.pattern('')]],
          assetsNo: [val?.asseT_NO, [Validators.required, Validators.pattern('')]],
          assestType: ['', [Validators.required, Validators.pattern('')]],
          assetsVendor: [val?.asseT_VENDOR, [Validators.required, Validators.pattern('')]],
          assetsModel: ['', [Validators.required, Validators.pattern('')]],
          ipAdd: [val?.ip, [Validators.required, Validators.pattern('')]],
          portno: [val?.port, [Validators.required, Validators.pattern('')]],
          poll_interval: [val?.gprS_INTERVAL, [Validators.required, Validators.pattern('')]],
          com_pwd: [val?.current_Password, [Validators.required, Validators.pattern('')]],
          phn: [val?.mobilE_NO, [Validators.required, Validators.pattern('')]],
          simVendor: [val?.siM_VENDOR, [Validators.required, Validators.pattern('')]],
          simNumber: [val?.siM_NO, [Validators.required, Validators.pattern('')]],
          apn: [val?.apn, [Validators.required, Validators.pattern('')]],
          hour: [val?.gmT_HOUR, [Validators.required, Validators.pattern('')]],
          minute: [val?.gmT_MNT, [Validators.required, Validators.pattern('')]],
          speed_corr: [val?.speeD_CORRECTION, [Validators.required, Validators.pattern('')]],
          status: [val?.status, [Validators.required, Validators.pattern('')]],

        })
        this.addDevice.controls['assestType'].setValue(val?.asseT_SUB_ID)
      }
    })
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
        this.getDeviceList();
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

  cancel() {
    this.addDevice.reset()
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  redirectTo() {
    this.route.navigateByUrl('/Registration/Create_Device')
  }

  ExportTOExcel() {
    this.excelData = this.deviceList.map((item: any) => {
      {
        return {
          'DEPARTMENT': item?.department,
          'STATUS': item?.status == 1 ? 'Active' : item?.status == 0 ? 'Inactive' : '',
          'IMEI NUMBER': item?.imei,
          'ASSET NO': item?.asseT_NO,
          'GMT HOURS': item?.gmT_HOUR,
          'GMT MINS': item?.gmT_MNT,
          'SPEED CORR': item?.speeD_CORRECTION,
          'IP': item?.ip,
          'PORT': item?.port,
          'DEVICE VENDOR': item?.devicE_VENDOR,
          'DEVICE MODEL': item?.devicE_MODEL,
          'SIM NO': item?.siM_NO,
          'SIM VENDOR': item?.siM_VENDOR,
          'APN': item?.apn,
          'ASSET TYPE': item?.asseT_SUB_ID == 2 ? 'BUS' : item?.asseT_SUB_ID == 3 ? 'CAR' : item?.asseT_SUB_ID == 8 ? 'Cell ID Terminal' : item?.asseT_SUB_ID == 5 ? 'Fixed Device' : item?.asseT_SUB_ID == 6 ? 'Mobile' : item?.asseT_SUB_ID == 9 ? 'OBU' : item?.asseT_SUB_ID == 4 ? 'TRUCK' : '',
          'ASSET VENDOR': item?.asseT_VENDOR,
          'ASSET MODEL': item?.asseT_MODEL,
          'GPRS INTERV': item?.gprS_INTERVAL,
          'CURR PWD': item?.current_Password,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Device List')
  }
}
