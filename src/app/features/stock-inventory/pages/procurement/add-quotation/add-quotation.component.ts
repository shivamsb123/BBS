import { Component, HostListener } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { every } from 'rxjs';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss']
})
export class AddQuotationComponent {
  searchKeyword: any;
  isloading: boolean = false;
  tableData: any;
  quotationMRNList: any;
  id = 0;
  mode = 0
  selectedQuotationData: any;
  quotationForm!: FormGroup
  selectedMrnValue: string = '';
  mrnListDetailsData: any;
  vendorList: any;
  isSelectedAll: boolean;
  isSelected: boolean = false;
  checkedList: any;
  vendorName: any;
  date: Date = new Date();
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  totalAmount: any = 0;
  vendorId:any;
  itemCreateform!: FormGroup;
  statelistdiv: boolean = false;
  productdiv: boolean = false;
  serchBarCode: any;
  barcodeData: any;
  selectedbar: any;
  selectedProduct: any;
  productNameData: any;
  searchProductName: any;
  selectedData:any;
  subUnit:any;
  baseUnit:any;
  hsnValue:any;
  showChild: any;
  disabled: boolean = false;
  totalQuantity: number;
  selectVendorIndex: any;
  buttonName: string = "Generate RFP"

  constructor(
    private stockService: StockService,
    private fb: FormBuilder,
    private router: Router
  ) { }
  ngOnInit() {
    this.getMRNList();
    this.setInitialValue()
    // this.getMRNListDetails();
    this.getVendorList();
  }

  setInitialValue() {
    this.quotationForm = this.fb.group({
      mrnDate: [new Date(), [Validators.required, Validators.pattern('')]],
      description: ['', [Validators.required, Validators.pattern('')]],
      date: [new Date(), [Validators.required, Validators.pattern('')]],
    })

    this.itemCreateform = this.fb.group({
      barcodeNo: ['', [Validators.required, Validators.pattern('')]],
      productName: ['', [Validators.required, Validators.pattern('')]],
      hsn: ['', [Validators.required, Validators.pattern('')]],
      qty: ['', [Validators.required, Validators.pattern('')]],
      requireqty: ['', [Validators.required, Validators.pattern('')]],
      blanceqty: ['', [Validators.required, Validators.pattern('')]],
      unit: ['', [Validators.required, Validators.pattern('')]],
    })
  }


  getMRNList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "SearchText": "",
      "Mode": 0,
      "ID": 0

    }
    this.stockService.quotationMrn(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.selectedQuotationData = res?.body?.data
      this.quotationMRNList = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.mrnid
        }
      )
    })
  }

  confirm(event: any) {
    if (event.selectType == 'MRN') {
      this.selectedMrnValue = event?.assets_no
      this.id = event.id;
      this.selectedQuotationData.forEach((val: any) => {
        if (this.id == val?.id) {
          let formatDateValue = val?.mrnDate.slice(0, 10).split("-").reverse().join('-');
          // let formatDateTime = val?.mrnDate.slice(11, 16);
          this.quotationForm = this.fb.group({
            mrnDate: [new Date(`${formatDateValue} `), [Validators.required, Validators.pattern('')]],
            description: ['', [Validators.required, Validators.pattern('')]],
          })
        }
      })
      this.getMRNListDetails()
    } 
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getMRNListDetails() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "MRNID": this.selectedMrnValue
    }
    this.stockService.mrnListDetails(payload).subscribe((res: any) => {
      this.mrnListDetailsData = res?.body?.data;
      this.mrnListDetailsData.forEach((val: any) => {
        val['isSelected'] = false;
        val['SupName'] = '';
        val['SupId'] = ""
      })
      this.isloading = false
    })
   
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
    this.getDetailsformBarCode();

  }

  onSelectproductData(data: any) {
    this.itemCreateform.controls['productName'].patchValue(data?.text)
    this.selectedProduct = data?.value;
    this.getDetailsformBarCode();
  }

  getDetailsformBarCode() {
    this.disabled = false;
    let payload = {
      "bar_code_id": this.selectedbar,
      "product_name": this.searchProductName,
      "branch_id": "ADS-B1",
      "status": 1,
      "mode": "SELLINGSELECT"

    }
    this.stockService.detailsFromBarcode(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success' && res?.body?.data) {
        this.selectedData = res?.body?.data;
        this.subUnit = res?.body?.data?.subUnitID;
        this.baseUnit = res?.body?.data?.baseUnitID;
        this.selectedProduct = res?.body?.data?.proid;
        this.hsnValue = res?.body?.data?.hsnId;
        this.itemCreateform = this.fb.group({
          barcodeNo: [res?.body?.data?.barcodeid, [Validators.required, Validators.pattern('')]],
          productName: [res?.body?.data?.productName, [Validators.required, Validators.pattern('')]],
          hsn: [res?.body?.data?.hsn, [Validators.required, Validators.pattern('')]],
          qty: [res?.body?.data?.qty, [Validators.required, Validators.pattern('')]],
          unit: [res?.body?.data?.unitName, [Validators.required, Validators.pattern('')]],
          requireqty: ['', [Validators.required, Validators.pattern('')]],
          blanceqty: ['', [Validators.required, Validators.pattern('')]],
        })
        this.disabled = true;
      } else {
        this.selectedbar = '';
        this.searchProductName = ''
      }

    })
  }

  @HostListener("document:click")
  clickedOut() {
    this.statelistdiv = false;
    this.productdiv = false
  }

  update(data:any,type:any) {
    this.showChild = type;
    this.disabled = false;    
    this.itemCreateform = this.fb.group({
      barcodeNo: [data?.barcodeid, [Validators.required, Validators.pattern('')]],
      productName: [data?.productName, [Validators.required, Validators.pattern('')]],
      hsn: [data?.hsnCode, [Validators.required, Validators.pattern('')]],
      qty: [data?.qty, [Validators.required, Validators.pattern('')]],
      unit: [data?.unit, [Validators.required, Validators.pattern('')]],
      requireqty: ['', [Validators.required, Validators.pattern('')]],
      blanceqty: ['', [Validators.required, Validators.pattern('')]],
    })
    this.searchProductName = data?.productName;
    this.disabled = true;

  }

  changeRequireQty() {
    if(this.itemCreateform.value.qty <= this.itemCreateform.value.requireqty) return
    if(this.itemCreateform.value.qty >= this.itemCreateform.value.requireqty) {
      const blanceQtyValue = this.itemCreateform.value.qty - this.itemCreateform.value.requireqty;
      this.itemCreateform.controls['blanceqty'].setValue(blanceQtyValue)
    }
  }


  checkUncheckAll() {
    for (var i = 0; i < this.mrnListDetailsData.length; i++) {
      this.mrnListDetailsData[i].isSelected = this.isSelectedAll;
    }
    this.getCheckedItemList(i);
  }

  isAllSelected(i:any) {
    this.isSelectedAll = this.mrnListDetailsData.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList(i);
  }

  SelectVendor(event:any, index:any) {
    this.mrnListDetailsData.forEach((val: any, i:any) => {
      if( i === index) {
        val['SupName'] = event.assets_no;
        val['SupId'] = event.id.toString()
      }
    })
  }

  getCheckedItemList(index:any) {
    this.checkedList = [];
    let data: any;
    
    for (var i = 0; i < this.mrnListDetailsData.length; i++) {                
      if (this.mrnListDetailsData[i].isSelected) { 
        data = {
          RFPDate: formatDate(this.date, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
          ProID: this.mrnListDetailsData[i]?.proid,
          MRNID: this.mrnListDetailsData[i]?.mrnid,
          MRNDate: formatDate(this.quotationForm.value.mrnDate, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
          BarcodeID: this.mrnListDetailsData[i].barcodeid.toString(),
          SellPrice: 0,
          Qty: this.mrnListDetailsData[i]?.qty,
          Amount: 0,
          Discount: 0,
          DiscountAmt: 0,
          TotalAmount: this.mrnListDetailsData[i]?.totalAmount,
          Combination: "",
          Unit: "",
          Factor: 0,
          BaseUnitID: "",
          SubUnitID: "",
          Flag: 0,
          TaxableAmt: 0,
          Cgst_Per: 0,
          Cgst_Amt: 0,
          Sgst_Per: 0,
          Sgst_Amt: 0,
          Igst_Per: 0,
          Igst_Amt: 0,
          POS: 0,
          HsnId: 0,
          HSNCode: this.mrnListDetailsData[i]?.hsnCode,
          Cess_Per: 0,
          Cess_Amt: 0,
          BatchNo: "",
          ExpiryDate: "",
          MRP_Amt: 0,
          Slno: 0,
          SupName: this.mrnListDetailsData[i].SupName,
          SupId : this.mrnListDetailsData[i].SupId
        }
        this.checkedList.push(data);
        console.log("check ", this.checkedList);
        
      }
    }
  }

  getVendorList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "Result": ""
    }
    this.stockService.quotationVendor(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.vendorList = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.vendorName
        }
      )
    })
  }

  RfpGenerate() {
    this.totalQuantity = 0
    this.mrnListDetailsData.forEach((ele:any)=>{
      this.totalQuantity += ele.qty
    })
    let payload = {
      "RFPMasterID": 0,
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "SessionId": 1,
      "RFPDate": formatDate(this.date, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "MRNID": this.selectedMrnValue,
      "MRNDate": formatDate(this.quotationForm.value.mrnDate, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "RFPExpiryDate": "",
      "SupName": "",
      "SupId": "",
      "ReqNo": "",
      "MainTotalAmount":this.totalAmount,
      "AdvanceAmount": 0,
      "TotalAmount": 0,
      "Paytype": "",
      "SellAmount": 0,
      "BalanceAmount": 0,
      "DiscountAmount": 0,
      "VatPer": 0,
      "PerProfitAmount": 0,
      "Empid": "",
      "Description":this.quotationForm.value.description,
      "BraID": "",
      "POS": 0,
      "TaxableAmt": 0,
      "Cgst_Per": 0,
      "CGST_Amt": 0,
      "Sgst_Per": 0,
      "SGST_Amt": 0,
      "Igst_Per": 0,
      "IGST_Amt": 0,
      "Cess_Per": 0,
      "Cess_Amt": 0,
      "PayTypeId": "",
      "Rounding": 0,
      "FinalAmount": 0,
      "IsApproved": 0,
      "ApprovedBy": 0,
      "ApprovedDate": "",
      "ApprovedReq": 0,
      "MrnLevelId": 0,
      "MrnTypeId": 0,
      "TotalQty":this.totalQuantity.toString(),
      "listRFPChildTable": this.checkedList
    } 
    console.log("payload",payload);
    
      this.stockService.RFPGenerate(payload).subscribe((res: any) => {
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
          this.router.navigateByUrl('/SupplyChain/RFP_Generate')
        }, 2000)
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

  updateMrnChildQty() {
    this.itemCreateform.reset()
  }
  
  cancel() {
    this.quotationForm.reset();
    this.checkedList = [];
    this.date = new Date();
  }
}
