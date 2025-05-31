import { Component } from '@angular/core';

@Component({
  selector: 'app-battery-health-checkup-report',
  templateUrl: './battery-health-checkup-report.component.html',
  styleUrls: ['./battery-health-checkup-report.component.scss']
})
export class BatteryHealthCheckupReportComponent {
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
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Battery No' },
      { key: 'keyValue', val: 'Battery Check Date' },
      { key: 'keyValue', val: 'Gravity 1' },
      { key: 'keyValue', val: 'Gravity 2' },
      { key: 'keyValue', val: 'Gravity 3' },
      { key: 'keyValue', val: 'Gravity 4' },
      { key: 'keyValue', val: 'Gravity 5' },
      { key: 'keyValue', val: 'Gravity 6' },
      { key: 'keyValue', val: 'Voltage' },
      { key: 'keyValue', val: 'Water Top UP' },
      { key: 'keyValue', val: 'Clamp Rod' },
      { key: 'keyValue', val: 'Petrol Jelly' },
      { key: 'keyValue', val: 'Remarks Battery Change No' },
      { key: 'keyValue', val: 'Electrian Name' },

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
