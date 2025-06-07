import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent {

  locationForm!: FormGroup
  isloading: boolean = false
  locationData: any;
  id: any;
  disabled: boolean = true;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Added';
  button = 'Add';
  submitted: boolean = true;
  stateData: any;
  districtData: any;
  countryData: any;
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      // this.getLocationById()
      this.alertMessage = "Updated";
      this.button = 'Update'
    }
    this.setInitialValue()
    this.getcountry()
  }

  setInitialValue() {
    this.locationForm = this.fb.group({
      locationName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      Address_1: ['', [Validators.required]],
      Address_2: ['', [Validators.required]],
      Address_3: ['', [Validators.required]],
      description: ['', [Validators.required]],

    })

  }


  getcountry() {
    let newData = {
      value: '',
      text: ''
    }

    this.stockService.countryList().subscribe((res: any) => {
      let data = res?.body?.data;
      this.countryData = data.map((val: any) =>
        newData = {
          value: val?.countryId,
          text: val?.countryName
        }
      );

      if (this.id) {
        this.updateLocation(); // called only after country is populated
      }
    });
  }


  private async getState(countryId: any): Promise<any> {
    return new Promise((resolve) => {
      this.stockService.stateList(countryId).subscribe({
        next: (res: any) => {
          let data = res?.body?.data;
          if (!data) {
            this.stateData = [];
            resolve(null);
            return;
          }
          this.stateData = data.map((val: any) => ({
            value: val?.stateId,
            text: val?.stateName
          }));
          resolve(this.stateData);
        },
        error: (err) => {
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
          let data = res?.body?.data;
          if (!data) {
            this.districtData = [];
            resolve(null);
            return;
          }
          this.districtData = data.map((val: any) => ({
            value: val?.districtId,
            text: val?.districtName
          }));
          resolve(this.districtData);
        },
        error: (err) => {
          this.districtData = [];
          resolve(null);
        }
      });
    });
  }



  async updateLocation() {
    this.button = 'Update';
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    try {
      const payload = { pk_location_id: Number(this.id) };
      const res: any = await this.stockService.locationList(payload).toPromise();
      const item = res?.body?.data?.[0];

      if (!item) return;

      const countryMatch = this.countryData?.find((ele: any) =>
        ele?.value === item?.fk_country_id
      );
      this.selectedCountry = countryMatch;
      this.locationForm.get('country')?.setValue(countryMatch?.value);

      const stateResponse = await this.getState(countryMatch?.value);
      const stateMatch = this.stateData.find((ele: any) =>
        ele?.value === item?.fk_state_id
      );
      this.selectedState = stateMatch;
      this.locationForm.get('state')?.setValue(stateMatch?.value);

      const districtResponse = await this.getDistrct(stateMatch?.value);
        const districtMatch = this.districtData.find((ele: any) =>
          ele?.value === item?.fk_district_id
        );
         this.selectedDistrict = districtMatch;
          this.locationForm.get('district')?.setValue(districtMatch.value);


      this.locationForm.patchValue({
        locationName: item?.location_name,
        pincode: item?.pin_code,
        Address_1: item?.address_1,
        Address_2: item?.address_2,
        Address_3: item?.address_3,
        description: item?.location_description
      });

    } catch (err) {
      console.error("Error in updateLocation:", err);
    }
  }



  // 5. Handle Selection Events
  confirm(event: any) {
    if (event.selectType === 'country') {
      this.locationForm.controls['country'].setValue(event.id);
      this.getState(event.id);
      this.selectedState = null
      this.selectedDistrict = null
      this.districtData = [];
      this.locationForm.controls['state'].setValue(null);
      this.locationForm.controls['district'].setValue(null);
    } else if (event.selectType === 'state') {
      this.selectedDistrict = null
      this.locationForm.controls['state'].setValue(event.id);
      this.getDistrct(event.id);
      this.locationForm.controls['district'].setValue(null);
    } else if (event.selectType === 'district') {
      this.locationForm.controls['district'].setValue(event.id);
    }
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  resetForm() {
    this.locationForm.reset()
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
    console.log('formValue', formValue);

    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    };
    this.submitted = true;

    let service: any
    let payload = {
      "location_name": formValue?.locationName,
      "location_description": formValue?.description,
      "Logged_by": Number(localStorage.getItem('user_Id') || ''),
      "address_1": formValue?.Address_1,
      "address_2": formValue?.Address_2,
      "address_3": formValue?.Address_3,
      "pin_code": formValue?.pincode,
      "fk_country_id": Number(formValue?.country),
      "fk_state_id": Number(formValue?.state),
      "fk_district_id": Number(formValue?.district)
    }
    if (this.id) {
      payload['pk_location_id'] = Number(this.id);
      service = this.stockService.updateLocation(payload)
    } else {
      service = this.stockService.createLocation(payload)
    }

    service.subscribe((res: any) => {
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.locationForm.reset();
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/Location_Master_List')
        }, 2000)
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
  cancel() {
    this.locationForm.reset()
  }
}
