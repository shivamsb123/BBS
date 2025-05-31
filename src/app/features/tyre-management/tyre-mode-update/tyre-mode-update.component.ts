import { Component, Input } from '@angular/core';

@Component({
  selector: 'tyre-mode-update',
  templateUrl: './tyre-mode-update.component.html',
  styleUrls: ['./tyre-mode-update.component.scss']
})
export class TyreModeUpdateComponent {

  @Input() modalRef:any;
  @Input() addTyreType: any;
  @Input() type: String | any;

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor( ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    console.log("check tyre link data", this.modalRef, this.addTyreType, this.type);
    
  }
}
