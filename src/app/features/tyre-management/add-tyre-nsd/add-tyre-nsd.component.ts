import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TyreService } from '../services/tyre.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-tyre-nsd',
  templateUrl: './add-tyre-nsd.component.html',
  styleUrls: ['./add-tyre-nsd.component.scss']
})
export class AddTyreNsdComponent {
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  AddTyreNsd: any;
  vehicleData: any;
  selectedVehicleValue: any;
  isloading: boolean = false;
  nsdData: any;
  vehicleName: any;
  nsdId: any;
  button: any = 'Save';
  alertMessage: string = 'Added';

  constructor(private shardService: SharedService,
    private fb: FormBuilder,
    private tyreService: TyreService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.getVehicleZoneData()

    this.nsdId = this.ActivatedRoute.snapshot.paramMap.get("id")
    if(this.nsdId){
      
      setTimeout(() => {
        this.getNsdListData()
      }, 500);
    }
    this.setAddTyreformValue()
    
  }
  setAddTyreformValue() {
    this.AddTyreNsd = this.fb.group({
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      Frt_Rh_Nsd_O: ['', [Validators.required, Validators.pattern('')]],
      Frt_Rh_Nsd_M: ['', [Validators.required, Validators.pattern('')]],
      Frt_Rh_Nsd_I: ['', [Validators.required, Validators.pattern('')]],
      Frt_Rh_Tyre_Type: ['1', [Validators.required, Validators.pattern('')]],
      Frt_Rh_Tyre_Ware: ['2', [Validators.required, Validators.pattern('')]],
      Frt_Lh_Nsd_O: ['', [Validators.required, Validators.pattern('')]],
      Frt_Lh_Nsd_M: ['', [Validators.required, Validators.pattern('')]],
      Frt_Lh_Nsd_I: ['', [Validators.required, Validators.pattern('')]],
      Frt_Lh_Tyre_Type: ['1', [Validators.required, Validators.pattern('')]],
      Frt_Lh_Tyre_Ware: ['2', [Validators.required, Validators.pattern('')]],
      RR_Rhs_Inner_Nsd_O: ['', [Validators.required, Validators.pattern('')]],
      RR_Rhs_Inner_Nsd_M: ['', [Validators.required, Validators.pattern('')]],
      RR_Rhs_Inner_Nsd_I: ['', [Validators.required, Validators.pattern('')]],
      RR_Rhs_I_Tyre_Type: ['1', [Validators.required, Validators.pattern('')]],
      RR_Rhs_I_Tyre_Ware: ['2', [Validators.required, Validators.pattern('')]],
      RR_Rhs_Outer_Nsd_O: ['', [Validators.required, Validators.pattern('')]],
      RR_Rhs_Outer_Nsd_M: ['', [Validators.required, Validators.pattern('')]],
      RR_Rhs_Outer_Nsd_I: ['', [Validators.required, Validators.pattern('')]],
      RR_Rhs_O_Tyre_Type: ['1', [Validators.required, Validators.pattern('')]],
      RR_Rhs_O_Tyre_Ware: ['2', [Validators.required, Validators.pattern('')]],
      RR_Lhs_Inner_Nsd_O: ['', [Validators.required, Validators.pattern('')]],
      RR_Lhs_Inner_Nsd_M: ['', [Validators.required, Validators.pattern('')]],
      RR_Lhs_Inner_Nsd_I: ['', [Validators.required, Validators.pattern('')]],
      RR_Lhs_I_Tyre_Type: ['1', [Validators.required, Validators.pattern('')]],
      RR_Lhs_I_Tyre_Ware: ['2', [Validators.required, Validators.pattern('')]],
      RR_Lhs_Outer_Nsd_O: ['', [Validators.required, Validators.pattern('')]],
      RR_Lhs_Outer_Nsd_M: ['', [Validators.required, Validators.pattern('')]],
      RR_Lhs_Outer_Nsd_I: ['', [Validators.required, Validators.pattern('')]],
      RR_Lhs_O_Tyre_Type: ['1', [Validators.required, Validators.pattern('')]],
      RR_Lhs_O_Tyre_Ware: ['2', [Validators.required, Validators.pattern('')]],
      Milo_km: ['', [Validators.required, Validators.pattern('')]],
      Remark: ['', [Validators.required, Validators.pattern('')]],
    })
  }
  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.AddTyreNsd.controls['vehicle'].setValue(event.id) 
    
      
    }
  }
  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  submit(formValue: any) {
    let payload =  {
      "mode": 0,
      "nsD_ID": 0,
      "depoT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "buS_ID": parseInt(formValue.vehicle || ''),
      "nsD_DATE": formatDate(formValue.date, 'yyyy-MM-dd', 'en-US'),
      "frT_RH": 0,
      "frT_LH": 0,
      "rR_RHS_INNER": 0,
      "rR_RHS_OUTER": 0,
      "rR_LHS_INNER": 0,
      "rR_LHS_OUTER": 0,
      "dmilo": formValue.Milo_km ? formValue.Milo_km : 0,
      "remarks": formValue.Remark,
      "createD_BY": 0,
      "result": "",
      "frT_RH_O": formValue?.Frt_Rh_Nsd_O ? formValue?.Frt_Rh_Nsd_O : 0,
      "frT_RH_M": formValue.Frt_Rh_Nsd_M ? formValue.Frt_Rh_Nsd_M : 0,
      "frT_RH_I": formValue.Frt_Rh_Nsd_I ? formValue.Frt_Rh_Nsd_I : 0,
      "frT_LH_O": formValue.Frt_Lh_Nsd_O ? formValue.Frt_Lh_Nsd_O : 0,
      "frT_LH_M": formValue.Frt_Lh_Nsd_M ? formValue.Frt_Lh_Nsd_M : 0,
      "frT_LH_I": formValue.Frt_Lh_Nsd_I ? formValue.Frt_Lh_Nsd_I : 0,
      "rR_RHS_INNER_O": formValue.RR_Rhs_Inner_Nsd_O ? formValue.RR_Rhs_Inner_Nsd_O : 0,
      "rR_RHS_INNER_M": formValue.RR_Rhs_Inner_Nsd_M ? formValue.RR_Rhs_Inner_Nsd_M : 0,
      "rR_RHS_INNER_I": formValue.RR_Rhs_Inner_Nsd_I ? formValue.RR_Rhs_Inner_Nsd_I : 0,
      "rR_RHS_OUTER_O": formValue.RR_Rhs_Outer_Nsd_O ? formValue.RR_Rhs_Outer_Nsd_O : 0,
      "rR_RHS_OUTER_M": formValue.RR_Rhs_Outer_Nsd_M ? formValue.RR_Rhs_Outer_Nsd_M : 0,
      "rR_RHS_OUTER_I": formValue.RR_Rhs_Outer_Nsd_I ? formValue.RR_Rhs_Outer_Nsd_I : 0,
      "rR_LHS_INNER_O": formValue.RR_Lhs_Inner_Nsd_O ? formValue.RR_Lhs_Inner_Nsd_O : 0,
      "rR_LHS_INNER_M": formValue.RR_Lhs_Inner_Nsd_M ? formValue.RR_Lhs_Inner_Nsd_M : 0,
      "rR_LHS_INNER_I": formValue.RR_Lhs_Inner_Nsd_I ? formValue.RR_Lhs_Inner_Nsd_I : 0,
      "rR_LHS_OUTER_O": formValue.RR_Lhs_Outer_Nsd_O ? formValue.RR_Lhs_Outer_Nsd_O : 0,
      "rR_LHS_OUTER_M": formValue.RR_Lhs_Outer_Nsd_M ? formValue.RR_Lhs_Outer_Nsd_M : 0,
      "rR_LHS_OUTER_I": formValue.RR_Lhs_Outer_Nsd_I ? formValue.RR_Lhs_Outer_Nsd_I : 0,
      "frT_RH_STATUS": formValue.Frt_Rh_Tyre_Type,
      "frT_RH_T_WARE": formValue.Frt_Rh_Tyre_Ware,
      "frT_LH_STATUS": formValue.Frt_Lh_Tyre_Type,
      "frT_LH_T_WARE": formValue.Frt_Lh_Tyre_Ware,
      "rR_RHS_I_STATUS": formValue.RR_Rhs_I_Tyre_Type,
      "rR_RHS_I_T_WARE": formValue.RR_Rhs_I_Tyre_Ware,
      "rR_RHS_O_STATUS": formValue.RR_Rhs_O_Tyre_Type,
      "rR_RHS_O_T_WARE": formValue.RR_Rhs_O_Tyre_Ware,
      "rR_LHS_I_STATUS": formValue.RR_Lhs_I_Tyre_Type,
      "rR_LHS_I_T_WARE": formValue.RR_Lhs_I_Tyre_Ware,
      "rR_LHS_O_STATUS": formValue.RR_Lhs_O_Tyre_Type,
      "rR_LHS_O_T_WARE": formValue.RR_Lhs_O_Tyre_Ware,
      "frT_RH_MM": 0,
      "frT_LH_MM": 0,
      "rR_RHS_INNER_MM": 0,
      "rR_RHS_OUTER_MM": 0,
      "rR_LHS_INNER_MM": 0,
      "rR_LHS_OUTER_MM": 0
    }
    if(this.nsdId){
      payload['mode'] = 1
      payload['nsD_ID'] = parseInt(this.nsdId)
    } 
  
    this.tyreService.addTyreNsdData(payload).subscribe((res) => {
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
        this.AddTyreNsd.reset();
        this.selectedVehicleValue = {
          value: '',
          text: ''
        }
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
    this.AddTyreNsd.reset()
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
  }

  getNsdListData() {
    this.button ='Update';
    this.alertMessage= 'Updated'
    let payload = {
      "depot_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "buS_ID": 0,
      "pageNo": 0,
      "pageSize": 0,
      "nsD_ID": parseInt(this.nsdId)
    }
    this.tyreService.nsdList(payload).subscribe((res: any) => {
      this.nsdData = res?.body?.data
      this.nsdData.forEach((val:any) => {
        if(this.nsdId == val.nsD_ID){

          let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.value == val?.buS_ID );
        
        newVehicleValue.forEach((data: any) => {  
          this.selectedVehicleValue = data
        });
          
          this.AddTyreNsd = this.fb.group({
            vehicle: [val.buS_ID, [Validators.required, Validators.pattern('')]],
            date: [new Date(val.nsD_DATE), [Validators.required, Validators.pattern('')]],
            Frt_Rh_Nsd_O: [val.frT_RH_O, [Validators.required, Validators.pattern('')]],
            Frt_Rh_Nsd_M: [val.frT_RH_M, [Validators.required, Validators.pattern('')]],
            Frt_Rh_Nsd_I: [val.frT_RH_I, [Validators.required, Validators.pattern('')]],
            Frt_Rh_Tyre_Type: [val.frT_RH_STATUS, [Validators.required, Validators.pattern('')]],
            Frt_Rh_Tyre_Ware: [val.frT_RH_T_WARE, [Validators.required, Validators.pattern('')]],
            Frt_Lh_Nsd_O: [val.frT_LH_O, [Validators.required, Validators.pattern('')]],
            Frt_Lh_Nsd_M: [val.frT_LH_M, [Validators.required, Validators.pattern('')]],
            Frt_Lh_Nsd_I: [val.frT_LH_I, [Validators.required, Validators.pattern('')]],
            Frt_Lh_Tyre_Type: [val.frT_LH_STATUS, [Validators.required, Validators.pattern('')]],
            Frt_Lh_Tyre_Ware: [val.frT_LH_T_WARE, [Validators.required, Validators.pattern('')]],
            RR_Rhs_Inner_Nsd_O: [val.rR_RHS_INNER_O, [Validators.required, Validators.pattern('')]],
            RR_Rhs_Inner_Nsd_M: [val.rR_RHS_INNER_M, [Validators.required, Validators.pattern('')]],
            RR_Rhs_Inner_Nsd_I: [val.rR_RHS_INNER_I, [Validators.required, Validators.pattern('')]],
            RR_Rhs_I_Tyre_Type: [val.rR_RHS_I_STATUS, [Validators.required, Validators.pattern('')]],
            RR_Rhs_I_Tyre_Ware: [val.rR_RHS_I_T_WARE, [Validators.required, Validators.pattern('')]],
            RR_Rhs_Outer_Nsd_O: [val.rR_RHS_OUTER_O, [Validators.required, Validators.pattern('')]],
            RR_Rhs_Outer_Nsd_M: [val.rR_RHS_OUTER_M, [Validators.required, Validators.pattern('')]],
            RR_Rhs_Outer_Nsd_I: [val.rR_RHS_OUTER_I, [Validators.required, Validators.pattern('')]],
            RR_Rhs_O_Tyre_Type: [val.rR_RHS_O_STATUS, [Validators.required, Validators.pattern('')]],
            RR_Rhs_O_Tyre_Ware: [val.rR_RHS_O_T_WARE, [Validators.required, Validators.pattern('')]],
            RR_Lhs_Inner_Nsd_O: [val.rR_LHS_INNER_O, [Validators.required, Validators.pattern('')]],
            RR_Lhs_Inner_Nsd_M: [val.rR_LHS_INNER_M, [Validators.required, Validators.pattern('')]],
            RR_Lhs_Inner_Nsd_I: [val.rR_LHS_INNER_I, [Validators.required, Validators.pattern('')]],
            RR_Lhs_I_Tyre_Type: [val.rR_LHS_I_STATUS, [Validators.required, Validators.pattern('')]],
            RR_Lhs_I_Tyre_Ware: [val.rR_LHS_I_T_WARE, [Validators.required, Validators.pattern('')]],
            RR_Lhs_Outer_Nsd_O: [val.rR_LHS_OUTER_O, [Validators.required, Validators.pattern('')]],
            RR_Lhs_Outer_Nsd_M: [val.rR_LHS_OUTER_M, [Validators.required, Validators.pattern('')]],
            RR_Lhs_Outer_Nsd_I: [val.rR_LHS_OUTER_I, [Validators.required, Validators.pattern('')]],
            RR_Lhs_O_Tyre_Type: [val.rR_LHS_O_STATUS, [Validators.required, Validators.pattern('')]],
            RR_Lhs_O_Tyre_Ware: [val.rR_LHS_O_T_WARE, [Validators.required, Validators.pattern('')]],
            Milo_km: [val.dmilo, [Validators.required, Validators.pattern('')]],
            Remark: [val.remakrs, [Validators.required, Validators.pattern('')]],
          })
        }
      })
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
      this.router.navigateByUrl('Maintenance/AddTyreNSD')
    }, 2000);
  }
  cancel() {
    this.AddTyreNsd.reset()
    this.selectedVehicleValue = {
      value: '',
      text: ''
    }
    this.setAddTyreformValue()
  }
}
