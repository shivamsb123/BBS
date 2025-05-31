import { Component } from '@angular/core';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-alert-assign',
  templateUrl: './alert-assign.component.html',
  styleUrls: ['./alert-assign.component.scss']
})
export class AlertAssignComponent {
  isloading: boolean = false;
  tableData: any;
  assignList:any
  alertTypeData:any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  constructor(
    private managementService: ManagementService,
  ) { }

  ngOnInit(): void {
    this.initialTable()
    this.getAlertMaster()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Sr.No.' },
      { key: 'keyValue', val: 'Alert Name' },
      { key: 'keyValue', val: 'Sms' },
      { key: 'keyValue', val: 'Email' },
      { key: 'keyValue', val: 'Web' },
      { key: 'keyValue', val: 'Priority' },
    ]
  }

  getAlertMaster() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Alert_ID": "0"
    }
    this.managementService.alertMaster(payload).subscribe((res: any) => {
      this.assignList = res?.body.data;
    });
  }

  confirm(event: any) {

  }

}
