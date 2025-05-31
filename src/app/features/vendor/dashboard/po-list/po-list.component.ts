import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.scss']
})
export class PoListComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  poList: any;
  pageName: any;

  constructor(
    private vendorService: VendorService, 
    private router: Router,
    private location : Location
    ) { }

  ngOnInit() {
    this.pageName = this.location.getState();
    this.initialTable();
    this.getPoList();    
  }

  initialTable() {  
    if(this.pageName?.name == 'QuotationPO') {      
      this.tableData = [
        { key: 'PO No', val: 'PO No' },
        { key: 'keyValue', val: 'PO Date' },
        { key: 'keyValue', val: 'Suplier Name' },
        { key: 'keyValue', val: 'Amount' },
        { key: 'keyValue', val: 'Status' },
      ]
    } else {
      this.tableData = [
        { key: 'PO No', val: 'PO No' },
        { key: 'keyValue', val: 'PO Date' },
        { key: 'keyValue', val: 'Suplier Name' },
        { key: 'keyValue', val: 'Amount' },
        { key: 'keyValue', val: 'Status' },
        {key: 'keyValue', val: 'Delivery Challan'}
      ]
    }
  }

  getPoList() {
    this.isloading = true
    let payload = {
      "PageNO":1,
      "PageSize":100,
      "POID":0

    }
    this.vendorService.poListData(payload).subscribe((res: any) => {
      this.poList = res?.body?.data
      this.isloading = false
    })    
  }

  AddDelivery(path: any, id: any) {
    let url = path.replace('id', id);
    this.router.navigateByUrl(url)
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
