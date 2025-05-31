import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaintenanceService } from 'src/app/features/maintenance/services/maintenance.service';

@Component({
  selector: 'app-terminal-repair-details',
  templateUrl: './terminal-repair-details.component.html',
  styleUrls: ['./terminal-repair-details.component.scss']
})
export class TerminalRepairDetailsComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  terminalRepairList: any;
  terminalForm!: FormGroup
  selectedIndex: any;
  isSelectedAll: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;

  constructor(
    private maintenanceService: MaintenanceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setInitialtable();
    this.setInitialvalue()
    this.getTerminalRepairList()
  }

  setInitialvalue() {
    this.terminalForm = this.fb.group({
      zone: ['46', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
    })
  }

  setInitialtable() {
    this.tableData = [
      { key: '', val: 'Select' },
      { key: 'keyValue', val: 'Zone Name' },
      { key: 'keyValue', val: 'Battery Number' },
      { key: 'keyValue', val: 'Battery Make' },
    ]
  }

  getTerminalRepairList() {
    this.isloading = true;
    let payload = {
      "DEPOT_ID": 46,
      "PageNo": 1,
      "PageSize": 100
    }
    this.maintenanceService.batTeriminallist(payload).subscribe((res: any) => {
      this.terminalRepairList = res?.body?.data;
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

  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    let payload = {
      "DEPOT_ID": 46,
      "BAT_ID": this.isSelectedAll?.BAT_ID,
      "GRANT_BY":  this.isSelectedAll?.GRANT_BY,
      "TERMINAL_DATE": formatDate(formvalue.date, 'dd/MM/yyyy', 'en-US'),
      "RESULT": ""
    }
    this.maintenanceService.addBatteryTeriminal(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.terminalForm.controls['zone'].setValue('46');
        this.selectedIndex = undefined
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
