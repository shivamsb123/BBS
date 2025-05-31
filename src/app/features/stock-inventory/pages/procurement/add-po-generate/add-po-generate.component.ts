import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/features/vendor/services/vendor.service';


@Component({
  selector: 'app-add-po-generate',
  templateUrl: './add-po-generate.component.html',
  styleUrls: ['./add-po-generate.component.scss']
})
export class AddPoGenerateComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  poList: any;
  constructor(private vendorService:VendorService,private router:Router){}
  ngOnInit() {
    this.initialTable()
    this.getPoList()
  }
  initialTable() {
    this.tableData = [
      { key: 'PO No', val: 'PO No' },
      { key: 'keyValue', val: 'PO Date' },
      { key: 'keyValue', val: 'Suplier Name' },
      { key: 'keyValue', val: 'Amount' },
      { key: 'keyValue', val: 'Status' },
    ]
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
  AddPO(path: any, id: any) {
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
