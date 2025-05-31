import { formatDate } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import { SharedService } from '../../http-services/shared.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
import { FormateTimeService } from '../../http-services/formate-time.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-charging-report',
  templateUrl: './charging-report.component.html',
  styleUrls: ['./charging-report.component.scss']
})
export class ChargingReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  tableData: any;
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 100;
  tableSizes = [100, 500, 1000]
  chargingForm: any;
  chargingList: any;
  selectedVehicle: any;
  vehicleData: any;
  selectedValue: any
  chargingCount: any;
  excelData: any;
  searchKeyword:any;

  constructor(
    private shardService: SharedService,
    private reportService: ReportsService,
    private fb: FormBuilder,
    private excelService: ExcelFormatService,
    private formateTime: FormateTimeService
  ) {

  }

  ngOnInit(): void {
    // this.setInitialtableData()
    this.setInitialValue()
    this.getVehicleZoneData()
  }

  // setInitialtableData() {
  //   this.tableData = [
  //     { key: 'Report Date', val: 'Report Date' },
  //     { key: 'Route Name', val: 'Route Name' },
  //     { key: 'Scheduled Vehicle No.', val: 'Scheduled Vehicle No.' },
  //     { key: 'Actual Vehicle No.', val: 'Actual Vehicle No.' },
  //     { key: 'Scheduled Driver', val: 'Scheduled Driver' },
  //     { key: 'Actual Driver', val: 'Actual Driver' },
  //     { key: 'Scheduled Depo Out', val: 'Scheduled Depo Out' },
  //     { key: 'Actual Depo Out', val: 'Actual Depo Out' },
  //     { key: 'Scheduled Depo In', val: ' Scheduled Depo In' },
  //     { key: 'Actual Depo In', val: ' Actual Depo In' },
  //     { key: 'Shift Type', val: 'Shift Type' },
  //     { key: 'Start SOC', val: 'Start SOC' },
  //     { key: 'End SOC', val: 'End SOC' },
  //     { key: 'Consume SOC', val: 'Consume SOC' },
  //     { key: 'Start Odometer', val: 'Start Odometer' },
  //     { key: 'End Odometer', val: 'End Odometer' },
  //     { key: 'Odometer Distance Km', val: 'Odometer Distance Km' },
  //     { key: 'SOC Consumed Per Km', val: 'SOC Consumed Per Km' },

  //   ]
  // }

  setInitialValue() {
    this.chargingForm = this.fb.group({
      fromDate: [this.formateTime.formatFromDate(new Date()), [Validators.required, Validators.pattern('')]],
      toDate: [this.formateTime.formatToDate(new Date()), [Validators.required, Validators.pattern('')]],
    })
  }

  showReport(formValue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 100;
    this.isloading = true;
    let payload = {
   
      "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
      "USER_ID": parseInt(localStorage.getItem('user_Id')),
      "ID": Number(this.selectedVehicle),
      "FromDate": formatDate(formValue?.fromDate, 'yyyy-MM-dd', 'en-US'),
      "ToDate": formatDate(formValue?.toDate, 'yyyy-MM-dd', 'en-US'),
      "PageNo": this.page,
      "PageSize": this.tableSize,
    }
    this.reportService.getChargingReport(payload).subscribe((res: any) => {
      let data = res?.body?.data
      data.forEach((val: any) => {
        const consumeSOC = parseFloat(val?.consumeSOC);
        const odoDistance = parseFloat(val?.odometerDistanceKM);
        const manualConsumeSOC = parseFloat(val?.mConsumeSOC);
        const manualOdoDistance = parseFloat(val?.mOdometerDistanceKM);
    
        if (!isNaN(consumeSOC) && !isNaN(odoDistance) && odoDistance !== 0) {
          val.socConsumedKm = consumeSOC / odoDistance;
        } else {
          val.socConsumedKm = null;
        }
    
        if (!isNaN(manualConsumeSOC) && !isNaN(manualOdoDistance) && manualOdoDistance !== 0) {
          val.mSocConsumedKm = manualConsumeSOC / manualOdoDistance;
        } else {
          val.mSocConsumedKm = null;
        }
      });
    
      this.chargingList = data;
      console.log("this.chargingList",this.chargingList);
      
      this.chargingCount = res?.body
      this.isloading = false;
    })
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  confirm(event: any) {
    this.selectedVehicle = event.id;
  }

  // ExportTOExcel() {
  //   this.excelData = this.chargingList.map((item: any) => {
  //     {
  //       return {

  //          'Report Date': formatDate(item?.reportDate,'yyyy-MM-dd', 'en-US'),
  //          'Route Name': item?.routeName,
  //          'Scheduled Vehicle No.': item?.scheduledVehicleNo,
  //          'Actual Vehicle No.': item?.actualVehicleNo,
  //          'Scheduled Driver': item?.scheduledDriver,
  //          'Actual Driver': item?.actualDriver,
  //          'Scheduled Depo Out': item?.scheduledDepoOut,
  //          'Actual Depo Out': item?.actualDepoOut,
  //          'Scheduled Depo In': item?.scheduledDepoIn,
  //          'Actual Depo In': item?.actualDepoIn,
  //          'Shift Type': item?.shiftType,
  //          'Start SOC': item?.startSOC,
  //          'End SOC': item?.endSOC,
  //          'Consume SOC': item?.consumeSOC,
  //          'Start Odometer': item?.startOdometer,
  //          'End Odometer': item?.endOdometer,
  //          'Odometer Distance Km': item?.odometerDistanceKM,
  //          'SOC Consumed Per Km': item?.socConsumedKm ? parseFloat(item.socConsumedKm.toFixed(3)) : null
  //       };
  //     }
  //   })

  //   this.excelService.excelService(this.excelData, 'Shift Wise SOC Consumed Report')
  // }

  ExportTOExcel() {
    // Define main headers with empty cells where needed
    const mainHeaders = [
      'Report Date', 'Route Name', 'Scheduled Vehicle No.', 'Actual Vehicle No.',
      'Scheduled Driver', 'Actual Driver', 'Scheduled Depo Out', 'Actual Depo Out',
      'Scheduled Depo In', 'Actual Depo In', 'Shift Type',
      'As Per Device', '', '', '', '', '', '',
      'As Per Manual', '', '', '', '', '', ''
    ];

    // Define subheaders only for 'As Per Device' and 'As Per Manual'
    const subHeaders = [
      '', '', '', '', '', '', '', '', '', '', '',
      'Start SOC', 'End SOC', 'Consume SOC', 'Start Odometer', 'End Odometer', 'Odometer Distance Km', 'SOC Consumed Per Km',
      'Start SOC', 'End SOC', 'Consume SOC', 'Start Odometer', 'End Odometer', 'Odometer Distance Km', 'SOC Consumed Per Km'
    ];

    // Create a worksheet
    const ws = XLSX.utils.aoa_to_sheet([mainHeaders, subHeaders]);

    // Append data rows
    this.chargingList.forEach((item: any, index: number) => {
      const rowData = [
        formatDate(item?.reportDate, 'yyyy-MM-dd', 'en-US'),
        item?.routeName,
        item?.scheduledVehicleNo,
        item?.actualVehicleNo,
        item?.scheduledDriver,
        item?.actualDriver,
        item?.scheduledDepoOut,
        item?.actualDepoOut,
        item?.scheduledDepoIn,
        item?.actualDepoIn,
        item?.shiftType,
        item?.startSOC,
        item?.endSOC,
        item?.consumeSOC,
        item?.startOdometer,
        item?.endOdometer,
        item?.odometerDistanceKM,
        item?.socConsumedKm ? parseFloat(item.socConsumedKm.toFixed(3)) : null,
        item?.mStartSOC,
        item?.mEndSOC,
        item?.mConsumeSOC,
        item?.mStartOdometer,
        item?.mEndOdometer,
        item?.mOdometerDistanceKM,
        item?.mSocConsumedKm ? parseFloat(item.mSocConsumedKm.toFixed(3)) : null
      ];
      XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: `A${3 + index}` });
    });

    // Merge cells for main headers 'As Per Device' and 'As Per Manual'
    ws['!merges'] = [
      { s: { r: 0, c: 11 }, e: { r: 0, c: 17 } }, // Merge cells for 'As Per Device'
      { s: { r: 0, c: 18 }, e: { r: 0, c: 24 } }  // Merge cells for 'As Per Manual'
    ];

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Shift Wise SOC Consumed Report');

    // Export to Excel
    XLSX.writeFile(wb, 'Shift_Wise_SOC_Consumed_Report.xlsx');
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
