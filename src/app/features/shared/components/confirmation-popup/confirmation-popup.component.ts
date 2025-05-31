import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {

  @Input() modalRef:any;
  @Input() message:string = '';
  @Output() onConfirm = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    
  }

  /**
   * decline confirmation popup
   */
  decline() {
    this.modalRef.hide();
  };

  /**
   * confirm delete data
   */
  confirm() {
    let id = null;
    if(this.modalRef['data']){
      id = this.modalRef['data']['id']
    };
    this.onConfirm.emit({id: id, data: this.modalRef['data']});

    this.modalRef.hide();
  };

}
