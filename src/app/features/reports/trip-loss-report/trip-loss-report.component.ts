import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-trip-loss-report',
  templateUrl: './trip-loss-report.component.html',
  styleUrls: ['./trip-loss-report.component.scss']
})
export class TripLossReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  searchKeyword:any;
  tripLossList:any
  isloading:boolean= false;
  page= 1;
  count= 0;
  tableSize= 25;
  tableSizes= [25, 50, 100];
  tableData:any;

  constructor() {}

  ngOnInit(): void {
    this.initialTable()
  }

  initialTable() {
    this.tableData = [      
      { key: 'keyValue', val: 'Sl.No.' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Route' },
      { key: 'keyValue', val: 'Vehicle ' },
      { key: 'keyValue', val: 'Trip Loss' },
      { key: 'keyValue', val: 'Loss Km' },
      { key: 'keyValue', val: 'Reason' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Remark' },
    ]
  }

  getLossReport(){

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
