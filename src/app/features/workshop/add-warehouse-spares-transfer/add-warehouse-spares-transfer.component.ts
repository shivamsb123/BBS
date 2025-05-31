import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddPartComponent } from '../add-part/add-part.component';

@Component({
  selector: 'app-add-warehouse-spares-transfer',
  templateUrl: './add-warehouse-spares-transfer.component.html',
  styleUrls: ['./add-warehouse-spares-transfer.component.scss']
})
export class AddWarehouseSparesTransferComponent {
  bsmodal!: BsModalRef
  constructor(
    private modalService:  BsModalService
  ) {
  }
  ngOnInit(): void {
    
  }

  submit(){
    this.bsmodal = this.modalService.show(
      AddPartComponent,
      Object.assign({ class: "modal-xl modal-dialog-centered" })
    );
    
}
}
