import { Component } from '@angular/core';

@Component({
  selector: 'app-challan-list',
  templateUrl: './challan-list.component.html',
  styleUrls: ['./challan-list.component.scss']
})
export class ChallanListComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;

  ngOnInit() {
    this.initialTable();
  }

  initialTable() {  
      this.tableData = [
        { key: 'keyValue', val: 'PO No' },
        { key: 'keyValue', val: 'Challan Number' },
        { key: 'keyValue', val: 'Challan Date' },
        { key: 'keyValue', val: 'Challan Type' },
        { key: 'keyValue', val: 'Supplier Name' },
        { key: 'keyValue', val: 'Vehicle Number' },
        { key: 'keyValue', val: 'POS' },
        { key: 'keyValue', val: 'Company Address' },
        { key: 'keyValue', val: 'Status' },
      ]
    } 
    }
  

