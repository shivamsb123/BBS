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
      address_1: new FormControl(''),
      address_2: new FormControl(''),
      address_3: new FormControl(''),
      pin_code: new FormControl(''),
      fk_district_id: new FormControl(0),
      fk_state_id: new FormControl(0),
      fk_country_id: new FormControl(0),
    })
  }

  vendorAddArray(): FormArray {
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
      buisness: ['', [Validators.required, Validators.pattern('')]],
      con_name: ['', [Validators.required, Validators.pattern('')]],
      contactPerson: ['', [Validators.required, Validators.pattern('')]],
      con_no: ['', [Validators.required, Validators.pattern('')]],
      panNo: ['', [Validators.required, Validators.pattern('')]],
      email: ['', [Validators.required, Validators.pattern('')]],
      GSTIN_no: ['', [Validators.required, Validators.pattern('')]],
      Address_1: ['', [Validators.required, Validators.pattern('')]],
      Address_2: ['', [Validators.required, Validators.pattern('')]],
      Address_3: ['', [Validators.required, Validators.pattern('')]],
      dist: ['', [Validators.required, Validators.pattern('')]],
      country: ['', [Validators.required, Validators.pattern('')]],
      pin: ['', [Validators.required, Validators.pattern('')]],
      state: ['', [Validators.required, Validators.pattern('')]],
      credit_line: ['', [Validators.required, Validators.pattern('')]],
      credit_period: ['', [Validators.required, Validators.pattern('')]],
      payment_mode: ['1', [Validators.required, Validators.pattern('')]],
      bank_type: ['', [Validators.required, Validators.pattern('')]],
      acct_h_name: ['', [Validators.required, Validators.pattern('')]],
      acct_number: ['', [Validators.required, Validators.pattern('')]],
      ifsc_code: ['', [Validators.required, Validators.pattern('')]],
    })
  }



  getContactData() {
    let payload = {
      "pk_supplier_id": parseInt(this.id)
    };
    this.stockService.contactList(payload).subscribe((res: any) => {
      this.contactData = res?.body?.data;
      this.contactData.forEach((val: any) => {
        if (val?.pk_supplier_id == this.id) {

          // let newCountryValue = this.countryData?.filter((ele: any) => ele?.text == val?.size26);
          // newCountryValue?.forEach((data: any) => {
          //   this.selectedCountry = data
          // });

          // let newStateValue = this.stateData?.filter((ele: any) => ele?.text == val?.size27);
          // newStateValue.forEach((data: any) => {
          //   this.selectedState = data
          // })

          // let newDistrctValue = this.districtData?.filter((ele: any) => ele?.text == val?.size28);
          // newDistrctValue.forEach((data: any) => {
          //   this.selectedState = data
          // })

          this.selectvendor = val
          this.contactform = this.fb.group({
            buisness: [val?.business_name, [Validators.required, Validators.pattern('')]],
            con_name: [val?.supplier_name, [Validators.required, Validators.pattern('')]],
            contactPerson: [val?.contact_person, [Validators.required, Validators.pattern('')]],
            con_no: [val?.mobile_no, [Validators.required, Validators.pattern('')]],
            panNo: [val?.pan_no, [Validators.required, Validators.pattern('')]],
            email: [val?.email_address, [Validators.required, Validators.pattern('')]],
            GSTIN_no: [val?.gst_no, [Validators.required, Validators.pattern('')]],
            credit_line: [val?.credit_line, [Validators.required, Validators.pattern('')]],
            credit_period: [val?.credit_period_indays, [Validators.required, Validators.pattern('')]],
            payment_mode: [val?.fk_payment_mode_id, [Validators.required, Validators.pattern('')]],
            bank_type: [val?.bank_name, [Validators.required, Validators.pattern('')]],
            acct_h_name: [val?.account_name, [Validators.required, Validators.pattern('')]],
            acct_number: [val?.account_no, [Validators.required, Validators.pattern('')]],
            ifsc_code: [val?.ifsc_code, [Validators.required, Validators.pattern('')]],
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

    this.stockService.countryList().subscribe((res: any) => {
      let data = res?.body?.data
      this.countryData = data.map((val: any) =>
        newData = {
          value: val?.countryId,
          text: val?.countryName

        });
    })
  }

  stateDataList: { [key: number]: any[] } = {};

  getState(countryId: any, index: number | null) {
    this.stockService.stateList(countryId).subscribe((res: any) => {
      const data = res?.body?.data || [];
      if (index !== null && index !== undefined) {
        this.stateDataList[index] = data.map((val: any) => ({
          value: val.stateId,
          text: val.stateName
        }));
      } else {
        this.stateData = data.map((val: any) => ({
          value: val.stateId,
          text: val.stateName
        }));
      }
    });
  }

  districtDataList: { [key: number]: any[] } = {};
  getDistrict(stateId: any, index: number | null): void {
    this.stockService.districtList(stateId).subscribe((res: any) => {
      const data = res?.body?.data || [];

      if (index !== null && index !== undefined) {
        this.districtDataList[index] = data.map((val: any) => ({
          value: val?.districtId,
          text: val?.districtName
        }));
      } else {
        this.districtData = data.map((val: any) => ({
          value: val?.districtId,
          text: val?.districtName
        }));
      }
    });
  }

  getDynamicAddressLabel(): string {
    const currentCount = this.addressForm.value.vendorAdd?.length || 0;
    const labelNumber = currentCount + 2;
    return `Add Address ${labelNumber}`;
  }


  submit(formValue: any) {
    let service: any
    let payload: any
    if (this.id) {
      payload = {
        "pk_supplier_id": Number(this.id),
        "supplier_name": formValue?.con_name,
        "business_name": formValue?.buisness,
        "pan_no": formValue?.panNo,
        "gst_no": formValue?.GSTIN_no,
        "mobile_no": formValue?.con_no,
        "email_address": formValue?.email,
        "contact_person": formValue?.contactPerson,
        "bank_name": formValue?.bank_type,
        "account_name": formValue?.acct_h_name,
        "account_no": formValue?.acct_number,
        "ifsc_code": formValue?.ifsc_code,
        "credit_line": formValue.credit_line,
        "credit_period_indays": formValue.credit_period,
        "fk_payment_mode_id": Number(formValue.payment_mode),
        "Logged_by": parseInt(localStorage.getItem('user_Id') || '')
      }
      service = this.stockService.updateSupplier(payload)
    } else {
      payload = {
        "supplier_name": formValue?.con_name,
        "business_name": formValue?.buisness,
        "pan_no": formValue?.panNo,
        "gst_no": formValue?.GSTIN_no,
        "mobile_no": formValue?.con_no,
        "email_address": formValue?.email,
        "contact_person": formValue?.contactPerson,
        "bank_name": formValue?.bank_type,
        "account_name": formValue?.acct_h_name,
        "account_no": formValue?.acct_number,
        "ifsc_code": formValue?.ifsc_code,
        "credit_line": formValue.credit_line,
        "credit_period_indays": formValue.credit_period,
        "fk_payment_mode_id": Number(formValue.payment_mode),
        "Logged_by": parseInt(localStorage.getItem('user_Id') || ''),
        "address_1": formValue.Address_1,
        "address_2": formValue.Address_2,
        "address_3": formValue.Address_3,
        "pin_code": formValue?.pin,
        "fk_district_id": formValue.dist ? Number(formValue.dist) : '',
        "fk_state_id": formValue.state ? parseInt(formValue.state) : 0,
        "fk_country_id": formValue.country ? parseInt(formValue.country) : 0,
        "other_addresses": this.vendorAddArray().value
      }
      service = this.stockService.addSupplier(payload)
    }

    service.subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
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
          message: res?.body?.alert,
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
    console.log('event', event);

    if (event.selectType == 'country') {
      this.contactform.controls['country'].setValue(event.id)
      this.countryName = event.assets_no
      this.getState(event.id, null)
    } else if (event.selectType == 'state') {
      this.contactform.controls['state'].setValue(event.id);
      this.stateName = event.assets_no
      this.getDistrict(event.id, null)
    } else if (event.selectType == 'district') {
      this.contactform.controls['dist'].setValue(event.id);
      this.disName = event.assets_no
    }
    // else if (event.selectType == 'newCountry') {
    //   (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["CountryId"].setValue(event.id);
    //   (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["CountryName"].setValue(event.assets_no);
    // } else if (event.selectType == 'newState') {
    //   (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["StateId"].setValue(event.id);
    //   (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["StateName"].setValue(event.assets_no);
    // } else if (event.selectType == 'newDistrict') {
    //   (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["DistrictId"].setValue(event.id);
    //   (<FormGroup>(<FormArray>this.addressForm.get('vendorAdd'))?.controls[0])?.controls["DistrictName"].setValue(event.assets_no);
    // }
  }

  onAddressSelect(event: any, index: number) {
    const control = (this.addressForm.get('vendorAdd') as FormArray).at(index) as FormGroup;

    switch (event.selectType) {
      case 'newCountry':
        control.get('fk_country_id')?.setValue(event.id);
        // control.get('CountryName')?.setValue(event.assets_no);

        // Reset state and district values on country change
        control.get('fk_state_id')?.reset();
        control.get('fk_district_id')?.reset();
        this.getState(event.id, index);
        break;

      case 'newState':
        control.get('fk_state_id')?.setValue(event.id);
        this.getDistrict(event.id, index);
        // Reset district on state change
        control.get('fk_district_id')?.reset();
        break;

      case 'newDistrict':
        control.get('fk_district_id')?.setValue(event.id);
        break;

      default:
        console.warn('Unknown selectType:', event.selectType);
    }
  }




}
