import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';

@Component({
  selector: 'app-add-level-popup',
  templateUrl: './add-level-popup.component.html',
  styleUrls: ['./add-level-popup.component.scss']
})
export class AddLevelPopupComponent {
  @Output() mapdata = new EventEmitter<string>();
  isloading: boolean = false;
  levelForm !: FormGroup;
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
    this.levelForm = this.fb.group({
      sequence: ['', [Validators.required, Validators.pattern('')]],
      levelName: ['', [Validators.required, Validators.pattern('')]],
      amount: ['', [Validators.required, Validators.pattern('')]],
    })
  }


  submit(formvalue: any) {
    if (this.levelForm.invalid) {
      this.levelForm.markAllAsTouched();
      return;
    };
    let payload = {
      "level_seq": Number(formvalue?.sequence),
      "level_name": formvalue?.levelName,
      "min_order_amount": formvalue?.amount,
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    this.stockeService.createLevel(payload).subscribe((res: any) => {
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
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMessage = 'Added'
      }

    })
    this.levelForm.reset();

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
