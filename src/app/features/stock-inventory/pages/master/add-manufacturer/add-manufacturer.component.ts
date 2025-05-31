import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add-manufacturer.component.html',
  styleUrls: ['./add-manufacturer.component.scss']
})
export class AddManufacturerComponent implements OnInit {
  manufactureForm!: FormGroup;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  id: string;
  manufactureList: any;
  menuId: any;
  menuFac: any;
  button: string = 'Add';
  alertMessage: string = 'Added'

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private activeUrl: ActivatedRoute,
    private route: Router
  ) { }
  ngOnInit(): void {
    this.id = this.activeUrl.snapshot.paramMap.get("id");
    if (this.id) {
      this.getMenufactureList();
      this.button = 'Update';
      this.alertMessage = 'Updated'
    }
    this.setInitialValue()
  }


  setInitialValue() {
    this.manufactureForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  getMenufactureList() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    }
    this.stockService.manufactureNameList(payload).subscribe((res: any) => {
      this.manufactureList = res?.body.data;
      this.manufactureList.forEach((ele: any) => {
        this.menuFac = ele
        this.manufactureForm = this.fb.group({
          name: [ele?.manuName, [Validators.required, Validators.pattern('')]]
        })
      })
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formValue: any) {
    let payload = {
      "ManuID": "",
      "ManuName": formValue?.name,
      "BraID": "ADS-B1",
      "Status": 1,
      "Mode": "INSERT"
    }

    if (this.id) {
      payload['ID'] = Number(this.id)
      payload['Mode'] = "UPDATE"
      payload['ManuID'] = this.menuFac?.manuID
    }    
    this.stockService.addManufacture(payload).subscribe((res: any) => {
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
        this.button = 'Add';
        this.manufactureForm.reset();
        setTimeout(() => {          
          this.route.navigateByUrl('/SupplyChain/Master_Manufacturer_List')
        }, 2000);
      } else {
        this.alertData = {
          message: `Data not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }

    })
  }

  cancel() {
    this.manufactureForm.reset()
  }

}
