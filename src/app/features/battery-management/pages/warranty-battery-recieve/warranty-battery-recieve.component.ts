import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';

@Component({
  selector: 'app-warranty-battery-recieve',
  templateUrl: './warranty-battery-recieve.component.html',
  styleUrls: ['./warranty-battery-recieve.component.scss']
})
export class WarrantyBatteryRecieveComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  warrantyReceivedForm:any
  formData!: FormData;
  warrentyReceivedList: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false
  constructor (
    private fb:FormBuilder,
    private maintenanceService : MaintenanceService
    ){}

  ngOnInit(): void {
    this.setInitialtable();
    this.setInitialvalue()
    this.getWarrentyReceivedList()
  }

  setInitialvalue() {
    this.warrantyReceivedForm = this.fb.group({
      status: ['1', [Validators.required, Validators.pattern('')]],
      batteryNo: ['', [Validators.required, Validators.pattern('')]],
      reason: ['', [Validators.required, Validators.pattern('')]],
      img: ['', [Validators.required, Validators.pattern('')]],
      newBatteryNo: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
      invoiceNo: ['', [Validators.required, Validators.pattern('')]],
      expireDate: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }
  
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'With Claim Status' },
      { key: 'keyValue', val: 'Warranty Number' },
      { key: 'keyValue', val: 'Old Battery No.' },
      { key: 'keyValue', val: 'New Battery No.' },
      { key: 'keyValue', val: 'Invoice No' },
      { key: 'keyValue', val: 'Invoice Date' },
      { key: 'keyValue', val: 'Claim Date' },
    ]
  }

  getWarrentyReceivedList() {
    this.isloading = true;
    let payload = {
      "Depot_ID":46,
      "PageNo":1,
     "PageSize":100

    }
    this.maintenanceService.warrentyClaimReceivedList(payload).subscribe((res:any) => {
      this.warrentyReceivedList = res?.body?.data;
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

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  changeDocument(event: any) {
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0].name);

  }

  submit(formvalue:any) {
    let payload = {
      "MODE":0,
      "DEPOT_ID":46,
        "ID":0,
        "BATTERY_ID":2,
        "INVOICE_DATE":formatDate(formvalue.date, 'dd/MM/yyyy', 'en-US'),
        "INVOICE_NO":formvalue.invoiceNo,
        "BATTERY_MAKE":"",
        "WARRENTY_EXP_DATE": formatDate(formvalue.expireDate, 'dd/MM/yyyy', 'en-US'),
        "DEFECT":"",
        "WITH_CLAIM_STATUS": formvalue.status,
        "REMARKS":formvalue.reason,
        "FILE_NAME":formvalue.img,
      "CREATED_BY":1,
      "RESULT":""
    }
    this.maintenanceService.warrentyReceivedAdd(payload).subscribe((res:any) => {
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
        this.getWarrentyReceivedList();
        // this.helthCheckupForm.reset();
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
