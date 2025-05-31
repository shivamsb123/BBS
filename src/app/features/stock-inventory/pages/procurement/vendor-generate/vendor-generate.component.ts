import { Component } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-generate',
  templateUrl: './vendor-generate.component.html',
  styleUrls: ['./vendor-generate.component.scss']
})
export class VendorGenerateComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableData: any;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  vendorList: any;
  vendorName: any;
  quotationList: any;
  constructor(private stockService: StockService, private route: Router) { }

  ngOnInit() {
    this.setInitialValue()
    this.getVendorList();
    this.getQuatationList()
  }
  setInitialValue() {
    this.tableData = [
      { key: '', val: 'MRN Date' },
      { key: '', val: 'MRN No' },
      { key: '', val: 'RFP Date' },
      { key: '', val: 'RFP No' },
      { key: '', val: 'Quotation Date' },
      { key: '', val: 'Quotation No' },
      { key: '', val: 'Vendor Name' },
      { key: '', val: 'Quantity ' },
      { key: '', val: 'Status ' },
    ]
  }

  getVendorList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "Result": ""
    }
    this.stockService.quotationVendor(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.vendorList = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.vendorName
        }
      )
    })
  }

  confirm(event: any) {
    if (event.selectType == 'Vendor') {
      this.vendorName = event.assets_no;
      this.getQuatationList()
    }
  }

  getQuatationList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "SupName": this.vendorName ? this.vendorName : '',
      "RFPMasterID": 0
    }
    this.stockService.getVendorDetails(payload).subscribe((res: any) => {
      this.quotationList = res?.body?.data;
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

  redirectTo() {
    let path = '/SupplyChain/Add_Quotation'
    this.route.navigateByUrl(path)
  }
}
