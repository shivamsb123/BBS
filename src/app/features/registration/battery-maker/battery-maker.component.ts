import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-battery-maker',
  templateUrl: './battery-maker.component.html',
  styleUrls: ['./battery-maker.component.scss']
})
export class BatteryMakerComponent implements OnInit {

  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  batteryMakerList: any;
  tableData: any;
  isloading = false
  addBatteryMaker!: FormGroup;
  button = 'Save';
  mode = 0;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  id = 0;

  constructor(
    private ragistrationService: RegistrationService,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.getBattermakerList();
    this.setInitialTbale();
    this.setIntialValue()
  }

  setIntialValue() {
    this.addBatteryMaker = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      status: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  setInitialTbale() {
    this.tableData = [
      { key: '', value: 'Company Name' },
      { key: '', value: 'Status' },
      { key: '', value: 'Action' }
    ]
  }

  getBattermakerList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "SNO": this.id 
    }
    this.ragistrationService.batteryMaker(payload).subscribe((res: any) => {      
      this.batteryMakerList = res?.body?.data;      
      this.isloading = false;

      if(this.id) {
        this.batteryMakerList.forEach((val:any) => {
          let status = val?.status == 'Active' ? 1 : 2
          this.addBatteryMaker = this.fb.group({
            company: [val?.baT_COMPANY_NAME, [Validators.required, Validators.pattern('')]],
            status: [status, [Validators.required, Validators.pattern('')]]
          })
        })
      }
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  update(id:any) {
    this.button = "Update";
    this.mode = 1;
    this.id = id;
    this.getBattermakerList()
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formvalue: any) {
    let payload: any
    let service: any
    if (this.mode == 1) {
      payload = {
        "Bat_Name": formvalue.company,
        "Mode": this.mode,
        "Id":this.id,
        "CREATED_BY": 1,
        "RESULT": "",
        "STATUS": parseInt(formvalue.status || '')
      }
      service = this.ragistrationService.UpdateBatterymaker(payload)
    } else {
      payload = {
        "Bat_Name": formvalue.company,
        "Mode": this.mode,
        "CREATED_BY": 1,
        "RESULT": "",
        "STATUS": parseInt(formvalue.status || '')
      }

      service = this.ragistrationService.Addbatterymaker(payload)
    }

    service.subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getBattermakerList();
        this.addBatteryMaker.reset();
        this.button = 'Save'
      } else {
          this.alertData = {
            message: res?.body?.alert,
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }

    })

  }

  cancel() {
    this.addBatteryMaker.reset();
  }



}
