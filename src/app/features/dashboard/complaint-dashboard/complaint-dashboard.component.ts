import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { SessionService } from '../../http-services/session.service';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';

@Component({
  selector: 'app-complaint-dashboard',
  templateUrl: './complaint-dashboard.component.html',
  styleUrls: ['./complaint-dashboard.component.scss']
})
export class ComplaintDashboardComponent {
  @ViewChild('TABLE') tableList!: ElementRef;

  @Input() requestType: any
  totalSearchKeyword: any;
  openSearchKeyword: any;
  closeSearchKeyword: any;
  complaintDashboardData: any;
  complaintData: any;
  tableData: { key: string; val: string; }[];
  vehiclelistData = {
    isloading: false,
    totalPage: 1,
    closePage: 1,
    openPage: 1,
    totalcount: 0,
    closecount: 0,
    opencount: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100],
  };
  header: any = 'Complaint List';


  type: any;
  pendingList: any;
  closeComplain: any;
  excelData: any;
  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private router: Router,
    private excelService: ExcelFormatService
  ) {

  }
  ngOnInit(): void {
    this.getdata();
    this.initialTable();
    this.totalComplaint()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Complaint Id ' },
      { key: 'keyValue', val: 'Vehicle No ' },
      { key: 'keyValue', val: 'Driver ' },
      { key: 'keyValue', val: 'Operator ' },
      { key: 'keyValue', val: 'Complain Type ' },
      { key: 'keyValue', val: 'Chassis No' },
      { key: 'keyValue', val: 'Complaint 1 ' },
      { key: 'keyValue', val: 'Complaint 2 ' },
      { key: 'keyValue', val: 'Complaint 3 ' },
      { key: 'keyValue', val: 'Complaint 4 ' },
      { key: 'keyValue', val: 'Complaint 5 ' },
      { key: 'keyValue', val: 'Status ' },
      { key: 'keyValue', val: 'Complaint Category ' },
      { key: 'keyValue', val: 'Complaint Date' },
      { key: 'keyValue', val: 'Action' },
    ]

  }

  getdata() {
    let payload = {
      UserID: parseInt(localStorage.getItem('user_Id') || ''),
      MenuVersion: "v1"

    };
    this.dashboardService.complaintDashboard(payload).subscribe((res: any) => {
      this.complaintDashboardData = res?.body?.data
    });
  }
  @Output() emitdata: EventEmitter<string> = new EventEmitter<string>();

  redirectTo(stauts: any) {
    this.router.navigateByUrl('/Reports/Show_Complaints', { state: { complainStatus: stauts, id: 'content' } })
  }

  redirectToTimeline(id: any) {
    this.router.navigateByUrl('/Reports/Complaint_Timeline', { state: { id: id } })
  }

  onReport(type: any) {
    this.type = type;
    if (this.type == 'Open') {
      this.openSearchKeyword = ''
      this.vehiclelistData.openPage = 1;
      this.openComplaintData()
    } else if (this.type == 'Close') {
      this.closeSearchKeyword = ''
      this.vehiclelistData.closePage = 1;
      this.closeComplaintData()
    } else if (this.type == 'Total') {
      this.totalSearchKeyword = ''
      this.vehiclelistData.totalPage = 1;
      this.totalComplaint()
    }
  }

  totalComplaint() {
    this.header = 'Total Complaint List'
    this.vehiclelistData.isloading = true
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Disposition": 2,
      "PageNo": this.vehiclelistData.totalPage,
      "PageSize": this.vehiclelistData.tableSize
    }
    this.dashboardService.complaintcategory(payload).subscribe((res: any) => {
      this.complaintData = res?.body?.data;
      this.vehiclelistData.totalcount = res?.body?.total_records
      this.vehiclelistData.isloading = false;
    })
  }

  closeComplaintData() {
    this.vehiclelistData.isloading = true
    this.header = 'Close Complaint List'
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Disposition": 1,
      "PageNo": this.vehiclelistData.closePage,
      "PageSize": this.vehiclelistData.tableSize
    }
    this.dashboardService.complaintcategory(payload).subscribe((res: any) => {
      this.complaintData = res?.body?.data;
      this.vehiclelistData.closecount = res?.body?.total_records
      this.vehiclelistData.isloading = false;
    })
  }

  openComplaintData() {
    this.vehiclelistData.isloading = true
    this.header = 'Pending Complaint List'
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "PageNo": this.vehiclelistData.openPage,
      "PageSize": this.vehiclelistData.tableSize
    }
    this.dashboardService.opencomplaint(payload).subscribe((res: any) => {
      this.complaintData = res?.body?.data;
      this.vehiclelistData.opencount = res?.body?.total_records
      this.vehiclelistData.isloading = false;

    })

  }


  /**
   * tabel size chage method
   * @param event 
   */

  onTableSizeChangetotal(event: any) {
    this.vehiclelistData.tableSize = parseInt(event.target.value);
    this.vehiclelistData.totalPage = 1;
    if (this.header == 'Total Complaint List') {
      this.totalComplaint()
    }
  }

  onTableSizeChangeOpen(event: any) {
    this.vehiclelistData.tableSize = parseInt(event.target.value);
    this.vehiclelistData.openPage = 1;
    if (this.header == 'Pending Complaint List') {
      this.openComplaintData();
    }
  }

  onTableSizeChangeClose(event: any): void {
    this.vehiclelistData.tableSize = parseInt(event.target.value);
    this.vehiclelistData.closePage = 1;
    if (this.header == 'Close Complaint List') {
      this.closeComplaintData();
    }
  }
  /**
   * table data change
   * @param event 
   */

  onTableDataChangeTotal(event: any) {
    this.vehiclelistData.totalPage = event;
    if (this.header == 'Total Complaint List') {
      this.totalComplaint()
    }
  }

  onTableDataChangeOpen(event: any) {
    this.vehiclelistData.openPage = event;
    if (this.header == 'Pending Complaint List') {
      this.openComplaintData();
    }
  }

  onTableDataChangeClose(event: any) {
    this.vehiclelistData.closePage = event;
    if (this.header == 'Close Complaint List') {
      this.closeComplaintData();
    }
  };


  ExportTOExcel() {
    let reportType: string;
    let payload: any;
    let service: any;
  
    if (this.type === 'Total') {
      reportType = 'Total Complaint Status';
      payload = {
        "UserId": parseInt(localStorage.getItem('user_Id') || ''),
        "Disposition": 2,
        "PageNo": 1,
        "PageSize": 5000
      }
      service = this.dashboardService.complaintcategory(payload);
    } else if (this.type === 'Open') {
      reportType = 'Open Complaint Status';
      payload = {
        "UserId": parseInt(localStorage.getItem('user_Id') || ''),
        "PageNo": 1,
        "PageSize": 5000
      }
      service = this.dashboardService.opencomplaint(payload);
    } else if (this.type === 'Close') {
      reportType = 'Close Complaint Status';
      payload = {
        "UserId": parseInt(localStorage.getItem('user_Id') || ''),
        "Disposition": 1,
        "PageNo": 1,
        "PageSize": 5000
      }
      service = this.dashboardService.complaintcategory(payload);
    }
  
    service.subscribe((res: any) => {
      const allData = this.concatDataFromPages(res);
        this.excelData = allData.map((item: any) => {
        const commonData = {
          'Complaint Id': item?.complaint_ID,
          'Vehicle No': item?.asseT_NO,
          'Driver': item?.driverName,
          'Operator': item?.operatorName,
          'Complain Type': item?.complaintType,
          'Chassis No': item?.chassis_No,
          'Complaint 1': item?.complaints,
          'Complaint 2': item?.complaint2,
          'Complaint 3': item?.complaint3,
          'Complaint 4': item?.complaint4,
          'Complaint 5': item?.complaint5,
          'Status': item?.status,
          'Complaint Category': item?.category,
          'Complaint Date': item?.entry_Date,
        };
        return commonData;
      });
  
      this.excelService.excelService(this.excelData, reportType);
    });
  }
  
  concatDataFromPages(response: any): any[] {
    console.log("check res", response);
    
    const allData: any[] = [];
    let service:any;
    let payload :any
    if (response?.body?.data) {
      allData.push(...response.body.data);
  
      const totalPages = response.body.total_pages;
      const currentPage = response.body.current_page;
  
      if (totalPages && currentPage < totalPages) {
        for (let page = currentPage + 1; page <= totalPages; page++) {
          const updatedPayload = { ...payload, PageNo: page };
          service = this.dashboardService.complaintcategory(updatedPayload);
  
          service.subscribe((res: any) => {
            if (res?.body?.data) {
              allData.push(...res.body.data);
            }
          });
        }
      }
    }
    return allData;
  }
}
