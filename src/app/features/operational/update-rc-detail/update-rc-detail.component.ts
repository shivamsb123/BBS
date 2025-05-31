import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-rc-detail',
  templateUrl: './update-rc-detail.component.html',
  styleUrls: ['./update-rc-detail.component.scss']
})
export class UpdateRcDetailComponent implements OnInit{
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
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Company' },
      { key: 'keyValue', val: 'Chessie Number ' },
      { key: 'keyValue', val: 'Mobile Number' },
      { key: 'keyValue', val: 'Vechile Number ' },
      { key: 'keyValue', val: 'Assest Type ' },
      { key: 'keyValue', val: 'Vender ' },
      { key: 'keyValue', val: 'Modal   ' },
      { key: 'keyValue', val: 'RC Regrtrstion Number   ' },
      { key: 'keyValue', val: 'RC Owner Name   ' },
      { key: 'keyValue', val: 'RC Presant Address   ' },
      { key: 'keyValue', val: 'Regstration Date   ' },
      { key: 'keyValue', val: 'RC Expire Date   ' },
      { key: 'keyValue', val: 'Action' },
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
