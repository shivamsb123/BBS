import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';

@Component({
  selector: 'app-add-unit-popup',
  templateUrl: './add-unit-popup.component.html',
  styleUrls: ['./add-unit-popup.component.scss']
})
export class AddUnitPopupComponent {
  @Output() mapdata = new EventEmitter<string>();
  isloading: boolean = false;
  unitForm !: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage: string = 'Added'
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private stockeService: StockService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    this.unitForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]]
    })
  }


  submit(formValue: any) {
    if (this.unitForm.invalid) {
      this.unitForm.markAllAsTouched();
      return;
    };
    let payload = {
      "unit_code": formValue?.code,
      "unit_name": formValue?.name,
      "created_by": Number(localStorage.getItem('user_Id') || '')
    }

    this.stockeService.addUnit(payload).subscribe((res: any) => {
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
          this.modalService.hide();
        }, 2000)
        this.mapdata.emit(res)
      } else {
        this.alertData = {
          message: res?.body?.alert
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
