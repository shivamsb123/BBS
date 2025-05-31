import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelFormatService {

  constructor() { }

  excelService(excelData:any, reportName:any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportName);
    XLSX.writeFile(wb,  `${reportName}.xlsx`);
  }
}
