import { Component } from '@angular/core';

@Component({
  selector: 'app-battery-stock-report',
  templateUrl: './battery-stock-report.component.html',
  styleUrls: ['./battery-stock-report.component.scss']
})
export class BatteryStockReportComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  constructor() {}

  ngOnInit(): void {
    this.setInitialtable()
  }

  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'New Battery' },
      { key: 'keyValue', val: 'Old Battery' },
      { key: 'keyValue', val: 'Service Battery' },
      { key: 'keyValue', val: 'Battery Pending For Warranty Claim' },
      { key: 'keyValue', val: 'Battery With Vendor For Claim' },
      { key: 'keyValue', val: 'Battery For Charging' },
      { key: 'keyValue', val: 'Scarp Battery' },
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
