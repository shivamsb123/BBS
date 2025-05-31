import { Component } from '@angular/core';

@Component({
  selector: 'app-nsd-summary-report',
  templateUrl: './nsd-summary-report.component.html',
  styleUrls: ['./nsd-summary-report.component.scss']
})
export class NsdSummaryReportComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
 
  constructor( ) {}

  ngOnInit(): void {
    this.setInitialtable()
  }
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'NSD 0 To 2' },
      { key: 'keyValue', val: 'NSD 3' },
      { key: 'keyValue', val: 'NSD 4' },
      { key: 'keyValue', val: 'NSD 5 To 7' },
      { key: 'keyValue', val: 'NSD 7 & Above' },
      { key: 'keyValue', val: 'Previous No Of Tyre Nsd Taken' },
      { key: 'keyValue', val: 'Current No Of Tyre Nsd Taken' },
      { key: 'keyValue', val: 'Total No Of Buses' },
      { key: 'keyValue', val: 'No Of Tyre  Per Bus' },
      { key: 'keyValue', val: 'Total No Of Tyre In Buses' },
      { key: 'keyValue', val: 'No Of Tyre NSD Not Taken Previous Week' },
      { key: 'keyValue', val: 'No Of Tyre NSD Not Taken  Current Week' },
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
