import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-view-staff-roaster',
  templateUrl: './view-staff-roaster.component.html',
  styleUrls: ['./view-staff-roaster.component.scss']
})
export class ViewStaffRoasterComponent {
  @Input() roasterData: any;
  @Output() onConfirm = new EventEmitter()
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  routeList: any;
  isloading: boolean = false
  viewRoaster!: FormGroup;
  shiftList: any;
  driverList: any;
  department: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  viewList: any;
  selectedValue: { value: string; text: string; };

  constructor(private sharedService: SharedService,
    private _fb: FormBuilder,
    private managementService: ManagementService) {

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }


  ngOnInit(): void {
    this.setInititalValue();
    this.initialTable();
    this.getDriverDetail();
    this.departmentData();
  }


  setInititalValue() {
    this.viewRoaster = this._fb.group({
      driver: ['', [Validators.required, Validators.pattern('')]],
      company: ['', [Validators.required, Validators.pattern('')]],
      shift: ['M', [Validators.required, Validators.pattern('')]],
      Weekday: ['WK', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Date Range ' },
      { key: 'keyValue', val: 'Days Of Week' },
      { key: 'keyValue', val: 'Shift Type' },
      { key: 'keyValue', val: 'Employee Name ' },
    ]
  }


  departmentData() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  getshiftStatus(formValue: any) {
    let payload = {
      "route_id": parseInt(formValue.routelist) || '',
      "shift_type": formValue.shift || '',
      "weekday_type": formValue.Weekday,
      "from_date": formatDate(formValue.fromdate, 'yyyy-MM-dd', 'en-US'),
      "to_date": formatDate(formValue.todate, 'yyyy-MM-dd', 'en-US')
    }
    this.managementService.showshiftstatus(payload).subscribe(res => {
      this.shiftList = res?.body?.data

    })
  }
  confirm(event: any) {
    if (event.selectType == 'driver_list') {
      this.viewRoaster.controls['driver'].setValue(event.id)
    } else if (event.selectType == 'company_name') {
      this.viewRoaster.controls['company'].setValue(event.id)

    }
  }
  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
      console.log('checking driver list', this.driverList);
    })
  }

  getViewStaffRoaster(formvalue:any) {
    this.isloading = true;
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "FROM_DATE":formatDate(formvalue.fromdate, 'yyyy/MM/dd', 'en-US'),
      "TO_DATE": formatDate(formvalue.todate,'yyyy/MM/dd', 'en-US'),
      "EMP_ID": 820,
      "ShiftType": formvalue.shift,
      "Weekday_Type":formvalue.Weekday
    }
    this.managementService.staffViewList(payload).subscribe(res => {
      this.viewList = res?.body?.data
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

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.viewRoaster.reset()
  }
}
