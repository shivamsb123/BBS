import { Component } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category-master',
  templateUrl: './add-category-master.component.html',
  styleUrls: ['./add-category-master.component.scss']
})
export class AddCategoryMasterComponent {
  categoryForm: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  categoryListById: any;
  button: string = 'Add';
  id: any;
  alertMessage: string = 'Added'

  constructor(
    private stockService: StockService,
     private fb: FormBuilder, 
     private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit() {
    this.setInitialValue()
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getCotegoryById();
      this.button = 'Update';
      this.alertMessage = 'Updated'
    }
  }

  setInitialValue() {
    this.categoryForm = this.fb.group({
      category_name: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  getCotegoryById() {
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)

    }
    console.log("payload", payload);

    this.stockService.categoryListById(payload).subscribe((res: any) => {
      this.categoryListById = res?.body?.data

      this.categoryListById.forEach((val: any) => {
        if (val.id == this.id) {
          this.categoryForm = this.fb.group({
            category_name: [val?.catname, [Validators.required, Validators.pattern('')]],
          })
        }
      })
    })

  }


  submit(formValue: any) {
    let payload = {
      "id": 0,
      "catid": "",
      "catname": formValue.category_name,
      "Status": 1,
      "MainCatID": "",
      "Primary_Group": "N",
      "BranchID": "ADS-B1",
      "CmpyID": localStorage.getItem('dept_id'),
      "Mode": "INSERT"
    }
    if (this.id) {
      payload['Mode'] = 'UPDATE'
      payload['id'] = parseInt(this.id)
    }
  
    this.stockService.addCategory(payload).subscribe((res: any) => {
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
          this.router.navigateByUrl('/SupplyChain/CategoryMaster_List')
        }, 2000);
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

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel(){
    this.categoryForm.reset()
  }
}
