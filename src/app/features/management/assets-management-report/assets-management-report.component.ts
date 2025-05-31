import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assets-management-report',
  templateUrl: './assets-management-report.component.html',
  styleUrls: ['./assets-management-report.component.scss']
})
export class AssetsManagementReportComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableData: any;
  tableSize = 25;
  tableSizes = [25, 50, 100];

  constructor(private route: Router){}

  ngOnInit() {
    this.setInitialValue()
  }
  setInitialValue() {
    this.tableData = [
      { key: '', val: 'Depot Name' },
      { key: '', val: 'Assets Name' },
      { key: '', val: 'Assets Type' },
      { key: '', val: 'Total Assets' },
      { key: '', val: 'Total Assets Cost' },
      { key: '', val: 'Assets Limit' },
      { key: '', val: 'Place' },
      { key: '', val: 'Created Date ' },
      { key: '', val: 'Authority Name ' },
    ]
  }

  addAssets(path: any) {
    // let url = path.replace('id',data?.blinK_ID)
    this.route.navigateByUrl(path)
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
