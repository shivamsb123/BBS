import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';

@Component({
  selector: 'app-battery-health-checkup',
  templateUrl: './battery-health-checkup.component.html',
  styleUrls: ['./battery-health-checkup.component.scss']
})
export class BatteryHealthCheckupComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsValue = new Date();
  healthcheckupList: any;
  helthCheckupForm!: FormGroup
  vehicleData: any;
  selectedValue: any
  BatteryList: any;
  selectedBatteryValue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false

  constructor(
    private maintenanceService: MaintenanceService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.setInitialValue()
    this.getVehicleZoneData()
    this.setInitialtable();
    this.getHealthCheckupList()
  }

  setInitialValue() {
    this.helthCheckupForm = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      batteryNo: ['', [Validators.required, Validators.pattern('')]],
      checkDate: [new Date(), [Validators.required, Validators.pattern('')]],
      gravity1: ['', [Validators.required, Validators.pattern('')]],
      gravity2: ['', [Validators.required, Validators.pattern('')]],
      gravity3: ['', [Validators.required, Validators.pattern('')]],
      gravity4: ['', [Validators.required, Validators.pattern('')]],
      gravity5: ['', [Validators.required, Validators.pattern('')]],
      gravity6: ['', [Validators.required, Validators.pattern('')]],
      Voltage: ['', [Validators.required, Validators.pattern('')]],
      waterToUp: ['1', [Validators.required, Validators.pattern('')]],
      clampRod: ['1', [Validators.required, Validators.pattern('')]],
      petrolJelly: ['1', [Validators.required, Validators.pattern('')]],
      remark: ['', [Validators.required, Validators.pattern('')]],
      eleName: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Battery No' },
      { key: 'keyValue', val: 'Battery Check Date' },
      { key: 'keyValue', val: 'Gravity 1' },
      { key: 'keyValue', val: 'Gravity 2' },
      { key: 'keyValue', val: 'Gravity 3' },
      { key: 'keyValue', val: 'Gravity 4' },
      { key: 'keyValue', val: 'Gravity 5' },
      { key: 'keyValue', val: 'Gravity 6' },
      { key: 'keyValue', val: 'Voltage' },
      { key: 'keyValue', val: 'Water Top UP' },
      { key: 'keyValue', val: 'Clamp Rod' },
      { key: 'keyValue', val: 'Petrol Jelly' },
      { key: 'keyValue', val: 'Remarks Battery Change No' },
      { key: 'keyValue', val: 'Electrian Name' },

    ]
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getBatteryNoList() {
    let payload = {
      "depoT_ID": parseInt(localStorage.getItem('dept_id'))
    }
    this.maintenanceService.batteryNoList(payload).subscribe((res: any) => {
      this.BatteryList = res?.body?.data

    })
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.helthCheckupForm.controls['vehicleNo'].setValue(event.id)
    } else if (event.selectType == 'Battery') {
      this.helthCheckupForm.controls['batteryNo'].setValue(event.id)
    }
  }

  getHealthCheckupList() {
    this.isloading = true;
    let payload = {
      "Depot_ID": 46,
      "BUS_ID": 0,
      "PageNo": 1,
      "PageSize": 100

    }
    this.maintenanceService.batteryHealthList(payload).subscribe((res: any) => {
      this.healthcheckupList = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  };

  
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    console.log("check fomr", formvalue);
    let payload = {
      "MODE": 0,
      "CHK_ID": 0,
      "BUS_ID": formvalue?.vehicleNo ? parseInt(formvalue?.vehicleNo) : 0,
      "BATTERY_NO":formvalue?.batteryNo? parseInt(formvalue?.batteryNo) : 0,
      "BAT_CHK_DATE": formatDate(formvalue.checkDate, 'dd/MM/yyyy', 'en-US'),
      "GARVITY_1": formvalue.gravity1,
      "GARVITY_2":  formvalue.gravity2,
      "GARVITY_3":  formvalue.gravity3,
      "GARVITY_4":  formvalue.gravity4,
      "GARVITY_5":  formvalue.gravity5,
      "GARVITY_6": formvalue.gravity6,
      "VOLTAGE": formvalue.Voltage,
      "WATER_TOP_UP": formvalue.waterToUp,
      "CLAMP_ROD": formvalue.clampRod,
      "PETROL_JELLY": formvalue.petrolJelly,
      "REMARKS": formvalue.remark,
      "ELEC_NAME": formvalue.eleName,
    }    

    this.maintenanceService.addBatteryHealthCheckup(payload).subscribe((res:any) => {
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
        this.getHealthCheckupList();
        this.helthCheckupForm.reset();
      } else {
        this.alertData = {
          message: `Data Not Added`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })

  }
}
