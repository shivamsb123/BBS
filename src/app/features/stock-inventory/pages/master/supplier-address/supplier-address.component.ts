import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supplier-address',
  templateUrl: './supplier-address.component.html',
  styleUrls: ['./supplier-address.component.scss']
})
export class SupplierAddressComponent {
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
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  suppAddressId: any;
  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");

    this.setInitialValue()
    this.getcountry()
    this.initialTable()
    if (this.id) {
      this.getContactData();
      this.alertMessage = 'Updated'
    }

  }

  setInitialValue() {
    this.contactform = this.fb.group({
      Address_1: ['', [Validators.required, Validators.pattern('')]],
      Address_2: ['', [Validators.required, Validators.pattern('')]],
      Address_3: ['', [Validators.required, Validators.pattern('')]],
      dist: ['', [Validators.required, Validators.pattern('')]],
      country: ['', [Validators.required, Validators.pattern('')]],
      pin: ['', [Validators.required, Validators.pattern('')]],
      state: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Country Name' },
      { key: 'keyValue', val: 'State Name' },
      { key: 'keyValue', val: 'District Name' },
      { key: 'keyValue', val: 'Pin Code' },
      { key: 'keyValue', val: 'Address 1' },
      { key: 'keyValue', val: 'Address 2' },
      { key: 'keyValue', val: 'Address 3' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getContactData() {
    let payload = {
      "pk_supplier_id": parseInt(this.id)
    };
    this.stockService.contactList(payload).subscribe((res: any) => {
      this.contactData = res?.body?.data[0];
    })
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

 
  async updateAddress(item: any) {
    this.button = 'Update'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    this.suppAddressId = item?.pk_supplier_address_id;

    try {
      const countryMatch = this.countryData?.find((ele: any) =>
        ele?.text?.trim() === item?.country_name?.trim()
      );
      this.selectedCountry = countryMatch;
      this.contactform.get('country')?.setValue(countryMatch.value);
      const stateResponse = await this.getState(countryMatch.value);
      const stateMatch = this.stateData.find((ele: any) =>
        ele?.text?.trim().toLowerCase() === item?.state_name?.trim().toLowerCase()
      );
      this.selectedState = stateMatch;
      this.contactform.get('state')?.setValue(stateMatch.value);
      const districtResponse = await this.getDistrct(stateMatch.value);
      if (!this.districtData || this.districtData.length === 0) {
        console.warn('District data is empty after fetch');
      } else {
        const districtMatch = this.districtData.find((ele: any) =>
          ele?.text?.trim().toLowerCase() === item?.district_name?.trim().toLowerCase()
        );

        if (districtMatch) {
          this.selectedDistrict = districtMatch;
          this.contactform.get('dist')?.setValue(districtMatch.value);
        }
      }

      this.contactform.patchValue({
        Address_1: item?.address_1,
        Address_2: item?.address_2,
        Address_3: item?.address_3,
        pin: item?.pin_code
      });

    } catch (error) {
      console.error('Error in updateAddress:', error);
    }
  }

  private async getState(countryId: any): Promise<any> {
    return new Promise((resolve) => {
      this.stockService.stateList(countryId).subscribe({
        next: (res: any) => {
          if (!res?.body?.data) {
            console.error('No data in state API response');
            this.stateData = [];
            resolve(null);
            return;
          }

          this.stateData = res.body.data.map((val: any) => ({
            value: val?.stateId,
            text: val?.stateName
          }));
          resolve(this.stateData);
        },
        error: (err) => {
          console.error('State API error:', err);
          this.stateData = [];
          resolve(null);
        }
      });
    });
  }

  private async getDistrct(stateId: any): Promise<any> {
    return new Promise((resolve) => {
      this.stockService.districtList(stateId).subscribe({
        next: (res: any) => {
          if (!res?.body?.data) {
            console.error('No data in district API response');
            this.districtData = [];
            resolve(null);
            return;
          }

          this.districtData = res.body.data.map((val: any) => ({
            value: val?.districtId,
            text: val?.districtName
          }));
          resolve(this.districtData);
        },
        error: (err) => {
          console.error('District API error:', err);
          this.districtData = [];
          resolve(null);
        }
      });
    });
  }

  confirm(event: any) {
    if (event.selectType == 'country') {
      this.contactform.controls['country'].setValue(event.id)
      this.countryName = event.assets_no
      this.getState(event.id)
    } else if (event.selectType == 'state') {
      this.contactform.controls['state'].setValue(event.id);
      this.stateName = event.assets_no
      this.getDistrct(event.id)
    } else if (event.selectType == 'district') {
      this.contactform.controls['dist'].setValue(event.id);
      this.disName = event.assets_no
    }
  }

  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

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

  submit(formValue: any) {
    let service: any
    let payload = {
      "fk_supplier_id": Number(this.id),
      "address_1": formValue?.Address_1,
      "address_2": formValue?.Address_2,
      "address_3": formValue?.Address_3,
      "pin_code": formValue?.pin,
      "fk_district_id": formValue?.dist,
      "fk_state_id": formValue?.state,
      "fk_country_id": formValue?.country,
      "Logged_by": parseInt(localStorage.getItem('user_Id') || '')
    }
    if (this.suppAddressId) {
      payload['pk_supplier_address_id'] = Number(this.suppAddressId)
      service = this.stockService.updateSupplierAddress(payload)
    } else {
      service = this.stockService.addSupplierAddress(payload)
    }

    console.log('payload', payload);
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
        this.getContactData()
        this.resetForm()
        this.alertTrigger = true;
        this.stopAlert();
        // setTimeout(() => {
        //   this.router.navigateByUrl('/SupplyChain/Contact_Master_List')
        // }, 2000);
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
}
