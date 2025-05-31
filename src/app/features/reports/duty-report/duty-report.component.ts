import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditDutyReportComponent } from '../edit-duty-report/edit-duty-report.component';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-duty-report',
  templateUrl: './duty-report.component.html',
  styleUrls: ['./duty-report.component.scss']
})
export class DutyReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  dutyReportdata: any;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  tableData: any;
  bsmodal!: BsModalRef
  excelData: any;
  constructor(
    private ReportsService: ReportsService,
    private modalService: BsModalService,
    private excelService: ExcelFormatService
  ) {
  }

  ngOnInit(): void {
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Route' },
      { key: 'keyValue', val: 'Duty No' },
      { key: 'keyValue', val: 'Driver' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Shift From' },
      { key: 'keyValue', val: 'From Odometer & SOC' },
      { key: 'keyValue', val: 'Shift To' },
      { key: 'keyValue', val: 'To Odometer & SOC' },
      { key: 'keyValue', val: 'Shift Duration' },
      { key: 'keyValue', val: 'GPS Km' },
      { key: 'keyValue', val: 'GPS Km Handover' },
      { key: 'keyValue', val: 'Odometer Total' },
      { key: 'keyValue', val: 'Reason' },
      { key: 'keyValue', val: 'Remark' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  getDutyReport() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;

    if (!this.bsValue) {
      this.isloading = false;
      this.dutyReportdata = [];
      return; 
    }
    let payload = {
      "HND_ID": 0,
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "R_ID": 0,
      "R_ATT_DATE": formatDate(this.bsValue, 'yyyy-MM-dd', 'en-US'),
      "FLAG": 1
    }

    this.ReportsService.dutyReport(payload).subscribe((res: any) => {
      this.dutyReportdata = res?.body?.data;
      this.isloading = false;
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

  // ExportTOExcel() {
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   XLSX.writeFile(wb, 'SheetJS.xlsx');

  // }

  ExportTOExcel() {
    this.excelData = this.dutyReportdata.map((item: any) => {
      {
        return {
          'Date': item?.date,
          'Shift': item?.shift,
          'Route': item?.route,
          'Duty No': item?.dutyNo,
          'Driver': item?.driver,
          'Vehicle No': item?.assetno,
          'Shift From': item?.shiftfrom,
          'From Odometer & SOC': item?.odometerfrom+ ' & ' + item?.socoldfrom,
          'Shift To': item?.shiftto,
          'To Odometer & SOC': item?.odometerto + ' &' +item?.socTo,
          'Shift Duration': item?.shiftDuration,
          'GPS Km': item?.gpskm,
          'GPS Km Handover': item?.gpskmhandover,
          'Odometer Total': item?.odometerto +'-'+ item?.odometerfrom,
          'Reason': item?.reason,
          'Remark': item?.remark,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Duty Report')
  }

  editReport(report: any) {
    const initialState: ModalOptions = {
      initialState: {
        report: report,
      },
    };

    this.bsmodal = this.modalService.show(
      EditDutyReportComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }
}
