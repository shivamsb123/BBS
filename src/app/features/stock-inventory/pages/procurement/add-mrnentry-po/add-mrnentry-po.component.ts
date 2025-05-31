import { Component, HostListener, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-mrnentry-po',
  templateUrl: './add-mrnentry-po.component.html',
  styleUrls: ['./add-mrnentry-po.component.scss']
})
export class AddMRNentryPoComponent implements OnInit {

  statelistdiv: boolean = false;
  productdiv: boolean = false;
  serchBarCode: any;
  barcodeData: any;
  searchProductName: any
  productNameData: any;
  purchaseOrderForm!: FormGroup
  selectedbar: any;
  selectedProduct: any;
  departmentlist: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  searchKeyword: any;
  tableData: any;
  itemCreateform: any;
  mrnTypeList: any;
  itemData: any[] = [];
  message: string = '';
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  mrnId: any;
  selectedValue: any;
  selectedMrnValue: any;
  selectedData: any;
  subUnit: any;
  baseUnit: any;
  totalQtyValue: any;
  hsnValue: any
  selectedUnitValue: any
  unitData: any;
  isDisable: boolean = false;
  disablerop: boolean = false;
  itemType: any;
  buttonName: string = "Generate MRN"

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private shardService: SharedService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isloading = true;
    this.departmentData();
    this.mrnId = this.activeRoute.snapshot.paramMap.get("id")
    this.initialTable();
    this.setInitialValue();
    this.mrnTypeData();
    this.getUnit();
    let data = JSON.parse(localStorage.getItem('item'));
    if (data) {
      this.itemData = data;
    }
    if (this.mrnId) {
      this.itemData = []
      this.getProductName();
      this.getBarcodeList();
      setTimeout(() => {
        this.getMrnDetailsbyId();
      }, 1000);
      this.buttonName = "Update MRN"
      this.productdiv = false;
      this.productdiv = false;
    }

    setTimeout(() => {
      this.isloading = false;
    }, 1000);

  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Product Name ' },
      { key: 'keyValue', val: 'Barcode No.' },
      { key: 'keyValue', val: 'HSN' },
      { key: 'keyValue', val: 'Total Quantity' },
      { key: 'keyValue', val: 'Unit' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  setInitialValue() {
    this.purchaseOrderForm = this.fb.group({
      department: ['', [Validators.required, Validators.pattern('')]],
      mrnType: ['', [Validators.required, Validators.pattern('')]],
      mrnDate: [new Date(), [Validators.required, Validators.pattern('')]],
      discription: ['', [Validators.required, Validators.pattern('')]],
      priority: ['Low', [Validators.required, Validators.pattern('')]],
      Taken_around_time: [new Date(), [Validators.required, Validators.pattern('')]]
    })

    this.itemCreateform = this.fb.group({
      barcodeNo: ['', [Validators.required, Validators.pattern('')]],
      productName: ['', [Validators.required, Validators.pattern('')]],
      hsn: ['', [Validators.required, Validators.pattern('')]],
      qty: ['', [Validators.required, Validators.pattern('')]],
      unit: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  getMrnDetailsbyId() {
    let childMrnData: any;
    this.isloading = true;
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "MRNId": this.mrnId
    }

    this.stockService.editmrnDetails(payload).subscribe((res: any) => {
      let mrnData = res?.body?.data;
      const dateString = mrnData?.mrnDate;
      const dateObject = new Date(dateString);
      console.log("check dateObject", mrnData);
      
      if (res?.body?.status == 'Success') {
        this.departmentlist?.forEach((val: any) => {
          if (val?.value == mrnData?.deptId) {
            this.selectedValue = { ...val }
            this.purchaseOrderForm.controls['department'].setValue(val?.value)
          }
        })

        let newMrnTtpeValue = this.mrnTypeList?.filter((ele: any) => ele?.value == mrnData?.mrnTypeId);
        newMrnTtpeValue?.forEach((data: any) => {
          this.selectedMrnValue = { ...data }
          this.purchaseOrderForm.controls['mrnType'].setValue(data?.value)
        });

        this.purchaseOrderForm.controls['mrnDate'].setValue(dateObject);
        this.purchaseOrderForm.controls['discription'].setValue(mrnData?.description);
        let newData: any = []
        mrnData?.listMRNChild.forEach((val: any) => {
          this.totalQtyValue += val?.qty

          childMrnData = {
            BarCodeId: val?.barCodeId,
            ProdName: val?.productName,
            HSNCode: val?.hsnCode,
            Qty: val?.qty ? parseInt(val?.qty) : 0,
            Unit: val?.unit,
            ProdId: val?.prodId,
            HSNId: val?.hsnId,
            "BaseUnitId": val?.baseUnitId,
            "SubUnitId": val?.subUnitId
          }
          newData.push(childMrnData)
        })
        this.itemData = newData
        this.isloading = false;
      }
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

  /**
 *get department data
 */
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.departmentlist = res?.body?.data;
    });
  }

  mrnTypeData() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || '')
    }
    this.stockService.mrnType(payload).subscribe((res: any) => {
      this.mrnTypeList = res?.body?.data

    })
  }


  @HostListener("document:click")
  clickedOut() {
    this.statelistdiv = false;
    this.productdiv = false
  }


  getBarcodeList() {
    this.statelistdiv = true
    let payload = {
      "branch_id": "ADS-B1",
      "search_text": this.itemCreateform.value.barcodeNo
    };
    this.stockService.barCodeList(payload).subscribe((res: any) => {
      this.barcodeData = res?.body?.data;
    })
  }

  getProductName() {
    this.productdiv = true;
    let payload = {
      "branch_id": "ADS-B1",
      "search_text": this.itemCreateform.value.productName
    };
    this.stockService.productNameList(payload).subscribe((res: any) => {
      this.productNameData = res?.body?.data;
    })
  }

  onSelectBarData(data: any) {
    this.itemCreateform.controls['barcodeNo'].patchValue(data?.text)
    this.selectedbar = data?.value;
    this.itemCreateform.value['productName'] = ''
    this.getDetailsformBarCode();

  }

  onSelectproductData(data: any) {
    this.selectedbar = ''
    this.itemCreateform.controls['productName'].setValue(data?.text)
    this.selectedProduct = data?.value;
    this.getDetailsformBarCode();
  }

  addItem(type: any) {
    this.itemType = type
  }

  getDetailsformBarCode() {
    this.isDisable = false;
    let payload = {
      "bar_code_id": this.selectedbar,
      "product_name": this.itemCreateform.value['productName'],
      "branch_id": "ADS-B1",
      "status": 1,
      "mode": "SELLINGSELECT"
    }
    this.stockService.detailsFromBarcode(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success' && res?.body?.data) {
        let newBaseUnit = this.unitData.filter((val: any) => val?.value == res?.body?.data?.baseUnitID);
        newBaseUnit.forEach((ele: any) => {
          this.selectedUnitValue = ele;
          this.disablerop = true
        })
        this.selectedData = res?.body?.data;
        this.subUnit = res?.body?.data?.subUnitID;
        this.baseUnit = res?.body?.data?.baseUnitID;
        this.selectedProduct = res?.body?.data?.proid;
        this.hsnValue = res?.body?.data?.hsnId
        this.itemCreateform = this.fb.group({
          barcodeNo: [res?.body?.data?.barcodeid, [Validators.required, Validators.pattern('')]],
          productName: [res?.body?.data?.productName, [Validators.required, Validators.pattern('')]],
          hsn: [res?.body?.data?.hsn, [Validators.required, Validators.pattern('')]],
          qty: [res?.body?.data?.qty, [Validators.required, Validators.pattern('')]],
          unit: [this.selectedUnitValue?.text, [Validators.required, Validators.pattern('')]],
        })
      }
      this.selectedbar = '';
      this.searchProductName = ''
      this.isDisable = true;
    })
  }



  confirm(event: any) {
    if (event.selectType == 'Department') {
      this.purchaseOrderForm.controls['department'].setValue(event.id)
    } else if (event.selectType == 'mrn') {
      this.purchaseOrderForm.controls['mrnType'].setValue(event.id)
    } else if (event.selectType == 'unit') {
      this.itemCreateform.controls['unit'].setValue(event.id)
    }
  }

  createItem(formvalue: any) {
    let index = this.itemData.findIndex((val: any) => formvalue?.barcodeNo == val?.BarCodeId);
    let data: any;
    if (index !== -1) {
      this.alertData = {
        message: 'Already Added',
      };
      this.alertType = "danger";
      this.alertTrigger = true;
      this.stopAlert();

    } else {
      data = {
        SerialNo: 0,
        BarCodeId: formvalue?.barcodeNo,
        ProdName: formvalue?.productName,
        HSNCode: formvalue?.hsn,
        Qty: parseInt(formvalue?.qty),
        Unit: formvalue?.unit,
        ProdId: this.selectedProduct,
        HSNId: this.hsnValue,
        "BaseUnitId": this.baseUnit ? this.baseUnit : "",
        "SubUnitId": this.subUnit ? this.subUnit : ""
      };
      this.itemData.push(data);
      localStorage.setItem('item', JSON.stringify(this.itemData));
      this.itemCreateform.reset();
      this.selectedUnitValue = {
        text: '',
        value: ''
      }
    }

  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  MRNGenerate() {
    this.totalQtyValue = 0
    let data = JSON.parse(localStorage.getItem('item'));
    let mrnChild: any = [];
    data?.forEach((val: any, i: any) => {
      console.log("check i", i);
      val['SerialNo'] = i

      this.totalQtyValue += val?.Qty
      delete val?.ProdName;
      mrnChild.push(val)
    });
    let payload = {
      "MRNDate": formatDate(this.purchaseOrderForm?.value.mrnDate, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "Description": this.purchaseOrderForm?.value.discription,
      "BraID": "ADS-B1",
      "SessionId": 1,
      "EmpId": localStorage.getItem('user_Id'),
      "MRNLevelId": 1,
      "MRNTypeId": parseInt(this.purchaseOrderForm.value.mrnType),
      "deptId": parseInt(this.purchaseOrderForm.value.department),
      "totalQty": this.totalQtyValue,
      "Priority": this.purchaseOrderForm.value.priority,
      "TakenAroundTime": formatDate(this.purchaseOrderForm.value.Taken_around_time, 'dd-MM-yyyy hh:mm:ss', 'en-US'),
      "listMRNChild": mrnChild
    }


    this.stockService.mrnCreate(payload).subscribe((res: any) => {
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
        this.buttonName = "Generate MRN"
        localStorage.removeItem('item');
        setTimeout(() => {
          this.router.navigateByUrl('/SupplyChain/MRN_Generate')
        }, 500)

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

  delete(data: any, i: any) {
    this.itemData.splice(i, 1);
    localStorage.setItem('item', JSON.stringify(this.itemData))
  }

}
