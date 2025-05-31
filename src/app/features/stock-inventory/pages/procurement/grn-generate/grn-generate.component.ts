import { Component } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grn-generate',
  templateUrl: './grn-generate.component.html',
  styleUrls: ['./grn-generate.component.scss']
})
export class GRNGenerateComponent {

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
      { key: 'keyValue', val: 'PO No' },
      { key: 'keyValue', val: 'Challan Number' },
      { key: 'keyValue', val: 'Challan Date' },
      { key: 'keyValue', val: 'Challan Type' },
      { key: 'keyValue', val: 'Supplier Name' },
      { key: 'keyValue', val: 'Vehicle Number' },
      { key: 'keyValue', val: 'POS' },
      { key: 'keyValue', val: 'Company Address' },
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
