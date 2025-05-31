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
      code: ['', [Validators.required, Validators.pattern('')]],
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
      "pk_unit_id": Number(this.id)
    }

    this.stockeService.unitList(payload).subscribe((res: any) => {
      this.unitData = res?.body?.data
      this.unitData.forEach((val: any) => {
        this.unitForm = this.fb.group({
          code: [val?.unit_code, [Validators.required, Validators.pattern('')]],
          name: [val?.unit_name, [Validators.required, Validators.pattern('')]]
        })
      })
      this.isloading = false
    })
  }


  submit(formValue: any) {
    let service: any
    let payload: any

    if (this.id) {
      payload = {
        "pk_unit_id": Number(this.id),
        "unit_code": formValue?.code,
        "unit_name": formValue?.name,
        "updated_by": Number(localStorage.getItem('user_Id') || '')
      }
      service = this.stockeService.updateUnit(payload)
    } else {
      payload = {
        "unit_code": formValue?.code,
        "unit_name": formValue?.name,
        "created_by": Number(localStorage.getItem('user_Id') || '')
      }
      service = this.stockeService.addUnit(payload)
    }

    service.subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/ProductMaster_Unit_List')
        }, 3000)
      } else {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
  }

  cancel() {
    this.unitForm.reset()
  }
}
