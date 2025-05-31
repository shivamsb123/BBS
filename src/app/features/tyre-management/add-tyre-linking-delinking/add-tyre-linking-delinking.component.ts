import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TyreService } from '../services/tyre.service';
import { Location, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../registration/services/registration.service';

@Component({
  selector: 'app-add-tyre-linking-delinking',
  templateUrl: './add-tyre-linking-delinking.component.html',
  styleUrls: ['./add-tyre-linking-delinking.component.scss']
})
export class AddTyreLinkingDelinkingComponent {
  AddTyreForm: any
  AddTyreLinkingForm: any
  selectedVehicleValue: any
  slectedLocationValue: any
  selectedDamageTyreValue: any
  damageTyreList: any
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  locationData: any;
  tyrNumberList: any;
  selectedTyreValue: any
  selectedRouteValue: any
  tyreId: any;
  routeList: any;
  tyreLinkingList: any;
  constructor(private shardService: SharedService,
    private fb: FormBuilder,
    private tyreService: TyreService,
    private rotue: Router,
    private ActivatedRoute: ActivatedRoute,
    private location: Location,
    private registrationService: RegistrationService,
  ) { }

  ngOnInit() {
    this.tyreId = this.ActivatedRoute.snapshot.paramMap.get('id')
    this.selectedTyreValue = this.location.getState();
    if (this.tyreId) {
      setTimeout(() => {
        this.updateTyreLinking()
      }, 500);
    }

    this.getVehicleZoneData()
    this.setAddTyreformValue()
    this.getLocationData()
    this.getTyreNumber()
    this.getRouteListData()
  }
  setAddTyreformValue() {
    if (this.tyreId) {
      this.AddTyreLinkingForm = this.fb.group({
        vehicle: ['', [Validators.required, Validators.pattern('')]],
        tyre_number: ['', [Validators.required, Validators.pattern('')]],
        km: ['', [Validators.required, Validators.pattern('')]],
        fitted_date: [new Date(), [Validators.required, Validators.pattern('')]],
        location: ['', [Validators.required, Validators.pattern('')]],
        status: ['Linkig', [Validators.required, Validators.pattern('')]],
        fitted_tyre_no: ['', [Validators.required, Validators.pattern('')]],
        tyre_removal_date: [new Date(), [Validators.required, Validators.pattern('')]],
        tyre_removal_km: ['', [Validators.required, Validators.pattern('')]],
        Reason_for_removed: ['', [Validators.required, Validators.pattern('')]],
        driver_id: ['', [Validators.required, Validators.pattern('')]],
        tyre_status: ['Retread Tyre', [Validators.required, Validators.pattern('')]],
        tyre_nsd_removed_O: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_removed_M: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_removed_I: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_removed_MM: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_O: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_M: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_I: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_MM: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_fitted_O: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_fitted_M: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_fitted_I: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_fitted_MM: ['', [Validators.required, Validators.pattern('')]],
        route_no: ['', [Validators.required, Validators.pattern('')]],
        damage_tyre: ['', [Validators.required, Validators.pattern('')]],
        puncture_location: ['', [Validators.required, Validators.pattern('')]],
        tyre_status_no: ['Retread Tyre', [Validators.required, Validators.pattern('')]],
      })
    } else {
      this.AddTyreForm = this.fb.group({
        vehicle: ['', [Validators.required, Validators.pattern('')]],
        tyre_number: ['', [Validators.required, Validators.pattern('')]],
        km: ['', [Validators.required, Validators.pattern('')]],
        fitted_date: [new Date(), [Validators.required, Validators.pattern('')]],
        location: ['', [Validators.required, Validators.pattern('')]],
        status: ['Linkig', [Validators.required, Validators.pattern('')]],
        tyre_nsd_O: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_m: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_i: ['', [Validators.required, Validators.pattern('')]],
        tyre_nsd_mm: ['', [Validators.required, Validators.pattern('')]],
        tyre_status: ['Retread Tyre', [Validators.required, Validators.pattern('')]]
      })
    }

  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getLocationData() {
    let payload = {
      "buS_ID": 0,
    }
    this.tyreService.getTyreLocation(payload).subscribe((res: any) => {
      this.locationData = res?.body?.data;
    })
  }

  getTyreNumber() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "Result": ""
    }
    this.tyreService.tyreNumber(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.tyrNumberList = data?.map((val: any) =>
        newData = {
          value: val?.tyre_Id,
          text: val?.tyre_No
        })
    })
  }

  getRouteListData() {
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
          text: val?.routE_NAME + ' /' + val?.routE_NO
        }
      )
    })
  }

  updateTyreLinking() {
    let data = this.selectedTyreValue?.tyreData
console.log("data",data);

    let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.value == data?.buS_ID);
    newVehicleValue.forEach((data: any) => {
      this.selectedVehicleValue = data
    });

    let newTyrenumber = this.tyrNumberList?.filter((ele: any) => ele?.value == data?.tyrE_ID)
    newTyrenumber.forEach((data: any) => {
      this.selectedTyreValue = data
    })

    this.AddTyreLinkingForm = this.fb.group({
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      tyre_number: ['', [Validators.required, Validators.pattern('')]],
      km: [data?.kM_INSTALLATION, [Validators.required, Validators.pattern('')]],
      fitted_date: [new Date(), [Validators.required, Validators.pattern('')]],
      location: ['', [Validators.required, Validators.pattern('')]],
      status: [data?.statuS_REMARK, [Validators.required, Validators.pattern('')]],
      fitted_tyre_no: ['', [Validators.required, Validators.pattern('')]],
      tyre_removal_date: [new Date(), [Validators.required, Validators.pattern('')]],
      tyre_removal_km: ['', [Validators.required, Validators.pattern('')]],
      Reason_for_removed: ['', [Validators.required, Validators.pattern('')]],
      driver_id: ['', [Validators.required, Validators.pattern('')]],
      tyre_status: ['Retread Tyre', [Validators.required, Validators.pattern('')]],
      tyre_nsd_removed_O: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_removed_M: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_removed_I: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_removed_MM: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_O: [data?.tyrE_NSD_O, [Validators.required, Validators.pattern('')]],
      tyre_nsd_M: [data?.tyrE_NSD_M, [Validators.required, Validators.pattern('')]],
      tyre_nsd_I: [data?.tyrE_NSD_I, [Validators.required, Validators.pattern('')]],
      tyre_nsd_MM: [data?.tyrE_NSD_MM, [Validators.required, Validators.pattern('')]],
      tyre_nsd_fitted_O: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_fitted_M: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_fitted_I: ['', [Validators.required, Validators.pattern('')]],
      tyre_nsd_fitted_MM: ['', [Validators.required, Validators.pattern('')]],
      route_no: ['', [Validators.required, Validators.pattern('')]],
      damage_tyre: ['', [Validators.required, Validators.pattern('')]],
      puncture_location: [data?.tyrE_NSD_MM, [Validators.required, Validators.pattern('')]],
      tyre_status_no: ['Retread Tyre', [Validators.required, Validators.pattern('')]],
    })
    this.AddTyreLinkingForm.controls['Vehicle'].setValue(data?.buS_ID)
    this.AddTyreLinkingForm.controls['tyre'].setValue(data?.tyrE_ID)
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.AddTyreForm.controls['vehicle'].setValue(event.id)
    } else if (event.selectType == 'tyre') {
      this.AddTyreForm.controls['tyre_number'].setValue(event.id)
    } else if (event.selectType == 'route') {

    }
  }

  submit(formValue: any) {
    let payload = {
      "MODE": 0,
      "LINK_ID": 0,
      "DEPOT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "BUS_ID": parseInt(formValue?.vehicle),
      "FITTED_TYRE_ID": parseInt(formValue?.tyre_number),
      "FITTED_DATE": formatDate(formValue.fitted_date, 'MM-dd-yyyy', 'en-US'),
      "KMS_WHICH_TYRE_FITTED": formValue?.km,
      "NSD_LOC_ID": 0,
      "TYRE_REMOVAL_DATE": "",
      "KMS_WHICH_TYRE_REMOVED": 0,
      "REASON_FOR_REMOVED": "",
      "TYRE_NSD_M": formValue?.tyre_nsd_m,
      "TYRE_NSD_O": formValue?.tyre_nsd_O,
      "TYRE_NSD_I": formValue?.tyre_nsd_i,
      "ACTION_TAKEN": "",
      "CREATED_BY": 1,
      "STATUS_REMARK": formValue?.status,
      "R_TYRE_NSD_M": 0,
      "R_TYRE_NSD_O": 0,
      "R_TYRE_NSD_I": 0,
      "DRIVER_ID": "",
      "TYRE_STATUS": formValue?.tyre_status,
      "DAMAGE_TYPEID": 0,
      "ROUTE_NO": "",
      "PLACE_OF_PUNCTURE": formValue?.location,
      "REMOVE_TYRE_ID": 0,
      "TYRE_NSD_MM": formValue?.tyre_nsd_mm,
      "R_TYRE_NSD_MM": 0,
      "R_F_TYRE_O": 0,
      "R_F_TYRE_M": 0,
      "R_F_TYRE_I": 0,
      "R_F_TYRE_MM": 0,
      "R_F_TYRE_STATUS": "",
      "RESULT": ""

    }

    this.tyreService.AddTyreLinkingData(payload).subscribe((res: any) => {
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
        setTimeout(() => {
          this.rotue.navigateByUrl('/Maintenance/Add_Tyre_Linking')
        },2000)
      } else {
        this.alertData = {
          message: 'Data Not Linking',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel() {
    this.AddTyreForm.reset()
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
    this.setAddTyreformValue()

  }
}

