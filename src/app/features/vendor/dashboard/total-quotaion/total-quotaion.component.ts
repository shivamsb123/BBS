import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';

@Component({
  selector: 'app-total-quotaion',
  templateUrl: './total-quotaion.component.html',
  styleUrls: ['./total-quotaion.component.scss']
})
export class TotalQuotaionComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  productdata: any;

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
     this.getProductList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'RFP No' },
      { key: 'keyValue', val: 'Quotation No' },
      { key: 'keyValue', val: 'Quotation Date' },
      { key: 'keyValue', val: 'Suplier Name' },
      { key: 'keyValue', val: 'Total Amount' },
      { key: 'keyValue', val: 'Status' },
    ]
  }

  getProductList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0,
      "SupId":Number(localStorage.getItem('sup_id')) 
    }
    this.stockService.QuotationBaseOnPOList(payload).subscribe((res: any) => {
      this.productdata = res?.body?.data;        
      this.isloading = false;
    })
  }


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

