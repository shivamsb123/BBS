import { Component } from '@angular/core';

@Component({
  selector: 'app-item-wastage',
  templateUrl: './item-wastage.component.html',
  styleUrls: ['./item-wastage.component.scss']
})
export class ItemWastageComponent {
  bsValue = new Date();
  tableSize = 6;
  page = 1;
  tableSizes = [6, 9, 12];
  tableData: { key: string; value: string; }[];

  constructor(){}

 ngOnInit(): void {
    this.setInitialTable()
  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Sr.no' },
      { key: '', value: 'Barcode' },
      { key: '', value: 'Category' },
      { key: '', value: 'Item Name' },
      { key: '', value: 'Rate' },
      { key: '', value: 'MRP' },
      { key: '', value: 'Pur Qty' },
      { key: '', value: 'Sale Qty' },
      { key: '', value: 'Was Qty' },
      { key: '', value: 'Adj Qty' },
      { key: '', value: 'Balance Quantity' },
      { key: '', value: 'As Per Rate' },
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
