import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent {
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
  stateForm!: FormGroup
  stateList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  stateId: any;
  bsModalRef!: BsModalRef
  countryList: any;
  countryId: any;
  selectedValue: any
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
      { key: '', value: 'Country Name' },
      { key: '', value: 'state Code' },
      { key: '', value: 'State Name' },
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.stateForm = this.fb.group({
      country: ['', [Validators.required, Validators.pattern('')]],
      stateCode: ['', [Validators.required, Validators.pattern('')]],
      stateName: ['', [Validators.required, Validators.pattern('')]],
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
      this.selectedValue = this.countryList[0]
      this.countryId =this.countryList[0].value
      this.getStateList();
      this.isloading = false;
    })
  }

  getStateList() {
    this.isloading = true;
    let payload = {
      "pk_country_id": Number(this.countryId),
      "pk_StateId": 0
    }
    this.stockService.stateListData(payload).subscribe((res: any) => {
      this.stateList = res?.body?.data;
      this.isloading = false;
    })
  }

  update(state: any) {
    this.stateId = state.pk_StateId
    this.stateForm = this.fb.group({
      country: [state?.fk_country_id, [Validators.required, Validators.pattern('')]],
      stateCode: [state?.stateCode, [Validators.required, Validators.pattern('')]],
      stateName: [state?.stateName, [Validators.required, Validators.pattern('')]],
    })
    this.button = 'Update';
    this.alertMessage = 'Updated'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }


  confirm(event: any) {
    this.countryId = event.id;
    this.stateForm.controls['country'].setValue(event.id)
    this.getStateList()
  }

  submit(formvalue: any) {
    if (this.stateForm.invalid) {
      this.stateForm.markAllAsTouched();
      return;
    };
    let service: any
    let payload = {
      "StateName": formvalue?.stateName,
      "StateCode": formvalue?.stateCode,
      "fk_country_id": Number(formvalue?.country),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    if (this.stateId) {
      payload['pk_StateId'] = Number(this.stateId)
      service = this.stockService.updateState(payload)
    } else {
      service = this.stockService.createState(payload)
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
        this.button = 'Add'
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMessage = 'Added'
      }

    })
    this.stateForm.reset();

  }

  deleteState(item: any) {
    let payload = {
      "pk_StateId": Number(item?.pk_StateId),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.deleteState(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.stateName,
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
          this.getStateList();
        } else {
          this.alertData = {
            message: `Data Not ${this.alertMessage}`
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
      }
    );
  }


  cancel() {
    this.stateForm.reset()
    this.selectedValue = {
      value: '',
      text: ''
    }
  }
}
