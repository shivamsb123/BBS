import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, formatDate } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  roleList: any;
  stateList: any;
  idProofeList: any;
  addDriver!: FormGroup;
  formData!: FormData;
  userId: any;
  driverListData: any;
  driverValue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  button: string = 'Add';
  alertMessage: string = 'Added';

  constructor(
    private ragistrationService: RegistrationService,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    if (this.userId) {
      this.driverValue = this.location.getState()
      this.getDriverList()
    }
    this.setInitialValue()
    this.getRoleList();
    this.getStateList();
    this.getIdProofeList();

  }


  getDriverList() {
    this.button = 'Update';
    this.alertMessage = 'Updated'
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "Dept_Id": parseInt(this.driverValue?.dept_Id || ''),
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
      "emP_ID": parseInt(this.userId || '')
    }

    this.ragistrationService.driverList(payload).subscribe((res: any) => {
      this.driverListData = res?.body?.data;
      this.driverListData.forEach((val: any) => {
        if (this.userId == val.emP_ID) {
          console.log("check val", val);

          let date = val?.dob.split('/').reverse().join('-');
          this.addDriver = this.fb.group({
            role: [val?.roleID, [Validators.required, Validators.pattern('')]],
            fname: [val?.firstName, [Validators.required, Validators.pattern('')]],
            lname: [val?.lastName, [Validators.required, Validators.pattern('')]],
            phn: [val?.contactNo, [Validators.required, Validators.pattern('')]],
            email: [val?.email, [Validators.required, Validators.pattern('')]],
            username: [val?.userName, [Validators.required, Validators.pattern('')]],
            password: [val?.password, [Validators.required, Validators.pattern('')]],
            retypePassword: ['', [Validators.required, Validators.pattern('')]],
            DOB: [new Date(date), [Validators.required, Validators.pattern('')]],
            IMEINo: [val?.imeI_NO, [Validators.required, Validators.pattern('')]],
            RFIDTag: [val?.rfid, [Validators.required, Validators.pattern('')]],
            empId: [val?.emP_CODE, [Validators.required, Validators.pattern('')]],
            father: ['', [Validators.required, Validators.pattern('')]],
            alternateNo: ['', [Validators.required, Validators.pattern('')]],
            personalPhoto: ['', [Validators.required, Validators.pattern('')]],
            permanentAdd: ['', [Validators.required, Validators.pattern('')]],
            permanentState: ['', [Validators.required, Validators.pattern('')]],
            permanentPin: ['', [Validators.required, Validators.pattern('')]],
            presentAdd: ['', [Validators.required, Validators.pattern('')]],
            presentState: ['', [Validators.required, Validators.pattern('')]],
            presentPin: ['', [Validators.required, Validators.pattern('')]],
            idProof1: ['', [Validators.required, Validators.pattern('')]],
            idProofno1: [val?.iD_NUMBER_1, [Validators.required, Validators.pattern('')]],
            id1document: ['', [Validators.required, Validators.pattern('')]],
            issueDate: [new Date(), [Validators.required, Validators.pattern('')]],
            expireDate: [new Date(), [Validators.required, Validators.pattern('')]],
            idProof2: ['', [Validators.required, Validators.pattern('')]],
            idProofno2: [val?.iD_NUMBER_2, [Validators.required, Validators.pattern('')]],
            id2document: ['', [Validators.required, Validators.pattern('')]],
            idProof3: ['', [Validators.required, Validators.pattern('')]],
            idProofno3: ['', [Validators.required, Validators.pattern('')]],
            id3document: ['', [Validators.required, Validators.pattern('')]],
            idProof4: ['', [Validators.required, Validators.pattern('')]],
            idProofno4: ['', [Validators.required, Validators.pattern('')]],
            id4document: ['', [Validators.required, Validators.pattern('')]],
            status: [val?.status, [Validators.required, Validators.pattern('')]],
            licenceNo: ['', [Validators.required, Validators.pattern('')]],
            athuority: ['', [Validators.required, Validators.pattern('')]],
            licenceType: ['', [Validators.required, Validators.pattern('')]],
            licenceValidFrom: ['', [Validators.required, Validators.pattern('')]],
            licenceValidTo: ['', [Validators.required, Validators.pattern('')]],
          })
        }

      })
    })
  }


  setInitialValue() {
    this.addDriver = this.fb.group({
      role: ['', [Validators.required, Validators.pattern('')]],
      fname: ['', [Validators.required, Validators.pattern('')]],
      lname: ['', [Validators.required, Validators.pattern('')]],
      phn: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.pattern('')]],
      username: ['', [Validators.required, Validators.pattern('')]],
      password: ['', [Validators.required, Validators.pattern('')]],
      retypePassword: ['', [Validators.required, Validators.pattern('')]],
      DOB: [new Date(), [Validators.required, Validators.pattern('')]],
      IMEINo: ['', [Validators.required, Validators.pattern('')]],
      RFIDTag: ['', [Validators.required, Validators.pattern('')]],
      empId: ['', [Validators.required, Validators.pattern('')]],
      father: ['', [Validators.required, Validators.pattern('')]],
      alternateNo: ['', [Validators.required, Validators.pattern('')]],
      personalPhoto: ['', [Validators.required, Validators.pattern('')]],
      permanentAdd: ['', [Validators.required, Validators.pattern('')]],
      permanentState: ['', [Validators.required, Validators.pattern('')]],
      permanentPin: ['', [Validators.required, Validators.pattern('')]],
      presentAdd: ['', [Validators.required, Validators.pattern('')]],
      presentState: ['', [Validators.required, Validators.pattern('')]],
      presentPin: ['', [Validators.required, Validators.pattern('')]],
      idProof1: ['', [Validators.required, Validators.pattern('')]],
      idProofno1: ['', [Validators.required, Validators.pattern('')]],
      id1document: ['', [Validators.required, Validators.pattern('')]],
      idProof2: ['', [Validators.required, Validators.pattern('')]],
      idProofno2: ['', [Validators.required, Validators.pattern('')]],
      id2document: ['', [Validators.required, Validators.pattern('')]],
      idProof3: ['', [Validators.required, Validators.pattern('')]],
      idProofno3: ['', [Validators.required, Validators.pattern('')]],
      id3document: ['', [Validators.required, Validators.pattern('')]],
      idProof4: ['', [Validators.required, Validators.pattern('')]],
      idProofno4: ['', [Validators.required, Validators.pattern('')]],
      id4document: ['', [Validators.required, Validators.pattern('')]],
      issueDate: [new Date(), [Validators.required, Validators.pattern('')]],
      expireDate: [new Date(), [Validators.required, Validators.pattern('')]],
      status: ['1', [Validators.required, Validators.pattern('')]],
      licenceNo: ['', [Validators.required, Validators.pattern('')]],
      athuority: ['', [Validators.required, Validators.pattern('')]],
      licenceType: ['', [Validators.required, Validators.pattern('')]],
      licenceValidFrom: ['', [Validators.required, Validators.pattern('')]],
      licenceValidTo: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getRoleList() {
    let deptIdValue: any
    if (this.userId) {      
      deptIdValue = parseInt(this.driverValue?.dept_Id || '')
    } else {
      deptIdValue = parseInt(localStorage.getItem('dept_id'))
    }
    let payload = {
      User_ID: parseInt(localStorage.getItem('user_Id') || ''),
      DEPT_ID: deptIdValue,
      "ONLY_APP_ROLES": 1
    }
    this.ragistrationService.roleList(payload).subscribe((res: any) => {
      this.roleList = res?.body?.data

    })
  }

  getStateList() {
    let newData = {
      value: '',
      text: ''
    }

    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "TextToSearch": ""

    }
    this.ragistrationService.stateList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.stateList = data.map((val: any) =>
        newData = {
          value: val?.stateID,
          text: val?.stateName
        }
      )

    })
  }

  getIdProofeList() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || '')
    }

    this.ragistrationService.idProof(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.idProofeList = data.map((val: any) =>
        newData = {
          value: val?.iD_PROOF_ID,
          text: val?.iD_PROOF_NAME
        }
      )
    })
  }

  changeDocument(event: any) {
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0].name);

  }

  confirm(event: any) {
    if (event.selectType == 'Permanent_state') {
      this.addDriver.controls['permanentState'].setValue(event.id)
    } else if (event.selectType == 'State') {
      this.addDriver.controls['presentState'].setValue(event.id)
    } else if (event.selectType == 'ID Proof 1') {
      this.addDriver.controls['idProof1'].setValue(event.id)
    } else if (event.selectType == 'ID Proof 2') {
      this.addDriver.controls['idProof2'].setValue(event.id)
    } else if (event.selectType == 'ID Proof 3') {
      this.addDriver.controls['idProof3'].setValue(event.id)
    } else if (event.selectType == 'ID Proof 4') {
      this.addDriver.controls['idProof4'].setValue(event.id)
    }
  }

  submit(formValue: any) {
    let payload: any
    if (this.userId) {
      payload = {
        "EMP_ID": parseInt(this.userId || ''),
        "RoleID": formValue.role ? parseInt(formValue.role || '') : 0,
        "UserName": formValue.username,
        "Password": formValue.password,
        "Fname": formValue.fname,
        "Lname": formValue.lname,
        "Dept_Id": parseInt(localStorage.getItem('dept_id') || ''),
        "Contact": formValue?.phn,
        "Status": formValue.status ? parseInt(formValue.status || '') : 0,
        "Email": formValue.email,
        "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
        "DEVICE_REGISTRATION_ID": "",
        "IMEI_NO": formValue.IMEINo ? formValue.IMEINo : '',
        "RFID_TAG_ID": formValue.RFIDTag ? formValue.RFIDTag : '',
        "DOB": formatDate(formValue?.DOB, 'yyyy-MM-dd', 'en-US'),
        "EMP_CODE": formValue.empId,
        "FATHER_NAME": formValue.father,
        "ALT_NUMBER": formValue.alternateNo,
        "PHOTO_ID": formValue.personalPhoto,
        "PERM_ADDR": formValue.permanentAdd,
        "PERM_STATE": formValue.permanentState ? parseInt(formValue.permanentState || '') : 0,
        "PERM_PIN": formValue.permanentPin,
        "CURR_ADDR": formValue.presentAdd,
        "CURR_STATE": formValue.presentState ? parseInt(formValue.presentState || '') : 0,
        "CURR_PIN": formValue.presentPin,
        "ID_TYPE_1": formValue.idProof1 ? parseInt(formValue.idProof1 || '') : 0,
        "ID_NUMBER_1": formValue?.idProofno1,
        "ID_DOC_1": formValue.id1document,
        "ID_TYPE_2": formValue.idProof2 ? parseInt(formValue.idProof2 || '') : 0,
        "ID_NUMBER_2": formValue?.idProofno2,
        "ID_DOC_2": formValue?.id2document,
        "ID_TYPE_3": formValue.idProof3 ? parseInt(formValue.idProof3 || '') : 0,
        "ID_NUMBER_3": formValue?.idProofno3,
        "ID_DOC_3": formValue?.id3document,
        "ID_TYPE_4": formValue.idProof4 ? parseInt(formValue.idProof4 || '') : 0,
        "ID_DOC_4": formValue?.id4document,
        "DL_NO": formValue.licenceNo,
        "AuthorityName": formValue.athuority,
        "DL_Type_ID": formValue.licenceType ? Number(formValue.licenceType) : 0,
        "DL_Valid_FROM": formValue.licenceValidFrom ? formatDate(formValue.licenceValidFrom, 'yyyy-MM-dd', 'en-US') : '',
        "DL_Valid_TO": formValue.licenceValidFrom ? formatDate(formValue.licenceValidTo, 'yyyy-MM-dd', 'en-US') : '',
        "TRANS_ID_TO_LINK": 0,
        "TRANS_NAME": "",
        "TRANS_EMAIL": "",
        "TRANS_EMAIL_OTHER": "",
        "TRANS_Emp_ID": 0,
        "TRANS_CODE": "",
        "TRANS_ThirdPartyCode": "",
        "TRANS_ThirdPartyGroupCode": "",
        "ESIC_No": "",
        "Account_No": "",
        "IFSC_Code": "",
        "Duties_Done": 0,
        "Spare_Duties": 0,
        "Total_Duties": 0,
        "Minimum_Wage": 0,
        "Incentive_Category": "",
        "Incentive_Amount": 0,
        "Total_DRVR_SALARY": 0,
        "EMP_ID_NEW": 0,
        "Result": ""
      }
    } else {
      payload = {
        "EMP_ID": 0,
        "RoleID": formValue.role ? parseInt(formValue.role || '') : 0,
        "UserName": formValue.username,
        "Password": formValue.password,
        "Fname": formValue.fname,
        "Lname": formValue.lname,
        "Dept_Id": parseInt(localStorage.getItem('dept_id')),
        "Contact": formValue?.phn,
        "Status": formValue.status ? parseInt(formValue.status || '') : 0,
        "Email": formValue.email,
        "USER_ID":  parseInt(localStorage.getItem('user_Id') || ''),
        "DEVICE_REGISTRATION_ID": "",
        "IMEI_NO": formValue.IMEINo,
        "RFID_TAG_ID": formValue.RFIDTag,
        "DOB": formatDate(formValue.DOB, 'yyyy-MM-dd', 'en-US'),
        "EMP_CODE": formValue.empId,
        "FATHER_NAME": formValue.father,
        "ALT_NUMBER": formValue.alternateNo,
        "PHOTO_ID": formValue.personalPhoto,
        "PERM_ADDR": formValue.permanentAdd,
        "PERM_STATE": formValue.permanentState ? parseInt(formValue.permanentState || '') : 0,
        "PERM_PIN": formValue.permanentPin,
        "CURR_ADDR": formValue.presentAdd,
        "CURR_STATE": formValue.presentState ? parseInt(formValue.presentState || '') : 0,
        "CURR_PIN": formValue.presentPin,
        "ID_TYPE_1": formValue.idProof1 ? parseInt(formValue.idProof1 || '') : 0,
        "ID_NUMBER_1": formValue?.idProofno1,
        "ID_DOC_1": formValue?.id1document,
        "ID_TYPE_2": formValue.idProof2 ? parseInt(formValue.idProof2 || '') : 0,
        "ID_NUMBER_2": formValue?.idProofno2,
        "ID_DOC_2": formValue?.id2document,
        "ID_TYPE_3": formValue.idProof3 ? parseInt(formValue.idProof3 || '') : 0,
        "ID_NUMBER_3": formValue?.idProofno3,
        "ID_DOC_3": formValue?.id3document,
        "ID_TYPE_4": formValue.idProof4 ? parseInt(formValue.idProof4 || '') : 0,
        "ID_DOC_4": formValue?.id4document,
        "DL_NO": formValue.licenceNo,
        "AuthorityName": formValue.athuority,
        "DL_Type_ID": formValue.licenceType ? Number(formValue.licenceType) : 0,
        "DL_Valid_FROM": formValue.licenceValidFrom ? formatDate(formValue.licenceValidFrom, 'yyyy-MM-dd', 'en-US') : '',
        "DL_Valid_TO": formValue.licenceValidFrom ? formatDate(formValue.licenceValidTo, 'yyyy-MM-dd', 'en-US') : '',
        "TRANS_ID_TO_LINK": 0,
        "TRANS_NAME": "",
        "TRANS_EMAIL": "",
        "TRANS_EMAIL_OTHER": "",
        "TRANS_Emp_ID": 0,
        "TRANS_CODE": "",
        "TRANS_ThirdPartyCode": "",
        "TRANS_ThirdPartyGroupCode": "",
        "ESIC_No": "",
        "Account_No": "",
        "IFSC_Code": "",
        "Duties_Done": 0,
        "Spare_Duties": 0,
        "Total_Duties": 0,
        "Minimum_Wage": 0,
        "Incentive_Category": "",
        "Incentive_Amount": 0,
        "Total_DRVR_SALARY": 0,
        "EMP_ID_NEW": 0,
        "Result": ""
      }
    }


    this.ragistrationService.Driverregistration(payload).subscribe((res: any) => {
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
        this.button = 'Add';
        setTimeout(() => {
          this.router.navigateByUrl('Registration/User_Master_App')
        }, 2000)
      } else {
        this.alertData = {
          message: `Employee Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      this.addDriver.reset();

    })

  }

  cancel() {
    this.button = 'Add'
    this.addDriver.reset()
  }

}
