import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../stock-inventory/services/stock.service';
import { Observable, map, forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-new-vehicle',
  templateUrl: './add-new-vehicle.component.html',
  styleUrls: ['./add-new-vehicle.component.scss']
})
export class AddNewVehicleComponent {
  id: string;
  isloading: boolean = false;
  vehicleForm!: FormGroup
  documentForm!: FormGroup
  selectedValue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage: string = 'Added';
  selectedBodyType: any;
  selectedVehicleType: any;
  selectedFuelType: any;
  selectedOwnerType: any;
  itemType: any;
  itemData: any[] = [];
  tableData: any;
  selectedItem: any
  itemListData: any
  itemListFilter: any;
  itemLocationList: any;
  itemName: any;
  selectedDocType: any
  ownerTypeList: any
  bodyTypeList: any;
  vehicleTypeList: any;
  fuelTypeList: any;
  docTypeList: any;
  stateData: any;
  districtData: any;
  countryData: any;
  selectedCountry: any;
  selectedState: any;
  selectedDistrict: any;
  selectedImageBase64: string | null = null;
  button: any = 'Submit'
  vehicledata: any;

  constructor(
    private registrationService: RegistrationService,
    private stockService: StockService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.vehicledata = window.history.state?.data;

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.button = 'Update';
      this.alertMessage = 'Updated';
      this.isloading = true
    }

    this.setInitialValue();
    this.initialTable();
    this.getDocTypeList();
    this.allDropdownLoaded()

  }


  setInitialValue() {
    this.vehicleForm = this.fb.group({
      license_plate_No: ['', [Validators.required]],
      chassis_No: ['', [Validators.required]],
      engine_No: ['', [Validators.required]],
      make_model: ['', [Validators.required]],
      manufacture_year: ['', [Validators.required]],
      body_type: ['', [Validators.required]],
      vehicle_type: ['', [Validators.required]],
      fuel_type: ['', [Validators.required]],
      owner_type: ['', [Validators.required]],
      procrumentDate: [new Date(), [Validators.required]],
      busCost: ['', [Validators.required]],
      contract_name: ['', [Validators.required]],
      contract_mobile: ['', [Validators.required]],
      contract_email: ['', [Validators.required]],
      contract_address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      status: ['Active', [Validators.required]],
    })

    this.documentForm = this.fb.group({
      docType: ['', [Validators.required]],
      docNo: ['', [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      imgData: [''],
    })
  }

  allDropdownLoaded() {
    forkJoin([
      this.getOwnerTypeList(),
      this.getBodyTypeList(),
      this.getFuleTypeList(),
      this.getVehicleTypeList(),
      this.getcountry()
    ]).subscribe({
      next: () => {
        if (this.vehicledata) {
          console.log('Calling updateVehicleForm with:', this.vehicledata);
          this.updateVehicleForm(this.vehicledata);
        }
      },
      error: (err) => {
        console.error('Error loading dropdown data:', err);
      }
    });
  }

  async updateVehicleForm(item: any) {
    try {
      this.button = 'Update';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const countryMatch = this.countryData?.find((ele: any) =>
        ele?.value == item?.fk_country_id
      );
      if (countryMatch) {
        this.selectedCountry = countryMatch;
        this.vehicleForm.get('country')?.setValue(countryMatch.value);

        const stateResponse = await this.getState(countryMatch.value);
        const stateMatch = this.stateData?.find((ele: any) =>
          ele?.value == item?.fk_state_id
        );
        if (stateMatch) {
          this.selectedState = stateMatch;
          this.vehicleForm.get('state')?.setValue(stateMatch.value);

          const districtResponse = await this.getDistrct(stateMatch.value);
          const districtMatch = this.districtData?.find((ele: any) =>
            ele?.value === item?.fk_district_id
          );
          if (districtMatch) {
            this.selectedDistrict = districtMatch;
            this.vehicleForm.get('district')?.setValue(districtMatch.value);
          }
        }
      }

      const bodyMatch = this.bodyTypeList?.find((x: any) =>
        x.value == item?.fk_body_type_id
      );
      if (bodyMatch) {
        this.selectedBodyType = bodyMatch;
        this.vehicleForm.get('body_type')?.setValue(bodyMatch.value);
      }

      const vehicleMatch = this.vehicleTypeList?.find((x: any) =>
        x.value == item?.fk_vehicle_type_id
      );
      if (vehicleMatch) {
        this.selectedVehicleType = vehicleMatch;
        this.vehicleForm.get('vehicle_type')?.setValue(vehicleMatch.value);
      }

      const fuelMatch = this.fuelTypeList?.find((x: any) =>
        x.value == item?.fk_fuel_type_id
      );
      if (fuelMatch) {
        this.selectedFuelType = fuelMatch;
        this.vehicleForm.get('fuel_type')?.setValue(fuelMatch.value);
      }

      const ownerMatch = this.ownerTypeList?.find((x: any) =>
        x.value == item?.fk_owner_type_id
      );
      if (ownerMatch) {
        this.selectedOwnerType = ownerMatch;
        this.vehicleForm.get('owner_type')?.setValue(ownerMatch.value);
      }

      this.vehicleForm.patchValue({
        license_plate_No: item?.licenseplate_no,
        chassis_No: item?.chassis_no,
        engine_No: item?.engine_no,
        make_model: item?.make_model,
        manufacture_year: item?.manufacturing_year,
        procrumentDate: new Date(item?.procurement_date),
        busCost: item?.bus_cost,
        contract_name: item?.contractor_Name,
        contract_mobile: item?.contractor_mobile,
        contract_email: item?.contractor_email,
        contract_address: item?.contractor_address,
        pincode: item?.pincode,
        status: item?.current_status || 'Active',
      });

            this.isloading = false

    } catch (error) {
      console.error('Error in updateVehicleForm:', error);
    }
  }



  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Document Type ' },
      { key: 'keyValue', val: 'Document No.' },
      { key: 'keyValue', val: 'Start Date' },
      { key: 'keyValue', val: 'End date ' },
      { key: 'keyValue', val: 'Document Image ' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  addItem(type: any) {
    this.itemType = type
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  createItem(formvalue: any) {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    };
    console.log("formvalue", formvalue);

    let index = this.itemData.findIndex((val: any) => formvalue?.docType == val?.docTypeId);
    let data: any;
    if (index !== -1) {
      console.log('not add');

      this.alertData = {
        message: 'Already Added',
      };
      this.alertType = "danger";
      this.alertTrigger = true;
      this.stopAlert();

    } else {
      data = {
        docTypeId: formvalue?.docType,
        docTypeName: this.itemName,
        docNo: formvalue?.docNo,
        startdate: formatDate(formvalue?.startDate, 'yyyy-MM-dd', 'en-US'),
        endDate: formatDate(formvalue?.endDate, 'yyyy-MM-dd', 'en-US'),
        imageData1: this.selectedImageBase64
      };
      this.itemData.push(data);
      console.log("this.itemData", this.itemData);

      localStorage.setItem('item', JSON.stringify(this.itemData));
      this.documentForm.reset();
      this.selectedImageBase64 = null;
      this.selectedDocType = {
        text: '',
        value: ''
      }
    }

  }

  delete(data: any, i: any) {
    this.itemData.splice(i, 1);
    localStorage.setItem('item', JSON.stringify(this.itemData))
  }

  // getcountry() {
  //   let newData = {
  //     value: '',
  //     text: ''
  //   }

  //   this.stockService.countryList().subscribe((res: any) => {
  //     let data = res?.body?.data;
  //     this.countryData = data.map((val: any) =>
  //       newData = {
  //         value: val?.countryId,
  //         text: val?.countryName
  //       }
  //     );
  //     console.log('this.countryData', this.countryData);
  //   });
  // }


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

  // getOwnerTypeList() {
  //   let newData = {
  //     value: '',
  //     text: ''
  //   }
  //   this.registrationService.getOwnerTypeList().subscribe((res: any) => {
  //     let data = res?.body?.data
  //     this.ownerTypeList = data.map((val: any) =>
  //       newData = {
  //         value: val?.code,
  //         text: val?.name
  //       }
  //     )
  //   })
  // }

  // getBodyTypeList() {
  //   let newData = {
  //     value: '',
  //     text: ''
  //   }
  //   this.registrationService.getBodyTypeList().subscribe((res: any) => {
  //     let data = res?.body?.data
  //     this.bodyTypeList = data.map((val: any) =>
  //       newData = {
  //         value: val?.code,
  //         text: val?.name
  //       }
  //     )
  //   })
  // }

  // getFuleTypeList() {
  //   let newData = {
  //     value: '',
  //     text: ''
  //   }
  //   this.registrationService.getFuelTypeList().subscribe((res: any) => {
  //     let data = res?.body?.data
  //     this.fuelTypeList = data.map((val: any) =>
  //       newData = {
  //         value: val?.code,
  //         text: val?.name
  //       }
  //     )
  //   })
  // }

  // getVehicleTypeList() {
  //   let newData = {
  //     value: '',
  //     text: ''
  //   }
  //   this.registrationService.getVehicleTypeList().subscribe((res: any) => {
  //     let data = res?.body?.data
  //     this.vehicleTypeList = data.map((val: any) =>
  //       newData = {
  //         value: val?.code,
  //         text: val?.name
  //       }
  //     )
  //   })
  // }

  getOwnerTypeList(): Observable<any> {
    return this.registrationService.getOwnerTypeList().pipe(
      map((res: any) => {
        let data = res?.body?.data || [];
        this.ownerTypeList = data.map((val: any) => ({
          value: val?.code,
          text: val?.name
        }));
      })
    );
  }

  getBodyTypeList(): Observable<any> {
    return this.registrationService.getBodyTypeList().pipe(
      map((res: any) => {
        let data = res?.body?.data || [];
        this.bodyTypeList = data.map((val: any) => ({
          value: val?.code,
          text: val?.name
        }));
      })
    );
  }

  getFuleTypeList(): Observable<any> {
    return this.registrationService.getFuelTypeList().pipe(
      map((res: any) => {
        let data = res?.body?.data || [];
        this.fuelTypeList = data.map((val: any) => ({
          value: val?.code,
          text: val?.name
        }));
      })
    );
  }

  getVehicleTypeList(): Observable<any> {
    return this.registrationService.getVehicleTypeList().pipe(
      map((res: any) => {
        let data = res?.body?.data || [];
        this.vehicleTypeList = data.map((val: any) => ({
          value: val?.code,
          text: val?.name
        }));
      })
    );
  }

  getcountry(): Observable<any> {
    return this.stockService.countryList().pipe(
      map((res: any) => {
        let data = res?.body?.data || [];
        this.countryData = data.map((val: any) => ({
          value: val?.countryId,
          text: val?.countryName
        }));
      })
    );
  }

  getDocTypeList() {
    let newData = {
      value: '',
      text: ''
    }
    this.registrationService.getDocTypeList().subscribe((res: any) => {
      let data = res?.body?.data
      this.docTypeList = data.map((val: any) =>
        newData = {
          value: val?.code,
          text: val?.name
        }
      )
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Body') {
      this.vehicleForm.controls['body_type'].setValue(event.id)
    } else if (event.selectType == 'Vehicle') {
      this.vehicleForm.controls['vehicle_type'].setValue(event.id)
    } else if (event.selectType == 'Fuel') {
      this.vehicleForm.controls['fuel_type'].setValue(event.id)
    } else if (event.selectType == 'Owner') {
      this.vehicleForm.controls['owner_type'].setValue(event.id)
    } else if (event.selectType == 'country') {
      this.getState(event.id)
      this.vehicleForm.controls['country'].setValue(event.id)
    } else if (event.selectType == 'state') {
      this.getDistrct(event.id)
      this.vehicleForm.controls['state'].setValue(event.id)
    } else if (event.selectType == 'district') {
      this.vehicleForm.controls['district'].setValue(event.id)
    } else if (event.selectType == 'Doc-Type') {
      this.itemName = event.assets_no
      this.documentForm.controls['docType'].setValue(event.id)
    }
  }


  cancel() {
    this.vehicleForm.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  submit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    };
    const data = JSON.parse(localStorage.getItem('item') || '[]');

    const requestChild = data.map((val: any) => ({
      fk_Doc_type_id: Number(val.docTypeId),
      doc_no: val.docNo,
      start_date: val?.startdate,
      end_date: val?.endDate,
      doc_file_name: "",
      imageData1: val.imageData1?.split(',')[1]
    }));
    let service: any
    let payload: any
    if (this.id) {
      payload = {
        "pk_vehicle_id": Number(this.id),
        "licenseplate_no": this.vehicleForm.value.license_plate_No,
        "chassis_no": this.vehicleForm.value.chassis_No,
        "engine_no": this.vehicleForm.value.engine_No,
        "make_model": this.vehicleForm.value.make_model,
        "manufacturing_year": Number(this.vehicleForm.value.manufacture_year),
        "fk_body_type_id": Number(this.vehicleForm.value.body_type),
        "fk_vehicle_type_id": Number(this.vehicleForm.value.vehicle_type),
        "fk_fuel_type_id": Number(this.vehicleForm.value.fuel_type),
        "fk_owner_type_id": Number(this.vehicleForm.value.owner_type),
        "procurement_date": formatDate(this.vehicleForm.value.procrumentDate, 'yyyy-MM-dd', 'en-US'),
        "bus_cost": Number(this.vehicleForm.value.busCost),
        "contractor_Name": this.vehicleForm.value.contract_name,
        "contractor_mobile": this.vehicleForm.value.contract_mobile,
        "contractor_email": this.vehicleForm.value.contract_email,
        "contractor_address": this.vehicleForm.value.contract_address,
        "fk_state_id": Number(this.vehicleForm.value.state),
        "fk_district_id": Number(this.vehicleForm.value.district),
        "fk_country_id": Number(this.vehicleForm.value.country),
        "pincode": Number(this.vehicleForm.value.pincode),
        "current_status": this.vehicleForm.value.status,
        "logged_by": Number(localStorage.getItem('user_Id')),
      }
      service = this.registrationService.updateVehicleMaster(payload)
    } else {
      payload = {
        "pk_vehicle_id": 0,
        "licenseplate_no": this.vehicleForm.value.license_plate_No,
        "chassis_no": this.vehicleForm.value.chassis_No,
        "engine_no": this.vehicleForm.value.engine_No,
        "make_model": this.vehicleForm.value.make_model,
        "manufacturing_year": Number(this.vehicleForm.value.manufacture_year),
        "fk_body_type_id": Number(this.vehicleForm.value.body_type),
        "fk_vehicle_type_id": Number(this.vehicleForm.value.vehicle_type),
        "fk_fuel_type_id": Number(this.vehicleForm.value.fuel_type),
        "fk_owner_type_id": Number(this.vehicleForm.value.owner_type),
        "procurement_date": formatDate(this.vehicleForm.value.procrumentDate, 'yyyy-MM-dd', 'en-US'),
        "bus_cost": Number(this.vehicleForm.value.busCost),
        "contractor_Name": this.vehicleForm.value.contract_name,
        "contractor_mobile": this.vehicleForm.value.contract_mobile,
        "contractor_email": this.vehicleForm.value.contract_email,
        "contractor_address": this.vehicleForm.value.contract_address,
        "fk_state_id": Number(this.vehicleForm.value.state),
        "fk_district_id": Number(this.vehicleForm.value.district),
        "fk_country_id": Number(this.vehicleForm.value.country),
        "pincode": Number(this.vehicleForm.value.pincode),
        "current_status": this.vehicleForm.value.status,
        "logged_by": Number(localStorage.getItem('user_Id')),
        "docLists": requestChild
      }
      service = this.registrationService.createVehicleMaster(payload)
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
          this.router.navigateByUrl('/Registration/Vehicle_Master')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`,
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
