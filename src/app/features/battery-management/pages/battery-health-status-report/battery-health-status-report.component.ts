import { Component } from '@angular/core';

@Component({
  selector: 'app-battery-health-status-report',
  templateUrl: './battery-health-status-report.component.html',
  styleUrls: ['./battery-health-status-report.component.scss']
})
export class BatteryHealthStatusReportComponent {
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
      { key: 'keyValue', val: 'Total Buses' },
      { key: 'keyValue', val: 'No Of Battery Per Bus' },
      { key: 'keyValue', val: 'Total No Of Battery In Buses' },
      { key: 'keyValue', val: 'Total Battery Linked' },
      { key: 'keyValue', val: 'Total Battery Health Checkup' },
      { key: 'keyValue', val: 'Batteries Pending For Health Checkup' },
      { key: 'keyValue', val: 'Total Battery Linked' },
      { key: 'keyValue', val: 'Total Battery Health Checkup' },
      { key: 'keyValue', val: 'Batteries Pending For Health Checkup' },
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
