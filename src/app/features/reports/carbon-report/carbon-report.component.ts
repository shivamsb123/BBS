import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegistrationService } from '../../registration/services/registration.service';
import { ReportsService } from '../services/reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-carbon-report',
  templateUrl: './carbon-report.component.html',
  styleUrls: ['./carbon-report.component.scss']
})
export class CarbonReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableData: any;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  carbonForm!: FormGroup
  carbonData: any = [];
  excelData: any;
  filteredData: any[] = [];

  constructor(
    private registrationService: RegistrationService,
    private reportService: ReportsService,
    private fb: FormBuilder,
    private excelService: ExcelFormatService
  ) { }
  ngOnInit() {
    this.setInitialTableValue();
    this.setIntialvalue();
    this.getCarbonReport('')
  }

  setIntialvalue() {
    this.carbonForm = this.fb.group({
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]]

    })
  }

  setInitialTableValue() {
    this.tableData = [
      { key: '', val: 'Sr. No.' },
      { key: '', val: 'Date' },
      { key: '', val: 'Bus Count' },
      { key: '', val: 'Total KM' },
      { key: '', val: 'Co2 Emmission' },
      { key: '', val: 'Fuel saved' },
    ]
  }

  getCarbonReport(formvalue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if (formvalue) {
      this.isloading = true;
      let payload = {
        "StartDate": formvalue.fromdate ? formatDate(formvalue.fromdate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        "EndDate": formvalue.todate ? formatDate(formvalue.todate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US')
      }
      this.reportService.carbonReport(payload).subscribe((res: any) => {
        this.isloading = false;
        this.carbonData = res?.body?.data;
        this.filterData();
        console.log(this.carbonData);

      })
    }

  }

  onSearchChange() {
    this.filterData();
  }

  filterData() {
    if (!this.carbonData || this.carbonData.length == 0) {
      this.filteredData = [];
      return;
    }
  
    if (this.searchKeyword && this.searchKeyword.trim()) {
      this.filteredData = this.carbonData.filter(vehicle =>
        JSON.stringify(vehicle).toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    } else {
      this.filteredData = [...this.carbonData]; // Default to full dataset
    }
  }
  
  
  // Function to calculate the total dynamically
  getTotal(key: string): number {
    return this.filteredData.reduce((sum, vehicle) => sum + (vehicle[key] || 0), 0);
  }

  // getTotal(key: string): number {
  //   return this.carbonData.reduce((sum, vehicle) => sum + (vehicle[key] || 0), 0);
  // }
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
    this.excelData = this.carbonData.map((item: any) => {
      {
        return {
          'Date':formatDate(item?.rDate,'dd-MM-yyyy', 'en-US'),
          'Bus Count': item?.busCount,
          'Total KM': item?.totalKm,
          'Co2 Emmission': item?.cO2_Emissions,
          'Fuel saved': item?.fuel_Saved,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Co2 Emmission Report')
  }
}
