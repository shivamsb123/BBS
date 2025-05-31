import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../services/reports.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-edit-duty-report',
  templateUrl: './edit-duty-report.component.html',
  styleUrls: ['./edit-duty-report.component.scss']
})
export class EditDutyReportComponent {
  report: any;
  driverList: any;
  vehicleData: any;
  selectedDriverValue: any
  driverId: any;
  editDutyReportForm: any;
  selectedvehicleValue: any;
  isloading: boolean = false;
  tableData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  formattedTimeDate: any;
  constructor(
    private shardService: SharedService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private ReportsService: ReportsService,
  ) { }

  ngOnInit() {
    console.log("report",this.report);
    
    this.getDriverDetail()
    this.getVehicleZoneData()
    this.setInitialState()
    this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Route' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Duty No' },
    ]
  }

  setInitialState() {
    this.editDutyReportForm = this.fb.group({
      driver: [this.selectedDriverValue, [Validators.required, Validators.pattern('')]],
      vehicle: [this.selectedvehicleValue, [Validators.required, Validators.pattern('')]],
      shiftFrom: [this.formattedTime(this.report?.shiftfrom), [Validators.required, Validators.pattern('')]],
      odometerFrom: [this.report?.odometerfrom, [Validators.required, Validators.pattern('')]],
      socFrom: [this.report?.socoldfrom, [Validators.required, Validators.pattern('')]],
      shiftTo: [this.formattedTime(this.report?.shiftto), [Validators.required, Validators.pattern('')]],
      odometerTo: [this.report?.odometerto, [Validators.required, Validators.pattern('')]],
      socTo: [this.report?.socTo, [Validators.required, Validators.pattern('')]],
      handoverTime: [this.formattedTime(this.report?.handovertime), [Validators.required, Validators.pattern('')]],
      reason: [this.report?.reason, [Validators.required, Validators.pattern('')]],
      remarks: [this.report?.remark, [Validators.required, Validators.pattern('')]],
    })
  }

  formattedTime(time: any) {
    
    let formatTime = time.slice(11, 20);
    let formatDate = time.slice(0, 10).split('/').reverse().join('-');
    this.formattedTimeDate = `${formatDate} ${formatTime}`;
    // console.log("check this---",this.formattedTimeDate );
    return new Date(this.formattedTimeDate);
  }

  getDriverDetail() {
    this.shardService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
      let driverValue = this.driverList?.filter((ele: any) => ele?.value == this.report?.driveR_ID);
      driverValue.forEach((data: any) => {
        this.selectedDriverValue = data
        this.editDutyReportForm.controls['driver'].setValue(data.value)
      });
    })

  }

  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data
      let vehicleValue = this.vehicleData?.filter((ele: any) => ele?.text == this.report?.assetno);
      vehicleValue.forEach((data: any) => {
        this.selectedvehicleValue = data
        this.editDutyReportForm.controls['vehicle'].setValue(data.value)
      });
    })
  }

  confirm(event: any) {
    if (event.selectType == 'driver') {
      this.driverId = event.id
      this.editDutyReportForm.controls['driver'].setValue(event.id)
    } else if (event.selectType == 'Vehicle') {
      this.editDutyReportForm.controls['vehicle'].setValue(event.id)
    }
  }

  update(formValue: any) {    
    let payload = {
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "HND_ID": 0,
      "REASON_ID": 0,
      "REMARK": formValue?.remarks,
      "SHIFT_FROM": formValue.shiftFrom ? formatDate(formValue.shiftFrom, 'yyyy-MM-ddThh:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "SHIFT_TO":  formValue.shiftTo ? formatDate(formValue.shiftTo, 'yyyy-MM-ddThh:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "HANDOVER_TIME": formValue.handoverTime ? formatDate(formValue.handoverTime, 'yyyy-MM-ddThh:mm:ss', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "VEHICLE_ID_OLD": formValue?.vehicle ?  parseInt(formValue?.vehicle) : 0,
      "DRIVER_ID_OLD": formValue?.driver ? parseInt(formValue?.driver) : 0 ,
      "ODOMETER_FROM": parseInt(formValue?.odometerFrom),
      "ODOMETER_TO": parseInt(formValue?.odometerTo),
      "SOC_OLD_FROM": parseInt(formValue?.socFrom),
      "SOC_OLD": parseInt(formValue?.socTo)
    }

    this.ReportsService.updateDutyReport(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.modalService.hide();
        }, 3000)
      } else {
        this.alertData = {
          message: 'Duty Report Not Update',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
      }
  })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel() {
    this.modalService.hide();
  }

}
