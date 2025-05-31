import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  contactform!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  contactData: any;
  id: any;
  button: string = 'Add'
  alertMessage: string = 'Added'
  selectvendor: any;
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  countryData: any;
  stateData: any;
  districtData: any
  countryId: any;
  stateId: any;
  districtId: any;
  countryName: any;
  stateName: any;
  disName: any;

  addressForm: FormGroup = new FormGroup({
    vendorAdd: new FormArray([])
  })
  selectedValue: any;

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setInitialValue();
    this.getcountry()
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.button = 'Update'
      this.getContactData();
      this.alertMessage = 'Updated'
    }
  }

  getVendorFormData(): FormGroup {
    return new FormGroup({
      Id: new FormControl(0),
      Supid: new FormControl(''),
      CusName: new FormControl(''),
      CountryId: new FormControl(0),
      CountryName: new FormControl(''),
      StateId: new FormControl(0),
      StateName: new FormControl(''),
      DistrictId: new FormControl(0),
      DistrictName: new FormControl(''),
      PinCode: new FormControl(''),
      Address: new FormControl(''),
      Status: new FormControl(1),
      Descrtion: new FormControl('')
    })
  }

  vendorAddArray(): FormArray  {
    return this.addressForm.get('vendorAdd') as FormArray
  }

  addVendorAdd() {
    this.vendorAddArray().push(this.getVendorFormData());
  }

  removeAdd(i: any) {
    this.vendorAddArray().removeAt(i);
  }

  setInitialValue() {
    this.contactform = this.fb.group({
      Contact_Type: ['1', [Validators.required, Validators.pattern('')]],
      con_name: ['', [Validators.required, Validators.pattern('')]],
      con_no: ['', [Validators.required, Validators.pattern('')]],
      Office: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.pattern('')]],
      GSTIN_no: ['', [Validators.required, Validators.pattern('')]],
      Add: ['', [Validators.required, Validators.pattern('')]],
      description: ['', [Validators.required, Validators.pattern('')]],
      dist: ['', [Validators.required, Validators.pattern('')]],
      country: ['', [Validators.required, Validators.pattern('')]],
      pin: ['', [Validators.required, Validators.pattern('')]],
      state: ['', [Validators.required, Validators.pattern('')]],
      credit_line: ['', [Validators.required, Validators.pattern('')]],
      credit_period: ['', [Validators.required, Validators.pattern('')]],
      payment_mode: ['1', [Validators.required, Validators.pattern('')]],
      bank_type: ['1', [Validators.required, Validators.pattern('')]],
      acct_h_name: ['', [Validators.required, Validators.pattern('')]],
      acct_number: ['', [Validators.required, Validators.pattern('')]],
      ifsc_code: ['', [Validators.required, Validators.pattern('')]],
    })
  }



  getContactData() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    };
    this.stockService.contactList(payload).subscribe((res: any) => {
      this.contactData = res?.body?.data;
      this.contactData.forEach((val: any) => {
        if (val?.id == this.id) {

          let newCountryValue = this.countryData?.filter((ele: any) => ele?.text == val?.size26);
          newCountryValue?.forEach((data: any) => {
            this.selectedCountry = data
          });

          let newStateValue = this.stateData?.filter((ele:any)=>ele?.text == val?.size27);
          newStateValue.forEach((data:any) => {
            this.selectedState = data
          })

          let newDistrctValue = this.districtData?.filter((ele:any)=>ele?.text == val?.size28);
          newDistrctValue.forEach((data:any) => {
            this.selectedState = data
          })

          this.selectvendor = val
          this.contactform = this.fb.group({
            Contact_Type: [val?.cusType, [Validators.required, Validators.pattern('')]],
            con_name: [val?.cusName, [Validators.required, Validators.pattern('')]],
            con_no: [val?.contact, [Validators.required, Validators.pattern('')]],
            Office: [val?.office, [Validators.required, Validators.pattern('')]],
            email: [val?.email, [Validators.required, Validators.pattern('')]],
            GSTIN_no: [val?.gstinNo, [Validators.required, Validators.pattern('')]],
            Add: [val?.address, [Validators.required, Validators.pattern('')]],
            description: [val?.description, [Validators.required, Validators.pattern('')]],
            country: ['', [Validators.required, Validators.pattern('')]],
            state: ['', [Validators.required, Validators.pattern('')]],
            dist: ['', [Validators.required, Validators.pattern('')]],
            pin: ['', [Validators.required, Validators.pattern('')]],
            address: ['', [Validators.required, Validators.pattern('')]],
          })
        }
      });
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getcountry() {
    let newData = {
      value: '',
      text: ''
    }

    let payload = {
      "Result": "",
      "Mode": 0
    }
    this.stockService.countryList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.countryData = data.map((val: any) =>
        newData = {
          value: val?.c_Id,
          text: val?.countryName

        });
    })
  }

  getState() {
    let newData = {
      value: '',
      text: ''
    }

    let payload = {
      "Result": "",
      "Mode": 0,
      "C_Id": parseInt(this.contactform.value.country)
    }
    this.stockService.stateList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.stateData = data.map((val: any) =>
        newData = {
          value: val?.s_Id,
          text: val?.stateName
        });
    })
  }

  getDistrct() {
    let newData = {
      value: '',
      text: ''
    }

    let payload = {
      "Result": "",
      "Mode": 0,
      "S_Id": parseInt(this.contactform.value.state)

    }
    this.stockService.districtList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.districtData = data.map((val) =>
        newData = {
          value: val?.id,
          text: val?.cityName
        });
    })
  }

  submit(formValue: any) {
    let payload = {
      "MODE": 0,
      "ID": 0,
      "Supid": "",
      "CusName": formValue?.con_name,
      "CusType": formValue?.Contact_Type ? parseInt(formValue?.Contact_Type) : 0,
      "ContactPerson": "",
      "Email": formValue?.email,
      "Email1": "",
      "Contact": formValue?.con_no,
      "HomePhone": "",
      "Office": formValue?.Office,
      "Address": formValue?.Add,
      "description": formValue?.description,
      "Balance": 0,
      "BraID": "",
      "Status": 1,
      "Invoices": "",
      "Size1": "",
      "Size2": "",
      "Size3": "",
      "Size4": "",
      "Size5": "",
      "Size6": "",
      "Size7": "",
      "Size8": "",
      "Size9": "",
      "Size10": "",
      "Size11": "",
      "Size12": "",
      "Size13": "",
      "Size14": "",
      "Size15": "",
      "Size16": "",
      "Size17": "",
      "Size18": "",
      "Size19": "",
      "Size20": "",
      "Size21": "",
      "Size22": "",
      "Size23": "",
      "Size24": "",
      "Size25": "",
      "Size26": this.countryName ? this.countryName : '',
      "Size27": this.stateName ? this.stateName : '',
      "Size28": this.disName ? this.disName : '',
      "Size29": formValue.dist ? formValue.dist.toString() : '',
      "Size30": formValue?.pin,
      "Flag": 1,
      "GSTINNo": formValue?.GSTIN_no,
      "IsB2B": 1,
      "CountryId": formValue.country ? parseInt(formValue.country) : 0,
      "StateId": formValue.state ?  parseInt(formValue.state) : 0,
      "IsLoginPermission": 0,
      "UserId": parseInt(localStorage.getItem('user_Id')),
      "CreditLine": formValue.credit_line,
      "CreditPeriod": formValue.credit_period,
      "BankDetails":"",
      "BankName": formValue.bank_type,
      "IFFCCODE": formValue.ifsc_code,
      "AccountNo": formValue.acct_number,
      "Accountholder": formValue.acct_h_name,
      "PaymentMode": formValue.payment_mode,
      "RESULT": "",
      "listmultipleAddress": this.vendorAddArray().value
    }

    if (this.id) {
      payload['ID'] = Number(this.id)
      payload['MODE'] = 1
      payload['Supid'] = this.selectvendor?.supid
    }

    this.stockService.addvendor(payload).subscribe((res: any) => {
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
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/Contact_Master_List')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
  }

  resetForm() {
    this.contactform.reset()
    this.selectedCountry = {
      value: '',
      text: ''
    }

    this.selectedState = {
      value: '',
      text: ''
    }

    this.selectedDistrict = {
      value: '',
      text: ''
    }
  }

  confirm(event: any) {
    if (event.selectType == 'country') {      
      this.contactform.controls['country'].setValue(event.id)
      this.countryName = event.assets_no
      this.getState()
    } else if (event.selectType == 'state') {
      this.contactform.controls['state'].setValue(event.id);
      this.stateName = event.assets_no
      this.getDistrct()
    } else if (event.selectType == 'district') {
      this.contactform.controls['dist'].setValue(event.id);
      this.disName = event.assets_no
    }  else if(event.selectType == 'newCountry') { 
      (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["CountryId"].setValue(event.id);
      (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["CountryName"].setValue(event.assets_no);      
    } else if(event.selectType == 'newState') {
      (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["StateId"].setValue(event.id);
      (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["StateName"].setValue(event.assets_no);
    } else if(event.selectType == 'newDistrict') {
      (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["DistrictId"].setValue(event.id);
      (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["DistrictName"].setValue(event.assets_no);
    }
  }

}
