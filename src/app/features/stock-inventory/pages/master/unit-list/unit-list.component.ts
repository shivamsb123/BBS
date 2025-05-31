


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  unitData: any;

  constructor(
    private route: Router,
    private stockServie: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getUnitList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'unitID' },
      { key: 'keyValue', val: 'Unit Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getUnitList() {
    this.isloading = true;
    let payload = {
      "braid": "ADS-B1",
      "Mode": "SELECT"
    }

    this.stockServie.unitList(payload).subscribe((res: any) => {
      this.unitData = res?.body?.data
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

  redirectTo(id: any) {
    let url = '/SupplyChain/Add-Unit/id'.replace("id",id)
    this.route.navigateByUrl(url)
  }
}

