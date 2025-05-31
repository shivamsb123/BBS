import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-infraction-report',
  templateUrl: './infraction-report.component.html',
  styleUrls: ['./infraction-report.component.scss']
})
export class InfractionReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  vehicleData: any;
  infractionForm!: FormGroup;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  infractiondata: any;
  selectedValue: { value: string; text: string; };
  excelData: any;
  searchKeyword:any

  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private reportService: ReportsService,
    private excelService: ExcelFormatService
  ) { }

  ngOnInit(): void {
    this.setInitialValue();
    this.getVehicleZoneData();
    this.setInitialTable();
    this.submit('')

  }

  setInitialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Category' },
      { key: 'keyValue', val: 'Infraction Details' },
      { key: 'keyValue', val: 'Panalty Rate' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Infraction Status' },
    ]
  }

  setInitialValue() {
    this.infractionForm = this.fb.group({
      vehicle: ['0', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]],
      infractionType: ['2', [Validators.required, Validators.pattern('')]],
    })
  }


  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  confirm(event: any) {
    if (event.id) {
      this.infractionForm.controls['vehicle'].setValue(event.id)
    } else {
      this.infractionForm.controls['vehicle'].setValue('0')
    }
  }

  submit(formvalue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if (formvalue) {
      this.isloading = true;
      let payload = {
        "Flag": 0,
        "User_ID": parseInt(localStorage.getItem('user_Id')),
        "Vehicle_ID": formvalue.vehicle ? parseInt(formvalue.vehicle) : 0,
        "FromDate": formvalue.fromdate ? formatDate(formvalue.fromdate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        "todate": formvalue.todate ? formatDate(formvalue.todate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        "status": formvalue?.infractionType ? parseInt(formvalue?.infractionType) : 2
      }
      this.reportService.InfractionStatusReport(payload).subscribe((res: any) => {
        this.infractiondata = res?.body?.data;
        this.isloading = false;
      })
    }

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

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.infractionForm.reset();
    this.submit('');
    this.setInitialValue();
  }



  ExportTOExcel() {
    this.excelData = this.infractiondata.map((item: any) => {
      {
        return {
          'Vehicle No': item?.asseT_NO,
          'Category': item?.caT_NAME,
          'Infraction Details': item?.infraction_details,
          'Panalty Rate': item?.panalty_Rate,
          'Date': item?.date,
          'Infraction Status': item?.infraction_Status,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Infraction Report')
  }
}
