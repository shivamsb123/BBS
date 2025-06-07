import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-hsn',
  templateUrl: './add-hsn.component.html',
  styleUrls: ['./add-hsn.component.scss']
})
export class AddHSNComponent implements OnInit {

  hsnForm!: FormGroup
  isloading: boolean = false
  hsnData: any;
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
  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getHSNListById()
      this.alertMessage = "Updated";
      this.button = 'Update'
    }
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


  getHSNListById() {
    this.isloading = true;
    let payload = {
      "pk_hsn_id": Number(this.id)
    }
    this.stockService.hsnList(payload).subscribe((res: any) => {
      this.hsnData = res?.body?.data;
      this.hsnData.forEach((val: any) => {
        this.hsnForm = this.fb.group({
          hsnCode: [val?.hsn_code, [Validators.required, Validators.pattern('')]],
          Description: [val?.hsn_description, [Validators.required, Validators.pattern('')]],
          cgst: [val?.cgst_per, [Validators.required, Validators.max(100)]],
          sgst: [val?.sgst_per, [Validators.required, Validators.max(100)]],
          igst: [val?.igst_per, [Validators.required, Validators.max(100)]],
          tax: [val?.tax_per, [Validators.required, Validators.max(100)]],
          cess: [''],

        })
      })

      this.isloading = false;
    })
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
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
    if (this.id) {
      payload['pk_hsn_id'] = Number(this.id);
      service = this.stockService.updateHSN(payload)
    } else {
      service = this.stockService.addHSN(payload)
    }

    service.subscribe((res: any) => {      
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.hsnForm.reset();
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/HSNMaster_List')
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
    this.hsnForm.reset()
  }
}
