import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from '../../shared/components/delete-confirmation/delete-confirmation.component';
import { ViewDocumentDetailComponent } from '../view-document-detail/view-document-detail.component';
import { VehicleMasterInfoComponent } from '../vehicle-master-info/vehicle-master-info.component';

@Component({
  selector: 'app-vehicle-master-v2',
  templateUrl: './vehicle-master-v2.component.html',
  styleUrls: ['./vehicle-master-v2.component.scss']
})
export class VehicleMasterV2Component {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  vehicleMaterList: any
  id: any = 0;
  bsModalRef!: BsModalRef
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  constructor(
    private RegistrationService: RegistrationService,
    private router: Router,
    private modalService: BsModalService,
    private route:ActivatedRoute

  ) { }

  ngOnInit() {
    this.initialTable()
    this.getVechileList()
   
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'License Plate No' },
      { key: 'keyValue', val: 'Chassis Number ' },
      { key: 'keyValue', val: 'Engine Number ' },
      { key: 'keyValue', val: 'Model' },
      { key: 'keyValue', val: 'Manufacture Year' },
      { key: 'keyValue', val: 'Body Type' },
      { key: 'keyValue', val: 'Vehicle Type' },
      { key: 'keyValue', val: 'Fuel Type' },
      { key: 'keyValue', val: 'Owner Type' },
      // { key: 'keyValue', val: 'Procurement Date' },
      // { key: 'keyValue', val: 'Bus Cost' },
      // { key: 'keyValue', val: 'Name' },
      // { key: 'keyValue', val: 'Email' },
      // { key: 'keyValue', val: 'Mobile No.' },
      // { key: 'keyValue', val: 'Country' },
      // { key: 'keyValue', val: 'State' },
      // { key: 'keyValue', val: 'District' },
      // { key: 'keyValue', val: 'Pincode' },
      { key: 'keyValue', val: 'Status' },
      // { key: 'keyValue', val: 'Address' },
      { key: 'keyValue', val: 'Action' },
    ]

  }


  getVechileList() {
    this.isloading = true;
    this.RegistrationService.vechileMasterListDetail().subscribe((result: any) => {
      this.vehicleMaterList = result.body.data;
      console.log("this.vehicleMaterList", this.vehicleMaterList);

      this.isloading = false
    })
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

  createNewVehicle(path: any) {
    this.router.navigateByUrl(path)
  }

  deleteVehicle(item: any) {
    let payload = {
      "pk_vehicle_id": Number(item?.pk_vehicle_id),
      "logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.RegistrationService.deleteVehicleMaster(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: `Chassis No :-${item?.chassis_no}`,
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
          this.getVechileList();
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

    onShowDocumentList(value: any) {
      const initialState: ModalOptions = {
        initialState: {
          vehicleId: value?.pk_vehicle_id,
        },
      };
      this.bsModalRef = this.modalService.show(
        ViewDocumentDetailComponent,
        Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
      );
    }

     moreInfo(value: any) {
      const initialState: ModalOptions = {
        initialState: {
          vehicleDetail: value
        },
      };
      this.bsModalRef = this.modalService.show(
        VehicleMasterInfoComponent,
        Object.assign(initialState, { class: "modal-lg modal-dialog-centered" })
      );
    }

redirectTo(id: any, item: any) {
  const url = `/Registration/add-new-vehicle/${id}`;
  // this.router.navigateByUrl(url, { state: { itemData: item } });
    this.router.navigateByUrl(url,{
      state: { data: item }
    })
}

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

}
