import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {

  brandForm!: FormGroup;
  id: any
  brandData: any;
  button: string = 'Add';
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage: any = 'Added'
  selectedBrand: any;

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.setInitialValue();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getBrandData();
      this.button = 'Update';
      this.alertMessage = 'Updated'
    }
  }

  setInitialValue() {
    this.brandForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  getBrandData() {
    let payload = {
      "pk_brand_id": Number(this.id)
    }
    this.stockService.brandList(payload).subscribe((res: any) => {
      this.brandData = res?.body?.data;
      this.brandData.forEach((val: any) => {
        if (val?.pk_brand_id == this.id) {
          this.selectedBrand = val
          this.brandForm = this.fb.group({
            name: [val?.brand_name, [Validators.required, Validators.pattern('')]],
          })
        }
      })
    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  submit(formValue: any) {
    let service:any
    let payload = {
      "brand_name": formValue.name,
      "Logged_by": Number(localStorage.getItem('user_Id'))
    }

    if (this.id) {
      payload['pk_brand_id'] = Number(this.id)
      service = this.stockService.updateBrand(payload)
    }else{
      service = this.stockService.addBrand(payload)
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
          this.router.navigateByUrl('/SupplyChain/Brand_Master_List')
        }, 3000);
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
    this.brandForm.reset()
  }
}
