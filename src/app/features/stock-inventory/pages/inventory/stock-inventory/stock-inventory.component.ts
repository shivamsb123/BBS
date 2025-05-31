import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-inventory',
  templateUrl: './stock-inventory.component.html',
  styleUrls: ['./stock-inventory.component.scss']
})
export class StockInventoryComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = true;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  productList: any;

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
      { key: 'keyValue', val: 'Item Name' },
      { key: 'keyValue', val: 'Barcode No' },
      { key: 'keyValue', val: 'Category Type' },
      { key: 'keyValue', val: 'Supplier Name' },
      { key: 'keyValue', val: 'Purchase Price' },
      { key: 'keyValue', val: 'Stock Qty' },
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

  AddProduct(path: any) {
    this.route.navigateByUrl(path)
  }
}


