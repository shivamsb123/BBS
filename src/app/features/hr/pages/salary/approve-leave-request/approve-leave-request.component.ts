import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-leave-request',
  templateUrl: './approve-leave-request.component.html',
  styleUrls: ['./approve-leave-request.component.scss']
})
export class ApproveLeaveRequestComponent implements OnInit{
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
      { key: 'keyValue', val: 'Employee Id ' },
      { key: 'keyValue', val: 'Name ' },
      { key: 'keyValue', val: 'Apply date ' },
      { key: 'keyValue', val: 'Leave Day ' },
      { key: 'keyValue', val: 'Day' },
      { key: 'keyValue', val: 'From date ' },
      { key: 'keyValue', val: 'To date ' },
      { key: 'keyValue', val: 'Reason ' },
      { key: 'keyValue', val: 'Status ' }
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

