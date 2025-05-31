import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../../registration/services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from '../services/management.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  company: any;
  selectedCompany: any;
  attendanceForm!: FormGroup
  roleList: any;
  attendanceListData: any;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  isloading: boolean = false;
  empId: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  hstep = 1;
  mstep = 1;
  isMeridian = true;
  mytime: Date = new Date();
  isDisabled: boolean = true
  selectEmpoyeeData: any;
  checkStatusList: any;
  tableData2:any;

  constructor(
    private sharedService: SharedService,
    private registrationService: RegistrationService,
    private managementService: ManagementService,
    private fb: FormBuilder
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialValue();
    this.getCompany();
    this.setInitialTable();
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Role Name' },
      { key: '', value: 'User Name' },
      { key: '', value: 'Status' },
      { key: '', value: 'First Name' },
      { key: '', value: 'Last Name' },
      { key: '', value: 'Contact No' },
      { key: '', value: 'Email' },
      { key: '', value: 'Employee Code' },
      { key: '', value: 'ID Number 1' },
      { key: '', value: 'ID Number 2' },
      { key: '', value: 'DL Number' },
      { key: '', value: 'Action' }
    ];
    
    this.tableData2= [
      { key: '', value: 'Action' },
      { key: '', value: 'Date Time' },
    ]
  }

  setInitialValue() {
    this.attendanceForm = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      role: ['', [Validators.required, Validators.pattern('')]],
      userName: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  confirm(event: any) {
    if (event.selectType == 'company') {
      this.roleList = [];
      this.attendanceForm.controls['company'].setValue(event.id);
      this.getRoleList();
    } else {
      this.attendanceForm.controls['role'].setValue(event.id)
    }

  }

  getRoleList() {
    let newData: any;
    let payload = {
      User_ID: parseInt(localStorage.getItem('user_Id') || ''),
      DEPT_ID: parseInt(this.attendanceForm.value.company || ''),
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

  submit(formValue: any) {
    this.isloading = true;
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "Dept_Id": parseInt(formValue.company || ''),
      "Role_ID": formValue.role ? parseInt(formValue.role || '') : 0,
      "User_Name": formValue.userName,
      "Name": "",
      "EXCLUDE_APP_ROLES": 1,
      "ONLY_APP_ROLES": 1,
      "Exclude_On_Duty": 0,
      "Include_Present_Only": 0,
      "EMP_CODE": "",
      "ID_NUMBER": "",
      "SHOW_FULL_DETAILS": 0,
      "PAGE_NO": 1,
      "PAGE_SIZE": 100,
      "emP_ID": 0
    }

    this.registrationService.driverList(payload).subscribe((res: any) => {
      this.attendanceListData = res?.body?.data;
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

  update(complain:any) {
    this.selectEmpoyeeData = complain
    this.empId = complain?.emP_ID;
    this.getCheckStatus();
  }

  checkIn() {
    let payload = {
      "Dept_ID": this.selectEmpoyeeData?.dept_Id,
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "EMP_ID": this.empId,
      "ACTION": "",
      "DATE_TIME": formatDate(this.mytime, 'hh:mm', 'en-US'),
      "Image_Name": "",
      "RESULT": "1",
      "MESSAGE": ""
    }
    
    this.managementService.addMarkManual(payload).subscribe((res:any) => {
      console.log("check res dara", res);
      
    })
  }

  getCheckStatus() {
    this.isloading = true
    let payload = {
      "EMP_ID": parseInt(this.empId)
    }
    this.managementService.checkStatus(payload).subscribe((res:any) => {
      this.checkStatusList =  res?.body?.data;
      this.isloading = false;
    })
  }

}
