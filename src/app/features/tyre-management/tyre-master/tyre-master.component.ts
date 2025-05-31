import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TyreService } from '../services/tyre.service';
import { RegistrationService } from '../../registration/services/registration.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../http-services/shared.service';
@Component({
  selector: 'app-tyre-master',
  templateUrl: './tyre-master.component.html',
  styleUrls: ['./tyre-master.component.scss']
})
export class TyreMasterComponent {
  tyreDetailsModalRef!: BsModalRef;
  type: string = 'TYRE_MASTER'
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  tyreList: any;
  tableData: any;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tyreForm !: FormGroup
  zoneList: any;
  
  constructor(
    private modalService: BsModalService,
    private tyreService: TyreService, 
    private fb: FormBuilder, 
    private registrationService: RegistrationService,
    private route: Router,
    private sharedService: SharedService
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    this.setInitialTable()
    this.getTyreMasterList()
  }

  setInitialTable() {
    this.tableData = [
      // { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Generated No' },
      { key: 'keyValue', val: 'Tyre Type' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'Tyre </br> Purchase </br> Date' },
      { key: 'keyValue', val: 'Invoice No' },
      { key: 'keyValue', val: 'Warranty </br> Status' },
      { key: 'keyValue', val: 'Stock Tyre' },
      { key: 'keyValue', val: 'Cost</br>Of</br>Tyre' },
      { key: 'keyValue', val: 'Tyre </br> NSD' },
      { key: 'keyValue', val: 'Tyre</br>NSD</br>Outer' },
      { key: 'keyValue', val: 'Tyre</br>NSD</br>Middle' },
      { key: 'keyValue', val: 'Tyre</br>NSD</br>Inner' },
      { key: 'keyValue', val: 'Tyre</br>NSD</br>MM' },
      { key: 'keyValue', val: 'Tag</br>No' },
      { key: 'keyValue', val: 'Tyre Linking Status' },
      {key: '', val: 'Action'},

    ]
  }


  getTyreMasterList() {
    this.isloading = true;
    let payload = {
      "PageNo": 1,
      "PageSize": 500,
      "Tyre_id":0,
      USER_ID: parseInt(localStorage.getItem('user_Id') || ''),
      Depot_ID: parseInt(localStorage.getItem('dept_id') || ''),
    }
    this.tyreService.tyreMasterList(payload).subscribe((res: any) => {
      this.tyreList = res?.body?.data;
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

  onClickTyreData(template: TemplateRef<any>) {
    this.tyreDetailsModalRef = this.modalService.show(template)
  }

  redirect() {
    this.route.navigateByUrl('/Maintenance/Add_Tyre_Master')
  }

  formatedatevalue(date:any) {
   return this.sharedService.formatDateValue(date)
  }

  updateTyreMaster(vehicle:any) {
    let url = '/Maintenance/Add_Tyre_Master/id'
   let newUrl = url.replace('id', vehicle?.tyrE_ID)
    this.route.navigateByUrl(newUrl, {state: {
      tyreData: vehicle
    }})
  }
}
