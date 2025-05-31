import { Component } from '@angular/core';

@Component({
  selector: 'app-damage-tyre-summary',
  templateUrl: './damage-tyre-summary.component.html',
  styleUrls: ['./damage-tyre-summary.component.scss']
})
export class DamageTyreSummaryComponent {
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
      { key: 'keyValue', val: 'New Tyre NSD  0 To 3' },
      { key: 'keyValue', val: 'New Tyre NSD 4 To 5' },
      { key: 'keyValue', val: 'New Tyre NSD 5 Above' },
      { key: 'keyValue', val: 'Retread Tyre NSD 0 To 3' },
      { key: 'keyValue', val: 'Retread Tyre NSD 4 To 5' },
      { key: 'keyValue', val: 'Retread Tyre NSD 5 Above' },
      { key: 'keyValue', val: 'Old Tyre NSD 0 To 3' },
      { key: 'keyValue', val: 'Old Tyre NSD 4 To 5' },
      { key: 'keyValue', val: 'Old Tyre NSD 5 Above' },
      { key: 'keyValue', val: 'Total Damage Tyre' },
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
