import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { ConfirmationPopupComponent } from 'src/app/features/shared/components/confirmation-popup/confirmation-popup.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-hsn-code',
  templateUrl: './hsn-code.component.html',
  styleUrls: ['./hsn-code.component.scss']
})
export class HSNCodeComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  hsnData: any;
  bsModalRef!: BsModalRef
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  constructor(
    private route: Router,
    private stockeService: StockService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getHSNList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'HSN' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Tax(%)' },
      // { key: 'keyValue', val: 'Cess(%)' },
      { key: 'keyValue', val: 'Cgst(%)' },
      { key: 'keyValue', val: 'Sgst(%)' },
      { key: 'keyValue', val: 'Igst(%)' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getHSNList() {
    this.isloading = true;
    let payload = {
      "pk_hsn_id": 0
    }
    this.stockeService.hsnList(payload).subscribe((res: any) => {
      this.hsnData = res?.body?.data;
      this.isloading = false;
    })
  }

  deleteHsn(item: any) {
    let payload = {
      "pk_hsn_id": Number(item?.pk_hsn_id),
      "created_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockeService.deleteHSN(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.hsn_code,
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
          this.getHSNList();
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

  redirectTo(id: any) {
    let url = '/SupplyChain/Add-HSN/id'.replace(
      "id",
      id
    )
    this.route.navigateByUrl(url)
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

  AddHsn(path: any) {
    this.route.navigateByUrl(path)
  }
}
