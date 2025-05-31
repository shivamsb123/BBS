import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { MissStopDetailComponent } from '../miss-stop-detail/miss-stop-detail.component';
import { SharedService } from '../../http-services/shared.service';
import { Workbook } from "exceljs";
import * as FileSaver from 'file-saver';
import { format } from 'ol/coordinate';
import { ExcelFormatService } from '../../http-services/excel-format.service';



@Component({
  selector: 'app-miss-stop',
  templateUrl: './miss-stop.component.html',
  styleUrls: ['./miss-stop.component.scss']
})
export class MissStopComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  @Input() requestType: any
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  myDate = new Date();
  searchKeyword: any
  tripReportData: any;
  tableData: any;
  isloading = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  missBusStopData: any;
  bsmodal!: BsModalRef;
  selectedValue: any;
  vehicleData: any;
  selectedVehicle: any;
  exceldata: any;
  EXCEL_TYPE: any = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION: any = '.xlsx';
  shiftType:string = "0"
  excelData: any;
  tableData2: any;
  constructor(
    private reportService: ReportsService,
    private modalService: BsModalService,
    private shardService: SharedService,
    private excelService: ExcelFormatService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialtableData();
    this.getVehicleZoneData()
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;

    });
  }
  confirm(event: any) {
    this.selectedVehicle = event.id
  }

  setInitialtableData() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Route Name' },
      { key: 'keyValue', val: 'Direction' },
      { key: 'keyValue', val: 'Shift Type' },
      { key: 'keyValue', val: 'Trip ID' },
      {key:'keyValue', val: 'Date'},
      { key: 'keyValue', val: 'Start Time' },
      { key: 'keyValue', val: 'End Time' },
      { key: 'keyValue', val: 'Covered Stops' },
      { key: 'keyValue', val: 'Missed Stop' },
      { key: 'keyValue', val: 'Total Stops' },
    ]

    this.tableData2 = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Route Name' },
      { key: 'keyValue', val: 'Direction' },
      { key: 'keyValue', val: 'Shift Type' },
      { key: 'keyValue', val: 'Trip ID' },
      {key:'keyValue', val: 'Date'},
      { key: 'keyValue', val: 'Start Time' },
      { key: 'keyValue', val: 'End Time' },
      { key: 'keyValue', val: 'Covered Stops' },
      { key: 'keyValue', val: 'Missed Stop' },
    ]
  }

  showReport() {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    if (!this.myDate) {
      this.isloading = false;
      this.missBusStopData = [];
      return; 
    }
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id')),
      "UserId": parseInt(localStorage.getItem('user_Id')),
      "Vehicle_Id": this.selectedVehicle ? Number(this.selectedVehicle) : 0,
      "Date": formatDate(this.myDate, 'yyyy-MM-dd', 'en-US'),
      "Shift_Type": this.shiftType
    }
    this.exceldata = this.myDate;
    this.reportService.missBusStop(payload).subscribe((res: any) => {
      this.missBusStopData = res?.body?.data
      this.isloading = false
    })
  }

  viewDetail(report: any) {
    const initialState: ModalOptions = {
      initialState: {
        report: report,
      },
    };

    this.bsmodal = this.modalService.show(
      MissStopDetailComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

 

  ExportTOExcel() {
    this.excelData = this.missBusStopData.map((item: any) => {
      {
        return {
           'Vehicle No': item?.busNumber,
           'Route Name': item?.routeName,
           'Direction': item?.direction,
           'Shift Type': item?.shift_Type,
           'Trip ID': item?.tripID,
           'Date': item?.tripDate,
           'Start Time': item?.startTime,
           'End Time': item?.endTime,
           'Covered Stops': item?.noOfStopsCovered,
           'Missed Stop': item?.noOfStopsMissed,
           'Total Stops': item?.totalStops,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Miss Stop Report')
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }

  formatedDate(date:any) {
    return this.shardService.formatDateValue(date)
  }

}

