import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-dashboard-child-list',
  templateUrl: './dashboard-child-list.component.html',
  styleUrls: ['./dashboard-child-list.component.scss']
})
export class DashboardChildListComponent {
  isloading: boolean = false
  childData: any
  Type: any
  tableData: any;
  searchKeyword: any
  selectedItem: any = 'Open'
  complaintDashboardItems: any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  bsModalRef!: BsModalRef
  requestId: any

  constructor(
    private modalService: BsModalService,
    private stockService: StockService

  ) { }
  ngOnInit() {
    console.log("check route data", this.Type, this.childData);
    this.setInitialTable();
    if (this.requestId) {
      this.getChildList()
    }
  }

  setInitialTable() {
    this.tableData = [
      { 'key': '', val: 'Item Name' },
      { 'key': '', val: 'Item Name Alias' },
      { 'key': '', val: 'Category' },
      { 'key': '', val: 'Sub Category' },
      { 'key': '', val: 'Unit' },
      { 'key': '', val: 'Manufacturer' },
      { 'key': '', val: 'Quantity' },
      { 'key': '', val: 'Action' },
    ]
  }

  getChildList() {
    this.isloading = true
    let payload = {
      "fk_request_id": Number(this.requestId),
    }
    this.stockService.requestChildList(payload).subscribe((res: any) => {
      this.isloading = false
      if (res?.body?.status == 'success') {
        this.childData = res?.body?.data
      }
    })
  }

  updateQuantity(item: any) {
    let payload = {
      "pk_child_request_id": Number(item?.pk_child_request_id),
      "fk_request_id": Number(item?.fk_request_id),
      "fk_item_id": Number(item?.fk_item_id),
      "request_qty": Number(item?.request_qty),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    console.log('Updated quantity:', item.request_qty);
    this.stockService.updateRequest(payload).subscribe((res: any) => {
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();

        setTimeout(() => {
          this.getChildList()
        }, 3000);
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


  deleteRequest(item: any) {
    let payload = {
      "pk_child_request_id": Number(item?.pk_child_request_id),
      "fk_request_id": Number(item?.fk_request_id),
      "fk_item_id": Number(item?.fk_item_id),
      "request_qty": Number(item?.request_qty),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.deleteRequest(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.item_name,
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
          this.getChildList()
          this.stopAlert();
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

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel() {
    this.modalService.hide();

  }
}
