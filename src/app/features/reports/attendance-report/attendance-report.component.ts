import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { LocationTrackPopupComponent } from '../location-track-popup/location-track-popup.component';
import { AttendanceLocationMapComponent } from '../attendance-location-map/attendance-location-map.component';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  bsValue = new Date();
  tableData: any;
  searchKeyword:any
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  isloading: boolean = false;
  currentDate = new Date()
  attendanceList:any;
  attendanceForm:any
  bsModalRef!: BsModalRef;
  excelData: any;
 
  constructor(
    private fb: FormBuilder,
    private ReportsService: ReportsService,
    private modalService: BsModalService,
    private excelService : ExcelFormatService
  ) { }

  ngOnInit(): void {
    this.setInitialTbale()
  }

  setInitialTbale() {
    this.tableData = [
      { key: '', value: 'Emp Id' },
      { key: '', value: 'Emp Name' },
      { key: '', value: 'Date' },
      { key: '', value: 'In Time' },
      { key: '', value: 'In Time Location' },
      { key: '', value: 'Out Time' },
      { key: '', value: 'Out Time Location' },
      { key: '', value: 'Working Hours' },
      { key: '', value: 'Status' },
    ]
  }

  getAttendance(){
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    this.isloading = true;
    if (!this.currentDate) {
      this.isloading = false;
      this.attendanceList = []
      return; 
    }
    let payload = {
      "EmpID": 0,
      "RoleID": 0,
      "FromDate": formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US'),
      "ToDate": formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US')
    }
    this.ReportsService.showAttendance(payload).subscribe((res: any) => {
      this.isloading = false;
      this.attendanceList = res?.body;
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
    this.excelData = this.attendanceList.map((item: any) => {
      {
        return {
           'Emp Id' : item?.empCode,
           'Emp Name': item?.name ,
           'Date' : item?.attDate  ,
           'In Time': item?.inTime,
           'In Time Location': item?.inLat + ' , ' +item?.inLong + ' , ' +  item?.inAddress,
           'Out Time': item?.outTime ,
           'Out Time Location' : item?.inLat+ ' , ' +item?.inLong + ' , ' + item?.inAddress ,
           'Working Hours': item?.workingHrs,
           'Status': item?.status,
        };
      }
    })

    this.excelService.excelService(this.excelData,'Attendance Status Report')
  }


  openModal(data: any, type:any) {
    console.log(data);


    const initialState: ModalOptions = {
      initialState: {
        data: data,
        type: type
      },
    };
    this.bsModalRef = this.modalService.show(
      AttendanceLocationMapComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );


  }
}
