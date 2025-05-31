import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-biometric-attendance',
  templateUrl: './biometric-attendance.component.html',
  styleUrls: ['./biometric-attendance.component.scss']
})
export class BiometricAttendanceComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  currentDate = new Date()
  tableData: any;
  constructor() {
   
  }

  ngOnInit(): void {
    this.setInitialtableData()
  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Employee Id' },
      { key: 'keyValue', val: 'Employee Name' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'In Time' },
      { key: 'keyValue', val: 'Out Time' },
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

ExportTOExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, 'SheetJS.xlsx');

}
}
