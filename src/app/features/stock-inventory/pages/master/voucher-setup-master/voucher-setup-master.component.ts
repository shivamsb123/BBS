import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-voucher-setup-master',
  templateUrl: './voucher-setup-master.component.html',
  styleUrls: ['./voucher-setup-master.component.scss']
})
export class VoucherSetupMasterComponent {
  tableData: any;
  page = 1;
  count = 0;
  tableSizes = [25, 9, 12];
  tableSize = 25;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  voucherForm!: FormGroup
  voucherList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  voucherId: any;
  bsModalRef!: BsModalRef
  selectedSession: any
  sessionList: any;
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable();
    this.getSessionList()
    this.getVoucherList('')
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'Session Name' },
      { key: '', value: 'Voucher Name' },
      { key: '', value: 'Short Name' },
      { key: '', value: 'Serial Start' },
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.voucherForm = this.fb.group({
      session: ['', [Validators.required, Validators.pattern('')]],
      voucherName: ['', [Validators.required, Validators.pattern('')]],
      shortName: ['', [Validators.required, Validators.pattern('')]],
      serialStart: ['', [Validators.required, Validators.pattern('')]],
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

  getSessionList() {
    let newData = {
      value: '',
      text: ''
    }
    this.stockService.sessionList().subscribe((res: any) => {
      let data = res?.body?.data;
      this.sessionList = data.map((val: any) =>
        newData = {
          value: val?.sessionId,
          text: val?.sessionName
        }
      )
    })
  }

  getVoucherList(sessionId: any) {
    this.voucherList = []
    let payload = {
      "SessionId": sessionId ? Number(sessionId) : 0
    }
    this.stockService.voucherList(payload).subscribe((res: any) => {
      this.voucherList = res?.body?.data;

    })
  }

  confirm(event: any) {
    if (event.selectType === 'Session') {
      this.voucherForm.controls['session'].setValue(event.id);
      this.getVoucherList(event.id);
    }
  }

  update(item: any) {
    this.voucherId = item.sessionId
    this.voucherForm = this.fb.group({
      voucherName: [item?.voucherName, [Validators.required, Validators.pattern('')]],
      shortName: [item?.shortName, [Validators.required, Validators.pattern('')]],
      serialStart: [item?.serialStart, [Validators.required, Validators.pattern('')]],
    })
    this.button = 'Update';
    this.alertMessage = 'Updated'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });


  }

  submit(formvalue: any) {
    if (this.voucherForm.invalid) {
      this.voucherForm.markAllAsTouched();
      return;
    };
    let service: any
    let payload: any
    if (this.voucherId) {
      payload = {
        "VoucherId": Number(this.voucherId),
        "VoucherName": formvalue?.voucherName,
        "ShortName": formvalue?.shortName,
        "SerialStart": Number(formvalue?.serialStart),
        "Logged_by": Number(localStorage.getItem('user_Id') || '')
      }
      service = this.stockService.updateVoucher(payload)
    } else {
      payload = {
        "SessionId": Number(formvalue?.session),
        "VoucherName": formvalue?.voucherName,
        "ShortName": formvalue?.shortName,
        "SerialStart": Number(formvalue?.serialStart),
        "Logged_by": Number(localStorage.getItem('user_Id') || '')
      }
      service = this.stockService.createVoucher(payload)
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
        this.getVoucherList('');
        this.selectedSession = {
          value: '',
          text: ''
        }
        this.voucherForm.controls['session'].setValue(null);
        this.voucherId = null
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
    this.voucherForm.reset();

  }

  cancel() {
    this.voucherForm.reset()
    this.voucherId = null
    this.selectedSession = {
      value: '',
      text: ''
    }
    this.voucherForm.controls['session'].setValue(null);
  }
}
