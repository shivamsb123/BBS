import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';

@Component({
  selector: 'app-add-hsn-popup',
  templateUrl: './add-hsn-popup.component.html',
  styleUrls: ['./add-hsn-popup.component.scss']
})
export class AddHsnPopupComponent {
  @Output() mapdata = new EventEmitter<string>();
  isloading: boolean = false;
  hsnForm !: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage: string = 'Added'
  submitted: boolean = true;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private stockeService: StockService,
  ) {

  }

  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    this.hsnForm = this.fb.group({
      hsnCode: ['', [Validators.required, Validators.pattern('')]],
      Description: ['', [Validators.required, Validators.pattern('')]],
      cgst: [0.00, [Validators.required, Validators.max(100)]],
      igst: [0.00, [Validators.required, Validators.max(100)]],
      sgst: [0.00, [Validators.required, Validators.max(100)]],
      tax: [0.00, [Validators.required, Validators.max(100)]],
      cess: [''],

    })

  }

  submit(formValue: any) {
    if (this.hsnForm.invalid) {
      this.hsnForm.markAllAsTouched();
      return;
    };
    this.submitted = true;
    if (formValue.cgst > 100 && formValue.cgst > 100 && formValue.cgst > 100) return;
    let service: any
    let payload = {
      "hsn_code": formValue?.hsnCode,
      "hsn_description": formValue?.Description,
      "tax_per": parseFloat(formValue?.tax),
      "cgst_per": parseFloat(formValue?.cgst),
      "sgst_per": parseFloat(formValue?.sgst),
      "igst_per": parseFloat(formValue?.igst),
      "cess_per": 0,
      "created_by": parseInt(localStorage.getItem('user_Id') || '')
    }

    this.stockeService.addHSN(payload).subscribe((res: any) => {
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.hsnForm.reset();
       setTimeout(() => {
            this.modalService.hide();
          }, 2000)
          this.mapdata.emit(res)
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

  cancel() {
    this.modalService.hide();

  }
}
