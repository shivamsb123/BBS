

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';


@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.scss']
})
export class CategoryMasterComponent implements OnInit{

  searchKeyword:any;
  isloading:boolean= false;
  page= 1;
  count= 0;
  tableSize= 25;
  tableSizes= [25, 50, 100];
  tableData:any;
  categoryData: any;

  constructor(
    private route: Router,
    private StockService: StockService
  ) {}

  ngOnInit(): void {
    this.initialTable();
    this.getCategoryList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S No' },
      { key: 'keyValue', val: 'Parent Attribute Name' },
      { key: 'keyValue', val: 'Count' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getCategoryList() {
    this.isloading = true
    let payload = {
      "Result":""
    }
    this.StockService.categoryList(payload).subscribe((res:any) => {
      this.categoryData = res?.body?.data;
      
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

    AddCategory(path:any) {
      this.route.navigateByUrl(path)
    }
    redirectTo(id:any){
      let url = '/SupplyChain/Add-category/id'.replace("id",id)
      this.route. navigateByUrl(url)
    }
}

