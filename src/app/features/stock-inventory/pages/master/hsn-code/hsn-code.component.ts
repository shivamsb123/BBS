import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-hsn-code',
  templateUrl: './hsn-code.component.html',
  styleUrls: ['./hsn-code.component.scss']
})
export class HSNCodeComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  hsnData: any;

  constructor(
    private route: Router,
    private stockeService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getHSNList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'HSN' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Cgst(%)' },
      { key: 'keyValue', val: 'Sgst(%)' },
      { key: 'keyValue', val: 'Igst(%)' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getHSNList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 5000,
      "Sno": 0
    }
    this.stockeService.hsnList(payload).subscribe((res: any) => {
      this.hsnData = res?.body?.data;
      this.isloading = false;
    })
  }

  redirectTo(id:any) {
    let url ='/SupplyChain/Add-HSN/id'.replace(
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

  AddHsn(path: any) {
    this.route.navigateByUrl(path)
  }
}
