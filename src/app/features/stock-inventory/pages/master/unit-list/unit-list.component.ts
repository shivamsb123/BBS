


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  unitData: any;
  bsModalRef!: BsModalRef
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  constructor(
    private route: Router,
    private stockServie: StockService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getUnitList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Unit Code' },
      { key: 'keyValue', val: 'Unit Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getUnitList() {
    this.isloading = true;
    let payload = {
      "pk_unit_id": 0
    }

    this.stockServie.unitList(payload).subscribe((res: any) => {
      this.unitData = res?.body?.data
      this.isloading = false
    })
  }

  deleteUnit(item: any) {
    let payload = {
      "pk_unit_id": Number(item?.pk_unit_id),
      "updated_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockServie.deleteUnit(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.unit_name,
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
          this.getUnitList();
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

  redirectTo(id: any) {
    let url = '/SupplyChain/Add-Unit/id'.replace("id", id)
    this.route.navigateByUrl(url)
  }
}

