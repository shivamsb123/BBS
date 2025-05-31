import { Component } from '@angular/core';
import { TrackingService } from '../../tracking/tracking.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-stop-list-popup',
  templateUrl: './stop-list-popup.component.html',
  styleUrls: ['./stop-list-popup.component.scss']
})
export class StopListPopupComponent {

  tableData:any;
  route:any
  missStopList: any;
  isloading : boolean = false

  constructor(
    private trackingService: TrackingService,
    private modalService: BsModalService,

  ) {}
  ngOnInit() {
    console.log("check route data", this.route);
    
    this.setInitialTable();
    this.getStopList()
  }

  setInitialTable(){
    this.tableData= [
      {'key' : '', val: 'Sequence No'},
      {'key' : '', val: 'Stop Name'},
    ]
  }

  getStopList() {
    this.isloading = true;
    let payload = {
      route_id: this.route?.routE_ID,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
    }
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      console.log("check res data", res);
      this.isloading = false;

      this.missStopList = res?.body?.data; 
      } )
  }

  cancel() {
    this.modalService.hide();

  }
}
