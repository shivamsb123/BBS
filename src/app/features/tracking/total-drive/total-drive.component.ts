import { Component, Input } from '@angular/core';
import { GeocodingService } from '../../http-services/geocoding.service';
import { GeocoderResponse } from '../../models/geocoder-response.model';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StopListPopupComponent } from '../../dashboard/stop-list-popup/stop-list-popup.component';
import { LocationTrackPopupComponent } from '../../reports/location-track-popup/location-track-popup.component';

@Component({
  selector: 'total-drive',
  templateUrl: './total-drive.component.html',
  styleUrls: ['./total-drive.component.scss']
})
export class TotalDriveComponent {
  @Input() content: any;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  formattedAddressData: any;
  bsModalRef?: BsModalRef
constructor(private geocodingService: GeocodingService,
  private modalService: BsModalService){}
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Speed' },
      { key: 'keyValue', val: 'time' },
      { key: 'keyValue', val: 'Latitude/Latitude' },
      { key: 'keyValue', val: 'Place' },
    ]

  }
  ngOnInit(){
    this.initialTable()
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  getAddresslatlng(vehicle:any){
    const initialState: ModalOptions = {
      initialState: {
        data:vehicle
      },
    };
    this.bsModalRef = this.modalService.show(
      LocationTrackPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }

  

}
