import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
import { MaintenanceService } from '../../services/maintenance.service';
import { ManagementService } from 'src/app/features/management/services/management.service';
import { ScrollService } from 'src/app/features/http-services/scroll.service';

@Component({
  selector: 'app-job-cards',
  templateUrl: './job-cards.component.html',
  styleUrls: ['./job-cards.component.scss']
})
export class JobCardsComponent implements OnInit {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes: any = [25, 50, 100];
  tableData: any;
  jobData: any;
  jobId: any;
  jobForm!: FormGroup
  vehicleData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  hstep = 1;
  mstep = 1;
  isMeridian = false;
  selectedValue: any;
  partdescription: any;
  selectedComplaintValue: any;
  selectedpartValue: any;
  button = 'Add'
  ComplaintTypeList: any;
  alertMesage: string = 'Added';


  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private MaintenanceService: MaintenanceService,
    private managementService: ManagementService,
    private scrollService : ScrollService
  ) { }

  ngOnInit(): void {
    this.setInitialValue()
    this.initialTable();
    this.getJobcardList();
    this.getVehicleZoneData();
    this.getComplaintType()
    this.getPartDescription();

  }

  setInitialValue() {
    this.jobForm = this.fb.group({
      serialNo: ['', [Validators.required, Validators.pattern('')]],
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
      inchargeName: ['', [Validators.required, Validators.pattern('')]],
      partDes: ['', [Validators.required, Validators.pattern('')]],
      partNo: ['', [Validators.required, Validators.pattern('')]],
      unit: ['', [Validators.required, Validators.pattern('')]],
      noOfQuality: ['', [Validators.required, Validators.pattern('')]],
      amount: ['', [Validators.required, Validators.pattern('')]],
      status: ['1', [Validators.required, Validators.pattern('')]],

    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S no' },
      { key: 'keyValue', val: 'Job Card </br> No' },
      { key: 'keyValue', val: 'Bus </br> No' },
      { key: 'keyValue', val: 'Km' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Complaint</br>Report</br> Time' },
      { key: 'keyValue', val: 'Attend </br> Time' },
      { key: 'keyValue', val: 'Types Of</br>Compaint' },
      { key: 'keyValue', val: 'Nature Of</br> Complaint' },
      { key: 'keyValue', val: 'Action</br>Taken' },
      { key: 'keyValue', val: 'Store</br> Incharge </br>Name' },
      { key: 'keyValue', val: 'Name of</br>Mechanical/</br>Election' },
      { key: 'keyValue', val: 'Action' },
    ]
  }


  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  // getPartDescription() {
  //   let newData = {
  //     value: '',
  //     text: ''
  //   };
  //   let payload = {
  //     "Result": ""
  //   }
  //   this.MaintenanceService.partDescription(payload).subscribe((res: any) => {
  //     let data = res?.body?.data;
  //     this.partdescription = data?.data.map((val: any) =>
  //       newData = {
  //         value: val?.proid,
  //         text: val?.productName
  //       }
  //     )
  //   })
  // }


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
      this.jobForm.controls['busNo'].setValue(event.assets_no)
    } else if (event.selectType == 'complaint') {
      this.jobForm.controls['complaintType'].setValue(event.assets_no)
    } else if (event.selectType == 'part_description') {
      this.jobForm.controls['partDes'].setValue(event.assets_no)

    }
  }

  getJobcardList() {
    this.isloading = true;
    let payload: any;
    if (this.jobId) {
      payload = {
        "PageNO": 1,
        "PageSize": 100,
        "Sno": 0,
        id: this.jobId
      }
    } else {
      payload = {
        "PageNO": 1,
        "PageSize": 100,
        "Sno": 0
      }
    }
    this.stockService.jobCardList(payload).subscribe((res: any) => {
      this.jobData = res?.body?.data;

      this.isloading = false;
    })
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

  update(id: any) {
    this.jobId = id;
    this.button = 'Update'
    let selectedVehicle: any;
    this.alertMesage = 'Updated'
    this.jobData.forEach((val: any) => {
      if (this.jobId == val?.id) {
       
        
        let busvalue :any
        let newVehicleValue = this.vehicleData?.filter((ele: any) => ele?.text == val?.asseT_NO );
        
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
    this.scrollService.scrollToElementById('content');


  }

  submit(formvalue: any) {
    let payload = {
      "MODE": 0,
      "SerialNo": formvalue?.serialNo,
      "ASSET_NO": formvalue?.busNo,
      "Km": formvalue?.km,
      "Date": formatDate(formvalue?.date, 'yyyy-MM-dd', 'en-US'),
      "Shift": formvalue?.shift,
      "ComplaintReportTime": formatDate(formvalue?.complaintTime, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "AttendTime": formatDate(formvalue?.attendTime, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "Types_OF_Complaint": formvalue?.complaintType,
      "Nature_of_Complaint": formvalue?.natureOFCompanit,
      "ActionTaken": formvalue?.actionTaken,
      "Store_Incharge_Name": formvalue?.StoreIncharege,
      "Name_of_Mechanical": formvalue?.mechinicalName,
      "Name_of_Incharge": formvalue?.inchargeName,
      "Part_Description": formvalue?.partDes,
      "Part_No": formvalue?.partNo,
      "Cost_Unit": formvalue?.unit,
      "No_of_Quantity": formvalue?.noOfQuality,
      "Total_Amount": formvalue?.amount,
      "Status": formvalue?.status,
      "Result": ""

    };
    if (this.jobId) {
      payload['MODE'] = 1,
      payload['ID']= this.jobId
    }    

    this.stockService.addJob(payload).subscribe((res: any) => {
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
        this.button = 'Add';
        this.jobId = ''
        this.getJobcardList()
        this.stopAlert();
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

}
