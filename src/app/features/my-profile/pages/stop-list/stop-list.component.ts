import { Component } from '@angular/core';
import { TrackingService } from 'src/app/features/tracking/tracking.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LocationTrackPopupComponent } from 'src/app/features/reports/location-track-popup/location-track-popup.component';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss']
})
export class StopListComponent {
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  isloading: boolean = false
  tableData: any;
  stopDeatils: any;
  bsModalRef!: BsModalRef

  constructor(
    private trackingService: TrackingService,
    private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.setInitialTable()
    this.getStoplist()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Stop Name' },
      { key: '', value: 'Location' },
    ]
  }

  getStoplist() {
    this.isloading = true;
    let payload = {
      route_id: 0,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      this.stopDeatils = res?.body?.data;
      this.isloading = false;
    })
  }

  openModal(stopListValue: any) {
    console.log(stopListValue);
    const initialState: ModalOptions = {
      initialState: {
        data: stopListValue,
      },
    };
    this.bsModalRef = this.modalService.show(
      LocationTrackPopupComponent,
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
