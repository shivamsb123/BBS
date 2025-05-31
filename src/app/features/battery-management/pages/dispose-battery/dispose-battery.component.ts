import { Component } from '@angular/core';

@Component({
  selector: 'app-dispose-battery',
  templateUrl: './dispose-battery.component.html',
  styleUrls: ['./dispose-battery.component.scss']
})
export class DisposeBatteryComponent {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  constructor( ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialtable()
  }

  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Zone Name' },
      { key: 'keyValue', val: 'Battery Number' },
      { key: 'keyValue', val: 'Battery Type' },
    ]
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  };
}
