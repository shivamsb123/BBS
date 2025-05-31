import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  contactData: any;
  bsModalRef!: BsModalRef
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';

  constructor(
    private route: Router,
    private stockService: StockService,
    private modalService: BsModalService,

  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getContactData();
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Supplier Name' },
      { key: 'keyValue', val: 'Buisness Man' },
      { key: 'keyValue', val: 'Contact Person Name' },
      { key: 'keyValue', val: 'Email' },
      { key: 'keyValue', val: 'ContactNo.' },
      { key: 'keyValue', val: 'Pan No ' },
      { key: 'keyValue', val: 'Gstin No ' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getContactData() {
    this.isloading = true
    let payload = {
      "pk_supplier_id": 0,

    };
    this.stockService.contactList(payload).subscribe((res: any) => {
      this.contactData = res?.body?.data;
      this.isloading = false
    })
  }

  redirectTo(path:any,id: any) {
    let url = path.replace(
      "id",
      id
    )
    this.route.navigateByUrl(url)
  }


  deleteSuppiler(item: any) {
    let payload = {
      "pk_supplier_id": Number(item?.pk_supplier_id),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockService.deleteSupplier(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.supplier_name,
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
          this.getContactData();
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

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  AddUnit(path: any) {
    this.route.navigateByUrl(path)
  }
}

