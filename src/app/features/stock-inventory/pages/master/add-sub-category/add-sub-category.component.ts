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
  categoryId: string;
  showCategoryInput: boolean = false;

  constructor(
    private stockService: StockService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.isloading = true;
    this.id = this.route.snapshot.paramMap.get("id");
    this.categoryId = this.route.snapshot.paramMap.get("catId");
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
     this.subform.get('category_name')?.valueChanges.subscribe(val => {
    if (val && val.trim() !== '') {
      this.categoryNameError = false;
    }
  });
  }

  setInitialValue() {
    this.subform = this.fb.group({
      cat: ['', [Validators.required, Validators.pattern('')]],
      sub_cat: ['', [Validators.required, Validators.pattern('')]],
      category_name: ['']
    })
  }

  getCategoryList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "pk_category_id": 0
    }
    this.stockService.categoryList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.categoryData = data.map((val: any) =>
        newData = {
          value: val?.pk_category_id,
          text: val?.category_name
        }
      )
    })
  }

  getSubcategoryData() {
    this.isloading = true;
    let payload = {
      "fk_category_id": Number(this.categoryId),
      "pk_subcategory_id": Number(this.id)
    };
    this.stockService.subCategoryList(payload).subscribe((res: any) => {
      this.subCategoryData = res?.body?.data;
      this.subCategoryData?.forEach((val: any) => {
        if (val?.pk_subcategory_id == this.id) {
          this.selectedsubData = val;
          this.category = val?.catid
          let newSubCatValue = this.categoryData?.filter((ele: any) => ele?.value == val?.fk_category_id);
          newSubCatValue?.forEach((data: any) => {
            this.selectedValue = data
          });

          this.subform = this.fb.group({
            cat: ['', [Validators.required, Validators.pattern('')]],
            sub_cat: [val?.subcategory_name, [Validators.required, Validators.pattern('')]]
          })
          this.category = val?.fk_category_id
          // this.subform.controls['cat'].setValue(val?.fk_category_id);
        }
      })
    })
    this.isloading = false;

  }

  confirm(event: any) {
    this.category = event.id;
    this.subform.controls['cat'].setValue(event.id)

  }

  cancel() {
    this.subform.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  toggleButton(type: any) {
    if (type == 'category') {
      this.subform.controls['cat'].setValue(null)
      this.subform.controls['category_name'].setValue(null)
      this.showCategoryInput = !this.showCategoryInput
    }
  }
  categoryNameError = false;

  addCategory() {
    this.categoryNameError = false;

    if (!this.subform.value.category_name || this.subform.value.category_name.trim() === '') {
      this.categoryNameError = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return; // stop further execution
    }
    let payload = {
      "category_name": this.subform.value.category_name,
      "Logged_by": Number(localStorage.getItem('user_Id'))
    }
    this.stockService.addCategory(payload).subscribe((res: any) => {
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
        this.getCategoryList()
        this.showCategoryInput = false
        this.subform.controls['category_name'].setValue(null)
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

  submit(formValue: any) {
    if (this.subform.invalid) {
      this.subform.markAllAsTouched();
      return;
    };
    let service: any
    let payload = {

      "fk_category_id": Number(this.category),
      "subcategory_name": formValue.sub_cat,
      "Logged_by": Number(localStorage.getItem('user_Id'))
    }
    if (this.id) {
      payload['pk_subcategory_id'] = Number(this.id);
      service = this.stockService.updateSubCategory(payload)
    } else {
      service = this.stockService.addSubCategory(payload)
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
