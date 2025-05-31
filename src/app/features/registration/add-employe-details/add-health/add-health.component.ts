import { Component } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-health',
  templateUrl: './add-health.component.html',
  styleUrls: ['./add-health.component.scss']
})
export class AddHealthComponent {
  driverListData: any;
  healthFoarm: any;
  flag: any;
  disabled:boolean = false;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.flag = this.route.snapshot.paramMap.get("id");
    this.getDriverList()
    this.setInitialValue()
  }

  setInitialValue() {
    this.healthFoarm = this.fb.group({
      driver: ['', [Validators.required, Validators.pattern("")]],
      fatherName: ['', [Validators.required, Validators.pattern("")]],
      aadharNo: ['', [Validators.required, Validators.pattern("")]],
      cardType: ['government', [Validators.required, Validators.pattern("")]],
      cardNo: ['', [Validators.required, Validators.pattern("")]],
      codeNo: ['', [Validators.required, Validators.pattern("")]],
      dob: [new Date(), [Validators.required, Validators.pattern("")]],
      formDate: [new Date(), [Validators.required, Validators.pattern("")]],
      toDate: [new Date(), [Validators.required, Validators.pattern("")]],
      bloodGroup: ['A', [Validators.required, Validators.pattern("")]],
      colour: ['Light Skin', [Validators.required, Validators.pattern("")]],
      height: ['', [Validators.required, Validators.pattern("")]],
      weight: ['', [Validators.required, Validators.pattern("")]],
      eyeVision: ['6/6', [Validators.required, Validators.pattern("")]],
      healthDiseas: [null, [Validators.required, Validators.pattern("")]],
      illness: ['', [Validators.required, Validators.pattern("")]]
    })
  }

  
  /**
   * stop alert
   */
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getDriverList() {
    this.disabled = false;
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
        let employeName = val?.firstName + " " + val?.lastName
        this.healthFoarm.controls['driver'].setValue(employeName)
      })
    })
  }

  submit(formValue: any) {
    let payload = {
      "MODE": 0,
      "Emp_id" : parseInt(this.flag),
      "DriverName": formValue?.driver,
      "HealthCardTypes": formValue?.cardType,
      "HealthCardNo": formValue?.cardNo,
      "VersionCode": formValue?.codeNo,
      "ValidFromDate": formatDate(formValue.formDate, 'dd/MM/yyyy', "en-US"),
      "ValidToDate": formatDate(formValue.toDate, 'dd/MM/yyyy', "en-US"),
      "DOB": formatDate(formValue.dob, 'dd/MM/yyyy', "en-US"),
      "BloodGroup": formValue?.bloodGroup,
      "Color": formValue?.colour,
      "Height": formValue?.height,
      "Weight": formValue?.weight,
      "EyeSideVision": formValue?.eyeVision,
      "HealthDiseas": "",
      "AnyIllness": formValue?.illness,
      "Result": ""

    }
    this.registrationService.addHealth(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.healthFoarm.reset();
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

}
