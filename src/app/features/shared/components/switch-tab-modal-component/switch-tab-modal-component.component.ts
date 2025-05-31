import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-switch-tab-modal-component',
  templateUrl: './switch-tab-modal-component.component.html',
  styleUrls: ['./switch-tab-modal-component.component.scss']
})
export class SwitchTabModalComponentComponent implements OnInit {
  onAction: Function = () => { };

  constructor(private modalService: BsModalService) { }

  handleAction() {
    this.onAction();
    this.modalService.hide("switchtab");
  }

  ngOnInit(): void { }
}
