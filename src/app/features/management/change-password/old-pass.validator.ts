import { AbstractControl, ValidationErrors } from '@angular/forms';

export class OldPwdValidators {
  static chagnePassword(control: AbstractControl) : Promise<ValidationErrors | null> {
    return new Promise((resolve,reject) => {
        let password = localStorage.getItem('password');
        if(control.value !== password)
          resolve({ chagnePassword: true });
        else 
          resolve(null);
    });    
  }

  static matchPwds(control: AbstractControl) {
    let newPwd2 = control.get('newPassword');
    let confirmPwd2 = control.get('retypeNewPassword');

    console.log("check password", newPwd2, confirmPwd2);
    
    // if(newPwd2.value !== confirmPwd2.value){
    //   return { pwdsDontMatch: true };
    // }
    return null;
  }
}