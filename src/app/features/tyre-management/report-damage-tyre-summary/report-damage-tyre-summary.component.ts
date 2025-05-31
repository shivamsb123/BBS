import { Component } from '@angular/core';

@Component({
  selector: 'app-report-damage-tyre-summary',
  templateUrl: './report-damage-tyre-summary.component.html',
  styleUrls: ['./report-damage-tyre-summary.component.scss']
})
export class ReportDamageTyreSummaryComponent {
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
  constructor( ) {}

  ngOnInit(): void {
    this.setInitialtable()
  }
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Fitted Date' },
      { key: 'keyValue', val: 'Fitted Km' },
      { key: 'keyValue', val: 'Remove Km' },
      { key: 'keyValue', val: 'Damage Date' },
      { key: 'keyValue', val: 'Driver Id' },
      { key: 'keyValue', val: 'Route No' },
      { key: 'keyValue', val: 'Shift No' },
      { key: 'keyValue', val: 'NSD' },
      { key: 'keyValue', val: 'Original Retread' },
      { key: 'keyValue', val: 'Reason' },
      { key: 'keyValue', val: 'Remarks' },
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
