import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { UserService } from '../../shared/user/services/user.service';
import { ManagementService } from '../services/management.service';
import { NotificationService } from '../../http-services/notification.service';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {
  department: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  menuList: any;
  userList: any;
  selectedUser: any;
  isSelectedMenuId: any;
  selectedIndex: any;
  selectedData: any = [];
  selectnew: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  mainModuleList: any;
  selectedModule: any;

  constructor(
    private shardService: SharedService,
    private userService: UserService,
    private managementService: ManagementService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.getMainmoudleList()
    this.getUserList();
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Allowed' },
      { key: 'keyValue', val: 'Module' },
      { key: 'keyValue', val: 'Menu' },
      { key: 'keyValue', val: 'Add' },
      { key: 'keyValue', val: 'Update' },
      { key: 'keyValue', val: 'Delete' },
      { key: 'keyValue', val: 'View' },
    ]
  }

  getMainmoudleList() {
    let newData = {
      value: "",
      text: ""
    }
    this.managementService.moduleList().subscribe((res: any) => {
      let data = res?.body;
      this.mainModuleList = data?.map((val: any) =>
        newData = {
          value: val?.module_ID,
          text: val?.module_Name
        });
    })
  }

  /**
*get department data
*/
  getUserList() {
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
    };
    this.userService.userListDetail(payload).subscribe((res: any) => {
      this.userList = res?.body.data;
    });
  }

  confirm(event: any) {
    if (event.selectType == "module") {
      if (event && event.id) {
        this.selectedModule = event.id
      } else {
        this.selectedModule = null;
        this.menuList = [];
      }
    } else if (event.selectType == 'user') {
      if (event && event.id) {
        this.selectedUser = event.id
      } else {
        this.selectedUser = null;
        this.menuList = [];
      }
    }
    if (this.selectedModule && this.selectedUser) {
      this.getMenuList()
    }

  }

  getMenuList() {
    this.isloading = true;
    let payload = {
      "User_ID": parseInt(this.selectedUser),
      "Module_ID": parseInt(this.selectedModule)
    };
    this.managementService.accessList(payload).subscribe((res: any) => {
      this.isloading = false;
      this.menuList = res?.body;
    });
  }



  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  changeSelection(event: any, index: number, menu: any, action: string) {
    const isChecked = event.target.checked;

    if (action === 'allCheck') {
      menu.view = isChecked ? 1 : 0;
      menu.add = isChecked ? 1 : 0;
      menu.update = isChecked ? 1 : 0;
      menu.delete = isChecked ? 1 : 0;
    } else {
      menu[action] = isChecked ? 1 : 0;

      if (!isChecked && action !== 'allCheck') {
        menu.view = 0;
      }

      if (menu.add === 1 || menu.update === 1 || menu.delete === 1 || menu.view === 1) {
        menu.view = 1;
      }
    }
    this.selectedData = menu;
    if(this.selectedData) {
      this.onUserAccess()
    }
  }

  onUserAccess() {
    let payload = {
      "User_ID": parseInt(this.selectedUser),
        "Menu_ID":  parseInt(this.selectedData?.menu_ID),
        "View":  parseInt(this.selectedData?.view),
        "Add":  parseInt(this.selectedData?.add),
        "Update":  parseInt(this.selectedData?.update),
        "Delete":  parseInt(this.selectedData?.delete),
        "Export": this.selectedData?.export ? parseInt(this.selectedData?.export): 0,
        "Grant_By": this.selectedData?.grant_By ?  parseInt(this.selectedData?.grant_By) : 0,
        "Grant_On": this.selectedData?.grant_On
    }

    this.managementService.postMenuAccess(payload).subscribe((res:any) => {
      if(res?.status == 200) {
        this.notification.showSuccess('Menu Access Successfully');
        this.getMenuList()
      } else {
        this.notification.showSuccess('Menu Not Access') 
      }      
    }) 
  }
}
