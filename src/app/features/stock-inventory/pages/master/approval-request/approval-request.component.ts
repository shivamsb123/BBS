import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.scss']
})
export class ApprovalRequestComponent {
  @Output() mapdata = new EventEmitter<string>();
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  bsModalRef!: BsModalRef
  approvalForm: any
  selectedValue: any
  statusDropdown: any
  requestId: any
  requestStatus: any;
  constructor(
    private modalService: BsModalService,
    private stockService: StockService,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.setInitialValue()
    if (this.statusDropdown) {

      this.getStatusDD()
    }
  }

  setInitialValue() {
    this.approvalForm = this.fb.group({
      requestStatus: ['', [Validators.required, Validators.pattern('')]],
      approveDate: ['', [Validators.required, Validators.pattern('')]],
      remarks: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  getStatusDD() {
    let newData = {
      value: '',
      text: ''
    };
    this.requestStatus = this.statusDropdown.map((val: any) =>
      newData = {
        value: val?.id,
        text: val?.name
      }
    )


  }

  confirm(event: any) {
    console.log(event);

    this.approvalForm.controls['requestStatus'].setValue(event.assets_no)

  }

  submit(formValue: any) {
    if (this.approvalForm.invalid) {
      this.approvalForm.markAllAsTouched();
      return;
    };
    let payload = {
      "pk_request_id": Number(this.requestId),
      "approved_date": formatDate(formValue.approveDate, 'yyyy-MM-dd', 'en-US'),
      "approved_remarks": formValue.remarks,
      "request_status": formValue.requestStatus,
      "Logged_by": Number(localStorage.getItem('user_Id'))
    }

    this.stockService.approveRequest(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.mapdata.emit(res)
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.modalService.hide();
        }, 2000);
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
