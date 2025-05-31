import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;
  unitData: any;
  categoryData: any;
  supplierNameData: any;
  menufactureData: any;
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
  selectedSupplierValue: any;
  selectedHSNValue: any;
  selectedBrandValue: any;
  selectedMenufacValue: any;
  button: string = 'Add';
  alertMessage = 'Added';
  catename:any;
  isloading: boolean = false;
  formData!: FormData;

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private activeUrl: ActivatedRoute,
    private router: Router
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
    this.supplierNameList();
    this.getManufactureList();
    this.getHSNList();
    this.getSubcategoryData();
    this.getBrandData();
    setTimeout(() => {
      this.isloading = false
    }, 500);
  }

  setInitialValue() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('')]],
      barcodeNo: ['', [Validators.required, Validators.pattern('')]],
      Category: ['', [Validators.required, Validators.pattern('')]],
      Sub_Category: ['', [Validators.required, Validators.pattern('')]],
      unit: ['', [Validators.required, Validators.pattern('')]],
      Supplier_Name: ['', [Validators.required, Validators.pattern('')]],
      HSN_Code: ['', [Validators.required, Validators.pattern('')]],
      cess: ['', [Validators.required, Validators.pattern('')]],
      long_item_specification: ['', [Validators.required, Validators.pattern('')]],
      brand_name: ['', [Validators.required, Validators.pattern('')]],
      manufacture_name: ['', [Validators.required, Validators.pattern('')]],
      purchase_price: ['', [Validators.required, Validators.pattern('')]],
      Wholesaler_Price: ['', [Validators.required, Validators.pattern('')]],
      Retailer_Price: ['', [Validators.required, Validators.pattern('')]],
      Opening_Qty: ['', [Validators.required, Validators.pattern('')]],
      Low_Level: ['', [Validators.required, Validators.pattern('')]],
      img: ['', [Validators.required, Validators.pattern('')]],
      Description: ['', [Validators.required, Validators.pattern('')]],
      manufacture_date: [new Date(), [Validators.required, Validators.pattern('')]],
      expiry_date: [new Date(), [Validators.required, Validators.pattern('')]],
      Consuption_Type: ['1', [Validators.required, Validators.pattern('')]],
      followed_by: ['1', [Validators.required, Validators.pattern('')]],
    })
  }


  getProductList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": parseInt(this.id)
    }
    this.stockService.productList(payload).subscribe((res: any) => {
      this.productList = res?.body?.data;
      this.productList.forEach((val: any) => {

        let newcatValue = this.categoryData?.filter((ele: any) => ele?.value == val?.catid);        
        newcatValue?.forEach((data: any) => {
          this.selectedValue = data
        });

        let newSubCatevalue = this.subCateData?.filter((ele: any) => ele?.value == val?.subCatID);
        newSubCatevalue?.forEach((data: any) => {
          this.selectedSubCatValue = data
        });

        let newBaseUnitvalue = this.unitData?.filter((ele: any) => ele?.value == val?.baseUnitID);
        newBaseUnitvalue?.forEach((data: any) => {
          this.selectedbaseValue = data
        });

        let newSuppliervalue = this.supplierNameData?.filter((ele: any) => ele?.text == val?.supName
         );
        newSuppliervalue?.forEach((data: any) => {
          this.selectedSupplierValue = data
        });

        let newhsnvalue = this.hsnData?.filter((ele: any) => ele?.value == val?.hsnId);
        newhsnvalue?.forEach((data: any) => {
          this.selectedHSNValue = data
        });

        let newBrandvalue = this.brandData?.filter((ele: any) => ele?.value == val?.brandID);
        newBrandvalue?.forEach((data: any) => {
          this.selectedBrandValue = data
        });

        let newmenufacturevalue = this.menufactureData?.filter((ele: any) => ele?.value == val?.manufacturerID);
        newmenufacturevalue?.forEach((data: any) => {
          this.selectedMenufacValue = data
        });

        this.productForm = this.fb.group({
          name: [val?.productName, [Validators.required, Validators.pattern('')]],
          barcodeNo: [val?.barcodeid, [Validators.required, Validators.pattern('')]],
          Category: ['', [Validators.required, Validators.pattern('')]],
          Sub_Category: ['', [Validators.required, Validators.pattern('')]],
          unit: ['', [Validators.required, Validators.pattern('')]],
          Supplier_Name: ['', [Validators.required, Validators.pattern('')]],
          HSN_Code: ['', [Validators.required, Validators.pattern('')]],
          cess: [val?.cessRate, [Validators.required, Validators.pattern('')]],
          long_item_specification: [val?.itemLongDesc, [Validators.required, Validators.pattern('')]],
          brand_name: ['', [Validators.required, Validators.pattern('')]],
          manufacture_name: ['', [Validators.required, Validators.pattern('')]],
          purchase_price: [val?.amount, [Validators.required, Validators.pattern('')]],
          Wholesaler_Price: [val?.wholeSalePrice, [Validators.required, Validators.pattern('')]],
          Retailer_Price: [val?.sellprice, [Validators.required, Validators.pattern('')]],
          Opening_Qty: [val?.qty, [Validators.required, Validators.pattern('')]],
          Low_Level: [val?.lowLevel, [Validators.required, Validators.pattern('')]],
          img: ['', [Validators.required, Validators.pattern('')]],
          Description: [val?.description, [Validators.required, Validators.pattern('')]],
        })
      })
      this.isloading = false;
    })
  }


  getUnit() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "BraID": "ADS-B1",
      "Mode": "SELECT"
    }
    this.stockService.unitList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.unitData = data.map((val: any) =>
        newData = {
          value: val?.unitID,
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

  supplierNameList() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "Supid":"",
      "BraID":"",
    "Result":""
    }
    this.stockService.supplierList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.supplierNameData = data.map((val: any) =>
        newData = {
          value: val?.supid,
          text: val?.cusName
        }
      )

    })
  }

  getManufactureList() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "BraID": "",
      "Result": ""
    }
    this.stockService.manufactureNameList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.menufactureData = data.map((val: any) =>
        newData = {
          value: val?.manuID,
          text: val?.manuName
        }
      )
    })
  }

  getHSNList() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "Result": ""
    }
    this.stockService.hsnDroplist(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.hsnData = data.map((val: any) =>
        newData = {
          value: val?.hsnId,
          text: val?.hsn
        }
      )
    })
  }

  getSubcategoryData() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "Result": ""
    };
    this.stockService.subCateDrop(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.subCateData = data.map((val: any) =>
        newData = {
          value: val?.catid,
          text: val?.catname
        }
      )
    })
  }

  getBrandData() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Sno": 0
    }

    this.stockService.brandList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.brandData = data.map((val: any) =>
        newData = {
          value: val?.brand_Code,
          text: val?.description
        }
      )

    })
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  confirm(event: any) {
    if (event.selectType == 'category') {
      this.productForm.controls['Category'].setValue(event.id)
      this.catename = event.assets_no
    } else if (event.selectType == 'sub_cat') {
      this.productForm.controls['Sub_Category'].setValue(event.id)
    } else if (event.selectType == 'unit') {
      this.productForm.controls['unit'].setValue(event.id)
    } else if (event.selectType == 'supplier_name') {
      this.productForm.controls['Supplier_Name'].setValue(event.id)
    } else if (event.selectType == 'hsn') {
      this.productForm.controls['HSN_Code'].setValue(event.id)
    } else if (event.selectType == 'brand') {
      this.productForm.controls['brand_name'].setValue(event.id)
    } else if (event.selectType == 'menufacture') {
      this.productForm.controls['manufacture_name'].setValue(event.id)
    }
  }

  changeDocument(event: any) {
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0].name);
  }


  submit(formValue: any) {
    let payload: any;
    payload = {
      "proid": "",
      "ProductName": formValue?.name,
      "Color": "",
      "catid": formValue?.Category,
      "subcatid": formValue?.Sub_Category,
      "CatName": this.catename,
      "supid": formValue.Supplier_Name,
      "priceintex": 0,
      "sellprice": formValue?.Retailer_Price ? parseInt(formValue?.Retailer_Price) : 0,
      "promoprice": 0,
      "qty": formValue?.Opening_Qty ? parseInt(formValue?.Opening_Qty) : 0,
      "amount": formValue?.purchase_price ? parseInt(formValue?.purchase_price) : 0,
      "barcode": "",
      "barcodeid": formValue?.barcodeNo,
      "description": formValue?.Description,
      "ItemLongDesc": formValue.long_item_specification,
      "UOMID": 0,
      "dated": "",
      "LowLevel": formValue?.Low_Level ? parseInt(formValue?.Low_Level || '') : 0,
      "Status": 1,
      "BraID": "ADS-B1",
      "BarCodePath": "",
      "ReqNo": "",
      "Typeof": 1,
      "StyleCode": "",
      "WholesalePrice": formValue?.Wholesaler_Price ? parseInt(formValue?.Wholesaler_Price) : 0,
      "proid1": "",
      "ProductType": "",
      "ImageUpload": formValue?.img,
      "BaseUnitID": formValue?.unit,
      "Exp_Date": "",
      "HsnId": formValue?.HSN_Code ? parseInt(formValue?.HSN_Code) : 0,
      "CessRate": formValue?.cess ? parseInt(formValue?.cess) : 0,
      "Mode": "INSERT",
      "BrandID": formValue?.brand_name,
      "ManufacturerID": formValue?.manufacture_name,
      "ManufactureDate": formValue.manufacture_date? formatDate(formValue.manufacture_date,'yyyy-MM-dd hh:mm:ss', 'en-US'  ) : '',
      "ExpiryDate": formValue.expiry_date? formatDate(formValue.expiry_date,'yyyy-MM-dd hh:mm:ss', 'en-US'  ) : '',
      "ConsuptionType":formValue.Consuption_Type,
      "FollowedBy": formValue.followed_by,
      "RS_ICode": ""
    }
    if (this.id) {
      payload.id = parseInt(this.id);
      payload.Mode = 'UPDATE'
    }


    this.stockService.addProduct(payload).subscribe((res: any) => {
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
    this.productForm.reset()

  }
  resetForm(){
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
    this.selectedSupplierValue = {
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
    this.selectedMenufacValue = {
      value: '',
      text: ''
    }

  }

}
