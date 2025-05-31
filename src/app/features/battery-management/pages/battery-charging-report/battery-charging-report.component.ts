import { Component } from '@angular/core';

@Component({
  selector: 'app-battery-charging-report',
  templateUrl: './battery-charging-report.component.html',
  styleUrls: ['./battery-charging-report.component.scss']
})
export class BatteryChargingReportComponent {
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
      { key: 'keyValue', val: 'Battery No' },
      { key: 'keyValue', val: 'Bus No' },
      { key: 'keyValue', val: 'Battery Remove Date For Chrging' },
      { key: 'keyValue', val: 'Battery Charged Date' },
      { key: 'keyValue', val: 'Battery Status' },
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


