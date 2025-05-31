import { Component } from '@angular/core';

@Component({
  selector: 'app-workshop-qc',
  templateUrl: './workshop-qc.component.html',
  styleUrls: ['./workshop-qc.component.scss']
})
export class WorkshopQCComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;

  constructor(
  
  ) { }

  ngOnInit(): void {
    this.setInitialTable();
    }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Id' },
      { key: '', value: 'Job Category Name' },
      { key: '', value: 'Job Type' },
      { key: '', value: 'Action' },
    ]
  }
  
   /**
 * tabel size chage method
 * @param event 
 */
   onTableSizeChange(event: any): void {
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  };

}
