import { Component } from '@angular/core';

@Component({
  selector: 'app-missing-gps',
  templateUrl: './missing-gps.component.html',
  styleUrls: ['./missing-gps.component.scss']
})
export class MissingGpsComponent {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }


  ngOnInit(): void {
  }

}
