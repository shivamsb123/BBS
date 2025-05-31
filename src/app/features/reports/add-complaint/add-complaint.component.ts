import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.scss']
})
export class AddComplaintComponent implements OnInit {
  department: any;
  vehicleData: any;
  vehicleChasis: any;
  selectedDriverValue: any
  selectedValue:any
  selectedDepartment:any
  selectedCategory:any
  status = ["Not Ok", "Ok With Issue"];
  complaintTypeData = ['AMC', 'Warraanty', 'Paid', 'Insurance']
  category: any;
  addComplaintForm!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  categoryId: any;
  driverList: any;
  operatorList: any;
  driverId: any;
  operatorId: any;

  constructor(
    private shardService: SharedService,
    private dashboardService: DashboardService,
    private fb: FormBuilder,
    private router: Router,
    private reportService: ReportsService
  ) { }

  ngOnInit(): void {
    this.setInitialState()
    this.departmentData();
    this.getVehicleZoneData();
    this.getCategory()
    this.getDriverDetail()
    // this.getOperatorDetail()
  }

  setInitialState() {
    this.addComplaintForm = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      vehicle: ['', [Validators.required, Validators.pattern('')]],
      driver: ['', [Validators.required, Validators.pattern('')]],
      operator: ['', [Validators.required, Validators.pattern('')]],
      complaintType: ['AMC', [Validators.required, Validators.pattern('')]],
      chasisNo: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      category: ['', [Validators.required, Validators.pattern('')]],
      status: ['Not Ok', [Validators.required, Validators.pattern('')]],
      compalint1: ['', [Validators.required, Validators.pattern('')]],
      compalint2: ['', [Validators.required, Validators.pattern('')]],
      compalint3: ['', [Validators.required, Validators.pattern('')]],
      compalint4: ['', [Validators.required, Validators.pattern('')]],
      compalint5: ['', [Validators.required, Validators.pattern('')]],
    })
  }


  /**
   *get department data
   */
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data
    })
  }



  // getVehicleChasicNumber() {
  //   let payload = {
  //     "IncludeSelf": 0,
  //     "VehicleId": parseInt(this.addComplaintForm.value.vehicle)
  //   }
  //   this.dashboardService.chesisNumber(payload).subscribe((res) => {
  //     let data = res?.body?.data;
  //     if (data) {
  //       this.addComplaintForm.controls['chasisNo'].setValue(data)
  //     } else {
  //       this.addComplaintForm.controls['chasisNo'].setValue('0')
  //     }
  //   })

  // }

  confirm(event: any) {
    if (event.selectType == 'Company') {
      this.addComplaintForm.controls['company'].setValue(event.id)
    } else if (event.selectType == 'Vehicle') {
      this.addComplaintForm.controls['vehicle'].setValue(event.id)
      // this.getVehicleChasicNumber();
    } else if (event.selectType == 'Category') {
      this.categoryId = event.id
      this.addComplaintForm.controls['category'].setValue(event.assets_no)
    } else if (event.selectType == 'driver') {
      this.driverId = event.id
      this.addComplaintForm.controls['driver'].setValue(event.id)
    } else if (event.selectType == 'operator') {
      this.operatorId = event.id
      this.addComplaintForm.controls['operator'].setValue(event.id)
    }

  }

  getCategory() {
    let payload = {
      mode: 0
    }
    this.dashboardService.complaintCategory(payload).subscribe((res) => {
      this.category = res?.body?.data;
    })
  }

  getDriverDetail() {
    this.shardService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  getOperatorDetail() {
    let newData = {
      value: '',
      text: ''
    };
    this.reportService.OperatorDetails().subscribe((res: any) => {
      let data = res?.body;
      this.operatorList = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.fullName
        })
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formValue: any) {
    let payload = {
      "Curr_Date": formatDate(formValue.date, 'yyyy-MM-dd HH:mm:ss', 'en-US'),
      "DeptID": parseInt(formValue.company || ''),
      "DriverId": parseInt(this.driverId),
      "OperatorId": this.operatorId,
      "OperatorName":formValue.operator,
      "Chassis_No": formValue.chasisNo ? formValue.chasisNo : '0',
      "Category_ID": this.categoryId,
      "Complaints": formValue.compalint1,
      "Complaint2": formValue.compalint2,
      "Complaint3": formValue.compalint3,
      "Complaint4": formValue.compalint4,
      "Complaint5": formValue.compalint5,
      "Status": formValue.status,
      "ComplaintType": formValue.complaintType,
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Complaint_ID": 0,
      "Vehicle_ID": parseInt(formValue.vehicle || '')
    }

    this.dashboardService.PostComplaint(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.router.navigateByUrl('Reports/Show_Complaints')
        }, 3000)

      } else {
        this.alertData = {
          message: `Complain Not Added`
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
  }

  cancel(){
    this.selectedDriverValue = {
      value: '',
      text: ''
    }
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedDepartment = {
      value: '',
      text: ''
    }
    this.selectedCategory = {
      value: '',
      text: ''
    }
    this.addComplaintForm.reset()
  }
}
