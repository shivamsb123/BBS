import { Location, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';
import { RegistrationService } from 'src/app/features/registration/services/registration.service';

@Component({
  selector: 'app-create-battery-link-page',
  templateUrl: './create-battery-link-page.component.html',
  styleUrls: ['./create-battery-link-page.component.scss']
})
export class CreateBatteryLinkPageComponent {
  vehicleData: any;
  selectedValue: any;
  zoneList: any;
  selectedZoneValue: any
  BatteryList: any;
  selectedBatteryValue: any
  locationList: any;
  addBatteryForm!: FormGroup;
  selectedLocationValue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false
  blinkId: any;
  batteryData: any
  button: string = 'Add';
  alertMessage: string = 'Added';
  constructor(
    private sharedService: SharedService,
    private registrationService: RegistrationService,
    private maintenanceService: MaintenanceService,
    private fb: FormBuilder,
    private route: Router,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getVehicleZoneData();
    this.getBatteryNoList();
    this.blinkId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.blinkId) {
      this.batteryData = this.location?.getState();  
      console.log("chsdjkf", this.batteryData);
          
    }
    this.setInitialValue()

   
  }

  setInitialValue() {
   if (this.blinkId) {
    this.button = 'Update',
    this.alertMessage = 'Updated'
      this.addBatteryForm = this.fb.group({
        vehicleNo: [this.batteryData?.buS_ID, [Validators.required, Validators.pattern('')]],
        zoneName: ['46', [Validators.required, Validators.pattern('')]],
        batteryNo: [this.batteryData?.batterY_NO, [Validators.required, Validators.pattern('')]],
        km: [this.batteryData?.kM_INSTALLATION, [Validators.required, Validators.pattern('')]],
        fittedDate: [new Date(this.batteryData.batterY_INSTALLATION_DATE), [Validators.required, Validators.pattern('')]],
        location: [this.batteryData?.baT_LOCATION, [Validators.required, Validators.pattern('')]],
      })
    } else {
      this.addBatteryForm = this.fb.group({
        vehicleNo: ['', [Validators.required, Validators.pattern('')]],
        zoneName: ['46', [Validators.required, Validators.pattern('')]],
        batteryNo: ['', [Validators.required, Validators.pattern('')]],
        km: ['', [Validators.required, Validators.pattern('')]],
        fittedDate: [new Date(), [Validators.required, Validators.pattern('')]],
        location: ['Select', [Validators.required, Validators.pattern('')]],
      })
    }
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
      if(this.blinkId) {
        let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.text == this.batteryData?.vehiclE_NO);
        newVehicleValue.forEach((data: any) => {  
          this.selectedValue = data
        });
      }
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

  getLocation() {
    let payload = {
      "BUS_ID": parseInt(this.addBatteryForm.value.vehicleNo)
    }
    this.maintenanceService.getLocation(payload).subscribe((res: any) => {
      this.locationList = res?.body?.data

    })
  }

  confirm(event: any) {
    console.log(event);
    if (event.selectType == 'Vehicle') {
      this.addBatteryForm.controls['vehicleNo'].setValue(event.id)
      this.getLocation()
    } else if (event.selectType == 'Battery') {
      this.addBatteryForm.controls['batteryNo'].setValue(event.id)
    }
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  submit(formvalue: any) {    
    let payload = {
      "MODE": 0,
      "BLINK_ID": 0,
      "BATTERY_ID": 3,
      "DEPOT_ID": parseInt(localStorage.getItem('dept_id')),
      "BUS_ID": parseInt(formvalue?.vehicleNo),
      "KM_INSTALLATION": formvalue?.km,
      "BATTERY_INSTALLATION_DATE": formatDate(formvalue.fittedDate, 'dd-MM-yyyy', 'en-US'),
      "BAT_LOC_ID": 0,
      "CREATED_BY": 1,
      "Result": ""
    }
    if(this.blinkId) {
      payload['MODE'] = 1,
      payload['BLINK_ID'] = parseInt(this.blinkId)
    }   

    this.maintenanceService.addBatteryLinking(payload).subscribe((res: any) => {
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
        this.button = 'Add'
        setTimeout(() => {
          this.route.navigateByUrl('/Maintenance/Bat_Battery_Link_Depot')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  cancel() {
    this.addBatteryForm.reset();
    this.addBatteryForm.controls['zoneName'].setValue('46')
    this.selectedValue = {
      text:'',
      value: ''
    }
  }
}
