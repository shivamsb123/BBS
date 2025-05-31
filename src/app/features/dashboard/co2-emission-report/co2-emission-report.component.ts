import { Component, ElementRef, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-co2-emission-report',
  templateUrl: './co2-emission-report.component.html',
  styleUrls: ['./co2-emission-report.component.scss']
})
export class Co2EmissionReportComponent {
    @ViewChild('TABLE') tableList!: ElementRef;
  emissionReport:any
  searchKeyword:any
  tableData:any;
  vehiclelistData = {
    trackList: [],
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100],
  };
  constructor(private dashboardService: DashboardService){

  }

  ngOnInit(){
    this.initialTable()
    this.getEmissiondata()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Month' },
      { key: 'keyValue', val: 'Year' },
      { key: 'keyValue', val: 'No. Of Bus' },
      { key: 'keyValue', val: 'Opening Km' },
      { key: 'keyValue', val: 'Monthly Km' },
      { key: 'keyValue', val: 'Total Km' },
      { key: 'keyValue', val: 'Last Update Date' },
    ]
  }

  getEmissiondata(){
    this.vehiclelistData.isloading = true;
    this.dashboardService.emmissionreport().subscribe((res:any)=>{
      this.vehiclelistData.isloading = false;
      this.emissionReport = res?.body?.data
    })
  }

    /**
     * tabel size chage method
     * @param event 
     */
    onTableSizeChange(event: any): void {
      this.vehiclelistData.tableSize = event.target.value;
      this.vehiclelistData.page = 1;
    }
  
    /**
     * table data change
     * @param event 
     */
    onTableDataChange(event: any) {
      this.vehiclelistData.page = event;
    };
  
    ExportTOExcel() {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableList.nativeElement);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'SheetJS.xlsx');
  
    }
}
