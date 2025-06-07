import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent {
searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  locationList: any;
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
    this.getLocationList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Location Name' },
      { key: 'keyValue', val: 'Country' },
      { key: 'keyValue', val: 'State' },
      { key: 'keyValue', val: 'District' },
      { key: 'keyValue', val: 'Pin Code' },
      { key: 'keyValue', val: 'Address 1' },
      { key: 'keyValue', val: 'Address 2' },
      { key: 'keyValue', val: 'Address 3' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getLocationList() {
    this.isloading = true;
    let payload = {
      "pk_location_id": 0
    }
    this.stockeService.locationList(payload).subscribe((res: any) => {
      this.locationList = res?.body?.data;
      this.isloading = false;
    })
  }

  deleteLocation(item: any) {
    let payload = {
      "pk_location_id": Number(item?.pk_location_id),
      "Logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.stockeService.deleteLocation(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.location_name,
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
          this.getLocationList();
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
    let url = '/SupplyChain/Add-location/id'.replace(
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

  AddLocation(path: any) {
    this.route.navigateByUrl(path)
  }
}
