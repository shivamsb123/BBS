import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { ManagementService } from 'src/app/features/management/services/management.service';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.scss']
})
export class AddInformationComponent {
  @Output() mapdata = new EventEmitter<string>();
  title: string = 'Add Vehicle and Driver in roster';
  content: string = 'Would you like to continue?';
  primaryActionLabel: string = 'Add';
  secondaryActionLabel: string = 'Cancel';
  company: any;
  driverList: any;
  vehicleData: any;
  addDriver!: FormGroup;
  rosterData: any;
  toDate: any;
  fromDate: any;
  dept: any;
  type: any
  selectedValue: any;
  selectedDriverValue: any;

  constructor(
    private sharedService: SharedService,
    private _fb: FormBuilder,
    private managementService: ManagementService,
    private modalService: BsModalService,
  ) { }
  ngOnInit() {
    if (this.type == 'Roster') {
      this.primaryActionLabel = 'Mark Shift On'
    } else if (this.type == 'ShiftOff') {
      this.primaryActionLabel = 'Mark Shift Off'
    }
    this.getVehicleZoneData()
    this.getDriverDetail();
    this.setInitialValue()
  }

  setInitialValue() {
    this.addDriver = this._fb.group({
      driver: ['', [Validators.required, Validators.pattern('')]],
      vehicle: ['', [Validators.required, Validators.pattern('')]]
    })
  }


  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
      if (this.type == 'Roster' || this.type == 'ShiftOff' ) {
        let newPartDescription = this.vehicleData?.filter((ele: any) => ele?.text == this.rosterData?.vehicle_no);
        newPartDescription?.forEach((data: any) => {
          this.addDriver.controls['vehicle'].setValue(data?.value)
          this.selectedValue = data;
        });
      }

    })
  }


  getDriverDetail() {
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
      if (this.type == 'Roster' || this.type == 'ShiftOff') {
        let newDriver = this.driverList?.filter((ele: any) => ele?.value == this.rosterData?.driver_id);
        newDriver?.forEach((data: any) => {
          this.addDriver.controls['driver'].setValue(data?.value)
          this.selectedDriverValue = data;
        });
      }
    })
  }

  confirm(event: any) {
    if (event.selectType == 'driver') {
      this.addDriver.controls['driver'].setValue(event.id)
    } else {
      this.addDriver.controls['vehicle'].setValue(event.id)
    }
  }


  saveData(formValue: any) {
    let payload: any;
    let service: any;
    if (this.type == 'Roster') {
      payload = {
        "r_id": this.rosterData?.r_id ? parseInt(this.rosterData?.r_id || '') : 0,
        "driver_id": formValue.driver ? parseInt(formValue.driver || '') : 0,
        "conductor_id": this.rosterData?.conductor_id ? parseInt(this.rosterData?.conductor_id || '') : 0,
        "vehicle_id": formValue.vehicle ? parseInt(formValue.vehicle || '') : 0,
        "user_id": parseInt(localStorage.getItem('user_Id') || ''),
        "flag": 1,
        "mode": 1
      };
      service = this.managementService.markShiftOn(payload)
    } else if (this.type == 'ShiftOff') {
      payload = {
        "r_id": this.rosterData?.r_id ? parseInt(this.rosterData?.r_id || '') : 0,
        "driver_id": formValue.driver ? parseInt(formValue.driver || '') : 0,
        "conductor_id": this.rosterData?.conductor_id ? parseInt(this.rosterData?.conductor_id || '') : 0,
        "vehicle_id":  formValue.vehicle ? parseInt(formValue.vehicle || '') : 0,
        "user_id": parseInt(localStorage.getItem('user_Id') || ''),
        "is_first_shift": 1,
        "flag": 6
      }
      service = this.managementService.MarkShiftOff(payload)
    } else {
      payload = {
        "r_id": 0,
        "dept_id": parseInt(this.dept || ''),
        "from_date": formatDate(this.fromDate, 'yyyy-MM-dd', 'en-US'),
        "to_date": formatDate(this.toDate, 'yyyy-MM-dd', 'en-US'),
        "route_id": parseInt(this.rosterData?.route_id || ''),
        "shift_id": this.rosterData.shift_id,
        "driver_id": parseInt(formValue.driver || ''),
        "vehicle_id": parseInt(formValue.vehicle || ''),
        "user_id": parseInt(localStorage.getItem('user_Id') || '')
      }
      service = this.managementService.addRoster(payload)
    }
    service.subscribe((res: any) => {
      this.mapdata.emit(res);
      this.modalService.hide();
    })
  }

  cancel() {
    this.modalService.hide();
  }

}
