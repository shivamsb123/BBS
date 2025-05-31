import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../../registration/services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ScrollService } from '../../http-services/scroll.service';

@Component({
  selector: 'app-break-down-complaint',
  templateUrl: './break-down-complaint.component.html',
  styleUrls: ['./break-down-complaint.component.scss']
})
export class BreakDownComplaintComponent implements OnInit {
  
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 12;
  tableSizes = [12, 24, 36];
  isloading: boolean = false;
  vehicleData: any;
  driverList: any;
  route: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  partdescription: any;
  addBreakdownform!: FormGroup;
  hstep = 1;
  mstep = 1;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  breackdownList: any;
  breakdownId: any = 0;
  button = 'Add'
  selectedBusValue: any;
  selectedValue: any;
  formattedTimeDate: string;
  routeList: any;
  selectedRouteValue: { value: string; text: string; };
  selectedDriver: { value: string; text: string; };
  selectedRoute: { value: string; text: string; };
  selectedPart: { value: string; text: string; }
  isData : boolean = false
  alertMessage: string = 'Added';

  constructor(
    private managementService: ManagementService,
    private sharedService: SharedService,
    private registrationService: RegistrationService,
    private fb: FormBuilder,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.getVehicleZoneData();
    this.getDriverDetail()
    this.getRouteList();
    this.getpartDescription();
    this.setInitialTable()
    this.setInitialVlaue()
    this.getBreakdownList()
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Bus No' },
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Route' },
      { key: '', value: 'KM' },
      { key: '', value: 'Location' },
      { key: '', value: 'Shift' },
      { key: '', value: 'Complaint report Time' },
      { key: '', value: 'Attend Time' },
      { key: '', value: 'Name Of Incharge' },
      { key: '', value: 'Name of Mechanical/Electicion' },
      { key: '', value: 'Name of Complaint' },
      { key: '', value: 'Action Taken' },
      { key: '', value: 'Part Description' },
      { key: '', value: 'Action' },

    ]
  }

  setInitialVlaue() {
    this.addBreakdownform = this.fb.group({
      busNo: ['', [Validators.required, Validators.pattern('')]],
      driverName: ['', [Validators.required, Validators.pattern('')]],
      routeName: ['', [Validators.required, Validators.pattern('')]],
      km: ['', [Validators.required, Validators.pattern('')]],
      location: ['', [Validators.required, Validators.pattern('')]],
      shift: ['morning', [Validators.required, Validators.pattern('')]],
      complaintTime: [new Date(), [Validators.required, Validators.pattern('')]],
      attendTIme: [new Date(), [Validators.required, Validators.pattern('')]],
      incharge: ['', [Validators.required, Validators.pattern('')]],
      mechanicalName: ['', [Validators.required, Validators.pattern('')]],
      complaint: ['', [Validators.required, Validators.pattern('')]],
      actionTaken: ['', [Validators.required, Validators.pattern('')]],
      description: ['', [Validators.required, Validators.pattern('')]],
      partNo: ['', [Validators.required, Validators.pattern('')]],
      unit: ['', [Validators.required, Validators.pattern('')]],
      quantity: ['', [Validators.required, Validators.pattern('')]],
      complanitStatus: ['Open', [Validators.required, Validators.pattern('')]]
    })
  }



  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  getRouteList() {
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

  /**
 * vehicle list here
 */
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getpartDescription() {
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


  getBreakdownList() {
    this.isloading = true;
    let payload = {
      "PageNo": 1,
      "PageSize": 100,
      "ID": parseInt(this.breakdownId)
    }
    this.managementService.breakdownList(payload).subscribe((res: any) => {

      this.breackdownList = res?.body?.data;
      this.isloading = false;

    })
  }

  formattedTime(time: any) {
    let formatTime = time.slice(11, 20);
    let formatDate = time.slice(0, 10).split('-').reverse().join('-');
    this.formattedTimeDate = `${formatDate} ${formatTime}`
    return this.formattedTimeDate;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  confirm(event: any) {    
  if (event.selectType == 'Bus') {
      this.addBreakdownform.controls['busNo'].setValue(event.assets_no)
    } else if (event.selectType == 'Driver') {
      this.addBreakdownform.controls['driverName'].setValue(event.assets_no)
    } else if (event.selectType == 'Route') {
      this.addBreakdownform.controls['routeName'].setValue(event.id)
    } else if (event.selectType == 'Part') {
      this.addBreakdownform.controls['description'].setValue(event.assets_no)
    }
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  update(id: any, data: any) {
    this.breakdownId = id;
    this.button = 'Update';
    this.alertMessage = 'Updated';
    this.scrollService.scrollToElementById('content');
    this.breackdownList.forEach((ele: any) => {       
      if (this.breakdownId == ele?.id) {        
        console.log("check ele", ele);
        
        this.formattedTime(ele?.complaintReportTime);
        this.formattedTime(ele?.attendTime);
        
        let newVehicleValue = this.vehicleData?.filter((val: any) => val?.text == ele?.bus_No);
        newVehicleValue?.forEach((data: any) => {
          this.selectedValue = data;
        });
        

        // let newRouteValue = this.routeList?.filter((val: any) => val?.value == ele?.route_Name);
        // newRouteValue?.forEach((data: any) => {
        //   this.selectedRouteValue = {...data};   
        // });

         let newDriverValue = this.driverList?.filter((val: any) => val?.text == ele?.user_Name);
         newDriverValue?.forEach((data: any) => {
          this.selectedDriver = {...data};
        });

        let selectedNewRoute = this.routeList?.filter((val: any) => val?.value == ele?.route_Name);
        selectedNewRoute?.forEach((data: any) => {
         this.selectedRoute = {...data};
       });
        

        let selectedNewPart = this.partdescription?.filter((val: any) => val?.text == ele?.part_Description);
        selectedNewPart?.forEach((data: any) => {
         this.selectedPart = {...data};
       });

        this.addBreakdownform = this.fb.group({
          busNo: [ele?.bus_No, [Validators.required, Validators.pattern('')]],
          driverName: [ele?.user_Name, [Validators.required, Validators.pattern('')]],
          routeName: [ele?.route_Name, [Validators.required, Validators.pattern('')]],
          km: [ele?.km, [Validators.required, Validators.pattern('')]],
          location: [ele?.location, [Validators.required, Validators.pattern('')]],
          shift: [ele?.shift, [Validators.required, Validators.pattern('')]],
          complaintTime: [new Date(this.formattedTimeDate), [Validators.required, Validators.pattern('')]],
          attendTIme: [new Date(this.formattedTimeDate), [Validators.required, Validators.pattern('')]],
          incharge: [ele?.name_of_Incharge, [Validators.required, Validators.pattern('')]],
          mechanicalName: [ele?.name_Mech_Elect_Acc, [Validators.required, Validators.pattern('')]],
          complaint: [ele?.nature_of_Complaint, [Validators.required, Validators.pattern('')]],
          actionTaken: [ele?.actionTaken, [Validators.required, Validators.pattern('')]],
          description: [ele?.part_Description, [Validators.required, Validators.pattern('')]],
          partNo: [ele?.part_No, [Validators.required, Validators.pattern('')]],
          unit: ['', [Validators.required, Validators.pattern('')]],
          quantity: [ele?.no_of_Quantity, [Validators.required, Validators.pattern('')]],
          complanitStatus: [ele?.complaint_Status, [Validators.required, Validators.pattern('')]]
        })
      }
    });
  }


  submit(formvalue: any) {
    let payload: any
    if (this.breakdownId) {
      payload = {
        "Mode": 1,
        "Id": parseInt(this.breakdownId),
        "Bus_No": formvalue.busNo,
        "User_Name": formvalue.driverName,
        "Route_Name": formvalue.routeName,
        "Km": formvalue.km,
        "Location": formvalue.location,
        "Shift": formvalue.shift,
        "ComplaintReportTime": formatDate(formvalue.complaintTime, 'yyyy-MM-dd hh:mm', 'en-US'),
        "AttendTime": formatDate(formvalue.attendTIme, 'yyyy-MM-dd hh:mm', 'en-US'),
        "Name_of_Incharge": formvalue.incharge,
        "Name_Mech_Elect_Acc": formvalue.mechanicalName,
        "Nature_of_Complaint": formvalue.complaint,
        "ActionTaken": formvalue.actionTaken,
        "Part_Description": formvalue.description,
        "Part_No": formvalue.partNo,
        "Cost_Unit": formvalue.unit,
        "No_of_Quantity": formvalue.quantity,
        "Photo": "",
        "Complaint_Status": formvalue.complanitStatus,
        "RESULT": ""
      };
    } else {
      payload = {
        "Mode": 0,
        "Bus_No": formvalue.busNo,
        "User_Name": formvalue.driverName,
        "Route_Name": formvalue.routeName,
        "Km": formvalue.km,
        "Location": formvalue.location,
        "Shift": formvalue.shift,
        "ComplaintReportTime": formatDate(formvalue.complaintTime, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
        "AttendTime": formatDate(formvalue.attendTIme, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
        "Name_of_Incharge": formvalue.incharge,
        "Name_Mech_Elect_Acc": formvalue.mechanicalName,
        "Nature_of_Complaint": formvalue.complaint,
        "ActionTaken": formvalue.actionTaken,
        "Part_Description": formvalue.description,
        "Part_No": formvalue.partNo,
        "Cost_Unit": formvalue.unit,
        "No_of_Quantity": formvalue.quantity,
        "Photo": "",
        "Complaint_Status": formvalue.complanitStatus,
        "RESULT": ""
      };
    }
    this.managementService.addBreakdown(payload).subscribe((res: any) => {
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
        this.addBreakdownform.reset();
        this.breakdownId = 0
        this.getBreakdownList();
        this.selectedValue = {
          value: '',
          text: ''
        }
        this.selectedRoute = {
          value: '',
          text: ''
        };
        this.selectedDriver = {
          value: '',
          text: ''
        };
        this.selectedPart = {
          value: '',
          text: ''
        }
        this.button = 'Add'
      } else {
        this.alertData = {
          message: `BreakDown Complaint Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      this.isloading = false;
      this.alertMessage = 'Added';
    })
  }

  cancel() {
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedRoute = {
      value: '',
      text: ''
    };
    this.selectedDriver = {
      value: '',
      text: ''
    };
    this.selectedPart = {
      value: '',
      text: ''
    }
    this.addBreakdownform.reset();
  }

}
