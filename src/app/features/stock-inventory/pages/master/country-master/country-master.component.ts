import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from 'src/app/features/http-services/scroll.service';
import { StockService } from '../../../services/stock.service';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-country-master',
  templateUrl: './country-master.component.html',
  styleUrls: ['./country-master.component.scss']
})
export class CountryMasterComponent {
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
  countryForm!: FormGroup
  countryList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  countryId: any;
  bsModalRef!: BsModalRef

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
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.countryForm = this.fb.group({
      countryName: ['', [Validators.required, Validators.pattern('')]],
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
    let payload = {
      "pk_country_id": 0
    }
    this.stockService.countryListData(payload).subscribe((res: any) => {
      this.countryList = res?.body?.data;
      this.isloading = false;
    })
  }

  update(country: any) {  
    this.countryId = country.pk_country_id
    this.countryForm = this.fb.group({
      countryName: [country?.country_name, [Validators.required, Validators.pattern('')]],
    })
    this.button = 'Update';
    this.alertMessage = 'Updated'
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
   

  }

  submit(formvalue: any) {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    };
    let service : any
    let payload = {
      "country_name": formvalue?.countryName,
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    if (this.countryId) {
      payload['pk_country_id'] = Number(this.countryId)
      service = this.stockService.updateCountry(payload)
    }else{
      service = this.stockService.createCountry(payload)
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
        this.getCoutryList();
        this.countryId = null
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
    this.countryForm.reset();

  }

    deleteCountry(item: any) {
      let payload = {
        "pk_country_id": Number(item?.pk_country_id),
        "Logged_by": Number(localStorage.getItem('user_Id') || '')
      }
      let url = this.stockService.deleteCountry(payload)
      const initialState: ModalOptions = {
        initialState: {
          title: item?.country_name,
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
            this.getCoutryList();
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
    this.countryForm.reset()
  }
}
