import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  manufactureList: any;
  id: string;

  constructor(
    private route: Router,
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getMenufactureList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Manufactuer Id' },
      { key: 'keyValue', val: 'Manufacturer Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getMenufactureList() {
    this.isloading = true
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0
    }
    this.stockService.manufactureNameList(payload).subscribe((res: any) => {
      this.manufactureList = res?.body.data;
      this.isloading = false
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
    let url = '/SupplyChain/Add-Manufacturer/id'.replace("id",id);
    this.route.navigateByUrl(url)
  }
}

