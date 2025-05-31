import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.scss']
})
export class AddFamilyComponent {
  isloading: boolean = false
  occupationArr: any;
  familyForm!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  flag:any
  driverListData: any;
  disabled: boolean = false
  

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.setValue();
    this.flag = this.route.snapshot.paramMap.get("id");
    this.getDriverList()
    this.getOccupation()
  }

  getDriverList() {
    this.disabled = false
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "Dept_Id": parseInt(localStorage.getItem('dept_id') || ''),
      "Role_ID": 0,
      "User_Name": "",
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
      "emP_ID": parseInt(this.flag || '')
    }

    this.registrationService.driverList(payload).subscribe((res: any) => {
      this.driverListData = res?.body?.data;
      this.driverListData.forEach((val: any) => {
        this.disabled = true;
        let employeName = val?.firstName +" "+ val?.lastName
       this.familyForm.controls['driver'].setValue(employeName)
      })
    })
  }

  setValue() {
    this.familyForm = this.fb.group({
      driver: ['', [Validators.required, Validators.pattern("")]],
      fatherName: ['', [Validators.required, Validators.pattern("")]],
      aadharNo: ['', [Validators.required, Validators.pattern("")]],
      relationName: ['', [Validators.required, Validators.pattern("")]],
      relation: ['', [Validators.required, Validators.pattern("")]],
      dob: [new Date(), [Validators.required, Validators.pattern("")]],
      occupation: ['100', [Validators.required, Validators.pattern("")]]
    })


  };

  /**
   * stop alert
   */
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formValue: any) {
    console.log(formValue);
    
    let payload =
    {
      "MODE": 0,
      "Emp_Id": parseInt(this.flag) ,
      "UserName": formValue.driver,
      "Name": formValue.relationName,
      "Relation": formValue.relation,
      "DOB":formatDate(formValue.dob, 'dd-MM-yyyy', 'en-US'),
      "Occupation": formValue?.occupation,
      
    }    
    this.registrationService.addFamily(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        let url = '/Registration/edit-employeeDetails/'+ this.flag
        this.router.navigateByUrl(url)

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

  confirm(event: any) {    
    this.familyForm.controls['occupation'].setValue(event.assets_no)
  }

  getOccupation() {
    this.isloading = true;
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "UserID":parseInt(localStorage.getItem('user_Id') || ''),
      "RESULT":""
  }
    this.registrationService.occupationData(payload).subscribe((res:any) => {
    let data = res?.body?.data;
      this.isloading = false;
      this.occupationArr = data.map((val: any) =>
      newData = {
        value: val?.id,
        text: val?.occupation
      }
    )
    })
  }
}
