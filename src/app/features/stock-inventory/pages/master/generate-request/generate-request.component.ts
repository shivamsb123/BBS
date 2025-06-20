import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { formatDate } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddLevelPopupComponent } from '../master-popup-pages/add-level-popup/add-level-popup.component';

@Component({
  selector: 'app-generate-request',
  templateUrl: './generate-request.component.html',
  styleUrls: ['./generate-request.component.scss']
})
export class GenerateRequestComponent {
  levelList: any;
  id: string;
  isloading: boolean = false;
  requestForm!: FormGroup
  itemCreateform!: FormGroup
  selectedValue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage: string = 'Added';
  selectedLevel: any;
  priorityDD: any;
  itemType: any;
  itemData: any[] = [];
  tableData: any;
  selectedItem: any
  itemListData: any
  itemListFilter: any;
  itemLocationList: any;
  itemName: any;
  selectedItemFor:any
    bsModalRef!: BsModalRef
  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.isloading = true;
    this.setInitialValue()
    this.getLevelDD();
    setTimeout(() => {
      this.isloading = false;
    }, 500);
    this.initialTable()
    this.getItemLocation()
    this.getPriorityList()
  }

  setInitialValue() {
    this.requestForm = this.fb.group({
      level: ['', [Validators.required, Validators.pattern('')]],
      requestDate: [new Date(), [Validators.required, Validators.pattern('')]],
      remarks: ['', [Validators.required, Validators.pattern('')]],
      priority: ['', [Validators.required, Validators.pattern('')]]
    })

    this.itemCreateform = this.fb.group({
      itemFor: ['', [Validators.required, Validators.pattern('')]],
      item: ['', [Validators.required, Validators.pattern('')]],
      quantity: ['', [Validators.required, Validators.pattern('')]],
    })
  }


  getLevelDD() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "pk_Level_id": 0
    }
    this.stockService.levelList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.levelList = data.map((val: any) =>
        newData = {
          value: val?.pk_Level_id,
          text: val?.level_name
        }
      )

    })
  }

  getProductList(locationId: any) {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "fk_item_location_id": Number(locationId)
    }
    this.stockService.itemFilterList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.itemListData = data.map((val: any) =>
        newData = {
          value: val?.pk_item_id,
          text: val?.item_name
        }
      )
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Item ' },
      { key: 'keyValue', val: 'Quantity' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  getPriorityList() {
    this.stockService.getPriority().subscribe((res: any) => {
      if (res?.body?.status == 'success') {
        this.priorityDD = res?.body?.data
      }
    })
  }

  addItem(type: any) {
    this.itemType = type
  }

  createItem(formvalue: any) {
     if (this.itemCreateform.invalid) {
      this.itemCreateform.markAllAsTouched();
      return;
    };
    console.log("formvalue", formvalue);

    let index = this.itemData.findIndex((val: any) => formvalue?.item == val?.item);
    let data: any;
    if (index !== -1) {
      console.log('not add');
      
      this.alertData = {
        message: 'Already Added',
      };
      this.alertType = "danger";
      this.alertTrigger = true;
      this.stopAlert();

    } else {
      data = {
        itemId: formvalue?.item,
        itemName: this.itemName,
        quantity: formvalue?.quantity,
      };
      this.itemData.push(data);
      console.log("this.itemData", this.itemData);

      localStorage.setItem('item', JSON.stringify(this.itemData));
      this.itemCreateform.reset();
      this.selectedItem = {
        text: '',
        value: ''
      }

       this.selectedItemFor = {
        text: '',
        value: ''
      }
    }

  }

   addLevelCode() {
      const initialState: ModalOptions = {
        initialState: {
          // vehicleDetail: value
        },
      };
      this.bsModalRef = this.modalService.show(
        AddLevelPopupComponent,
        Object.assign(initialState, { class: "modal-md modal-dialog-centered" })
      );
      this.bsModalRef?.content.mapdata.subscribe(
        (value: any) => {
          this.getLevelDD()
        }
      );
    }

  delete(data: any, i: any) {
    this.itemData.splice(i, 1);
    localStorage.setItem('item', JSON.stringify(this.itemData))
  }

  getItemLocation() {
     let newData = {
      value: '',
      text: ''
    }
    this.stockService.itemLocationList().subscribe((res: any) => {
      let data = res?.body?.data
      this.itemLocationList = data.map((val: any) =>
        newData = {
          value: val?.itemLocationId,
          text: val?.itemLocationName
        }
      )
    })
  }
  confirm(event: any) {
    if (event.selectType == 'Level') {
      this.requestForm.controls['level'].setValue(event.id)
    } else if (event.selectType == 'Item') {
      this.itemName = event.assets_no
      this.itemCreateform.controls['item'].setValue(event.id)
    }else if (event.selectType == 'Item-For') {
      this.itemCreateform.controls['itemFor'].setValue(event.id)
      this.getProductList(event.id)
    }
  }

  increaseQty() {
  const current = this.itemCreateform.get('quantity')?.value || 0;
  this.itemCreateform.get('quantity')?.setValue(current + 1);
}

decreaseQty() {
  const current = this.itemCreateform.get('quantity')?.value || 0;
  if (current > 0) {
    this.itemCreateform.get('quantity')?.setValue(current - 1);
  }
}



  cancel() {
    this.requestForm.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  submit() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    };
    const data = JSON.parse(localStorage.getItem('item') || '[]');

    const requestChild = data.map((val: any) => ({
      fk_item_id: Number(val.itemId),
      request_qty: Number(val.quantity)
    }));
    let payload = {

      "voucherType": "EFR",
      "request_date": formatDate(this.requestForm.value.requestDate, 'yyyy-MM-dd', 'en-US'),
      "request_remarks": this.requestForm.value.remarks,
      "request_priority": this.requestForm.value.priority,
      "fk_level_id": Number(this.requestForm.value.level),
      "Logged_by": Number(localStorage.getItem('user_Id')),
      "item_list": requestChild
    }

    this.stockService.generateRequestDetail(payload).subscribe((res: any) => {
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
          this.router.navigateByUrl('/SupplyChain/SupplyDashboard')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`,
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
}
