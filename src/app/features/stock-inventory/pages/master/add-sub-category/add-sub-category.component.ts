import { Component, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  categoryData: any;
  id: string;
  subCategoryData: any;
  isloading: boolean = false;
  subform!: FormGroup
  selectedValue: any;
  button: string = 'Add'
  category: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage: string = 'Added';
  selectedsubData: any;

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.isloading = true;
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      setTimeout(() => {      
        this.getSubcategoryData();
      }, 500);
      this.button = 'Update';
      this.alertMessage = 'Updated'
    }
    this.setInitialValue()
    this.getCategoryList();
    setTimeout(() => {
      this.isloading = false;
    }, 500);
  }

  setInitialValue() {
    this.subform = this.fb.group({
      cat: ['', [Validators.required, Validators.pattern('')]],
      sub_cat: ['', [Validators.required, Validators.pattern('')]]
    })
  }

  getCategoryList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "Result": ""
    }
    this.stockService.categoryList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.categoryData = data.map((val: any) =>
        newData = {
          value: val?.catid,
          text: val?.catname
        }
      )
    })
  }

  getSubcategoryData() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    };
    this.stockService.subCategoryList(payload).subscribe((res: any) => {
      this.subCategoryData = res?.body?.data;
      this.subCategoryData?.forEach((val: any) => {
        if (val?.id == this.id) {
          this.selectedsubData = val;
          this.category = val?.catid
          let newSubCatValue = this.categoryData?.filter((ele: any) => ele?.value == val?.catid);
          newSubCatValue?.forEach((data: any) => {
            this.selectedValue = data
          });

          this.subform = this.fb.group({
            cat: ['', [Validators.required, Validators.pattern('')]],
            sub_cat: [val?.subcatname, [Validators.required, Validators.pattern('')]]
          })
          this.subform.controls['cat'].setValue(val?.catid);
        }
      })
    })
    this.isloading = false;

  }

  confirm(event: any) {
    this.category = event.id;    
  }

  cancel() {
    this.subform.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  submit(formValue:any) {
    let payload = {
      "MODE": 0,
      "id": 0,
      "catid": this.category,
      "subcatid": "",
      "subcatname": formValue.sub_cat,
      "Status": 1,
      "Primary_Group": "Y",
      "BranchID": "",
      "CmpyID": localStorage.getItem('dept_id'),
      "Flag": 1,
      "RESULT": ""
    }
    if(this.id){
      payload['id'] = Number(this.id);
      payload['MODE'] = 1
      payload['catid'] = this.category
    }

    this.stockService.addSubCategory(payload).subscribe((res: any) => {
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
          this.router.navigateByUrl('/SupplyChain/SubCategoryMaster_List')
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

}
