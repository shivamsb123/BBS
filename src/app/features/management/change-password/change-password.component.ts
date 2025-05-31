import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  changeOldPassword!: FormGroup;
  isopen: boolean = false
  constructor(
    private _fb: FormBuilder,
    private managementService : ManagementService
  ) { }

  ngOnInit(): void {
    this.changeOldPassword = new FormGroup({
      oldPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      newPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      retypeNewPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    })
  }

  changePassword(formValue : any) {
    console.log("check password change", this.changeOldPassword.value);
    let payload = {
      "OldPassword": formValue.oldPassword,
      "NewPassword": formValue.newPassword,
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
    };
    this.managementService.changePass(payload).subscribe((res:any) => {
        this.alertData = {
          message: res.alert,
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.changeOldPassword.reset();
      
    })
  }
  
  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }
}
