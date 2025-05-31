import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.component.html',
  styleUrls: ['./route-master.component.scss']
})
export class RouteMasterComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  alertType: any = "success";
  alertTrigger: any = false;
  alertData: any = {
    message: "success",
  };
  routeMasterForm: any;
  routMasterList:any
  routeMode: any = 0
  button: any = 'Add'
  routeId: any;
  errorMessage:any = 'Added';
  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.initialTable()
    this.setInitialValue()
    this.getRouteMasterData()
  }

  initialTable() {
    this.tableData = [
      // { key: 'keyValue', val: 'Route No.' },
      { key: 'keyValue', val: 'Route Name ' },
      { key: 'keyValue', val: 'Route Group No. ' },
      { key: 'keyValue', val: 'Origin ' },
      { key: 'keyValue', val: 'Depot ' },
      { key: 'keyValue', val: 'Destination' },
      { key: 'keyValue', val: 'Via ' },
      { key: 'keyValue', val: 'Depot To Origin' },
      { key: 'keyValue', val: 'Origin To Depot' },
      { key: 'keyValue', val: 'Scheduled KM' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  setInitialValue() {
    this.routeMasterForm = this.fb.group({
      route_no: ['', [Validators.required, Validators.pattern('')]],
      route_name: ['', [Validators.required, Validators.pattern('')]],
      route_group_no: ['', [Validators.required, Validators.pattern('')]],
      origin: ['', [Validators.required, Validators.pattern('')]],
      depot: ['', [Validators.required, Validators.pattern('')]],
      destination: ['', [Validators.required, Validators.pattern('')]],
      via: ['', [Validators.required, Validators.pattern('')]],
      depot_to_origin: ['', [Validators.required, Validators.pattern('')]],
      origin_to_depot: ['', [Validators.required, Validators.pattern('')]],
      route_colour: ['', [Validators.required, Validators.pattern('')]],
      scheduled_KM: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  submit(formvalue: any) {
    let payload = {
      "MODE": this.routeMode,
      "ROUTE_ID": 0,
      "ROUTE_NO": formvalue?.route_no,
      "ROUTE_NAME": formvalue?.route_name,
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "ADDED_ON": "",
      "route_group_no": formvalue?.route_group_no,
      "grade": "",
      "unit": "",
      "origin": formvalue?.origin,
      "depot": formvalue?.depot,
      "destination": formvalue?.destination,
      "via": formvalue?.via,
      "night_halt": "",
      "depot_to_orgion": formvalue?.depot_to_origin,
      "origin_to_depot": formvalue?.origin_to_depot,
      "ROUTE_COLOR": formvalue?.route_colour,
      "Scheduled_KM": parseInt(formvalue?.scheduled_KM),
      "R_Status": 1,
      "bStatus": 1,
      "Color_Code": 1,
      "Result": ""
    }
    if (this.routeMode == 1) {
      this.errorMessage = 'Updated'
      payload["ROUTE_ID"] = this.routeId
    }

    this.registrationService.addRouteMaster(payload).subscribe((res: any) => {
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
        this.getRouteMasterData()
      } else {
        this.alertData = {
          message: `Route Not ${this.errorMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
    this.routeMasterForm.reset()
  }

  getRouteMasterData(){
    this.isloading = true
    let payload = {
      "PageNO":1,
      "PageSize":100,
      "ROUTE_ID":0
    }
    this.registrationService.routeMasterList(payload).subscribe((res: any) => {
      this.routMasterList = res?.body?.data
      this.isloading = false
    })
  }

  updateRoute(id:any){
    this.routeId = id
    this.routeMode = 1
    this.button = 'Update'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    this.routMasterList?.forEach((val:any)=>{
      if(this.routeId == val?.routE_ID){
        this.routeMasterForm = this.fb.group({
          route_no: [val?.routE_NO, [Validators.required, Validators.pattern('')]],
          route_name: [val?.routE_NAME, [Validators.required, Validators.pattern('')]],
          route_group_no: [val?.route_group_no, [Validators.required, Validators.pattern('')]],
          origin: [val?.origin, [Validators.required, Validators.pattern('')]],
          depot: [val?.depot, [Validators.required, Validators.pattern('')]],
          destination: [val?.destination, [Validators.required, Validators.pattern('')]],
          via: [val?.via, [Validators.required, Validators.pattern('')]],
          depot_to_origin: [val?.depot_to_orgion, [Validators.required, Validators.pattern('')]],
          origin_to_depot: [val?.origin_to_depot, [Validators.required, Validators.pattern('')]],
          route_colour: [val?.routE_COLOR, [Validators.required, Validators.pattern('')]],
          scheduled_KM: [val?.scheduled_KM, [Validators.required, Validators.pattern('')]],
        })
      }
     
    })
  }

  changeOriginValue() {
    let originToDepotValue = this.routeMasterForm.value.origin + ' - ' + this.routeMasterForm.value.depot
    this.routeMasterForm.controls['origin_to_depot'].setValue(originToDepotValue)

    let depotToOriginToalue = this.routeMasterForm.value.depot + ' - ' + this.routeMasterForm.value.origin
    this.routeMasterForm.controls['depot_to_origin'].setValue(depotToOriginToalue)
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  cancel(){
    this.routeMasterForm.reset()
  }
}
