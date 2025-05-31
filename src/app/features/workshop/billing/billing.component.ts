import { Component } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent {
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  departmentlist:any
  itemType: any;
  tableData2: { key: string; val: string; }[];

  constructor() {

  }

  ngOnInit() {
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Id ' },
      { key: 'keyValue', val: 'Job Type Name' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Unit Price' },
      { key: 'keyValue', val: 'Discount' },
      { key: 'keyValue', val: 'Total' },

    ]
    this.tableData2 = [
      { key: 'keyValue', val: 'Id ' },
      { key: 'keyValue', val: 'Product Name' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Unit Name' },
      { key: 'keyValue', val: 'Quantity' },
      { key: 'keyValue', val: 'Unit Price' },
      { key: 'keyValue', val: 'Discount' },
      { key: 'keyValue', val: 'Total' },

    ]
  }

  confirm(event: any) {
    
  }
  addItem(type: any) {
    this.itemType = type
  }
}
