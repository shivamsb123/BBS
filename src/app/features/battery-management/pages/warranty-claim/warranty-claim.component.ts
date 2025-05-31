import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';

@Component({
  selector: 'app-warranty-claim',
  templateUrl: './warranty-claim.component.html',
  styleUrls: ['./warranty-claim.component.scss']
})
export class WarrantyClaimComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  warrentyList: any;
  selectedIndex: any;
  isSelectedAll: any;
  warrentyForm!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false

  constructor(
    private maintenanceService: MaintenanceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setInitialtable();
    this.setInitialValue()
    this.getWarrentyList()
  }

  setInitialValue() {
    this.warrentyForm = this.fb.group({
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      vendorName: ['', [Validators.required, Validators.pattern('')]],
      vendorMobile: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialtable() {
    this.tableData = [
      { key: '', val: 'Select' },
      { key: 'keyValue', val: 'Zone Name' },
      { key: 'keyValue', val: 'Battery Number' },
      { key: 'keyValue', val: 'Battery Type' },
    ]
  }

  getWarrentyList() {
    this.isloading = true;
    let payload = {
      "DEPOT_ID": 46,
      "PageNo": 1,
      "PageSize": 100

    }
    this.maintenanceService.warrentyClaimist(payload).subscribe((res: any) => {
      this.warrentyList = res?.body?.data;
      this.isloading = false;
    })
  }


  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  };

  changeSelection(event: any, index: any, data: any) {
    this.selectedIndex = event.target.checked ? index : undefined;
    if (this.selectedIndex !== undefined) {
      this.isSelectedAll = data;
    } else {
      this.isSelectedAll = {};
    }
    console.log("check battery", this.isSelectedAll);

  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    let payload = {
      "MODE": 0,
      "DEPOT_ID": 46,
      "BAT_ID": this.isSelectedAll?.baT_ID,
      "VENDOR_NAME": "kapil",
      "VENDOR_CONTACT": "9876656678",
      "SEND_DATE": formatDate(formvalue.date , 'dd/MM/yyyy', 'en-US'),
      "STATUS": 0,
      "CREATED_BY": 1,
      "RESULT": ""
    }   

    this.maintenanceService.warrentySendToVendor(payload).subscribe((res:any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.warrentyForm.reset();
        this.getWarrentyList();
      } else {
        this.alertData = {
          message: `Data Not Added`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }


}
