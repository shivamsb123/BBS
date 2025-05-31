import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from '../services/management.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-staff-attendance',
  templateUrl: './add-staff-attendance.component.html',
  styleUrls: ['./add-staff-attendance.component.scss']
})
export class AddStaffAttendanceComponent {
  bsValue = new Date();
  addAttendanceForm!: FormGroup
  roleList: any;
  tableData: any;
  attendanceArr: any;
  isloading: boolean = false;
  attendanceTime:any
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  searchKeyword: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  typeData: any;
  selectedStaffData: any;
  tableData1: { key: string; val: string; }[];
  checkinList: any;
  Chekin: any ='I';

  constructor(private fb: FormBuilder, private managementService: ManagementService) { }
  ngOnInit(): void {
    this.setInititalValue()
    this.initialTable()
    this.getRoleList()
   
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Role Name' },
      { key: 'keyValue', val: 'User Name ' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'First Name' },
      { key: 'keyValue', val: 'Last Name ' },
      { key: 'keyValue', val: 'Contact No' },
      { key: 'keyValue', val: 'E-mail' },
      { key: 'keyValue', val: 'Employee Code' },
      { key: 'keyValue', val: 'ID Number1' },
      { key: 'keyValue', val: 'ID Number2' },
      { key: 'keyValue', val: 'DL Number' },
      { key: 'keyValue', val: 'Action' },
    ]
    this.tableData1 = [
      { key: 'keyValue', val: 'Date Time' },
      { key: 'keyValue', val: 'Action ' },
    ]
  }

  setInititalValue() {
    this.addAttendanceForm = this.fb.group({
      role: ['', [Validators.required, Validators.pattern('')]],
      User_Name: ['', [Validators.required, Validators.pattern('')]],
    })
    this.attendanceTime = this.fb.group({
      date_time: [new Date(), [Validators.required, Validators.pattern('')]],
      // attendanceTime: [this.selectedStaffData, [Validators.required, Validators.pattern('')]],
    })
  }

  getRoleList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "depT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "user_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "onlY_APP_ROLES": 0
    }
    console.log(payload)
    this.managementService.roleList(payload).subscribe((result) => {
      let data = result?.body?.data
      this.roleList = data.map((val: any) =>
        newData = {
          value: val?.roleID,
          text: val?.roleName
        }
      )
      console.log("result", this.roleList);
    })
  }

  getStaffAttendanceList(formValue: any) {
    this.isloading = true

    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "Dept_Id": parseInt(localStorage.getItem('dept_id') || ''),
      "Emp_Id": 0,
      "ONLY_APP_ROLES": 1,
      "Role_ID": parseInt(formValue.role),
    }

    this.managementService.attendanceStaffList(payload).subscribe((res: any) => {
      this.attendanceArr = res?.body?.data
      this.isloading = false
    })
  }

  selectRoster(staffData: any, type: any) {
    this.selectedStaffData = staffData;
    console.log("selected ", this.selectedStaffData);
    this.typeData = type
    this.getCheckIn()  
  }

  saveCheckInCheckOut(formValue:any){
    let payload = {
      "Dept_ID":parseInt(localStorage.getItem('dept_id') || ''),
      "User_ID":parseInt(localStorage.getItem('user_Id') || ''),
      "EMP_ID":parseInt(this.selectedStaffData.emp_Id || ''),
      "ACTION":this.Chekin,
     "DATE_TIME":formatDate(formValue.date_time,'yyyy-MM-dd hh:mm:ss', 'en-US'),
     "DIVN":"",
     "Image_Name":"",
     "Status":"",
     "RESULT":"",
     "MESSAGE":""
    }
        
    this.managementService.saveCheckInOut(payload).subscribe((res: any) => {
      console.log("save check",res);
      this.getCheckIn()
    })
    
  }

  getCheckIn() {
    this.isloading = true

    let payload = {
      "EMP_ID":  parseInt(this.selectedStaffData.emp_Id || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
    }

    this.managementService.checkInData(payload).subscribe((res: any) => {
      this.checkinList = res?.body?.data
      this.isloading = false
    })
  }

  confirm(event: any) {
    this.addAttendanceForm.controls['role'].setValue(event.id)
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
