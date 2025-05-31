import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-duty-change-report',
  templateUrl: './duty-change-report.component.html',
  styleUrls: ['./duty-change-report.component.scss']
})
export class DutyChangeReportComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  myTime = new Date();
  tripReportData: any;
  tableData: any;
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  dutyChagneData: any;
  excelData: any;

  constructor(
    private reportService: ReportsService,
    private excelService : ExcelFormatService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialtableData()
  }

  setInitialtableData() {
    this.tableData = [
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Vehicle No' },
      { key: '', value: 'Change Driver Name' },
      { key: '', value: 'Date' },
      { key: '', value: 'Reason' },
      { key: '', value: 'Remark' },
    ]
  }

  showReport() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    if (!this.myTime) {
      this.isloading = false;
      this.dutyChagneData = [];
      return; 
    }
    let payload = {
      "R_Att_Date":formatDate(this.myTime, 'yyyy-MM-dd', 'en-US'),
    }
    this.reportService.driverDutychange(payload).subscribe((res: any) => {
      this.dutyChagneData = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  ExportTOExcel() {
    this.excelData = this.dutyChagneData.map((item: any) => {
      {
        return {
           'Driver Name' : item?.planDriverName,
           'Vehicle No' : item?.asseT_NO,
           'Change Driver Name' : item?.changeDriverName,
           'Date' : item?.r_Att_Date,
           'Reason' : '',
           'Remark' : '',
        };
      }
    })

    this.excelService.excelService(this.excelData,'Duty Change Report')
  }
}
