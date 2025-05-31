import { Component } from '@angular/core';
import { TyreService } from '../services/tyre.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-retreadtyre-send-to-vendor',
  templateUrl: './retreadtyre-send-to-vendor.component.html',
  styleUrls: ['./retreadtyre-send-to-vendor.component.scss']
})
export class RetreadtyreSendToVendorComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any
  vendorData: any;
  retreadTyreForm!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  isSelectedAll: any;
  selectedIndex: any;
  vehicleData: any;
  selectedValue: any;
  retreadTyre: any;

  constructor(
    private tyreService: TyreService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.setInitialValue()
    this.setInitialTable();
    this.getVendorList();
    this.getVehicleZoneData()
  }

  setInitialValue() {
    this.retreadTyreForm = this.fb.group({
      zone: ['46', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      vendorName: ['', [Validators.required, Validators.pattern('')]],
      mobileNo: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialTable() {
    this.tableData = [
      { key: '', val: 'select' },
      { key: '', val: 'Vehicle No' },
      { key: '', val: 'Tyre No' },
      { key: '', val: 'Tyre Make' },
      { key: '', val: 'Tyre Type' },
      { key: '', val: 'NSD' },
      { key: '', val: 'Fitted Tyre Km' },
      { key: '', val: 'Retread Tyre Km' },
      { key: '', val: 'Status' },
    ]
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  changeSelection(event: any, index: any, data: any) {
    this.selectedIndex = event.target.checked ? index : undefined;
    if (this.selectedIndex !== undefined) {
      this.isSelectedAll = data;
    } else {
      this.isSelectedAll = {};
    }

  }

  confirm(event: any) {
    console.log("check evetn", event);

  }

  onChange(event: any) {
    this.retreadTyre = event.target.value;
  }

  submit(formvalue: any) {
    let payload = {
      "MODE": 0,
      "DEPOT_ID": parseInt(localStorage.getItem('dept_id')),
      "TYRE_ID": this.isSelectedAll.tyrE_ID,
      "VENDOR_NAME": formvalue.vendorName,
      "SEND_DATE": formatDate(formvalue.date, 'yyyy/MM/dd', 'en-US'),
      "VENDOR_CONTACT": formvalue.mobileNo,
      "CREATED_BY": 1,
      "KMS_WHICH_TYRE_REMOVED": this.retreadTyre ? parseInt(this.retreadTyre) : parseInt(this.isSelectedAll.retreaD_TYRE_KM),
      "LINKING_STATUS": this.isSelectedAll?.status,
      "RESULT": ""
    }
    this.tyreService.addRetreadVendor(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.retreadTyreForm.reset();
        this.getVendorList();
        this.retreadTyreForm.controls['zone'].setValue('46');
        this.selectedIndex = undefined
      } else {
        this.alertData = {
          message: 'Data Not Added',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  getVendorList() {
    this.isloading = true;
    let payload = {
      "DEPOT_ID": 46,
      "PageNo": 1,
      "PageSize": 100

    }
    this.tyreService.tyreVendorList(payload).subscribe((res: any) => {
      this.vendorData = res?.body?.data;
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
}
