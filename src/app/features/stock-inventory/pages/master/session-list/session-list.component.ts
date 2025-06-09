import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent {
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
  sessionForm!: FormGroup
  sessionList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  sessionId: any;
  bsModalRef!: BsModalRef

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable();
    this.getSessionList()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'Session Name' },
      { key: '', value: 'Prefix Name' },
      { key: '', value: 'Start Date' },
      { key: '', value: 'End Date' },
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.sessionForm = this.fb.group({
      sessionName: ['', [Validators.required, Validators.pattern('')]],
      prefixName: ['', [Validators.required, Validators.pattern('')]],
      startDate: ['', [Validators.required, Validators.pattern('')]],
      endDate: ['', [Validators.required, Validators.pattern('')]],
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
    this.isloading = true;
    this.stockService.sessionList().subscribe((res: any) => {
      this.sessionList = res?.body?.data;
      this.isloading = false;
    })
  }

  update(item: any) {
    this.sessionId = item.sessionId
    this.sessionForm = this.fb.group({
      sessionName: [item?.sessionName, [Validators.required, Validators.pattern('')]],
      prefixName: [item?.prefixName, [Validators.required, Validators.pattern('')]],
      startDate: [new Date(item?.startDate), [Validators.required, Validators.pattern('')]],
      endDate: [new Date(item?.endDate), [Validators.required, Validators.pattern('')]],
    })
    this.button = 'Update';
    this.alertMessage = 'Updated'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });


  }

  submit(formvalue: any) {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      return;
    };
    let service: any
    let payload = {
      "SessionName": formvalue?.sessionName,
      "PrefixName": formvalue?.prefixName,
      "StartDate": formatDate(formvalue.startDate, 'yyyy-MM-dd', 'en-US'),
      "EndDate": formatDate(formvalue.endDate, 'yyyy-MM-dd', 'en-US'),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    if (this.sessionId) {
      payload['SessionId'] = Number(this.sessionId)
      service = this.stockService.updateSession(payload)
    } else {
      service = this.stockService.createSession(payload)
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
        this.getSessionList();
        this.sessionId = null
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
    this.sessionForm.reset();

  }

  activeInactiveSession(item: any) {
    let payload = {
      "SessionId": Number(item?.sessionId),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.activeInactiveSession(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.sessionName,
        content: 'Are you sure you want to Active?',
        primaryActionLabel: 'Yes',
        secondaryActionLabel: 'No',
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
          this.getSessionList();
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
    this.sessionForm.reset()
    this.sessionId = null
  }
}
