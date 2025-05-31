import { Component } from '@angular/core';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-alert-master',
  templateUrl: './alert-master.component.html',
  styleUrls: ['./alert-master.component.scss']
})
export class AlertMasterComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  alertMasterList: any;
  editAlert: any;
  alertDetail: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;

  constructor(
    private managementService: ManagementService,
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getAlertMaster()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Sr.no.' },
      { key: 'keyValue', val: 'Alert Name' },
      { key: 'keyValue', val: 'Alert Description' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  getAlertMaster() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Alert_ID": "0"
    }
    this.managementService.alertMaster(payload).subscribe((res: any) => {
      this.alertMasterList = res?.body.data;
    });
  }

  updateAlertMaster(data: any) {
    this.alertDetail = data
    let payload = {
      "Alert_ID": parseInt(this.alertDetail.alert_ID),
      "ALERT_TYPE": this.alertDetail.alerT_TYPE,
      "ALERT_DESCRIPTION": this.alertDetail.alerT_DESCRIPTION,
      "Remarks": this.alertDetail.remarks,
      "Result": ""
    }

    this.managementService.updateAlertMaster(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200) {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getAlertMaster()
      } else {
        this.alertData = {
          message: 'Remark Not Updated',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    });
    this.editAlert = null;
  }

  editRemark(index: any) {
    this.editAlert = index
    console.log("editRemark", this.editAlert);

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
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  };
}
