import { Component } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-alert-setting-with-vehicle',
  templateUrl: './alert-setting-with-vehicle.component.html',
  styleUrls: ['./alert-setting-with-vehicle.component.scss']
})
export class AlertSettingWithVehicleComponent {
  isloading: boolean = false;
  tableData: any;
  alertTypeData: any
  vehicleList: any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  company: any;
  selectedValue: any
  alertList: any;
  selectedAlert:any
  constructor(
    private sharedService: SharedService,
    private managementService: ManagementService,
  ) { }

  ngOnInit(): void {
    this.initialTable()
    this.getAlertMaster()
    this.getCompany()
    // this.getVehicleZoneData()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Sr.No.' },
      { key: 'keyValue', val: 'Vehicle No.' },
      { key: 'keyValue', val: 'Sms' },
      { key: 'keyValue', val: 'Email' },
      { key: 'keyValue', val: 'Web' },
    ]
  }

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleList = res?.body?.data;
      console.log("vehicleList",this.vehicleList);
      
    })
  }

  getAlertMaster() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Alert_ID": "0"
    }
    this.managementService.alertMaster(payload).subscribe((res: any) => {
      let data = res?.body.data;
      this.alertList = data.map((val: any) =>
        newData = {
          value: val?.alert_ID,
          text: val?.alerT_DESCRIPTION
        }
      )
    });
  }

  confirm(event: any) {
if(event.selectType == 'Alert'){
  this.getVehicleZoneData()
}
else if(event.selectType == 'company'){

}
  }

}
