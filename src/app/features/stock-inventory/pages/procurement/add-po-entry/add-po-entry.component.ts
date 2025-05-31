

import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { VendorService } from 'src/app/features/vendor/services/vendor.service';
@Component({
  selector: 'add-po-entry',
  templateUrl: './add-po-entry.component.html',
  styleUrls: ['./add-po-entry.component.scss']
})
export class AddPoEntryComponent implements OnInit {
  searchKeyword: any
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  barcodeData: any;
  purchaseOrderForm!: FormGroup
  productNameData: any;
  selectedValue: any
  selectedbarValue: any;
  serchBarCode: any;
  searchProductName: any
  selectedProduct: any = '';
  selectedbar: any = '';
  poId: any;
  quotation: any;
  address: any
  itemData: any;
  selectedData: any;
  showChild: any;
  quotationDetails: any;
  productId: any;
  basicform!: FormGroup
  toalamt = 0;
  totaldiscount = 0;
  CgstAmt = 0;
  igstAmt = 0;
  totalSgst = 0;
  rounding = 0;
  totalTaxtible: any;
  cessAmt: any;
  quotationMasterid: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  posId:any;
  quotationNoList: any;
  poListArr: any[] = []
  selectedIndex: any;
  disabled: boolean = false;
  posListData: any;
  buttonName: string = "Generate PO"
  
  constructor(
    private route: Router,
    private stockService: StockService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private vendorService:VendorService
  ) { }

  ngOnInit(): void {
    this.poId = this.activeRoute.snapshot.paramMap.get("id");
    let data = JSON.parse(localStorage.getItem('item'));
    if (data) {
      this.itemData = data;
    }
    if (this.poId) {
      this.itemData = []
      this.getPODataFromId();
    }
    this.setInitialValue();
    this.initialTable();
    this.getPosList();
    // this.getQuotationList()
  }

  setInitialValue() {
    this.basicform = this.fb.group({
      quotationNo: ['', [Validators.required, Validators.pattern('')]],
      quotationDate: [new Date(), [Validators.required, Validators.pattern('')]],
      supplierName: ['', [Validators.required, Validators.pattern('')]],
      pos: ['', [Validators.required, Validators.pattern('')]]
    })

    this.purchaseOrderForm = this.fb.group({
      hsn: ['', [Validators.required, Validators.pattern('')]],
      expiry: [new Date(), [Validators.required, Validators.pattern('')]],
      pRate: ['', [Validators.required, Validators.pattern('')]],
      qty: ['', [Validators.required, Validators.pattern('')]],
      amt: ['', [Validators.required, Validators.pattern('')]],
      discount: ['', [Validators.required, Validators.pattern('')]],
      disAmt: ['', [Validators.required, Validators.pattern('')]],
      netAmt: ['', [Validators.required, Validators.pattern('')]],
      cGst: ['', [Validators.required, Validators.pattern('')]],
      cgstAmt: ['', [Validators.required, Validators.pattern('')]],
      sgst: ['', [Validators.required, Validators.pattern('')]],
      sgstAmt: ['', [Validators.required, Validators.pattern('')]],
      igst: ['', [Validators.required, Validators.pattern('')]],
      igstAmt: ['', [Validators.required, Validators.pattern('')]],
      cess: ['', [Validators.required, Validators.pattern('')]],
      cessAmt: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  initialTable() {
    this.tableData = [
      { key: '', val: 'BarCode No' },
      { key: 'keyValue', val: 'Product Name' },
      { key: 'keyValue', val: 'HSN' },
      { key: 'keyValue', val: 'Expiry Date' },
      { key: 'keyValue', val: 'Amount' },
      { key: 'keyValue', val: 'Qty' },
      { key: 'keyValue', val: 'P.Rate' },
      { key: 'keyValue', val: 'Disc %' },
      { key: 'keyValue', val: 'Disc. Amt' },
      { key: 'keyValue', val: 'C gst %' },
      { key: 'keyValue', val: 'C gst Amt' },
      { key: 'keyValue', val: 'S Gst %' },
      { key: 'keyValue', val: 'S Gst Amt' },
      { key: 'keyValue', val: 'I Gst %' },
      { key: 'keyValue', val: 'I Gst Amt' },
      { key: 'keyValue', val: 'Cess %' },
      { key: 'keyValue', val: 'Cess Amt' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  statelistdiv: boolean = false;
  productdiv: boolean = false;

  @HostListener("document:click")
  clickedOut() {
    this.statelistdiv = false;
    this.productdiv = false
  }

  // getQuotationList() {
  //   let payload = {
  //     "Result": ""
  //   }
  //   this.stockService.quotationList(payload).subscribe((res: any) => {
  //     this.quotationNoList = res?.body?.data
  //     console.log("quotationNoList", this.quotationNoList);

  //   })
  // }

  getPosList(){
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
        "Result":""
    }
    this.vendorService.posList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.posListData = data.map((val:any)=>
      newData = {
        value: val?.posId,
        text: val?.posName
      }
      )
    })
  }

  getPODataFromId() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "QTNMasterId": parseInt(this.poId)
    }
    this.stockService.GetQuotationDetails(payload).subscribe((res: any) => {
      this.isloading = false;
      let data = res?.body?.data;
      this.quotationDetails = res?.body?.data;
        
      if (res?.body?.status == 'Success') {
        let formatdate = data[0]?.qtnDate.slice(0, 10).split('/').reverse().join('-').replace(/\s/g,'')
        let formatTime = data[0]?.qtnDate.slice(11, 30);
        console.log("check res data", formatdate, formatTime, data);
        this.basicform = this.fb.group({
          quotationNo: [data[0]?.qtnNo, [Validators.required, Validators.pattern('')]],
          quotationDate: [new Date(`2023-19-8 2:00:00 AM`), [Validators.required, Validators.pattern('')]],
          supplierName: [data[0].supName, [Validators.required, Validators.pattern('')]],
          pos: [data[0]?.posName, [Validators.required, Validators.pattern('')]]
        })

        this.quotationMasterid = data[0].qtnMasterId;
        this.posId = data[0].pos
        data.forEach((val: any) => {
          this.toalamt += val?.amount;
          this.totaldiscount += val?.discountAmt;
          this.CgstAmt += val?.cgst_Amt;
          this.igstAmt += val?.igst_Amt;
          this.totalSgst += val?.sgst_Amt;
          this.rounding = 0;
          this.cessAmt += 0;
          this.totalTaxtible += val?.taxableAmt;

          let data = {
            "ProdName": val?.productName,
            "QuotationID": val?.qtnMasterId.toString(),
            "RecID": "",
            "ProID": val.proID,
            "BarcodeID": val?.barcodeID,
            "SellPrice": 0,
            "Qty": val?.qty,
            "Amount": val?.amount,
            "Discount": 0,
            "DiscountAmt": val?.discountAmt,
            "TotalAmount": val?.totalAmount,
            "Combination": "",
            "Unit": "",
            "Factor": 1,
            "BaseUnitID": "",
            "SubUnitID": "",
            "Flag": 1,
            "TaxableAmt": val?.taxableAmt,
            "Cgst_Per": val?.cgst_Per,
            "Cgst_Amt": val?.cgst_Amt,
            "Sgst_Per": val?.sgst_Per,
            "Sgst_Amt": val?.sgst_Amt,
            "Igst_Per": val?.igst_Per,
            "Igst_Amt": val?.igst_Amt,
            "POS": 0,
            "HsnId": val?.hsnId,
            "HsnCode": val.hsnCode,
            "Cess_Per": 0,
            "Cess_Amt": 0,
            "BatchNo": "",
            "ExpiryDate": val?.expiryDate,
            "MRP_Amt": 0,
          }
          this.itemData.push(data);
        });
      }

    })

  }

  getBarcodeList() {
    this.statelistdiv = true;
    let payload = {
      "branch_id": "ADS-B1",
      "search_text": this.serchBarCode
    };
    this.stockService.barCodeList(payload).subscribe((res: any) => {
      this.barcodeData = res?.body?.data;
    })
  }

  getProductName() {
    this.productdiv = true;
    let payload = {
      "branch_id": "ADS-B1",
      "search_text": this.searchProductName
    };
    this.stockService.productNameList(payload).subscribe((res: any) => {
      this.productNameData = res?.body?.data;
    })
  }

  onSelectBarData(data: any) {
    this.serchBarCode = data?.text;
    this.selectedbar = data?.value
    this.getDetailsformBarCode();

  }

  onSelectproductData(data: any) {
    this.searchProductName = data?.text;
    this.selectedProduct = data?.text;
    this.productId = data.value
    this.getDetailsformBarCode();
  }

  getDetailsformBarCode() {
    let payload = {
      "bar_code_id": this.selectedbar,
      "product_name": this.searchProductName,
      "branch_id": "ADS-B1",
      "status": 1,
      "mode": "SELLINGSELECT"

    }
    this.stockService.detailsFromBarcode(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success' && res?.body?.data) {
        this.serchBarCode = res?.body?.data?.barcodeid;
        this.selectedProduct = res?.body?.data?.productName;
        this.productId = res?.body?.data?.proid
        this.purchaseOrderForm = this.fb.group({
          hsn: [res?.body?.data?.hsn, [Validators.required, Validators.pattern('')]],
          unit: [res?.body?.data?.unitName, [Validators.required, Validators.pattern('')]],
          pRate: ['', [Validators.required, Validators.pattern('')]],
          expiry: ['', [Validators.required, Validators.pattern('')]],
          qty: [res?.body?.data?.qty, [Validators.required, Validators.pattern('')]],
          amt: [res?.body?.data?.amount, [Validators.required, Validators.pattern('')]],
          discount: ['', [Validators.required, Validators.pattern('')]],
          disAmt: ['', [Validators.required, Validators.pattern('')]],
          netAmt: [res?.body?.data?.net_amount, [Validators.required, Validators.pattern('')]],
          cGst: [res?.body?.data?.cgstRate, [Validators.required, Validators.pattern('')]],
          cgstAmt: [res?.body?.data?.cgst_amt, [Validators.required, Validators.pattern('')]],
          sgst: [res?.body?.data?.sgstRate, [Validators.required, Validators.pattern('')]],
          sgstAmt: [res?.body?.data?.sgst_amt, [Validators.required, Validators.pattern('')]],
          igst: [res?.body?.data?.igstRate, [Validators.required, Validators.pattern('')]],
          igstAmt: [res?.body?.data?.igst_amt, [Validators.required, Validators.pattern('')]],
          cess: ['', [Validators.required, Validators.pattern('')]],
          cessAmt: ['', [Validators.required, Validators.pattern('')]],
        })
      } else {
        this.selectedbar = '';
        this.searchProductName = ''
      }
    })
  }

  confirm(event: any) {

  }

  update(data: any, type: any, i: number) {
    this.disabled = false;
    this.showChild = type;
    this.selectedData = data;
    this.serchBarCode = this.selectedData.BarcodeID;
    this.selectedProduct = this.selectedData.ProdName;
    this.productId = data?.ProID
    let formatdate = this.selectedData?.ExpiryDate.slice(0, 10).split('-').reverse().join('-')
    let formatTime = this.selectedData?.ExpiryDate.slice(11, 20);

    this.purchaseOrderForm = this.fb.group({
      hsn: [this.selectedData?.HsnCode, [Validators.required, Validators.pattern('')]],
      unit: [this.selectedData?.Unit, [Validators.required, Validators.pattern('')]],
      pRate: ['', [Validators.required, Validators.pattern('')]],
      expiry: [new Date(`${formatdate} ${formatTime}`), [Validators.required, Validators.pattern('')]],
      qty: [this.selectedData?.Qty, [Validators.required, Validators.pattern('')]],
      amt: [this.selectedData?.Amount, [Validators.required, Validators.pattern('')]],
      discount: [this.selectedData?.Discount, [Validators.required, Validators.pattern('')]],
      disAmt: [this.selectedData?.DiscountAmt, [Validators.required, Validators.pattern('')]],
      netAmt: ['', [Validators.required, Validators.pattern('')]],
      cGst: [this.selectedData?.Cgst_Per, [Validators.required, Validators.pattern('')]],
      cgstAmt: [this.selectedData?.Cgst_Amt, [Validators.required, Validators.pattern('')]],
      sgst: [this.selectedData?.Sgst_Per, [Validators.required, Validators.pattern('')]],
      sgstAmt: [this.selectedData?.Sgst_Amt, [Validators.required, Validators.pattern('')]],
      igst: [this.selectedData?.Igst_Per, [Validators.required, Validators.pattern('')]],
      igstAmt: [this.selectedData?.Igst_Amt, [Validators.required, Validators.pattern('')]],
      cess: [this.selectedData?.Cess_Per, [Validators.required, Validators.pattern('')]],
      cessAmt: [this.selectedData?.Cess_Amt, [Validators.required, Validators.pattern('')]],
    })
    this.disabled = true;

    this.changePRValue()
  }


  changePRValue() {
    let prvalue = this.purchaseOrderForm.value.amt / this.purchaseOrderForm.value.qty;
    this.purchaseOrderForm.controls['pRate'].setValue(prvalue);
  }


  changedisvalue() {
    let discountvalue = this.purchaseOrderForm.value.amt * this.purchaseOrderForm.value.discount / 100;
    this.purchaseOrderForm.controls['disAmt'].setValue(discountvalue);
    if (this.purchaseOrderForm.value.disAmt) {
      let disNetvalue = this.purchaseOrderForm.value.amt - this.purchaseOrderForm.value.disAmt;
      this.purchaseOrderForm.controls['netAmt'].setValue(disNetvalue);
    } else {
      this.purchaseOrderForm.controls['netAmt'].setValue(0);
    }
  }

  changCgstAmt() {
    let cgstAmtValue = this.purchaseOrderForm.value.netAmt * this.purchaseOrderForm.value.cGst / 100;
    this.purchaseOrderForm.controls['cgstAmt'].setValue(cgstAmtValue);
  }

  changSgstAmt() {
    let cgstAmtValue = this.purchaseOrderForm.value.netAmt * this.purchaseOrderForm.value.sgst / 100;
    this.purchaseOrderForm.controls['sgstAmt'].setValue(cgstAmtValue);

    let igstAmitvale = parseInt(this.purchaseOrderForm.value.cGst) + parseInt(this.purchaseOrderForm.value.sgst);
    this.purchaseOrderForm.controls['igst'].setValue(igstAmitvale);
  }

  changIgstAmt() {
    let cgstAmtValue = this.purchaseOrderForm.value.netAmt * this.purchaseOrderForm.value.igst / 100;
    this.purchaseOrderForm.controls['igstAmt'].setValue(cgstAmtValue);
  }

  changCessAmt() {
    let CessAmtValue = this.purchaseOrderForm.value.netAmt * this.purchaseOrderForm.value.cess / 100;
    this.purchaseOrderForm.controls['cessAmt'].setValue(CessAmtValue);
  }

  submit(formvalue: any) {
    this.itemData.forEach((val: any) => {
      if (val?.QuotationID == this.selectedData?.QuotationID) {
        val.ProdName = this.selectedProduct;
        val.QuotationID = this.selectedData?.QuotationID;
        val.RecID = this.selectedData?.RecID,
        val.ProID = this.productId;
        val.BarcodeID = this.serchBarCode;
        val.SellPrice = formvalue.pRate;
        val.Qty = Number(formvalue.qty);
        val.Amount = Number(formvalue.amt);
        val.Discount = Number(formvalue.discount);
        val.DiscountAmt = Number(formvalue.disAmt);
        val.TotalAmount = this.selectedData?.TotalAmount;
        val.Combination = this.selectedData?.Combination;
        val.Unit = this.selectedData?.Unit;
        val.Factor = this.selectedData?.Factor;
        val.BaseUnitID = this.selectedData?.BaseUnitID;
        val.SubUnitID = this.selectedData?.SubUnitID;
        val.Flag = this.selectedData?.Flag;
        val.TaxableAmt = this.selectedData?.TaxableAmt;
        val.Cgst_Per = Number(formvalue.cGst);
        val.Cgst_Amt = Number(formvalue.cgstAmt);
        val.Sgst_Per = Number(formvalue.sgst);
        val.Sgst_Amt = Number(formvalue.sgstAmt);
        val.Igst_Per = Number(formvalue.igst);
        val.Igst_Amt = Number(formvalue.igstAmt);
        val.POS = this.selectedData?.POS;
        val.HsnId = this.selectedData?.HsnId;
        val.HsnCode = formvalue.hsn;
        val.Cess_Per = Number(formvalue.cess);
        val.Cess_Amt = Number(formvalue.cessAmt);
        val.BatchNo = this.selectedData?.BatchNo;
        val.ExpiryDate = formatDate(formvalue.expiry, 'yyyy-MM-dd hh:mm:ss', 'en-US');
        val.MRP_Amt = this.selectedData?.MRP_Amt;
      }
    });

    localStorage.setItem('item', JSON.stringify(this.itemData))

  }

  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  onChangeData(event: any, data: any, index: any) {
    this.selectedIndex = event.target.checked ? index : undefined;
    if (this.selectedIndex == index) {
      this.poListArr.push(data)
    } else {
      const list = this.poListArr.findIndex((element: any) => element === index)
      this.poListArr.splice(list, 1)
    }
    console.log("poListArr", this.poListArr);
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  poGenerate() {
    this.toalamt = 0;
    this.totaldiscount = 0;
    this.CgstAmt = 0;
    this.igstAmt = 0;
    this.totalSgst = 0;
    this.rounding = 0;
    this.cessAmt = 0
    this.totalTaxtible = 0
    this.itemData.forEach((val: any) => {
      this.toalamt += val?.Amount;
      this.totaldiscount += val?.DiscountAmt;
      this.CgstAmt += val?.Cgst_Amt;
      this.igstAmt += val?.Igst_Amt;
      this.totalSgst += val?.Sgst_Amt;
      this.rounding = 0;
      this.cessAmt += val?.Cess_Amt
      this.totalTaxtible += val?.TaxableAmt
    })

    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id')),
      "DeptId": parseInt(localStorage.getItem('dept_id')),
      "SessionId": 1,
      "QuotationId": this.quotationMasterid.toString(),
      "SupId": "",
      "PODate": formatDate(this.basicform.value.quotationDate, 'yyyy-MM-dd hh:mm:ss', 'en-US'),
      "TotalAmount": this.toalamt,
      "GrandTotal": 0,
      "SellAmount": 0,
      "BalanceAmount": 0,
      "VatPer": 1,
      "Description": "",
      "BraID": "ADS-B1",
      "POS": this.posId,
      "TaxableAmt": this.totalTaxtible,
      "Cgst_Amt": this.CgstAmt,
      "Sgst_Amt": this.totalSgst,
      "Igst_Amt": this.igstAmt,
      "Cess_Amt": this.cessAmt,
      "Rounding": 0,
      "FinalAmount": 0,
      "DiscountAmount": this.totaldiscount,
      "PayTypeId": 1,
      "listPOChildTable": this.itemData
    }
    this.stockService.CreatePurchageOrder(payload).subscribe((res: any) => {
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
          this.route.navigateByUrl('/SupplyChain/PO_Generate')
        },2000)
      } else {
        this.alertData = {
          message: 'PO Not Generated',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

}

