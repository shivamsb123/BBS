import { Component } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SharedService } from '../../http-services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-staff-attendance',
  templateUrl: './manage-staff-attendance.component.html',
  styleUrls: ['./manage-staff-attendance.component.scss']
})
export class ManageStaffAttendanceComponent {
  bsValue = new Date();
  maxDate = new Date();
  attendance: any;
  attendenceform!: FormGroup
  department: any;
  tableData: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  searchKeyword: any;

  constructor(private managementService: ManagementService, private fb: FormBuilder, private shardService: SharedService, private router: Router) { }


  ngOnInit(): void {
    this.departmentData()
    this.setInititalValue()
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Employee Code' },
      { key: 'keyValue', val: 'Employee Name ' },
      { key: 'keyValue', val: 'Designation' },
      { key: 'keyValue', val: 'In Time ' },
      { key: 'keyValue', val: 'Out Time ' },
      { key: 'keyValue', val: 'Duration' },
    ]
  }

  setInititalValue() {
    this.attendenceform = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  submit(formValue: any) {
    this.isloading = true
    let payload = {
      "SN":0,
      "DEPT_ID":parseInt(localStorage.getItem('dept_id') || ''),
      "ROLE_ID":0,
      "DATE_FROM":formatDate(formValue.fromdate, 'yyyy/MM/dd', 'en-US'),
      "DATE_TO":formatDate(formValue.todate, 'yyyy/MM/dd', 'en-US'),

    }
    this.managementService.staffAttendanceEmp(payload).subscribe((res: any) => {
      this.attendance = res?.body?.data;
      this.isloading = false
    })
  }

  confirm(event: any) {
    this.attendenceform.controls['company'].setValue(event.id)
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  navigateUrl() {
    let url = '/Operational/Add_Staff_Attendance'
    this.router.navigateByUrl(url);
  }
}
