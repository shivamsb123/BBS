import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-spares-transfer',
  templateUrl: './warehouse-spares-transfer.component.html',
  styleUrls: ['./warehouse-spares-transfer.component.scss']
})
export class WarehouseSparesTransferComponent {
  searchKeyword: any;
  isloading: boolean = true;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;

  constructor(
    private route: Router,
  
  ) { }

  ngOnInit(): void {
    this.initialTable();
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Transfer No'},
      { key: 'keyValue', val: 'Transfer Date' },
      { key: 'keyValue', val: 'From Warehouse' },
      { key: 'keyValue', val: 'To Warehouse' },
      { key: 'keyValue', val: 'Action' },
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

  AddInterWarehouseTransfer(path: any, id:any) {
    let url = path.replace('id', id)
    this.route.navigateByUrl(url)
    }
}
