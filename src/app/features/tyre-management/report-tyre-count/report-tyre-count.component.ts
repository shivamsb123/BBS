import { Component } from '@angular/core';

@Component({
  selector: 'app-report-tyre-count',
  templateUrl: './report-tyre-count.component.html',
  styleUrls: ['./report-tyre-count.component.scss']
})
export class ReportTyreCountComponent {
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
      { key: 'keyValue', val: 'Depot Id' },
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: '0' },
      { key: 'keyValue', val: '1' },
      { key: 'keyValue', val: '2' },
      { key: 'keyValue', val: '3' },
      { key: 'keyValue', val: '4' },
      { key: 'keyValue', val: '5' },
      { key: 'keyValue', val: '6' },
      { key: 'keyValue', val: 'Total Vehicle Count' },
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
