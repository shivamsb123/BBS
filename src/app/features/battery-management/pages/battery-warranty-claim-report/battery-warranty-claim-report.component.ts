import { Component } from '@angular/core';

@Component({
  selector: 'app-battery-warranty-claim-report',
  templateUrl: './battery-warranty-claim-report.component.html',
  styleUrls: ['./battery-warranty-claim-report.component.scss']
})
export class BatteryWarrantyClaimReportComponent {
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
      { key: 'keyValue', val: 'Invoice Date' },
      { key: 'keyValue', val: 'Invoice No' },
      { key: 'keyValue', val: 'Battery Make' },
      { key: 'keyValue', val: 'Battery No' },
      { key: 'keyValue', val: 'Warranty Expire Date' },
      { key: 'keyValue', val: 'Removing Reason' },
      { key: 'keyValue', val: 'Battery Send To Vendor For Claim' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Warranty Battery No Attached Rejection Letter' },
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
