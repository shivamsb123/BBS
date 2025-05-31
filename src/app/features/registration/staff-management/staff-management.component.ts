import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss']
})
export class StaffManagementComponent implements OnInit {
  tableData: any;
  driverDetails!: FormGroup;
  department: any;
  searchKeyword: any
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false
  roleList: any;
  driverListData: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private shardService: SharedService,
    private registrationService: RegistrationService
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable();
    this.departmentData();
    this.getDriverList('')
  }

  setInitialValue() {
    this.driverDetails = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      role: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S No' },
      { key: '', value: 'Role Name' },
      { key: '', value: 'User Name' },
      { key: '', value: 'Status' },
      { key: '', value: 'First Name' },
      { key: '', value: 'Last Name' },
      { key: '', value: 'Contect No' },
      { key: '', value: 'Email' },
      { key: '', value: 'Employee Code' },
      { key: '', value: 'Id Number 1' },
      { key: '', value: 'Action' },
    ]
  }

  /**
*get department data
*/
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  getRoleList() {
    let newData: any;
    let payload = {
      User_ID: parseInt(localStorage.getItem('user_Id') || ''),
      DEPT_ID: parseInt(this.driverDetails.value.company || ''),
      "ONLY_APP_ROLES": 1
    }
    this.registrationService.roleList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.roleList = data.map((val: any) =>
        newData = {
          value: val?.roleID,
          text: val?.roleName
        }
      )
    })
  }

  redirectTo(path: any, driverValue: any) {
    let url = path.replace('id', driverValue?.emP_ID)
    this.router.navigateByUrl(url, { state: driverValue });
  }

  confirm(event: any) {
    if (event.selectType == 'Department') {
      this.roleList = []
      this.driverDetails.controls['company'].setValue(event.id);
      this.getRoleList();

    } else {
      this.driverDetails.controls['role'].setValue(event.id)
      this.setInitialTable();
      this.tableData.push({ key: '', value: 'More Details' })
    }
  }

  changeSearchValue(event:any) {
    this.searchKeyword = event.target.value
    this.getDriverList('')
  }

  getDriverList(formvalue: any) {
    this.isloading = true;
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "Dept_Id": formvalue.company ? parseInt(formvalue.company || '') : Number(localStorage.getItem('dept_id')),
      "Role_ID": formvalue.role ? parseInt(formvalue.role || '') : 0,
      "User_Name": this.searchKeyword,
      "Name": "",
      "EXCLUDE_APP_ROLES": 1,
      "ONLY_APP_ROLES": 1,
      "Exclude_On_Duty": 0,
      "Include_Present_Only": 0,
      "EMP_CODE": "",
      "ID_NUMBER": "",
      "SHOW_FULL_DETAILS": 0,
      "PAGE_NO": this.page,
      "PAGE_SIZE": this.tableSize,
      "emP_ID": 0
    }

    this.registrationService.driverList(payload).subscribe((res: any) => {
      this.driverListData = res?.body?.data;
      this.count = res?.body?.totaL_RECORDS
      this.isloading = false;

    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
    this.getDriverList(this.driverDetails.value)
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getDriverList(this.driverDetails.value)
  }
}
