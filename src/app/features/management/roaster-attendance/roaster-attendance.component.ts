import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../../registration/services/registration.service';
import { formatDate } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddInformationComponent } from '../../shared/components/add-information/add-information.component';
import { ScrollService } from '../../http-services/scroll.service';
import * as XLSX from 'xlsx';
import { ExcelFormatService } from '../../http-services/excel-format.service';


@Component({
  selector: 'app-roaster-attendance',
  templateUrl: './roaster-attendance.component.html',
  styleUrls: ['./roaster-attendance.component.scss']
})
export class RoasterAttendanceComponent implements OnInit {
  @ViewChild('TABLE') tableList!: ElementRef;
  rosterAtt!: FormGroup
  vehicleData: any;
  company: any;
  route: any;
  driverList: any;
  tableData: any
  rosterAttList: any;
  page = 1;
  count = 0;
  tableSize = 12;
  tableSizes = [12, 24, 36];
  isloading: boolean = false;
  routeList: any;
  bsModalRef!: BsModalRef;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  selectedVehicleData: any;
  typeData: any = ''
  gpsData: any;
  markDepotOut!: FormGroup;
  markDepotIn!: FormGroup;
  breakdownForm!: FormGroup
  breakdownList: any;
  selectedValue: any;
  breakDownType: any;
  backgroundColor: boolean = false;
  addDriver!: FormGroup;
  selectedVehicleValue: any;
  selectedDriverValue: any;
  submitted: boolean = false;
  obuData: any;
  excelData: any;

  constructor(
    private managementService: ManagementService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private registrationService: RegistrationService,
    private modalService: BsModalService,
    private scrollService:ScrollService,
    private excelService: ExcelFormatService
  ) {

  }
  ngOnInit(): void {
    this.getCompany();
    this.getDriverDetail()
    this.getVehicleZoneData()
    this.setinitialValue();
    this.setInitialTbale();
    this.getBreakdownReason()
  }

  setinitialValue() {
    this.rosterAtt = this.fb.group({
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      rosterStatus: ['0', [Validators.required, Validators.pattern('')]],
      company: ['', [Validators.required, Validators.pattern('')]],
      route: ['', [Validators.required, Validators.pattern('')]],
      shift: ['M', [Validators.required, Validators.pattern('')]],
      weekday: ['WK', [Validators.required, Validators.pattern('')]],
      driver: ['', [Validators.required, Validators.pattern('')]],
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
    });

    this.markDepotOut = this.fb.group({
      odometer: ['', [Validators.required, Validators.pattern('')]],
      soc: ['', [Validators.required, Validators.pattern('')]],
    })
    this.markDepotIn = this.fb.group({
      odometer: ['', [Validators.required, Validators.pattern('')]],
      soc: ['', [Validators.required, Validators.pattern('')]],
    })

    this.addDriver = this.fb.group({
      driver: ['', [Validators.required, Validators.pattern('')]],
      vehicle: ['', [Validators.required, Validators.pattern('')]]
    })

    this.breakdownForm = this.fb.group({
      changeVehicle: ['1', [Validators.required, Validators.pattern('')]],
      reason: ['', [Validators.required, Validators.pattern('')]],
      newVehicle: ['', [Validators.required, Validators.pattern('')]],
      stopBreakdown: [new Date(), [Validators.required, Validators.pattern('')]],
      odoMeterOld: ['0.00', [Validators.required, Validators.pattern('')]],
      socOld: ['0.00', [Validators.required, Validators.pattern('')]],
      depotOutTime: [new Date(), [Validators.required, Validators.pattern('')]],
      odometerNew: ['0.00', [Validators.required, Validators.pattern('')]],
      socNew: ['0.00', [Validators.required, Validators.pattern('')]],
      handOverTime: [new Date(), [Validators.required, Validators.pattern('')]],
      handOdoNew: ['0.00', [Validators.required, Validators.pattern('')]],
      handSocNew: ['0.00', [Validators.required, Validators.pattern('')]],
      remark: ['', [Validators.required, Validators.pattern('')]],
      newDriver: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  setInitialTbale() {
    this.tableData = [
      { key: '', value: 'Route Srn' },
      { key: '', value: 'Shift & Time' },
      { key: '', value: 'Sch Bus No' },
      { key: '', value: 'SCH Driver </br> Name code' },
      { key: '', value: 'Act Shift </br> On' },
      { key: '', value: 'Act Bus </br> No' },
      { key: '', value: 'Act Driver Name </br>& Code' },
      { key: '', value: 'Act Depot out' },
      { key: '', value: 'Last Activity' },
      { key: '', value: 'Act Depot In' },
      { key: '', value: 'Guide ID' },
      { key: '', value: 'Guide Name' },
      { key: '', value: 'Mobile No' },
      { key: '', value: 'Action' },

    ]
  }

   /**
   *  register form controls
   */
   get f() {
    return this.markDepotIn.controls;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getBreakdownReason() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || '')
    }
    this.managementService.breakdownReason(payload).subscribe((res: any) => {
      this.breakdownList = res?.body?.data
    })
  }

  confirm(event: any) {
    if (event.selectType == 'company') {
      this.rosterAtt.controls['company'].setValue(event.id);
      this.getRouteList();
    } else if (event.selectType == 'route') {
      this.rosterAtt.controls['route'].setValue(event.id);
    } else if (event.selectType == 'Driver') {
      this.rosterAtt.controls['driver'].setValue(event.id);
    } else if (event.selectType == 'Bus') {
      this.rosterAtt.controls['vehicleNo'].setValue(event.id);
    } else if (event.selectType == 'breakDown') {
      this.breakdownForm.controls['reason'].setValue(event.id);
    } else if (event.selectType == 'NewVehicle') {
      this.breakdownForm.controls['newVehicle'].setValue(event.id);
    } else if (event.selectType == 'NewDriver') {
      this.breakdownForm.controls['newDriver'].setValue(event.id);
    } else if (event.selectType == 'driverDepotOut') {
      this.addDriver.controls['driver'].setValue(event.id)
    } else {
      this.addDriver.controls['vehicle'].setValue(event.id)
    }
  }

  getRouteList() {
    let newData = {
      value: "",
      text: ""
    }

    let payload = {
      "DEPT_ID": parseInt(this.rosterAtt.value.company),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": 1,
      "Page_Size": 100,
      "Flag": 1,
      "bStatus": 1
    }

    this.registrationService.routeList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.routeList = data.map((val: any) =>
        newData = {
          value: val?.routE_ID,
          text: val?.routE_NAME + ' /' + val?.routE_NO
        }
      )
    })
  }


  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
    })
  }

  getCompany() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.company = res?.body?.data;
    })
  }

  undoVehicleData(undovalue: number) {
    let payload = {
      "r_id": this.selectedVehicleData?.r_id ? parseInt(this.selectedVehicleData?.r_id || '') : 0,
      "flag": undovalue
    }

    this.managementService.undoProcess(payload).subscribe((res: any) => {
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
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  onMarkShiftOff(formValue: any) {
    let payload = {
      "r_id": this.selectedVehicleData?.r_id ? parseInt(this.selectedVehicleData?.r_id || '') : 0,
      "driver_id": formValue.driver ? parseInt(formValue.driver || '') : 0,
      "conductor_id": this.selectedVehicleData?.conductor_id ? parseInt(this.selectedVehicleData?.conductor_id || '') : 0,
      "vehicle_id": formValue.vehicle ? parseInt(formValue.vehicle || '') : 0,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "is_first_shift": 1,
      "flag": 6
    }

    this.managementService.MarkShiftOff(payload).subscribe((res: any) => {
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
        this.submit(this.rosterAtt.value)
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  submit(formvalue: any) {
    this.isloading = true;
    let payload = {
      "dept_id": parseInt(formvalue.company),
      "route_id": parseInt(formvalue.route),
      "shift_type": formvalue.shift,
      "weekday_type": formvalue.weekday,
      "from_date": formatDate(formvalue.date, 'yyyy-MM-dd', 'en-US'),
      "to_date": formatDate(formvalue.date, 'yyyy-MM-dd', 'en-US'),
      "driver_id": formvalue.driver ? parseInt(formvalue.driver) : 0,
      "vehicle_id": formvalue.vehicleNo ? parseInt(formvalue.vehicleNo) : 0

    }
    this.managementService.ViewRosterForAttt(payload).subscribe((res: any) => {
      this.rosterAttList = res?.body?.data;
      this.isloading = false;

    })

  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  selectRoster(vehicleDataValue: any, type: any) {
    setTimeout(() => {
      this.scrollService.scrollToElementById('content');
    });
    this.backgroundColor = true;
    this.breakDownType = type
    this.selectedVehicleData = vehicleDataValue;
    console.log("check this.ele", this.selectedVehicleData);
        
    this.breakdownForm.controls['newDriver'].setValue(this.selectedVehicleData?.driver_id);

    let newVehicleData = this.vehicleData?.filter((ele: any) => ele?.text == this.selectedVehicleData?.vehicle_no);
    newVehicleData?.forEach((data: any) => {
      this.breakdownForm.controls['newVehicle'].setValue(data?.value)
      this.selectedValue = data;
    });

    let newPartDescription = this.vehicleData?.filter((ele: any) => ele?.text == this.selectedVehicleData?.vehicle_no);
    newPartDescription?.forEach((data: any) => {
      this.addDriver.controls['vehicle'].setValue(data?.value)
      this.selectedVehicleValue = data;
    });

    let newDriver = this.driverList?.filter((ele: any) => ele?.value == this.selectedVehicleData?.driver_id);
    newDriver?.forEach((data: any) => {
      this.addDriver.controls['driver'].setValue(data?.value)
      this.selectedDriverValue = data;
    });

    this.getObuStatusData()
    // this.getGpsStatusData();
    this.getBreakdownReason()
    if (!vehicleDataValue?.shift_on) {
      this.typeData = 'Roster'
      this.getShiftData()
    }
    // else if(this.selectedVehicleData?.shift_on && this.selectedVehicleData?.depo_out && this.selectedVehicleData?.depo_in && !this.selectedVehicleData?.shift_off) {
    //   this.typeData = 'ShiftOff'
    //   this.getShiftData();
    // }
  }

  getShiftData() {
    const initialState: ModalOptions = {
      initialState: {
        rosterData: this.selectedVehicleData,
        type: this.typeData
      },
    };
    this.bsModalRef = this.modalService.show(
      AddInformationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );

    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        if (value?.body?.status == 'Success') {
          this.alertData = {
            message: value?.body?.alert
          };
          this.alertType = "success";
          this.alertTrigger = true;
          this.stopAlert();
          this.submit(this.rosterAtt.value)
        } else {
          this.alertData = {
            message: value?.body?.alert,
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
      }
    );
  }

  onMarkDepotOut(formvalue: any) {
    let payload = {
      "r_id": this.selectedVehicleData?.r_id ? parseInt(this.selectedVehicleData?.r_id) : 0,
      "driver_id": this.selectedVehicleData?.driver_id_att ? parseInt(this.selectedVehicleData?.driver_id_att) : 0,
      "conductor_id": this.selectedVehicleData?.conductor_id ? parseInt(this.selectedVehicleData?.conductor_id) : 0,
      "vehicle_id": this.selectedVehicleData?.vehicle_id_att ? parseInt(this.selectedVehicleData?.vehicle_id_att) : 0,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "odometer_depo_in": formvalue?.odometer,
      "soc_percentage_depo_in": formvalue?.soc,
      "flag": 2

    }
    this.managementService.markDepotOut(payload).subscribe((res: any) => {
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
        this.submit(this.rosterAtt.value)
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  onMarkDepotIn(formValue: any) {
    this.submitted = true;
    if(this.submitted && this.markDepotIn.value.odometer < this.selectedVehicleData.last_odometer) return

    let payload = {
      "r_id": this.selectedVehicleData?.r_id ? parseInt(this.selectedVehicleData?.r_id) : 0,
      "driver_id": this.selectedVehicleData?.driver_id_att ? parseInt(this.selectedVehicleData?.driver_id_att) : 0,
      "conductor_id": this.selectedVehicleData?.conductor_id ? parseInt(this.selectedVehicleData?.conductor_id) : 0,
      "vehicle_id": this.selectedVehicleData?.vehicle_id_att ? parseInt(this.selectedVehicleData?.vehicle_id_att) : 0,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "odometer_depo_in": formValue?.odometer,
      "soc_percentage_depo_in": formValue?.soc,
      "flag": 5
    }
    this.managementService.markDepotIn(payload).subscribe((res: any) => {
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
        this.submit(this.rosterAtt.value)
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  getGpsStatusData() {
    this.gpsData = {};
    let payload = {
      "vehicle_id": this.selectedVehicleData?.vehicle_id_att,
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "flag": 0
    }
    this.managementService.gpsStatusData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      data?.forEach((val: any) => {
        this.gpsData = val;
      })
    })

  }

  getObuStatusData() {
    this.managementService.obuStatusData(this.selectedVehicleData?.vehicle_id_att).subscribe((res: any) => {
      this.obuData = res?.body
    })
  }

  applyBreakdown(formvalue: any) {
    let payload = {
      "r_id": this.selectedVehicleData?.r_id ? parseInt(this.selectedVehicleData?.r_id || '') : 0,
      "shift_to": formatDate(formvalue.stopBreakdown, 'yyyy-MM-dd HH:mm:ss', 'en_us'),
      "depot_out_new": formatDate(formvalue.depotOutTime, 'yyyy-MM-dd HH:mm:ss', 'en_us'),
      "handover_time": formatDate(formvalue.handOverTime, 'yyyy-MM-dd HH:mm:ss', 'en_us'),
      "driver_id": parseInt(formvalue.newDriver),
      "conductor_id": this.selectedVehicleData?.conductor_id ? parseInt(this.selectedVehicleData?.conductor_id) : 0,
      "vehicle_id": parseInt(formvalue.newVehicle),
      "user_id": parseInt(localStorage.getItem('user_Id') || ''),
      "mode": 1,
      "reason_id": parseInt(formvalue.reason),
      "remarks": formvalue.remark,
      "odometer_last": Number(formvalue.odoMeterOld),
      "trip_id": 0,
      "odometer_new": Number(formvalue.odometerNew),
      "soc_old": Number(formvalue.socOld),
      "soc_new": Number(formvalue.socNew),
      "odometer_handover": Number(formvalue.handOdoNew),
      "soc_handover": Number(formvalue.handSocNew)

    }
    this.managementService.rosterApplyChange(payload).subscribe((res: any) => {
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
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  cancel() {
    this.breakdownForm.reset()
  }

  ExportTOExcel() {
    this.excelData = this.rosterAttList.map((item: any) => {
      {
        return {
          'Route Srn': item?.route_no + ' / ' + item?.snr,
          'Shift & Time': item?.shift_type + ' & ' + item?.depo_out_time,
          'Sch Bus No': item?.vehicle_no,
          'SCH Driver Name code': item?.driver_name + ' & ' + item?.driver_code,
          'Act Shift On': item?.shift_on,
          'Act Bus No': item?.vehicle_no,
          'Act Driver Name & Code': item?.driver_name + ' & ' + item?.driver_code,
          'Act Depot out': item?.depo_out_time + ' & Odometer : ' + item?.odometer_depo_out + ' & SOC : ' + item?.soc_percentage_depo_out,
          'Last Activity': item?.last_handover_time,
          'Act Depot In': item?.depo_in_time ,
          'Guide ID': '' ,
          'Guide Name': '' ,
          'Mobile No': '' ,

        };
      }
    })

    this.excelService.excelService(this.excelData, 'Roaster Attendance')
  }
}
