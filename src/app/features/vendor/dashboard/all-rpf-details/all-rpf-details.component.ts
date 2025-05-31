import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
import * as XLSX from 'xlsx';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-all-rpf-details',
  templateUrl: './all-rpf-details.component.html',
  styleUrls: ['./all-rpf-details.component.scss']
})
export class AllRpfDetailsComponent {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  flag: any;
  tabId: any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData2: any;
  tableData3: any;
  rpfData: any;

  constructor(
    private route: ActivatedRoute,
    private vendorSevice: VendorService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true; 
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true; 
    } else if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true; 
    } else if (this.flag == '4') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[3].active = true; 
    }

    this.setInitialTable();
    this.getRFPList()
  }

  setInitialTable() {
      this.tableData = [
        { key: '', val: 'RFP No' },
        { key: '', val: 'RFP Date' },
        { key: '', val: 'MRN No' },
        { key: '', val: 'Supplier Name' },
        { key: '', val: 'Total Quantity' },
        { key: '', val: 'Status' },
        {key:'', val: 'New Quotation'}
      ]

    this.tableData2 = [
      { key: '', val: 'RFP No' },
      { key: '', val: 'Quotation No' },
      { key: '', val: 'Quotation Date' },
      { key: '', val: 'Suplier Name' },
      { key: '', val: 'Total Amount' },

    ]

    this.tableData3 = [
      { key: '', val: 'RFP No' },
      { key: '', val: 'Quotation Date' },
      { key: '', val: 'Suplier Name' },
      { key: '', val: 'Total Amount' },
      {key: '', val: 'Status'},
    ]

  }

  getRFPList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "RFPMasterID": 0,
      "sup_id": Number(localStorage.getItem('sup_id')) 

  }
    this.vendorSevice.rfpList(payload).subscribe((res: any) => {
      this.rpfData = res?.body?.data;
      this.isloading = false
    })
  }

 
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }

  onTablValue(id: any) {
    this.tabId = id;
    // if(this.tabId == id) {
    //   this.outshelding()
    // }
  }

  addQuotation(path:any, item:any ) {
    let url = path.replace('id', item?.rfpMasterID)
    this.router.navigateByUrl(url,{
      state: { data: item }
    })
  }

  // ExportTOExcel() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   XLSX.writeFile(wb, 'SheetJS.xlsx');

  // }
}
