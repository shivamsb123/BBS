import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-add-staff-roaster',
  templateUrl: './add-staff-roaster.component.html',
  styleUrls: ['./add-staff-roaster.component.scss']
})
export class AddStaffRoasterComponent {
  @Input() roasterData: any;
  @Output() onConfirm = new EventEmitter()
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  isloading: boolean = false;
  routeList: any;
  addroaster!: FormGroup;
  shiftList: any;
  department: any;
  Morning: any
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  searchKeyword: any;
  selectedVehicleData: any;
  typeData: any = '';
  driverList: any;
  data: any;
  driverName: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  employeeList: any;

  constructor(private sharedService: SharedService,
    private _fb: FormBuilder,
    private managementService: ManagementService) {

    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }


  ngOnInit(): void {
    this.setInititalValue()
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Days Of Week' },
      { key: 'keyValue', val: 'Shift Type' },
      { key: 'keyValue', val: 'Shift On' },
      { key: 'keyValue', val: 'Lunch Start ' },
      { key: 'keyValue', val: 'Lunch End ' },
      { key: 'keyValue', val: 'Shift Off   ' },
      { key: 'keyValue', val: 'Action' },
    ]
  }
  setInititalValue() {
    this.addroaster = this._fb.group({
      shift: ['M', [Validators.required, Validators.pattern('')]],
      Weekday: ['WK', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }


  viewList(formValue: any) {
    this.isloading = true;
    let payload = {
      "FROM_DATE": formatDate(formValue.fromdate, 'yyyy/MM/dd', 'en-US'),
      "TO_DATE": formatDate(formValue.todate, 'yyyy/MM/dd', 'en-US'),
      "shift_type": formValue.shift,
      "Weekday_Type": formValue.Weekday
    }
    this.managementService.showshiftstatus(payload).subscribe(res => {
      this.shiftList = res?.body?.data;
      this.isloading = false;
    })
  }

  selectRoster(vehicleData: any, type: any) {
    this.selectedVehicleData = vehicleData;
    console.log("selected ", this.selectedVehicleData);
    this.typeData = type
    this.getEmployeeList()
  }

  getEmployeeList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "Result": ""
    }
    this.managementService.employeeListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;

      this.employeeList = data.map((val) =>
        newData = {
          value: val.emp_Id,
          text: val.employee

        })
      console.log("employee", this.employeeList)
    })
  }

  confirm(event: any) {
    if (event.selectType == 'employee') {
      this.driverName = event.id
    }
    console.log("this.driverName", this.driverName);

  }

  submit() {
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "FROM_DATE": formatDate(this.addroaster.value.fromdate, 'yyyy/MM/dd', 'en-US'),
      "TO_DATE": formatDate(this.addroaster.value.todate, 'yyyy/MM/dd', 'en-US'),
      "SHIFT_ID": parseInt(this.selectedVehicleData.shift_id || ''),
      "EMP_ID": parseInt(this.driverName || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "RESULT": 0,
      "MESSAGE": ""
    }
    this.managementService.addStaffRoaster(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
  }
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  cancel() {
    this.addroaster.reset()
  }

}
