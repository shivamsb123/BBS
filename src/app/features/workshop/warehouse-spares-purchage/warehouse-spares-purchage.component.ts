import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-spares-purchage',
  templateUrl: './warehouse-spares-purchage.component.html',
  styleUrls: ['./warehouse-spares-purchage.component.scss']
})
export class WarehouseSparesPurchageComponent {
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
      { key: 'keyValue', val: 'Inward No.'},
      { key: 'keyValue', val: 'Bill Date' },
      { key: 'keyValue', val: 'Bill No.' },
      { key: 'keyValue', val: 'Supplier' },
      { key: 'keyValue', val: 'Warehouse' },
      { key: 'keyValue', val: 'Amount' },
      { key: 'keyValue', val: 'Remark' },
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

  addWorkshopPurchase(path: any, id:any) {
    let url = path.replace('id', id)
    this.route.navigateByUrl(url)
    }
}
