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
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    }
    this.stockService.brandList(payload).subscribe((res: any) => {
      this.brandData = res?.body?.data;
      this.brandData.forEach((val: any) => {
        if(val?.id == this.id) {
          this.selectedBrand = val
          this.brandForm = this.fb.group({
            name: [val?.description, [Validators.required, Validators.pattern('')]],
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
    let payload = {
      "Brand_Name": formValue.name,
      "Modify_Date": "",
      "Created_date": "",
      "NewEmpID": localStorage.getItem('user_Id'),
      "PreFix": "",
      "P_ID": 0,
      "Mode": "INSERT"
    }

    if(this.id) {
      payload['Mode'] = "UPDATE"
      let formatDateValue = this.selectedBrand?.date_Created.slice(0, 10).split("-").reverse().join('-');
      let formatTimeValue = this.selectedBrand?.date_Created.slice(11, 20);
      payload['Created_date'] = `${formatDateValue}  ${formatTimeValue}`;
      payload['Modify_Date'] = formatDate(new Date() , 'yyyy-MM-dd hh:mm:ss', 'en-US')
    }
    this.stockService.addBrand(payload).subscribe((res:any) => {
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
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/Brand_Master_List')
        }, 3000);
      } else {
        this.alertData = {
          message: `Data no ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }
cancel(){
  this.brandForm.reset()
}
}
