import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { ManagementService } from '../services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-asset-zone',
  templateUrl: './asset-zone.component.html',
  styleUrls: ['./asset-zone.component.scss']
})
export class AssetZoneComponent {
  isloading: boolean = false;
  vehicleData: any;
  driverList: any;
  company: any;
  deptID:any;
  notSelectedZoneForm! : FormGroup;
   isSelected: boolean = false;
  isSelectedAll: any;
  selectedIndex: any;
  selectedvehicleIndex:any;
  notSelectedZoneId: any;
  selectedZoneId: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  selectedZoneForm!: FormGroup;

  constructor(
    private sharedService: SharedService,
    private dashboardService: DashboardService,
    private managementService: ManagementService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.getCompany();
    this.setInitialvalue()

  }

  setInitialvalue() {
    this.notSelectedZoneForm = this.fb.group({
      vehicleCode : ['', [Validators.required, Validators.pattern('')]],
      note1 : ['', [Validators.required, Validators.pattern('')]],
      note2 : ['', [Validators.required, Validators.pattern('')]],
      note3 : ['', [Validators.required, Validators.pattern('')]],
    })

    this.selectedZoneForm = this.fb.group({
      vehicleCode : [new Date(), [Validators.required, Validators.pattern('')]],
      note1 : ['', [Validators.required, Validators.pattern('')]],
      note2 : ['', [Validators.required, Validators.pattern('')]],
      note3 : ['', [Validators.required, Validators.pattern('')]],
    })
  }

  

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  confirm(event :any) {
    this.deptID = event.id;
    this.getVehicleZoneData();
  }
  

  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.isloading = true;
    let payload = {
      "DeptId": parseInt(this.deptID),
      "ZoneId":0  
    }
    this.managementService.GetZoneAssignedVehicleList(payload).subscribe((res: any) => {
      this.vehicleData = res?.body?.data;      
      this.isloading = false;
    })
  }

  changeSelection(event:any, index:any, data:any) {
    this.notSelectedZoneId = data.value;    
    this.selectedIndex = event.target.checked ? index : undefined;
  }

  onLinkSelectecdZone(formvalue:any) {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Id": parseInt(this.notSelectedZoneId),
      "DeptId":parseInt(localStorage.getItem('dept_id') || ''),
      "ZoneId":46,
      "BlockId":0,
      "StopId":0,
      "AssetCode":formvalue.vehicleCode,
      "Note1":formvalue.note1,
      "Note2":formvalue.note2,
      "Note3":formvalue.note3
  
    }
    this.managementService.assignSelectedZone(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
         message: res?.body?.alert
       };
       this.alertType = "success";
       this.alertTrigger = true;
       this.stopAlert();
     } else {
       this.alertData = {
         message: 'Device Not Linked',
       };
       this.alertType = "danger";
       this.alertTrigger = true;
       this.stopAlert();
     }
      
    })
  }


  changeVehicleSelection(event:any, index:any, data:any) {
    this.selectedZoneId = data.value;    
    this.selectedvehicleIndex = event.target.checked ? index : undefined;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  unlinkSelected() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Id": parseInt(this.selectedZoneId)
  
    }
    this.managementService.unAssignSelectedZone(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
         message: res?.body?.alert
       };
       this.alertType = "success";
       this.alertTrigger = true;
       this.stopAlert();
     } else {
       this.alertData = {
         message: 'Device not Unliked',
       };
       this.alertType = "danger";
       this.alertTrigger = true;
       this.stopAlert();
     }
    })
  }

  update(formvalue:any) {    
    let payload = {
      "UserId":parseInt(localStorage.getItem('user_Id') || ''),
      "Id":parseInt(this.selectedZoneId),
      "AssetCode": formatDate(formvalue.vehicleCode, 'yyyy-MM-dd : hh:mm:ss', 'en-US'),
      "Note1":formvalue.note1,
      "Note2":formvalue.note2,
      "Note3":formvalue.note3
    }
    this.managementService.UpdateLinkingZone(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
         message: res?.body?.alert
       };
       this.alertType = "success";
       this.alertTrigger = true;
       this.stopAlert();
     } else {
       this.alertData = {
         message: 'Data Not Updated',
       };
       this.alertType = "danger";
       this.alertTrigger = true;
       this.stopAlert();
     }
    })
  }


}
