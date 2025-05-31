import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-manage-gps-data',
  templateUrl: './manage-gps-data.component.html',
  styleUrls: ['./manage-gps-data.component.scss']
})
export class ManageGpsDataComponent {

  lat = 28.5355;
  lng = 77.3910;
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
