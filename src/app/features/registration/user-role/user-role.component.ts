import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  department: any;
  userType = [
    { id: 0, value: 'Normal User' },
    { id: 1, value: 'Driver' },
    { id: 2, value: 'Conductor' },
    { id: 5, value: 'Quality Testing' },
    { id: 6, value: 'Transporter' },
    { id: 7, value: 'Security' },
  ];

  roleLevel = [
    { id: 1, value: 'Level 1' },
    { id: 2, value: 'Level 2' },
    { id: 3, value: 'Level 3' },
    { id: 4, value: 'Level 4' },
    { id: 5, value: 'Level 5' },
  ];
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  isloading: boolean = false;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  addUser!: FormGroup
  userList: any;
  selectedValue: { value: string; text: string; };

  constructor(
    private shardService: SharedService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private registrationService: RegistrationService
  ) {

  }

  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTbale()
    this.departmentData();
    this.getUserRoleList()
  }


  setInitialTbale() {
    this.tableData = [
      { key: '', value: 'Role Code' },
      { key: '', value: 'Role Name' },
      { key: '', value: 'Level' },
      { key: '', value: 'Department' },
      { key: '', value: 'Parent Department' },
      { key: '', value: 'user Type' },
    ]
  }

  setInitialValue() {
    this.addUser = this.fb.group({
      role_name: ['', [Validators.required, Validators.pattern('')]],
      role_code: ['', [Validators.required, Validators.pattern('')]],
      department: ['', [Validators.required, Validators.pattern('')]],
      role_level: ['1', [Validators.required, Validators.pattern('')]],
      user_type: ['0', [Validators.required, Validators.pattern('')]],
    })
  }

  /**
 *get department data
 */
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }

  getUserRoleList() {
    this.isloading = true;
    let payload = {
      UserID: parseInt(localStorage.getItem('user_Id') || ''),
      Dept_Id: parseInt(localStorage.getItem('dept_id') || '')
    }
    this.registrationService.userRoleList(payload).subscribe((res: any) => {
      this.userList = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  confirm(event: any) {
    this.addUser.controls['department'].setValue(event.id)
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formValue: any) {
    let payload = {
      "Mode": 1,
      "RoleID": 1,
      "RoleShortName": formValue.role_code,
      "RoleName": formValue.role_name,
      "DeptID": parseInt(formValue?.department || ''),
      "Level_ID": parseInt(formValue?.role_level || ''),
      "UserType": parseInt(formValue?.user_type || '')

    }
    this.registrationService.addUserRole(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if(res?.body?.status == 'Success') {        
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.addUser.reset();
        this.getUserRoleList();
        this.selectedValue = {
          value: '',
          text: ''
        }
      } else {
        this.alertData = {
          message: 'User Roll Not added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  cancel(){
    this.addUser.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

}
