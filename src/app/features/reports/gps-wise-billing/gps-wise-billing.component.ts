import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-gps-wise-billing',
  templateUrl: './gps-wise-billing.component.html',
  styleUrls: ['./gps-wise-billing.component.scss']
})
export class GpsWiseBillingComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  myDate:any = new Date();
  bsValue = new Date();
  tableData: any
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  gpsWiseBillingData:any

  constructor(
    private ReportsService: ReportsService,
  ){} 

  ngOnInit(): void {
    // this.setInitialTable();
  }

  // setInitialTable() {
  //   this.tableData = [
  //     { key: '', value: 'Vehicle' },
  //     { key: '', value: 'Date' },
  //     { key: '', value: 'Calculated Distance In Km' },
  //     { key: '', value: 'Start Odometer' },
  //     { key: '', value: 'End Odometer' },
  //     { key: '', value: 'Difference Odometer' },
  //     { key: '', value: 'Difference GPS Odometer' },
  //   ]
  // }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  showReport() {
    this.isloading = true;
    let payload = {
        "TimeRecorded":formatDate(this.myDate, 'yyyy-MM-dd', 'en-US')
    }
    this.ReportsService.getGpsWiseBilling(payload).subscribe((res: any) => {
      this.gpsWiseBillingData = res?.body?.data;
      this.isloading = false;
    })
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

}
