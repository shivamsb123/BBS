import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from 'src/app/features/http-services/scroll.service';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { ManagementService } from 'src/app/features/management/services/management.service';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
import { MaintenanceService } from '../../services/maintenance.service';

@Component({
  selector: 'app-add-new-jobcard',
  templateUrl: './add-new-jobcard.component.html',
  styleUrls: ['./add-new-jobcard.component.scss']
})
export class AddNewJobcardComponent {
  searchKeyword: any;
  isloading: boolean = false;
  jobForm!: FormGroup
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  selectedValue: any;
  partdescription: any;
  selectedComplaintValue: any;
  selectedpartValue: any;
  button = 'Add'
  ComplaintTypeList: any;
  alertMesage: string = 'Added';
  id: any;
  jobcardListById: any;


  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private MaintenanceService: MaintenanceService,
    private managementService: ManagementService,
    private scrollService: ScrollService,
    private route: ActivatedRoute,
    private router: Router
  
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getJobcardList();
      this.button = 'Update';
    }
    this.setInitialValue()
    this.getJobcardList();
    this.getVehicleZoneData();
    this.getComplaintType()
    this.getPartDescription();
  }

  setInitialValue() {
    this.jobForm = this.fb.group({
      busNo: ['', [Validators.required, Validators.pattern('')]],
      km: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      shift: ['', [Validators.required, Validators.pattern('')]],
      complaintTime: [new Date(), [Validators.required, Validators.pattern('')]],
      attendTime: [new Date(), [Validators.required, Validators.pattern('')]],
      complaintType: ['', [Validators.required, Validators.pattern('')]],
      natureOFCompanit: ['', [Validators.required, Validators.pattern('')]],
      actionTaken: ['', [Validators.required, Validators.pattern('')]],
      StoreIncharege: ['', [Validators.required, Validators.pattern('')]],
      mechinicalName: ['', [Validators.required, Validators.pattern('')]],
      jobCardStatus: ['Open', [Validators.required, Validators.pattern('')]],
      inchargeName: ['', [Validators.required, Validators.pattern('')]],

    })
  }


  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }


  getPartDescription() {
    let newData = {
      value: '',
      text: ''
    }

    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "RESULT": ""
    }

    this.managementService.partName(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.partdescription = data.map((val: any) =>
        newData = {
          value: val?.pr_id,
          text: val?.pr_name
        }
      )
    })
  }

  getComplaintType() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "UserID": parseInt(localStorage.getItem('user_Id') || ''),
      "RESULT": ""

    };
    this.MaintenanceService.complaintType(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.ComplaintTypeList = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.types_of_Complaint
        }
      )

    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      console.log('event',event);
      
      this.jobForm.controls['busNo'].setValue(event.id)
    } else if (event.selectType == 'complaint') {
      this.jobForm.controls['complaintType'].setValue(event.assets_no)
    } else if (event.selectType == 'part_description') {
      this.jobForm.controls['partDes'].setValue(event.assets_no)

    }
  }

  getJobcardList() {
    this.isloading = true;
    let payload = {
      "pk_jobcard_id": Number(this.id)
    }

    this.stockService.jobCardList(payload).subscribe((res: any) => {
      this.isloading = false;
      this.jobcardListById = res?.body?.data;
      this.jobcardListById.forEach((val: any) => {
        if (this.id == val?.id) {
          let busvalue: any
          let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.text == val?.asseT_NO);

          newVehicleValue.forEach((data: any) => {
            this.selectedValue = data
            busvalue = data?.text
          });
          let newComplaintType = this.ComplaintTypeList?.filter((ele: any) => ele?.text == val?.types_OF_Complaint);
          newComplaintType.forEach((data: any) => {
            this.selectedComplaintValue = data
          });

          let newPartDescription = this.partdescription?.filter((ele: any) => ele?.text == val?.part_Description);
          newPartDescription?.forEach((data: any) => {
            this.selectedpartValue = data
          });

          let formatDateValue = val.date.slice(0, 10).split("-").reverse().join('-');
          let foratComplaintTime = val.complaintReportTime.slice(11, 16);
          let formatAttendTime = val.attendTime.slice(11, 16);
          let formatComplainDate = val.complaintReportTime.slice(0, 10).split('-').reverse().join('-');
          let formatAttendDate = val.attendTime.slice(0, 10).split('-').reverse().join('-');

          let shiftValue: any;
          if (val.shift == 'Day') {
            shiftValue = '1'
          } else {
            shiftValue = '2'
          }

          this.jobForm = this.fb.group({
            serialNo: [val?.serialNo, [Validators.required, Validators.pattern('')]],
            busNo: [busvalue, [Validators.required, Validators.pattern('')]],
            km: [val?.km, [Validators.required, Validators.pattern('')]],
            date: [new Date(formatDateValue), [Validators.required, Validators.pattern('')]],
            shift: [shiftValue, [Validators.required, Validators.pattern('')]],
            complaintTime: [new Date(`${formatComplainDate} ${foratComplaintTime}`), [Validators.required, Validators.pattern('')]],
            attendTime: [new Date(`${formatAttendDate} ${formatAttendTime}`), [Validators.required, Validators.pattern('')]],
            complaintType: [val?.types_OF_Complaint, [Validators.required, Validators.pattern('')]],
            natureOFCompanit: [val?.nature_of_Complaint, [Validators.required, Validators.pattern('')]],
            actionTaken: [val?.actionTaken, [Validators.required, Validators.pattern('')]],
            StoreIncharege: [val?.store_Incharge_Name, [Validators.required, Validators.pattern('')]],
            mechinicalName: [val?.name_of_Mechanical, [Validators.required, Validators.pattern('')]],
            inchargeName: [val?.name_of_Incharge, [Validators.required, Validators.pattern('')]],
            partDes: [val?.part_Description, [Validators.required, Validators.pattern('')]],
            partNo: [val?.part_No, [Validators.required, Validators.pattern('')]],
            unit: [val?.cost_Unit, [Validators.required, Validators.pattern('')]],
            noOfQuality: [val?.no_of_Quantity, [Validators.required, Validators.pattern('')]],
            amount: [val?.total_Amount, [Validators.required, Validators.pattern('')]],
            status: [val?.status, [Validators.required, Validators.pattern('')]],

          })
        }
      });
    })
  }

  submit(formvalue: any) {
    console.log('formvalue',formvalue);
    let payload = {
      "pk_jobcard_id": 0,
      "fk_vehicle_id": Number(formvalue?.busNo),
      "Km": formvalue?.km,
      "EntryDate":formatDate(formvalue.date, 'yyyy-MM-dd', 'en-US'),
      "Shift": formvalue?.shift,
      "ComplaintReportTime": formatDate(formvalue.complaintTime, 'yyyy-MM-dd', 'en-US'),
      "AttendTime": formatDate(formvalue.attendTime, 'yyyy-MM-dd', 'en-US'),
      "Types_OF_Complaint": formvalue?.complaintType,
      "Nature_of_Complaint":formvalue?.natureOFCompanit,
      "ActionTaken": formvalue?.actionTaken,
      "Store_Incharge_Name": formvalue?.StoreIncharege,
      "Name_of_Mechanical": formvalue?.mechinicalName,
      "Name_of_Incharge": formvalue?.inchargeName,
      "JobCardStatus": formvalue?.jobCardStatus,
      "Logged_by": Number(localStorage.getItem('user_Id'))

    };
    if (this.id) {
        payload['pk_jobcard_id'] = this.id
    }

    this.stockService.addJob(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.button = 'Add';
        this.getJobcardList()
        this.stopAlert();
          setTimeout(() => {
          this.router.navigateByUrl('/Maintenance/JobCard')
        }, 3000);
      } else {
        this.alertData = {
          message: `Job Card Not ${this.alertMesage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
        this.alertMesage = 'Added'
      }
    })
  }

  cancel(){
    this.jobForm.reset()
  }

}
