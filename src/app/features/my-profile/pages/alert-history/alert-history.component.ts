import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { StorageService } from 'src/app/features/http-services/storage.service';
import { LocationTrackPopupComponent } from 'src/app/features/reports/location-track-popup/location-track-popup.component';
import { UserService } from 'src/app/features/shared/user/services/user.service';

@Component({
  selector: 'app-alert-history',
  templateUrl: './alert-history.component.html',
  styleUrls: ['./alert-history.component.scss']
})
export class AlertHistoryComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  unitData: any;
  data: any;
  newData: any;
  countValue: any;
  language: any;
  bsModalRef: BsModalRef

  constructor(
    private route: Router,
    private shardService: SharedService,
    private userservice: UserService,
    private storageService: StorageService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getAlertHistory()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Alert' },
      { key: 'keyValue', val: 'Time' },
      { key: 'keyValue', val: 'Location' }
    ]
  }

  getAlertHistory() {
    this.isloading = true;
    this.storageService.getItem('alert').subscribe((res: any) => {
      this.countValue = res
    })
    setTimeout(() => {
      let payload = {
        "TimeRecorded": this.shardService.formatedTime(new Date()),
        "TimeDuration": 60,
        "LanguageType": 'HI'
      }
  
      this.userservice.alertcall(payload).subscribe((res: any) => {
        this.isloading = false;
        this.data = res?.body?.data;        
      })
    }, 1000)
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


  openPopup(alertdata: any) {
    console.log(alertdata);
    let data = {
      place :alertdata.loc,
      vehicleNo : alertdata.asseT_NO,
      datetime: alertdata.serveR_TIME,
      lat: alertdata.lat,
      lon: alertdata.lon,
    }


    const initialState: ModalOptions = {
      initialState: {
        data: data,
      },
    };
    this.bsModalRef = this.modalService.show(
      LocationTrackPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );


  }


}

