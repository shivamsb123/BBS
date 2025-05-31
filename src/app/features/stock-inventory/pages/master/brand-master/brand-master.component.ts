import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-brand-master',
  templateUrl: './brand-master.component.html',
  styleUrls: ['./brand-master.component.scss']
})
export class BrandMasterComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  brandData: any;

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable()
    this.getBrandData()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Brand Code' },
      { key: 'keyValue', val: 'Brand Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getBrandData() {
    this.isloading = true
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0
    }
    this.stockService.brandList(payload).subscribe((res: any) => {
      this.brandData = res?.body?.data;
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

  AddUnit(path: any) {
    this.route.navigateByUrl(path)
  }

  redirectTo(id:any) {
    let url ='/SupplyChain/Add-Brand/id'.replace(
      "id",
      id
    )
    this.route.navigateByUrl(url)  
  }
}

