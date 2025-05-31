import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
title: any;
  content: any;
  primaryActionLabel: any;
  secondaryActionLabel: any;
  service: any
  @Output() mapdata = new EventEmitter<string>();

  constructor(
    private bsmodalservice: BsModalService
  ) {
    console.log(this.title);
    
   }

  ok() {
    this.service.subscribe((res:any) => {
      this.mapdata.emit(res)
    })
    this.bsmodalservice.hide()
  }

  cancel() {
    this.bsmodalservice.hide()
  }
}
