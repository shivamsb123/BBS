import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';

@Component({
  selector: 'app-vender-grnlist',
  templateUrl: './vender-grnlist.component.html',
  styleUrls: ['./vender-grnlist.component.scss']
})
export class VenderGrnlistComponent {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  tableData2:any;
  grnData: any;

  constructor(
    private StockService: StockService,
  ){}

  ngOnInit() {
    this.initialTable();
    this.getGRNList()
  }

  initialTable() {
    this.tableData = [
      { key: 'PO No', val: 'PO No' },
      { key: 'keyValue', val: 'Invoice No' },
      { key: 'keyValue', val: 'Invoice Date' },
      { key: 'keyValue', val: 'Suplier Name' },
      { key: 'keyValue', val: 'GRN No' },
      { key: 'keyValue', val: 'GRN Date' },
      { key: 'keyValue', val: 'Total Amount' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Status' },
    ]
  }

  getGRNList() {
    let payload = {
      "UserId":parseInt(localStorage.getItem('user_Id') || ''),
    "DeptId":parseInt(localStorage.getItem('dept_id') || ''),
    "SearchText":"",
    "PageNo":1,
    "PageSize":10

    }
    this.StockService.GRNDetailsList(payload).subscribe((res:any) => {
      this.grnData = res?.body?.data
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

