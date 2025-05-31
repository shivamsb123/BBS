import { Component } from '@angular/core';

@Component({
  selector: 'app-stock-ability',
  templateUrl: './stock-ability.component.html',
  styleUrls: ['./stock-ability.component.scss']
})
export class StockAbilityComponent {
  bsValue = new Date();
  tableSize = 6;
  page = 1;
  tableSizes = [6, 9, 12];
  tableData: any

  ngOnInit(): void {
    this.setInitialTable()
  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Sr.no' },
      { key: '', value: 'Bill No.' },
      { key: '', value: 'Bill Date' },
      { key: '', value: 'Product Name' },
      { key: '', value: 'Category' },
      { key: '', value: 'Unit' },
      { key: '', value: 'Qty' },
      { key: '', value: 'PurAmt' },
      { key: '', value: 'MRP' },
      { key: '', value: 'Batch No.' },
      { key: '', value: 'Expiry Date' },
      { key: '', value: 'As Per Pur.' },
      { key: '', value: 'As Per MRP' },
    ]
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
}
