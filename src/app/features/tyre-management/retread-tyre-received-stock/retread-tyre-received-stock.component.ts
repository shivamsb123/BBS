import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TyreService } from '../services/tyre.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-retread-tyre-received-stock',
  templateUrl: './retread-tyre-received-stock.component.html',
  styleUrls: ['./retread-tyre-received-stock.component.scss']
})
export class RetreadTyreReceivedStockComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  stockForm!: FormGroup;
  receivedList: any;
  isSelectedAll: any;
  checkedList: any;
  selectedIndex: any;
  chagneNsdovalue: any;
  chagneNsdMvalue: any;
  chagneNsdIvalue: any;
  chagneNsdCostvalue: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;

  constructor(
    private fb: FormBuilder,
    private tyreService: TyreService
  ) { }

  ngOnInit() {
    this.setInitialValue()
    this.initialTable();
    this.getReceivedList()
  }

  setInitialValue() {
    this.stockForm = this.fb.group({
      zone: ['46', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      status: ['Yes', [Validators.required, Validators.pattern('')]],
    })
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Select' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'Tyre Type' },
      { key: 'keyValue', val: 'Current Nsd O' },
      { key: 'keyValue', val: 'Current Nsd M' },
      { key: 'keyValue', val: 'Current Nsd I' },
      { key: 'keyValue', val: 'Retread Cost' }
    ]
  }

  isAllSelected(event: any, index: any, data: any) {
    this.selectedIndex = event.target.checked ? index : undefined;
    if (this.selectedIndex !== undefined) {
      this.isSelectedAll = data;
    } else {
      this.isSelectedAll = {};
    }
  }


  getReceivedList() {
    this.isloading = true;
    let payload = {
      "DEPOT_ID": 46,
      "PageNo": 1,
      "PageSize": 100
    }
    this.tyreService.recievedTyreList(payload).subscribe((res: any) => {
      this.receivedList = res?.body?.data;
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

  changeNSDOValue(event: any) {
    this.chagneNsdovalue = event.target.value;
  }

  changeNSDMValue(event: any) {
    this.chagneNsdMvalue = event.target.value;
  }

  changeNSDIValue(event: any) {
    this.chagneNsdIvalue = event.target.value;
  }

  changeNSDSaleValue(event: any) {
    this.chagneNsdCostvalue = event.target.value;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {    
    let payload = {
      "MODE": 0,
      "RET_ID": 0,
      "TYRE_ID": this.isSelectedAll?.tyrE_ID,
      "ISSUED_DATE": formatDate(formvalue.date, 'yyyy/MM/dd', 'en-US'),
      "CREATED_BY": 1,
      "Status_Remark": formvalue.status,
      "Tyre_Nsd": 0,
      "Rejected_Status": "",
      "Damage_Status": "",
      "Cost_Of_Sale": this.chagneNsdCostvalue ? this.chagneNsdCostvalue : this.isSelectedAll?.cosT_OF_SALE,
      "DEPOT_ID": this.isSelectedAll?.depot ? parseInt(this.isSelectedAll?.depot) : 0,
      "Tyre_Nsd_O_": this.chagneNsdovalue ? this.chagneNsdovalue : this.isSelectedAll?.reT_NSD_O,
      "Tyre_Nsd_M": this.chagneNsdMvalue ? this.chagneNsdMvalue : this.isSelectedAll?.reT_NSD_M,
      "Tyre_Nsd_I": this.chagneNsdIvalue ? this.chagneNsdIvalue : this.isSelectedAll?.tyrE_ID,
      "RESULT": ""
    }
    this.tyreService.addStoreReceived(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.stockForm.reset();
        this.stockForm.controls['zone'].setValue('46');
        this.getReceivedList()
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
}
