import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.scss']
})
export class StockAdjustmentComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = true;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  productList: any;
  tableData2:any

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    // this.getProductList();
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Product ID' },
      { key: 'keyValue', val: 'Bracode' },
      { key: 'keyValue', val: 'Product Name' },
      { key: 'keyValue', val: 'Cat. Name' },
      { key: 'keyValue', val: 'Open Qty' },
      { key: 'keyValue', val: 'Adj(+) Qty' },
      { key: 'keyValue', val: 'Adj(-) Qty' },
      { key: 'keyValue', val: 'Bal Qty' },
      { key: 'keyValue', val: 'Select' },
    ]

    this.tableData2 = [
      { key: 'keyValue', val: 'Product ID' },
      { key: 'keyValue', val: 'Bracode' },
      { key: 'keyValue', val: 'Product Name' },
      { key: 'keyValue', val: 'Cat. Name' },
      { key: 'keyValue', val: 'Qty' },
      { key: 'keyValue', val: 'Purchase Price' },
      { key: 'keyValue', val: 'Sell Price' },
    ]
  }

  // getProductList() {
  //   this.isloading = true;
  //   let payload = {
  //     "PageNO": 1,
  //     "PageSize": 100,
  //     "Sno": 0
  //   }
  //   this.stockService.productList(payload).subscribe((res: any) => {
  //     this.productList = res?.body?.data;
  //     this.isloading = false;

  //   })
  // }


  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

}
