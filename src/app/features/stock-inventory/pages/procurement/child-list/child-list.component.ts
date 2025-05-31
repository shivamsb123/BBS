import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss']
})
export class ChildListComponent {
  listName:any
  MRNId:any
  RFPid:any
  chldTable:any
  childList:any
  isloading: boolean = false;
  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
   
  }

  cancel() {
    this.modalService.hide();
  }
}
