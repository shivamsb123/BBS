import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']
})
export class NotificationPopupComponent {
  data : any;
  newData: any;
  constructor(private modalService: BsModalService){

  }
  ngOnInit(){
    this.newData = this.data.slice(0, 10);
  }
  cancel() {
    this.modalService.hide();
  }
}
