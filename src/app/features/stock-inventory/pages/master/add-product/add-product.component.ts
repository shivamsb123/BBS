import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddUnitPopupComponent } from '../master-popup-pages/add-unit-popup/add-unit-popup.component';
import { AddHsnPopupComponent } from '../master-popup-pages/add-hsn-popup/add-hsn-popup.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  unitData: any;
  categoryData: any;
  billingdata: any;
  billingCategory: any;
  hsnData: any;
  subCateData: any;
  brandData: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  productList: any;
  id: string;
  selectedValue: any;
  selectedSubCatValue: any;
  selectedbaseValue: any;
  selectedBillingValue: any;
  selectedHSNValue: any;
  selectedBrandValue: any;
  selectedBillingCategory: any;
  button: string = 'Add';
  alertMessage = 'Added';
  catename: any;
  isloading: boolean = false;
  formData!: FormData;
  categoryId: any;
  itemLocationList: any;
  showCategoryInput: boolean = false;
  showSubCategoryInput: boolean = false;
  showManufactureInput: boolean = false
  onSelectSubCategory: any
  bsModalRef!: BsModalRef
  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private activeUrl: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
  ) { }
  ngOnInit(): void {
    this.isloading = true;
    this.id = this.activeUrl.snapshot.paramMap.get("id");
    if (this.id) {
      setTimeout(() => {
        this.getProductList();
      }, 500);
      this.button = 'Update';
      this.alertMessage = 'Updated';
    }
    this.setInitialValue();
    this.getUnit();
    this.getCategoryList();
    this.getBillingFor();
    this.getBillingCategoryList();
    this.getHSNList();
    this.getBrandData();
    this.getItemLocation()
    setTimeout(() => {
      this.isloading = false
    }, 500);
  }

  setInitialValue() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Sub_Category: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      billingFor: ['', [Validators.required]],
      HSN_Code: ['', [Validators.required]],
      itemFor: ['', [Validators.required]],
      brand_name: ['', [Validators.required]],
      billingCategory: ['', [Validators.required]],
      itemValue: [0, [Validators.required]],
      taxableValue: [0, [Validators.required]],
      taxRate: [0.00, [Validators.required]],
      itemNameAlias: ['', [Validators.required]],
      minAlertValue: [0, [Validators.required]],
      minOrderValue: [0, [Validators.required]],
      Description: ['', [Validators.required]],
      category_name: [''],
      Sub_category_name: [''],
      manufacture_name: [''],
    });
  }

  getItemLocation() {
    this.stockService.itemLocationList().subscribe((res: any) => {
      this.itemLocationList = res?.body?.data
    })
  }

  getProductList() {
    this.isloading = true;
    const payload = {
      PageNumber: 1,
      PageSize: 25,
      SearchTerm: ''
    };

    this.stockService.itemList(payload).subscribe((res: any) => {
      this.productList = res?.body?.data;

      this.productList.forEach((val: any) => {
        if (val?.pk_item_id == this.id) {
          this.selectedValue = this.categoryData?.find((ele: any) => ele?.value === val?.fk_category_id);
          this.productForm.controls['Category'].setValue(val?.fk_category_id);

          this.getSubcategoryData(val?.fk_subcategory_id);

          this.selectedbaseValue = this.unitData?.find((ele: any) => ele?.value == val?.fk_unit_id);
          this.selectedHSNValue = this.hsnData?.find((ele: any) => ele?.value == val?.fk_hsn_id);
          this.selectedBrandValue = this.brandData?.find((ele: any) => ele?.value == val?.fk_brand_id);
          this.selectedBillingCategory = this.billingCategory?.find((ele: any) => ele?.value == val?.fk_item_category_id);
          this.selectedBillingValue = this.billingdata?.find((ele: any) => ele?.value == val?.fk_item_category_id);

          this.productForm = this.fb.group({
            name: [val?.item_name, [Validators.required]],
            Description: [val?.item_description, [Validators.required]],
            Category: [this.selectedValue.value, [Validators.required]],
            Sub_Category: [null, [Validators.required]],  // Temporarily null
            unit: [this.selectedbaseValue.value, [Validators.required]],
            HSN_Code: [this.selectedHSNValue.value, [Validators.required]],
            brand_name: [this.selectedBrandValue.value, [Validators.required]],
            itemFor: [val?.fk_item_location_id, [Validators.required]],
            billingFor: [this.selectedBillingValue.value, [Validators.required]],
            billingCategory: [this.selectedBillingCategory.value, [Validators.required]],
            itemValue: [val?.item_value, [Validators.required]],
            taxableValue: [val?.item_taxable_value, [Validators.required]],
            taxRate: [val?.item_tax_rate, [Validators.required]],
            itemNameAlias: [val?.item_name_alias, [Validators.required]],
            minAlertValue: [val?.min_alert_value, [Validators.required]],
            minOrderValue: [val?.min_order_value, [Validators.required]],
          });
        }
      });

      this.isloading = false;
    });
  }


  getUnit() {
    let newData = {
      value: '',
      text: ''
    };
    this.stockService.getUnitDD().subscribe((res: any) => {
      let data = res?.body?.data;
      this.unitData = data.map((val: any) =>
        newData = {
          value: val?.unitId,
          text: val?.unitName
        }
      )

    })
  }

  getCategoryList() {
    let newData = {
      value: '',
      text: ''
    };
    this.stockService.getCategoryDD().subscribe((res: any) => {
      let data = res?.body?.data;
      this.categoryData = data.map((val: any) =>
        newData = {
          value: val?.categoryId,
          text: val?.categoryName
        }
      )
    })
  }

  getBillingFor() {
    let newData = {
      value: '',
      text: ''
    }

    this.stockService.getBillingforDD().subscribe((res: any) => {
      let data = res?.body?.data;
      this.billingdata = data.map((val: any) =>
        newData = {
          value: val?.billingForId,
          text: val?.billingForName
        }
      )

    })
  }

  getBillingCategoryList() {
    let newData = {
      value: '',
      text: ''
    }
    this.stockService.getBillingCategoryDD().subscribe((res: any) => {
      let data = res?.body?.data;
      this.billingCategory = data.map((val: any) =>
        newData = {
          value: val?.billingCategoryId,
          text: val?.billingCategoryName
        }
      )
    })
  }

  getHSNList() {
    let newData = {
      value: '',
      text: ''
    }
    this.stockService.getHsnDD().subscribe((res: any) => {
      let data = res?.body?.data;
      this.hsnData = data.map((val: any) =>
        newData = {
          value: val?.hsnId,
          text: val?.hsnName
        }
      )
    })
  }

  getSubcategoryData(selectedSubCategoryId?: any) {
    const categoryId = this.productForm.value.Category;

    if (!categoryId) return;

    this.stockService.getSubCategoryDD(categoryId).subscribe((res: any) => {
      const data = res?.body?.data || [];

      this.subCateData = data.map((val: any) => ({
        value: val?.subCategoryId,
        text: val?.subCategoryName
      }));

      // Auto-select subcategory if provided
      if (selectedSubCategoryId) {
        this.selectedSubCatValue = this.subCateData.find((ele: any) => ele?.value === selectedSubCategoryId);
        this.productForm.controls['Sub_Category'].setValue(this.selectedSubCatValue.value);
      }
    });
  }

  toggleButton(type: any) {
    if (type == 'category') {
      this.showSubCategoryInput = false
      this.onSelectSubCategory = null
      this.subCateData = []
      this.productForm.controls['Category'].setValue(null)
      this.productForm.controls['category_name'].setValue(null)
      this.showCategoryInput = !this.showCategoryInput
    } else if (type == 'sub-Category') {
      this.showCategoryInput = false
      this.productForm.controls['Sub_Category'].setValue(null)
      this.productForm.controls['Sub_category_name'].setValue(null)
      this.showSubCategoryInput = !this.showSubCategoryInput
    } else if (type == 'manufacture') {
      this.productForm.controls['brand_name'].setValue(null)
      this.productForm.controls['manufacture_name'].setValue(null)
      this.showManufactureInput = !this.showManufactureInput

    }
  }

  getBrandData() {
    let newData = {
      value: '',
      text: ''
    }
    this.stockService.getBrandDD().subscribe((res: any) => {
      let data = res?.body?.data;
      this.brandData = data.map((val: any) =>
        newData = {
          value: val?.brandId,
          text: val?.brandName
        }
      )

    })
  }

  addCategory() {
    //   if (this.categoryForm.invalid) {
    //   this.categoryForm.markAllAsTouched();
    //   return;
    // };
    let service: any
    let payload = {
      "category_name": this.productForm.value.category_name,
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
        this.productForm.controls['category_name'].setValue(null)
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

  addSubCategory() {
    let payload = {

      "fk_category_id": Number(this.productForm.value.Category),
      "subcategory_name": this.productForm.value.Sub_category_name,
      "Logged_by": Number(localStorage.getItem('user_Id'))
    }
    this.stockService.addSubCategory(payload).subscribe((res: any) => {
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
        this.showSubCategoryInput = false
        this.productForm.controls['Sub_category_name'].setValue(null)
        this.getSubcategoryData()
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

  addUnit() {
    const initialState: ModalOptions = {
      initialState: {
        // vehicleDetail: value
      },
    };
    this.bsModalRef = this.modalService.show(
      AddUnitPopupComponent,
      Object.assign(initialState, { class: "modal-md modal-dialog-centered" })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        this.getUnit()
      }
    );
  }

  addHsnCode() {
    const initialState: ModalOptions = {
      initialState: {
        // vehicleDetail: value
      },
    };
    this.bsModalRef = this.modalService.show(
      AddHsnPopupComponent,
      Object.assign(initialState, { class: "modal-lg modal-dialog-centered" })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        this.getHSNList()
      }
    );
  }

  addManufacture() {
    let payload = {
      "brand_name": this.productForm.value.manufacture_name,
      "Logged_by": Number(localStorage.getItem('user_Id'))
    }

    this.stockService.addBrand(payload).subscribe((res: any) => {
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
        this.showManufactureInput = false
        this.productForm.controls['manufacture_name'].setValue(null)
        this.getBrandData()
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

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  confirm(event: any) {
    if (event.selectType == 'category') {
      this.selectedSubCatValue = null
      this.showSubCategoryInput = false
      this.subCateData = []
      this.onSelectSubCategory = event.id
      this.productForm.controls['Category'].setValue(event.id)
      this.getSubcategoryData();
      this.catename = event.assets_no
    } else if (event.selectType == 'sub_cat') {
      this.productForm.controls['Sub_Category'].setValue(event.id)
    } else if (event.selectType == 'unit') {
      this.productForm.controls['unit'].setValue(event.id)
    } else if (event.selectType == 'billing_for') {
      this.productForm.controls['billingFor'].setValue(event.id)
    } else if (event.selectType == 'hsn') {
      this.productForm.controls['HSN_Code'].setValue(event.id)
    } else if (event.selectType == 'brand') {
      this.productForm.controls['brand_name'].setValue(event.id)
    } else if (event.selectType == 'billing_category') {
      this.productForm.controls['billingCategory'].setValue(event.id)
    }
  }

  changeDocument(event: any) {
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0].name);
  }


  submit(formValue: any) {
    console.log('formValue', formValue);
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    };
    let service: any

    let payload = {
      "fk_category_id": Number(formValue.Category),
      "fk_subcategory_id": formValue.Sub_Category,
      "fk_unit_id": Number(formValue.unit),
      "fk_hsn_id": Number(formValue.HSN_Code),
      "fk_brand_id": Number(formValue.brand_name),
      "item_name": formValue.name,
      "item_description": formValue.Description,
      "item_value": parseFloat(formValue.itemValue),
      "item_taxable_value": parseFloat(formValue.taxableValue),
      "item_tax_rate": parseFloat(formValue.taxRate),
      "item_cess": 0,
      "fk_item_category_id": Number(formValue.billingCategory),
      "fk_typeofgoods_id": Number(formValue.billingFor),
      "item_name_alias": formValue?.itemNameAlias,
      "min_alert_value": Number(formValue?.minAlertValue),
      "min_order_value": Number(formValue?.minOrderValue),
      "Logged_by": Number(localStorage.getItem('user_Id')),
      "fk_item_location_id": Number(formValue.itemFor),
      "item_barcode_no": "string"
    }
    if (this.id) {
      payload['pk_item_id'] = Number(this.id);
      service = this.stockService.updateProduct(payload)
    } else {
      service = this.stockService.addProduct(payload)
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
        this.productForm.reset()
        this.stopAlert();
        this.button = 'Add';
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/ProductMaster_List')
        }, 3000);
      } else {
        this.alertData = {
          message: `Data not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    }
    )

  }
  resetForm() {
    this.productForm.reset()
    this.selectedValue = {
      value: '',
      text: ''
    }
    this.selectedSubCatValue = {
      value: '',
      text: ''
    }
    this.selectedbaseValue = {
      value: '',
      text: ''
    }
    this.selectedBillingValue = {
      value: '',
      text: ''
    }
    this.selectedHSNValue = {
      value: '',
      text: ''
    }
    this.selectedBrandValue = {
      value: '',
      text: ''
    }
    this.selectedBillingCategory = {
      value: '',
      text: ''
    }

  }

}
