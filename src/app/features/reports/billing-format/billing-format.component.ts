import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';


@Component({
  selector: 'billing-format',
  templateUrl: './billing-format.component.html',
  styleUrls: ['./billing-format.component.scss']
})
export class BillingFormatComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  tableData: any;
  unitData: any;
  billingData: any;
  billingForm!: FormGroup

  constructor(
    private route: Router,
    private reportService: ReportsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.setInitialValue()
  }

  setInitialValue() {
    this.billingForm = this.fb.group({
      fromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      // toDate: [new Date(), [Validators.required, Validators.pattern('')]]
    })
  }


  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Schedule Number' },
      { key: 'keyValue', val: 'Bus Number' },
      { key: 'keyValue', val: 'Schedule KM' },
      { key: 'keyValue', val: 'Loss KM.' },
      { key: 'keyValue', val: 'Opportunity Charging KM' },
      { key: 'keyValue', val: 'Starting KM' },
      { key: 'keyValue', val: 'Closing KM' },
      { key: 'keyValue', val: 'Odometer km cirtified by DM' },
      { key: 'keyValue', val: 'Scheduled Trips' },
      { key: 'keyValue', val: 'Actual Trip' },
      { key: 'keyValue', val: 'Remarks' },
      { key: 'keyValue', val: 'Payable Kilometers' },
      { key: 'keyValue', val: 'Total KM' },
    ]
  }

  showBillingReport(formvalue:any) {
    this.isloading = true;
    let payload = {
        "MODE": 0,
        "DATE": formatDate(formvalue.fromDate, 'yyyy-MM-dd', 'en-US'),
        "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
        "USER_ID": parseInt(localStorage.getItem('user_Id') || '')
    }
    
    this.reportService.billingReport(payload).subscribe((res:any) => {
      this.isloading = false;
      this.billingData = res?.body?.data
    })
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

