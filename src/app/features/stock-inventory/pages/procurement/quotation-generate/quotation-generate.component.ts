import { Component } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ChildListComponent } from '../child-list/child-list.component';

@Component({
  selector: 'app-quotation-generate',
  templateUrl: './quotation-generate.component.html',
  styleUrls: ['./quotation-generate.component.scss']
})
export class QuotationGenerateComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  rpfData: any;
  bsmodal!: BsModalRef;
  rfpChildtableData: any;
  rfpChildData: any;

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private route: Router,
    private modalService: BsModalService,
  ) { }
  ngOnInit() {
    this.setInitialValue();
    this.getRFPList()
  }

  setInitialValue() {
    this.tableData = [
      { key: '', val: 'RFP No' },
      { key: '', val: 'RFP Date' },
      { key: '', val: 'MRN No' },
      { key: '', val: 'Supplier Name' },
      { key: '', val: 'Total Quantity' },
      { key: '', val: 'Action' },
    ]

    this.rfpChildtableData = [
      { key: '', val: 'Barcode Id' },
      { key: '', val: 'Product Name' },
      { key: '', val: 'Quantity' },
      { key: '', val: 'RFP Date' },
    ]
  }


  redirectTo() {
    let path = '/SupplyChain/Add_RFP_Generate';
    this.route.navigateByUrl(path)
  }

  getRFPList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "RFPMasterID": 0

    }
    this.stockService.RPFList(payload).subscribe((res: any) => {
      this.rpfData = res?.body?.data;
      this.isloading = false
    })
  }

  getRFPChildList(rfpId:any) {
    this.isloading = true;
    let payload = {
      "RfpID": rfpId

    }
    this.stockService.rfpChildList(payload).subscribe((res: any) => {
      this.rfpChildData = res?.body;
     
      const initialState: ModalOptions = {
        initialState: {
          listName:'RFP Child List',
          RFPid:rfpId,
          chldTable: this.rfpChildtableData,
          childList: this.rfpChildData,
        },
      };
      this.bsmodal = this.modalService.show(
        ChildListComponent,
        Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
      );
  
    })

    this.isloading = false
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
