import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-unit-conversion-list',
  templateUrl: './unit-conversion-list.component.html',
  styleUrls: ['./unit-conversion-list.component.scss']
})
export class UnitConversionListComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  unitConversionData: any;

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getUnitConversionList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Base Unit' },
      { key: 'keyValue', val: 'Sub Unit' },
      { key: 'keyValue', val: 'Conversion Factor' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getUnitConversionList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0

    }
    this.stockService.unitConversion(payload).subscribe((res: any) => {
      this.unitConversionData = res?.body?.data;
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
    let url = '/SupplyChain/Add-Unit-Conversion/id'.replace("id",id);
    this.route.navigateByUrl(url)
  }
}


