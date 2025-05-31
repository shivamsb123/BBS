import { Component } from '@angular/core';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { UserService } from 'src/app/features/shared/user/services/user.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false
  tableData: any;
  notificationList: any;

  constructor(
    private userService: UserService,
    private shardService: SharedService
  ) { }

  ngOnInit() {
    this.setInitialTable()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Notification' },
      { key: '', value: 'Date Time' },
      { key: '', value: 'Action Taken By' },
      { key: '', value: 'Action' },
    ]
  }

  openNotification() {
    this.isloading = true
    let payload = {
      "TimeRecorded": this.shardService.formatedTime(new Date())
    }
    this.userService.alertcall(payload).subscribe((res: any) => {
      this.notificationList = res?.body?.data
      this.isloading = false
    })
  }

  /**
  * tabel size chage method
  * @param event 
  */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

}
