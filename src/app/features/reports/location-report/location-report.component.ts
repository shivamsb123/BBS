import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LocationTrackPopupComponent } from '../location-track-popup/location-track-popup.component';
import { Workbook } from "exceljs";
import { LocationTrackAllPopupComponent } from '../location-track-all-popup/location-track-all-popup.component';
import { NotificationService } from '../../http-services/notification.service';
import { FormateTimeService } from '../../http-services/formate-time.service';
import { ExcelFormatService } from '../../http-services/excel-format.service';
// import { NotificationService } from './notification.service';

@Component({
  selector: 'app-location-report',
  templateUrl: './location-report.component.html',
  styleUrls: ['./location-report.component.scss']
})
export class LocationReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  vehicleData: any;
  locationReportForm: any;
  locationReportData: any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  selectedValue: { value: string; text: string; };
  selectedVehicle: any
  diffrenceIndays: number;
  exceldata: any;
  vehcilename: any;
  isSubmmited: boolean = false;
  excelData: any;
  searchKeyword:any
  constructor(
    private shardService: SharedService,
    private fb: FormBuilder,
    private ReportsService: ReportsService,
    private modalService: BsModalService,
    private NotificationService: NotificationService,
    private formateTime: FormateTimeService,
    private excelService: ExcelFormatService
  ) { }

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.setAccidentVehicleValue();
    this.setInitialvalue();
    this.submit('');

  }

  setInitialvalue() {
    this.tableData = [
      { key: 'vehicleNo', val: 'Vehicle' },
      { key: 'datetime', val: 'Date' },
      { key: 'speed', val: 'Speed' },
      { key: 'place', val: 'Location' },
      { key: 'odoMeter', val: 'Odometer' },
      { key: 'lat', val: 'Latitude' },
      { key: 'lon', val: 'Longitude' },
      { key: 'map', val: 'Map' }
    ]
  }

  setAccidentVehicleValue() {
    this.locationReportForm = this.fb.group({
      fromDate: [this.formateTime.formatFromDate(new Date()), [Validators.required, Validators.pattern('')]],
      toDate: [this.formateTime.formatToDate(new Date()), [Validators.required, Validators.pattern('')]],
      record_interval: [5, [Validators.required, Validators.pattern('')]]
    })
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }
  confirm(event: any) {
    console.log(event);

    this.selectedVehicle = event.id;
    this.vehcilename = event.assets_no
  }

  submit(formvalue: any) {
    // console.log("check select3d", this.selectedVehicle);

    // if(!this.selectedVehicle){
    //   this.NotificationService.showError(
    //     'Please select required Field'
    //   );
    //   return
    // }
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isSubmmited = true;
    if (formvalue) {
      this.diffrenceIndays = this.shardService.formateddifference(formvalue.fromDate, formvalue.toDate)
      this.exceldata = formvalue;
      this.isloading = true;
      let payload = {
        "DEPT_ID": parseInt(localStorage.getItem('dept_id')),
        "ID": this.selectedVehicle ? parseInt(this.selectedVehicle) : 0,
        "PageNo": 1,
        "PageSize": 5000,
        "FromDate": this.shardService.formatedTime(formvalue?.fromDate),
        "ToDate": this.shardService.formatedTime(formvalue?.toDate),
        "INTERVAL": formvalue?.record_interval ? formvalue?.record_interval : 5
      }
      this.ReportsService.LocationStatusReport(payload).subscribe((res: any) => {
        this.isloading = false;
        this.locationReportData = res?.body?.data;
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
    this.locationReportForm.reset();
    this.submit('');
    this.setAccidentVehicleValue()
  }


  bsModalRef!: BsModalRef
  openModal(data: any) {
    console.log(data);


    const initialState: ModalOptions = {
      initialState: {
        data: data,
      },
    };
    this.bsModalRef = this.modalService.show(
      LocationTrackPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );


  }
  showallTrack() {
    const initialState: ModalOptions = {
      initialState: {
        data: this.locationReportData,
      },
    };
    this.bsModalRef = this.modalService.show(
      LocationTrackAllPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }
  // ExportTOExcel() {
  //   const workbook = new Workbook();
  //   let filename = 'Location-Report';

  //   const worksheet = workbook.addWorksheet(filename);
  //   const logoPath = "";

  //   const logo: any = workbook.addImage({
  //     base64:
  //       "data:image/png;base64,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",
  //     extension: "png",
  //   });
  //   worksheet.addImage(logo, 'A1:D3');
  //   worksheet.mergeCells("A1:D3");
  //   worksheet.addRow([]);
  //   let headers = this.tableData
  //     .filter(item => item.val !== 'Map')
  //     .map(item => item.val);
  //   let hdr1 = "Vehicle Id:" + this.selectedVehicle;
  //   let hdr2 = "Vehicle Number:" + this.vehcilename;
  //   let hdr3 = "From date:" + this.shardService.formatedTime(this.exceldata?.fromDate);
  //   let hdr4 = "To date:" + this.shardService.formatedTime(this.exceldata?.fromDate);
  //   let hdr5 = "Record interval (In Minute):" + this.exceldata?.record_interval;
  //   worksheet.addRow([hdr1]);
  //   worksheet.addRow([hdr2]);
  //   worksheet.addRow([hdr3]);
  //   worksheet.addRow([hdr4]);
  //   worksheet.addRow([hdr5]);
  //   worksheet.addRow([]);
  //   worksheet.addRow(Object.values(headers));
  //   const columnMaxLengths: number[] = Object.keys(headers).map((key) => {
  //     const columnValues = this.locationReportData.map((d: any) => d[key] !== null && d[key] !== undefined && d[key] !== '' ? d[key].toString().length : 0);
  //     return Math.max(...columnValues);
  //   });
  //   Object.keys(headers).forEach((key, index) => {
  //     const column = worksheet.getColumn(index + 1);
  //     const maxLength = columnMaxLengths[index];
  //     const headerLength = key.toString().length;
  //     const maxContentLength = Math.max(maxLength, headerLength);
  //     column.width = maxContentLength + 20;
  //   });

  //   this.locationReportData.forEach((d: any) => {
  //     let rowData = [];

  //     for (let i = 0; i < this.tableData.length; i++) {
  //       const key = this.tableData[i].key;
  //       if (key !== 'map') {
  //         let value = d[key] !== null && d[key] !== undefined && d[key] !== '' ? d[key] : 'N/A';
  //         if (key === 'speed') {
  //           value += ' Km/h';
  //         }
  //         rowData.push(value);
  //       }
  //     }

  //     worksheet.addRow(rowData);
  //   });

  //   const info: any = workbook.xlsx.writeBuffer();
  //   info.then((data: any) => {
  //     const blob = new Blob([data], {
  //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     });
  //     let a = document.createElement("a");

  //     var url = window.URL.createObjectURL(blob);
  //     a.href = url;
  //     a.download = String(filename + ".xlsx");
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     a.remove();
  //     //  this.createPriceSearchForm();
  //   });
  // }


  ExportTOExcel() {
    this.excelData = this.locationReportData.map((item: any) => {
      {
        return {
          'Vehicle': item?.vehicleNo,
          'Date': item?.datetime,
          'Speed': item?.speed,
          'Location': item?.place,
          'Odometer': item?.odoMeter,
          'Latitude': item?.lat,
          'Longitude': item?.lon,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Location Report')
  }

}
