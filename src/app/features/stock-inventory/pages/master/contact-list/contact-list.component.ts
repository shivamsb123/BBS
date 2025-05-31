import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  contactData: any;

  constructor(
    private route: Router,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getContactData();
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Vendor Name' },
      { key: 'keyValue', val: 'Vendor Type' },
      { key: 'keyValue', val: 'Contact Email' },
      { key: 'keyValue', val: 'Office Phone' },
      { key: 'keyValue', val: 'ContactNo.' },
      { key: 'keyValue', val: 'Current Balance ' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getContactData() {
    this.isloading = true
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0

    };
    this.stockService.contactList(payload).subscribe((res: any) => {
      this.contactData = res?.body?.data;
      this.isloading = false
    })
  }

  redirectTo(id:any) {
    let url ='/SupplyChain/Add-Contact/id'.replace(
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

  AddUnit(path: any) {
    this.route.navigateByUrl(path)
  }
}

