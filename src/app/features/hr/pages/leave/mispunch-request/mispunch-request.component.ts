import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddMispunchRequestComponent } from '../add-mispunch-request/add-mispunch-request.component';

@Component({
  selector: 'app-mispunch-request',
  templateUrl: './mispunch-request.component.html',
  styleUrls: ['./mispunch-request.component.scss']
})
export class MispunchRequestComponent implements OnInit {
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  modalRef!: BsModalRef

  constructor(
    private modalService: BsModalService
  ) {}
  ngOnInit(): void {
    this.setInitialValue()
  }

  setInitialValue() {
    this.tableData = [
      { key: 'keyValue', val: 'Employee Id ' },
      { key: 'keyValue', val: 'Name ' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'In time ' },
      { key: 'keyValue', val: 'Out Time ' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Apply' }
    ]
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  applyMispunch() {
    const initialState: ModalOptions = {
      
    };
    this.modalRef = this.modalService.show(
      AddMispunchRequestComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-xl modal-dialog-centered",
      })
    );
  }

}
