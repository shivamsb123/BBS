import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location, formatDate } from '@angular/common';
import { ScrollService } from '../../http-services/scroll.service';

@Component({
  selector: 'app-complaint-report',
  templateUrl: './complaint-report.component.html',
  styleUrls: ['./complaint-report.component.scss']
})
export class ComplaintReportComponent {

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  department: any;
  vehicleData: any;
  vehicleChasis: any;
  complaintForm!: FormGroup;
  positionForm!: FormGroup;
  tableData: any;
  vehiclelistData = {
    isloading: false,
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100],
  };
  dispostionData = ['Show All', 'Open', 'Close']

  complaintStatus: string = 'Show All';
  date = new Date()
  complaintData: any;
  tableHeading:any = 'Total Complaint List';
  isButtonShow: boolean = true

  constructor(
    private shardService: SharedService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private scrollService: ScrollService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }


  ngOnInit(): void {
    this.setInitialValue();
    this.initialTable();
    let complainstatusValue: any = this.location.getState();
    console.log("check", complainstatusValue);
    

    this.complaintStatus = complainstatusValue?.complainStatus;
    if (this.complaintStatus == 'Open') {
      this.openComplaintData()
      this.tableData = this.tableData.filter((x: any) => x.val !== 'Action');
    } else if (this.complaintStatus == 'Close') {
      this.closeComplaintData()
    }else if(this.complaintStatus == 'showAll'){
      this.totalComplaint()
    } else {
      this.isButtonShow = false;
    }

    this.departmentData();
    this.getVehicleZoneData();
    setTimeout(() => {
      this.scrollService.scrollToElementById('content');
    }, 1000);

  }
  scrollto(id: any) {
    this.scrollService.scrollToElementById(id);

  }

  setInitialValue() {
    this.complaintForm = this.fb.group({
      company: [null, [Validators.required, Validators.pattern('')]],
      vehicle: [null, [Validators.required, Validators.pattern('')]],
      chasisNo: ['', [Validators.required, Validators.pattern('')]],
      fromDate: [this.date, [Validators.required, Validators.pattern('')]],
      toDate: [this.date, [Validators.required, Validators.pattern('')]],

    })

    this.positionForm = this.fb.group({
      disPosition: [this.dispostionData, [Validators.required, Validators.pattern('')]],
      compaint: ['', [Validators.required, Validators.pattern('')]],
      partNo: ['', [Validators.required, Validators.pattern('')]]
    })
  }


  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Complaint Id ' },
      { key: 'keyValue', val: 'Vehicle No ' },
      { key: 'keyValue', val: 'Chassis No' },
      { key: 'keyValue', val: 'Complaint ' },
      { key: 'keyValue', val: 'Status ' },
      { key: 'keyValue', val: 'Complaint Category ' },
      { key: 'keyValue', val: 'Complaint Date' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  /**
   *get department data
   */
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data

    })
  }


  confirm(event: any) {
    if (event.selectType == 'Company') {
      this.complaintForm.controls['company'].setValue(event.id)
    } else if (event.selectType == 'Vehicle') {
      this.complaintForm.controls['vehicle'].setValue(event.id)
      this.getVehicleChasicNumber();
    }
  }

  getVehicleChasicNumber() {
    let payload = {
      "IncludeSelf": 0,
      "VehicleId": parseInt(this.complaintForm.value.vehicle)
    }
    this.dashboardService.chesisNumber(payload).subscribe((res) => {
      this.vehicleChasis = res?.body?.data;
      this.complaintForm.controls['chasisNo'].setValue(this.vehicleChasis)
    })

  }

  redirectTo() {
    this.router.navigateByUrl('Reports/add-Show_Complaints')
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

  submit(formValue: any) {
    this.complaintStatus = formValue.disPosition
    if (this.complaintStatus == 'Show All') {
      this.totalComplaint();
      this.tableData = this.tableData.filter((x: any) => x.val !== 'Action');
    } else if (this.complaintStatus == 'Open') {
      this.tableData = this.tableData.filter((x: any) => x.val !== 'Action');
      this.openComplaintData()
    } else if (this.complaintStatus == 'Close') {
      this.closeComplaintData()
    }


  }

  // showAllComplaintData() {
  //   this.vehiclelistData.isloading = true;
  //   let payload = {
  //     "UserId": parseInt(localStorage.getItem('user_Id') || ''),
  //     "ChassisNo": this.complaintForm.value.chasisNo,
  //     "ComplaintId": 0,
  //     "FromDate": formatDate(this.complaintForm.value.fromDate, 'yyyy-MM-dd', 'en-US'),
  //     "ToDate": formatDate(this.complaintForm.value.toDate, 'yyyy-MM-dd', 'en-US'),
  //   }

  //   this.dashboardService.viewcomplaint(payload).subscribe((res: any) => {
  //     this.complaintData = res?.body?.data;
  //     this.vehiclelistData.isloading = false;

  //   })
  // }

  openComplaintData() {
    this.tableHeading = 'Pending Complaint List'
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      PageNo: 1,
      PageSize: 25
    }
    this.dashboardService.opencomplaint(payload).subscribe((res: any) => {
      this.complaintData = res?.body?.data;
    })
  }

  closeComplaintData() {
    this.vehiclelistData.isloading = true
    this.tableHeading = 'Close Complaint List'
    let payload = {
      Disposition: 1,
      PageNo: 1,
      PageSize: 25,
      UserId: parseInt(localStorage.getItem('user_Id') || '')
    }
    this.dashboardService.complaintcategory(payload).subscribe((res: any) => {
      this.complaintData = res?.body?.data;
      this.vehiclelistData.isloading = false
    })
  }

  totalComplaint(){
    this.tableHeading = 'Total Complaint List'
    this.vehiclelistData.isloading = true
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Disposition":0,
      "PageNo": 1,
      "PageSize": 25
    }
    this.dashboardService.complaintcategory(payload).subscribe((res:any) => {
      this.complaintData = res?.body?.data;
      this.vehiclelistData.isloading = false;
    })
  }

  redirectToTimeline(id: any) {
    this.router.navigateByUrl('/Reports/Complaint_Timeline', { state: { id: id } })
  }


}
