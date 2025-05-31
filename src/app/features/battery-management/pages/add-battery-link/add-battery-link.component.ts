import { formatDate } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';
@Component({
  selector: 'app-add-battery-link',
  templateUrl: './add-battery-link.component.html',
  styleUrls: ['./add-battery-link.component.scss']
})
export class AddBatteryLinkComponent {

  addBatteryLinkModalRef!: BsModalRef
  myDate = new Date();
  vehicleData: any;
  selectedValue: any
  BatteryList: any;
  selectedBatteryValue: any;
  batteryLinkform!: FormGroup
  batteryLinkData: any;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData:any
  constructor(
    private route: Router,
    private sharedService: SharedService,
    private maintenanceService: MaintenanceService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.setInitialValue();
    this.setInitialTable()
    this.getVehicleZoneData();
    this.getBatteryNoList();
    this.submit('')
  }

  setInitialValue() {
    this.batteryLinkform = this.fb.group({
      vehicleNo: ['', [Validators.required, Validators.pattern('')]],
      BatteryNo: ['', [Validators.required, Validators.pattern('')]],
      formDate: [new Date(), [Validators.required, Validators.pattern('')]],
      Todate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialTable() {
    this.tableData = [
      {key: 'keyValue', val:'Vehicle No'},
      {key: 'keyValue', val:'Battery No'},
      {key: 'keyValue', val:'Km Installation'},
      {key: 'keyValue', val:'Installation Date'},
      {key: 'keyValue', val:'Battery Location'},
      {key: 'keyValue', val:'Action'},
    ]
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  getBatteryNoList() {
    let payload = {
      "depoT_ID": parseInt(localStorage.getItem('dept_id'))
    }
    this.maintenanceService.batteryNoList(payload).subscribe((res: any) => {
      this.BatteryList = res?.body?.data

    })
  }

  confirm(event: any) {
    if (event.selectType == 'Vehicle') {
      this.batteryLinkform.controls['vehicleNo'].setValue(event.id)
    } else if (event.selectType == 'Battery') {
      this.batteryLinkform.controls['BatteryNo'].setValue(event.id)
    }
  }

  onAddBatteryLink(path: any,data:any) {
    let url = path.replace('id',data?.blinK_ID)
    this.route.navigateByUrl(url, { state: data   })
  }

  submit(formvalue: any) {
    let payload = {
      "depoT_ID": parseInt(localStorage.getItem('dept_id')),
      "buS_ID": formvalue.vehicleNo ? parseInt(formvalue.vehicleNo) : 0,
      "batterY_ID": 0,
      "froM_DATE":formvalue.formDate ? formatDate(formvalue.formDate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "tO_DATE": formvalue.Todate? formatDate(formvalue.Todate, 'yyyy-MM-dd', 'en-US') : formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "pageNo": 1,
      "pageSize": 100,
      "dateStatus": 0,
      "blinK_ID": 0
    }
    this.maintenanceService.batteryLinkList(payload).subscribe((res: any) => {
      this.batteryLinkData = res?.body?.data
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
