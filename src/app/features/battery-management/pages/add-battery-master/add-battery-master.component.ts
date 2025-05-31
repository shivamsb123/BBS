import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScrollService } from 'src/app/features/http-services/scroll.service';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';

@Component({
  selector: 'app-add-battery-master',
  templateUrl: './add-battery-master.component.html',
  styleUrls: ['./add-battery-master.component.scss']
})
export class AddBatteryMasterComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  batteryData: any;
  addbatteryform!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false
  selectedBattery: any;
  button: string = 'Add';
  alertMessage: string = 'Added'

  constructor(
    private MaintenanceService: MaintenanceService,
    private fb: FormBuilder,
    private scrollService: ScrollService
  ) { }

  ngOnInit(): void {
    this.setInitialValue()
    this.setInitialtable();
    this.getBatteryList()
  }

  setInitialValue() {
    this.addbatteryform = this.fb.group({
      batteryMake: ['1', [Validators.required, Validators.pattern('')]],
      batteryNo: ['', [Validators.required, Validators.pattern('')]],
      batteryCat: ['N', [Validators.required, Validators.pattern('')]],
      batteryInvoiceDate: [new Date(), [Validators.required, Validators.pattern('')]],
      batteryReceivedDate: [new Date(), [Validators.required, Validators.pattern('')]],
      batteryWarrantyPeriod: ['Twelve Month', [Validators.required, Validators.pattern('')]],
      warrentyExpire: [new Date(), [Validators.required, Validators.pattern('')]],
      invoiceNo: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Generated No' },
      { key: 'keyValue', val: 'Battery No' },
      { key: 'keyValue', val: 'Battery Make' },
      { key: 'keyValue', val: 'Invoice Date' },
      { key: 'keyValue', val: 'Invoice No' },
      { key: 'keyValue', val: 'Received Date' },
      { key: 'keyValue', val: 'Warranty Date' },
      { key: 'keyValue', val: 'Warranty Period' },
      { key: 'keyValue', val: 'Issue Battery' },
      { key: 'keyValue', val: 'Battery Type' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  getBatteryList() {
    let payload = {
      "depoT_ID": parseInt(localStorage.getItem('dept_id')),
      "batid": 0,
      "pageno": 1,
      "pagesize": 100
    }
    this.MaintenanceService.batteryMasterList(payload).subscribe((res: any) => {
      this.batteryData = res?.body?.data

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

  update(data:any) {
    console.log("chek data", data);
    this.button = 'Update';
    this.alertMessage = 'Updated'
    this.selectedBattery = data;
    this.formatDateMethod(this.selectedBattery?.baT_INVOICE_DATE);
    this.formatDateMethod(this.selectedBattery?.warrentY_DATE)
    this.formatDateMethod(this.selectedBattery?.baT_RECEIVED_DATE)
    this.addbatteryform = this.fb.group({
      batteryMake: [this.selectedBattery?.baT_MAKE_ID.toString(), [Validators.required, Validators.pattern('')]],
      batteryNo: [this.selectedBattery?.baT_NO, [Validators.required, Validators.pattern('')]],
      batteryCat: ['N', [Validators.required, Validators.pattern('')]],
      batteryInvoiceDate: [new Date(this.selectedBattery?.baT_INVOICE_DATE), [Validators.required, Validators.pattern('')]],
      batteryReceivedDate: [new Date(this.selectedBattery?.baT_RECEIVED_DATE), [Validators.required, Validators.pattern('')]],
      batteryWarrantyPeriod: [this.selectedBattery?.waR_PRD, [Validators.required, Validators.pattern('')]],
      warrentyExpire: [new Date(this.selectedBattery?.warrentY_DATE), [Validators.required, Validators.pattern('')]],
      invoiceNo: [this.selectedBattery?.invoicE_NO, [Validators.required, Validators.pattern('')]],
    }) 
    this.scrollService.scrollToElementById('content');
  }

  formatDateMethod(date:any) {
    date.split('/').reverse().join('-');
    return date;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    let payload = {
      "MODE": 0,
      "BATTERY_ID": 0,
      "DEPOT_ID": parseInt(localStorage.getItem('dept_id')),
      "STOCK_IN": "",
      "BATTERY_NO": formvalue.batteryNo,
      "BATTERY_MAKE": formvalue.batteryMake,
      "BATTERY_INVOICE_DATE": formatDate(formvalue.batteryInvoiceDate, 'dd/MM/yyyy', 'en-US'),
      "STATUS": 1,
      "BATTERY_INVOICE_NO": formvalue.invoiceNo,
      "BATTERY_RECEIVED_DATE": formatDate(formvalue.batteryReceivedDate, 'dd/MM/yyyy', 'en-US'),
      "CREATED_BY": 1,
      "WARRENTY": "",
      "WARRENTY_EXP_DATE": formatDate(formvalue.warrentyExpire, 'dd/MM/yyyy', 'en-US'),
      "WAR_PRD": formvalue?.batteryWarrantyPeriod,
      "Result": ""
    }
    if(this.selectedBattery?.baT_ID){
      payload['MODE'] = 1,
      payload['BATTERY_ID'] = this.selectedBattery?.baT_ID
    }
    
    this.MaintenanceService.addBatteryMaster(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.addbatteryform.reset();
        this.getBatteryList();
        this.button = 'Add';
        this.selectedBattery = null;
        this.alertMessage = 'Added'
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  cancel() {
    this.addbatteryform.reset();
    this.selectedBattery = null;
    this.alertMessage = 'Added'
  }
}
