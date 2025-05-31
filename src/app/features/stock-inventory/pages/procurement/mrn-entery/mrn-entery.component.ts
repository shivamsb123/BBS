import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChildListComponent } from '../child-list/child-list.component';

@Component({
  selector: 'app-mrn-entery',
  templateUrl: './mrn-entery.component.html',
  styleUrls: ['./mrn-entery.component.scss']
})
export class MRNEnteryComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  MRNData: any;
  bsmodal!: BsModalRef;
  mrnChildTable: any;
  mrnChildData: any;

  constructor(
    private route: Router,
    private stockService: StockService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getMRNList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Department' },
      { key: 'keyValue', val: 'MRN Type' },
      { key: 'keyValue', val: 'MRN No' },
      { key: 'keyValue', val: 'MRN Date' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Details' }
    ]

    this.mrnChildTable = [
      { key: '', val: 'MRN Id' },
      { key: '', val: 'Barcode Id' },
      { key: '', val: 'Product Name' },
      { key: '', val: 'Quantity' }
    ]
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

  AddSubCategory(path: any, id:any) {
    let url = path.replace("id",id)
    this.route.navigateByUrl(url)
  }

  getMRNList() {
    this.isloading = true;
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "SearchText": "",
      "PageNo": 1,
      "PageSize": 50
    }
    this.stockService.mrnList(payload).subscribe((res: any) => {
      this.MRNData = res?.body?.data;
      this.isloading = false
    })
  }

  getMRNChildList(mrnID:any) {
    this.isloading = true;
    let payload = {
      "MRNID": mrnID

    }
    this.stockService.mrnChildList(payload).subscribe((res: any) => {
      this.mrnChildData = res?.body;
     
      const initialState: ModalOptions = {
        initialState: {
          listName:'MRN Child List',
          MRNId:mrnID,
          chldTable: this.mrnChildTable,
          childList: this.mrnChildData,
        },
      };
      this.bsmodal = this.modalService.show(
        ChildListComponent,
        Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
      );
  
    })

    this.isloading = false
  }

}

