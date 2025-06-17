import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-district-master',
  templateUrl: './district-master.component.html',
  styleUrls: ['./district-master.component.scss']
})
export class DistrictMasterComponent {
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 9, 12];
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  districtForm!: FormGroup
  stateList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  stateId: any;
  bsModalRef!: BsModalRef
  countryList: any;
  countryId: any;
  selectedCountryValue: any
  selectedStateValue: any
  districtList: any;
  districtId: any;
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable();
    this.getCoutryList()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'State Name' },
      { key: '', value: 'District Name' },
      { key: '', value: 'Action', class: 'text-center' },
    ]
  }

  setInitialValue() {
    this.districtForm = this.fb.group({
      country: ['', [Validators.required, Validators.pattern('')]],
      state: ['', [Validators.required, Validators.pattern('')]],
      districtName: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getCoutryList() {
    this.isloading = true;
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "pk_country_id": 0
    }
    this.stockService.countryListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.countryList = data.map((val: any) =>
        newData = {
          value: val?.pk_country_id,
          text: val?.country_name
        }
      )
      this.selectedCountryValue = this.countryList[0]
      this.countryId = this.countryList[0].value
      this.districtForm.controls['country'].setValue(this.countryId)

      this.getStateList();
      this.isloading = false;
    })
  }

  getStateList() {
    this.isloading = true;
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "pk_country_id": Number(this.countryId),
      "pk_StateId": 0
    }
    this.stockService.stateListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.stateList = data.map((val: any) =>
        newData = {
          value: val?.pk_StateId,
          text: val?.stateName
        }
      )
      this.selectedStateValue = this.stateList[0]
      this.stateId = this.stateList[0].value
      this.districtForm.controls['state'].setValue(this.stateId)

      this.getDistrictList();
      this.isloading = false;
    })
  }

  getDistrictList() {
    this.isloading = true;
    let payload = {
      "pk_StateId": Number(this.stateId),
      "pk_district_id": 0
    }
    this.stockService.districtListData(payload).subscribe((res: any) => {
      this.districtList = res?.body?.data;
      this.isloading = false;
    })
  }

  update(state: any) {
    this.districtId = state.pk_district_id
    this.districtForm = this.fb.group({
      country: [state?.fk_country_id, [Validators.required, Validators.pattern('')]],
      state: [state?.fk_state_id, [Validators.required, Validators.pattern('')]],
      districtName: [state?.district_name, [Validators.required, Validators.pattern('')]],
    })
    this.button = 'Update';
    this.alertMessage = 'Updated'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }


  confirm(event: any) {
    if (event.selectType == 'country') {
      this.countryId = event.id;
      this.districtForm.controls['country'].setValue(event.id)
      this.getStateList()
    } else if (event.selectType == 'state') {
      this.stateId = event.id;
      this.districtForm.controls['state'].setValue(event.id)
      this.getDistrictList()
    }

  }

  submit(formvalue: any) {
    if (this.districtForm.invalid) {
      this.districtForm.markAllAsTouched();
      return;
    };
    let service: any
    let payload = {
      "district_name": formvalue?.districtName,
      "fk_state_id": formvalue?.state,
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    if (this.districtId) {
      payload['pk_district_id'] = Number(this.districtId)
      service = this.stockService.updateDistrict(payload)
    } else {
      service = this.stockService.createDistrict(payload)
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
        this.getStateList();
        this.districtId = null
        this.button = 'Add'
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.districtList = []
        this.selectedCountryValue = null
        this.selectedStateValue = null
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMessage = 'Added'
      }

    })
    this.districtForm.reset();

  }

  deleteDistrict(item: any) {
    let payload = {
      "pk_district_id": Number(item?.pk_district_id),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.deleteDistrict(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.district_name,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.body?.status == 'success') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          this.alertData = {
            message: value?.body?.alert
          };
          this.alertType = "success";
          this.alertTrigger = true;
          this.stopAlert();
          this.getDistrictList();
        } else {
          this.alertData = {
            message: value?.body?.alert
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
      }
    );
  }


  cancel() {
    this.districtList = []
    this.districtForm.reset()
    this.selectedCountryValue = {
      value: '',
      text: ''
    }

     this.selectedStateValue = {
      value: '',
      text: ''
    }
  }
}
