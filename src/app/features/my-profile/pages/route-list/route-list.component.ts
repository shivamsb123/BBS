import { Component } from '@angular/core';
import { RegistrationService } from 'src/app/features/registration/services/registration.service';
import { TrackingService } from 'src/app/features/tracking/tracking.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RoutePlotPopupComponent } from 'src/app/features/registration/route-plot-popup/route-plot-popup.component';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent {
selectedRouteName: any;
  listVehicleStopDetailsformap: any;
  routeList: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading:boolean = false
  tableData: { key: string; value: string; }[];
  bsModalRef?: BsModalRef;
constructor(
  private registrationService: RegistrationService,
  private trackingService: TrackingService,
  private modalService: BsModalService,
){}

ngOnInit(){
this.getRouteListData()
this.setInitialTable()
}

setInitialTable() {
  this.tableData = [
    { key: '', value: 'Route No' },
    { key: '', value: 'Route Name' },
  ]

}

getRouteListData() {
  this.isloading = true
  let payload = {
    "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
    "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
    "Page_No": 1,
    "Page_Size": 100,
    "Flag": 2,
    "bStatus": 1
  }

  this.registrationService.routeListData(payload).subscribe((res: any) => {
    this.routeList = res?.body?.data;
    this.isloading = false
  })
}

getRouteOnMap(routeid: any, routeName: any) {
  this.selectedRouteName = routeName;
  let payload = {
    route_id: routeid,
    user_id: parseInt(localStorage.getItem('user_Id') || ''),
    dept_id: parseInt(localStorage.getItem('dept_id') || ''),
    direction: 1,
  }
  this.trackingService.getStopData(payload).subscribe((res: any) => {
    this.listVehicleStopDetailsformap = res?.body?.data;
    let newData = {
      value: "",
      text: ""
    }
    this.showallTrack()
  })
}
showallTrack() {
  const initialState: ModalOptions = {
    initialState: {
      data: this.listVehicleStopDetailsformap,
      routeName: this.selectedRouteName
    },
  };
  this.bsModalRef = this.modalService.show(
    RoutePlotPopupComponent,
    Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
  );

}

/**
* tabel size chage method
* @param event 
*/
onTableSizeChange(event: any): void {
  this.tableSize = event.target.value;
}

/**
 * table data change
 * @param event 
 */
onTableDataChange(event: any) {
  this.page = event;
};
}
