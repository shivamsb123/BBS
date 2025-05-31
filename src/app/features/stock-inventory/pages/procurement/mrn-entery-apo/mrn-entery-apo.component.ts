import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mrn-entery-apo',
  templateUrl: './mrn-entery-apo.component.html',
  styleUrls: ['./mrn-entery-apo.component.scss']
})
export class MRNEnteryAPOComponent implements OnInit{

  searchKeyword:any;
  isloading: false;
  page= 1;
  count= 0;
  tableSize= 25;
  tableSizes= [25, 50, 100];
  tableData:any;

  constructor(
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initialTable()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'PO No' },
      { key: 'keyValue', val: ' MRN No' },     
      { key: 'keyValue', val: 'MRN Date' },
      { key: 'keyValue', val: 'Vendor Name' },
      { key: 'keyValue', val: 'Amount' },
      { key: 'keyValue', val: 'rounding' },
      { key: 'keyValue', val: 'FinalAmount' },
      { key: 'keyValue', val: 'Remarks' },
      { key: 'keyValue', val: 'Upload Bill Copy' },
      { key: 'keyValue', val: 'Action' }
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

    AddSubCategory(path:any) {
      this.route.navigateByUrl(path)
    }
}

