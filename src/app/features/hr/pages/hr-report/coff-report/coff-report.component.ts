import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coff-report',
  templateUrl: './coff-report.component.html',
  styleUrls: ['./coff-report.component.scss']
})
export class CoffReportComponent implements OnInit{
  searchKeyword:any;
  isloading:boolean= false;
  page= 1;
  count= 0;
  tableSize= 25;
  tableSizes= [25, 50, 100];
  tableData:any;
  bsValue = new Date()

  ngOnInit(): void {
    this.initialTable();
   
  }
  initialTable() {
    this.tableData = [      
      { key: 'keyValue', val: 'Apply Date ' },
      { key: 'keyValue', val: 'Date ' },
      { key: 'keyValue', val: 'In Out ' },
      { key: 'keyValue', val: 'Out Time  ' },
      { key: 'keyValue', val: 'Shift  ' },
      { key: 'keyValue', val: 'Approved By ' },
      { key: 'keyValue', val: 'Reason' },
      { key: 'keyValue', val: 'Status   ' },
      { key: 'keyValue', val: 'Action ' }
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

}
