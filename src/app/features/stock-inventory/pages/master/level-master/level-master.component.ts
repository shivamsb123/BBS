import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-level-master',
  templateUrl: './level-master.component.html',
  styleUrls: ['./level-master.component.scss']
})
export class LevelMasterComponent {
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
  levelForm!: FormGroup
  levelList: any;
  isloading: boolean = false;
  button: any = 'Add'
  alertMessage: string = 'Added';
  levelId: any;
  bsModalRef!: BsModalRef

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable();
    this.getLevelList()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'Level Name' },
      { key: '', value: 'Amount' },
      { key: '', value: 'Sequence' },
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.levelForm = this.fb.group({
      sequence: ['', [Validators.required, Validators.pattern('')]],
      levelName: ['', [Validators.required, Validators.pattern('')]],
      amount: ['', [Validators.required, Validators.pattern('')]],
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

  getLevelList() {
    this.isloading = true;
    let payload = {
      "pk_Level_id": 0
    }
    this.stockService.levelList(payload).subscribe((res: any) => {
      this.levelList = res?.body?.data;
      this.isloading = false;
    })
  }

  update(level: any) {
    this.levelId = level.pk_Level_id
    this.levelForm = this.fb.group({
      sequence: [level?.level_seq, [Validators.required, Validators.pattern('')]],
      levelName: [level?.level_name, [Validators.required, Validators.pattern('')]],
      amount: [level?.min_order_amount, [Validators.required, Validators.pattern('')]],
    })
    this.button = 'Update';
    this.alertMessage = 'Updated'
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });


  }

  submit(formvalue: any) {
    if (this.levelForm.invalid) {
      this.levelForm.markAllAsTouched();
      return;
    };
    let service: any
    let payload = {
      "level_seq": Number(formvalue?.sequence),
      "level_name": formvalue?.levelName,
      "min_order_amount": formvalue?.amount,
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    if (this.levelId) {
      payload['pk_Level_id'] = Number(this.levelId)
      service = this.stockService.updateLevel(payload)
    } else {
      service = this.stockService.createLevel(payload)
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
        this.getLevelList();
        this.levelId = null
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
    this.levelForm.reset();

  }

  deleteLevel(item: any) {
    let payload = {
      "pk_Level_id": Number(item?.pk_Level_id),
    }
    let url = this.stockService.deleteLevel(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.level_name,
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
          this.getLevelList();
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
    this.levelForm.reset()
    this.levelId = null
  }
}
