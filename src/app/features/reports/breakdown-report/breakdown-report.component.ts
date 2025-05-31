import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegistrationService } from '../../registration/services/registration.service';
import { ReportsService } from '../services/reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-breakdown-report',
  templateUrl: './breakdown-report.component.html',
  styleUrls: ['./breakdown-report.component.scss']
})
export class BreakdownReportComponent {
  @ViewChild('TABLE') tableList!: ElementRef;
  routeList: any;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableData: any;
  tableSize = 25;
  tableSizes = [25, 50, 100, 500, 1000];
  routeName: any;

  breakdownForm!: FormGroup
  data: any = [];
  excelData: any;

  constructor(
    private registrationService: RegistrationService,
    private reportService: ReportsService,
    private fb: FormBuilder,
    private excelService: ExcelFormatService
  ) { }
  ngOnInit() {
    this.setInitialTableValue();
    this.setIntialvalue();
    this.getRouteListData();
    this.getBreakdownReport('')
  }

  setIntialvalue() {
    this.breakdownForm = this.fb.group({
      route: ['', [Validators.required, Validators.pattern('')]],
      fromdate: [new Date(), [Validators.required, Validators.pattern('')]],
      todate: [new Date(), [Validators.required, Validators.pattern('')]]

    })
  }

  setInitialTableValue() {
    this.tableData = [
      { key: '', val: 'Bus No' },
      { key: '', val: 'Driver Name' },
      { key: '', val: 'Route' },
      { key: '', val: 'KM' },
      { key: '', val: 'Location' },
      { key: '', val: 'Shift' },
      { key: '', val: 'Complaint Report Time' },
      { key: '', val: 'Attend Time ' },
      { key: '', val: 'Name Of Incharge ' },
      { key: '', val: 'Name Of Mechanical/Electicion ' },
      { key: '', val: 'Nature of Complaint ' },
      { key: '', val: 'Action Taken ' },
      { key: '', val: 'Part Description ' },
      { key: '', val: 'Part No ' },
      { key: '', val: 'No Of Quantity ' },
      { key: '', val: 'Complaint Status ' },
    ]
  }

  getRouteListData() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeListData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_NO,
          text: val?.routE_NAME +' /' + val?.routE_NO
        }
      )
    })
  }



  confirm(event: any) {
    if (event.selectType == 'Route') {
      this.routeName = event.id
      this.breakdownForm.controls['route'].setValue(event.id)
    }
  }

  getBreakdownReport(formvalue: any) {
    this.page = 1;
    this.count = 0;
    this.tableSize = 25;
    if(formvalue){
      this.isloading = true;
      let payload = {
        "UserID": parseInt(localStorage.getItem('user_Id')),
        "Route_Name": this.routeName ? formvalue.route : '',
        "FromDate": formvalue.fromdate ? formatDate(formvalue.fromdate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        "ToDate": formvalue.todate ? formatDate(formvalue.todate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
        "RESULT": ""
      }
      this.reportService.breakdownReport(payload).subscribe((res: any) => {
        this.data= res?.body?.data;
        console.log( this.data);
        
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


  ExportTOExcel() {
    this.excelData = this.data.map((item: any) => {
      {
        return {
          'Bus No': item?.bus_No,
          'Driver Name': item?.user_Name,
          'Route': item?.route_Name,
          'KM': item?.km,
          'Location': item?.location,
          'Shift': item?.shift,
          'Complaint Report Time': item?.complaintReportTime,
          'Attend Time ': item?.attendTime,
          'Name Of Incharge ': item?.name_of_Incharge,
          'Name Of Mechanical/Electicion ': item?.name_Mech_Elect_Acc,
          'Nature of Complaint ': item?.nature_of_Complaint,
          'Action Taken ': item?.actionTaken,
          'Part Description ': item?.part_Description,
          'Part No ': item?.part_No,
          'No Of Quantity ': item?.no_of_Quantity,
          'Complaint Status ': item?.complaint_Status,
        };
      }
    })

    this.excelService.excelService(this.excelData, 'Breakdown Report')
  }
}
