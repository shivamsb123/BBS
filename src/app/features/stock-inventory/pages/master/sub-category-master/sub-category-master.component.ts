import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-sub-category-master',
  templateUrl: './sub-category-master.component.html',
  styleUrls: ['./sub-category-master.component.scss']
})
export class SubCategoryMasterComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean= false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  subCategoryData: any;

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getSubcategoryData()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Sub Category Name' },
      { key: 'keyValue', val: 'Category Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getSubcategoryData() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0
    };
    this.stockService.subCategoryList(payload).subscribe((res: any) => {
      this.subCategoryData = res?.body?.data;
      this.isloading = false
    })
  }

  redirectTo(id:any) {
    let url ='/SupplyChain/Add-Subcategory/id'.replace(
      "id",
      id
    )
    this.route.navigateByUrl(url)  
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

  AddSubCategory(path: any) {
    this.route.navigateByUrl(path)
  }
}

