import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-professinal',
  templateUrl: './add-professinal.component.html',
  styleUrls: ['./add-professinal.component.scss']
})
export class AddProfessinalComponent {

  professionalForm!: FormGroup;
  flag: string;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  driverListData: any;
  disabled: boolean = false

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.flag = this.route.snapshot.paramMap.get("id");
    this.setValue();
    this.getDriverList()
  }

  setValue() {
    this.professionalForm = this.fb.group({
      driver: ['', [Validators.required, Validators.pattern("")]],
      fatherName: ['', [Validators.required, Validators.pattern("")]],
      aadharNo: ['', [Validators.required, Validators.pattern("")]],
      org_name: ['', [Validators.required, Validators.pattern("")]],
      formDate: [new Date(), [Validators.required, Validators.pattern("")]],
      toDate: [new Date(), [Validators.required, Validators.pattern("")]],
      total_exp: ['', [Validators.required, Validators.pattern("")]],
      jobChange: ['', [Validators.required, Validators.pattern("")]],
      ref_name: ['', [Validators.required, Validators.pattern("")]],
      ref_Contect_no: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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

  submit(formValue:any) {
    let payload = {
      "mode": 0,
      "Emp_id" : parseInt(this.flag),
      "driverName": formValue.driver,
      "organizationName": formValue.org_name,
      "fromDate": formatDate(formValue.formDate, 'dd/MM/yyyy', "en-US"),
      "toDate": formatDate(formValue.toDate, 'dd/MM/yyyy', "en-US"),
      "totalExperience": formValue.total_exp ? formValue.total_exp.toString() : '',
      "reasonforJobChange": formValue.jobChange,
      "referenceName": formValue.ref_name,
      "referenceContactNumber":  formValue.ref_Contect_no ? formValue.ref_Contect_no.toString() : '',
      "result": ""
    }
    
    this.registrationService.addProfessional(payload).subscribe((res:any) => {
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
        this.disabled = true
        let employeName = val?.firstName +" "+ val?.lastName
       this.professionalForm.controls['driver'].setValue(employeName)
      })
    })
  }
}
