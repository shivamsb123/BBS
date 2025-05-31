import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = true;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  productList: any;
  imgValue:any;

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getProductList();
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'BarCode ID'},
      { key: 'keyValue', val: 'Product Name' },
      { key: 'keyValue', val: 'Category Type' },
      { key: 'keyValue', val: 'Minimum Inventory' },
      { key: 'keyValue', val: 'Manufacturer' },
      { key: 'keyValue', val: 'Hsn Code' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  getProductList() {
    this.isloading = true;
    let payload = {
      "PageNO": this.page,
      "PageSize": this.tableSize,
      "Sno":0
    }
    this.stockService.productList(payload).subscribe((res: any) => {
      this.productList = res?.body?.data;
      this.count = res?.body?.totaL_RECORDS;
      this.isloading = false;

    })
  }


  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
    this.getProductList()
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getProductList()
  };

  AddProduct(path: any, id:any) {
    let url = path.replace('id', id)
    this.route.navigateByUrl(url)
  }

  view(img:any) {
    this.imgValue = img?.imageUpload
  }
}
