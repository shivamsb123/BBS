import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {
  isloading: boolean = false;
  unitForm !: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  unitData: any;
  id: string;
  button: any = 'Add'
  unitIdData: any;
  alertMessage: string = 'Added'

  constructor(
    private fb: FormBuilder,
    private stockeService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    if (this.id) {
      this.getUnitList()
      this.button = 'Update'
    }
    this.setInitialValue()
  }

  setInitialValue() {
    this.unitForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('')]]
    })
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getUnitList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    }

    this.stockeService.unitList(payload).subscribe((res: any) => {
      this.unitData = res?.body?.data

      this.unitData.forEach((val: any) => {
        this.unitIdData = val?.unitID
        this.unitForm = this.fb.group({
          name: [val?.unitName, [Validators.required, Validators.pattern('')]]
        })
      })
      this.isloading = false
    })
  }


  submit(formValue: any) {
    let payload = {

      "UnitID": "",
      "UnitName": formValue.name,
      "BraID": "",
      "Status": 1,
      "Mode": "INSERT"
    }
    if (this.id) {
      payload['Mode'] = 'UPDATE'
      payload['UnitID'] = this.unitIdData
    }
   
    this.stockeService.addUnit(payload).subscribe((res: any) => {
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
        setTimeout(()=>{
          this.router.navigateByUrl('/SupplyChain/ProductMaster_Unit_List')
        },3000)
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
  }

  cancel(){
    this.unitForm.reset()
  }
}
