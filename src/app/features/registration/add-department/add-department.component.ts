import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { ScrollService } from '../../http-services/scroll.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  department: any;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 9, 12];
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  addDepartment!: FormGroup
  deptList: any;
  isloading: boolean = false;
  sNo: any;
  deptName: any;
  deptId: any;
  mode = 1
  parentDepId: any;
  selectedValue: any;
  selectedIdData: any;
  button :any = 'Add'
  deptID: any;
  alertMessage: string = 'Added';

  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private scrollService: ScrollService
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.departmentData();
    this.setInitialTable();
    this.getdepartmentList()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Parent Department' },
      { key: '', value: 'Department Code' },
      { key: '', value: 'Deparment Name' },
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.addDepartment = this.fb.group({
      parentDepartment: ['', [Validators.required, Validators.pattern('')]],
      dept_code: ['', [Validators.required, Validators.pattern('')]],
      dept_name: ['', [Validators.required, Validators.pattern('')]],
    })
  }


  /**
 *get department data
 */
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  confirm(event: any) {    
    this.addDepartment.controls['parentDepartment'].setValue(event.id)
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getdepartmentList() {
    this.isloading =  true;
    let payload = {
      "INCLUDE_SELF": 1,
      EMP_ID: parseInt(localStorage.getItem('user_Id') || ''),
      DEPT_ID: parseInt(localStorage.getItem('dept_id') || ''),
    }
    this.registrationService.department(payload).subscribe((res: any) => {
      this.deptList =  res?.body?.data;
      this.isloading = false;
    })
  }

  update(user:any) {    
    this.departmentData();
    this.selectedValue = this.department?.find((val: any) => val?.value == user?.parenT_DEPT);   
    
    this.addDepartment = this.fb.group({
      parentDepartment: [this.selectedValue, [Validators.required, Validators.pattern('')]],
      dept_code: [user?.depT_CODE, [Validators.required, Validators.pattern('')]],
      dept_name: [user?.depT_NAME, [Validators.required, Validators.pattern('')]],
    })
    this.addDepartment.get('parentDepartment').patchValue(user?.parenT_DEPT);
    this.mode = 0; 
    this.button = 'Update';
    this.alertMessage = 'Updated'
    this.deptID = user?.depT_ID
    this.scrollService.scrollToElementById('content');
   
  }

  submit(formvalue: any) {
    let payload:any;

    payload = {
       "Mode": this.mode,
       "DeptName": formvalue.dept_name,
       "PDept": parseInt(formvalue.parentDepartment || ''),
       "DCode": formvalue.dept_code,
       "Result": ""
     }
     if(this.deptID) {
        payload['DeptID'] = this.deptID
     }
    this.registrationService.createDepartment(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'Success') {
         this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getdepartmentList();
        this.button = 'Add'
      } else {
        this.alertData = {
          message: `Department Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMessage = 'Added'
      }
    
    })
    this.addDepartment.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.addDepartment.reset()
  }
}
