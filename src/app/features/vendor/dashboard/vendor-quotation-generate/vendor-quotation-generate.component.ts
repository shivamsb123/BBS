import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
import { VendorService } from '../../services/vendor.service';
@Component({
  selector: 'app-vendor-quotation-generate',
  templateUrl: './vendor-quotation-generate.component.html',
  styleUrls: ['./vendor-quotation-generate.component.scss']
})
export class VendorQuotationGenerateComponent implements OnInit {
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

  quotationNoList: any;
  poListArr: any[] = []
  selectedIndex: any;
  getRpfdetatial: any;
  isDisable : boolean = false;
  disabled: boolean = false;
  isDisabled: boolean = false;
  posListData: any;
  rfpDetail:any
  constructor(
    private route: Router,
    private stockService: StockService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private vendorSevice: VendorService,
    private rotuer: Router
  ) { 
    this.rfpDetail = window.history.state?.data;
    console.log("this.rfpDetail",this.rfpDetail);
    
  }

  ngOnInit(): void {
    this.poId = this.activeRoute.snapshot.paramMap.get("id");
    let data = JSON.parse(localStorage.getItem('item'));    
    if (data) {
      this.itemData = data;
      console.log("this.itemData",this.itemData);
    }
    this.setInitialValue();
    if (this.poId) {
      this.itemData = []
      this.getPODataFromId();
    }
    if(this.rfpDetail){
      this.getRfpData(this.rfpDetail)
    }
  
    this.initialTable();
    this.getPosList()
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

  getPosList(){
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
        "Result":""
    }
    this.vendorSevice.posList(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.posListData = data.map((val:any)=>
      newData = {
        value: val?.posId,
        text: val?.posName
      }
      )
    })
  }

  getRfpData(data: any) {
    console.log("data1234", data);
  let newDate = data.rfpDate.split('')
    this.basicform.patchValue({
      quotationNo: data?.rfpid,
      quotationDate: new Date(newDate[0]),
      supplierName: data?.supName,
      pos: data?.pos
    });
    
}

  getPODataFromId() {
    this.isloading = true;
    this.isDisable = false;
    let payload = {
      "PageNO":1,
      "PageSize":100,
      "RFPMasterID":parseInt(this.poId)
    }
    this.vendorSevice.rpfChild(payload).subscribe((res: any) => {
      this.isloading = false;
      let data = res?.body?.data;
      this.quotationDetails = res?.body?.data;
      console.log("check quotation", this.quotationDetails);
      
      if (res?.body?.status == 'Success') {
        const dateString = data[0]?.rfpDate;
        let datevalue : any;
        // let formatdate = data[0]?.rfpDate.slice(0, 10).split('-').reverse().join('-')
        // let formatTime = data[0]?.rfpDate.slice(11, 20);
        if(data[0]?.rfpDate){
          datevalue = new Date(`${dateString}`)
        } else {
          datevalue = new Date()
        }
        // this.basicform = this.fb.group({
        //   quotationNo: [data[0]?.rfpid, [Validators.required, Validators.pattern('')]],
        //   quotationDate: [datevalue, [Validators.required, Validators.pattern('')]],
        //   supplierName: [data[0]?.supName, [Validators.required, Validators.pattern('')]],
        //   pos: [data[0]?.posName, [Validators.required, Validators.pattern('')]]
        // })

        this.quotationMasterid = data[0]?.rfpMasterID
        data?.forEach((val: any) => {
          this.getRpfdetatial = val
          this.toalamt += val?.amount;
          this.totaldiscount += val?.discountAmt;
          this.CgstAmt += val?.cgst_Amt;
          this.igstAmt += val?.igst_Amt;
          this.totalSgst += val?.sgst_Amt;  
          this.rounding = 0;
          this.cessAmt += 0;
          this.totalTaxtible += val?.taxableAmt;

          let data = {
            "SLNo": val?.slno,
            "ProId": val?.proId,
            "ProductName": val?.productName,
            "BarCodeId": val?.barcodeID,
            "HsnId": val?.hsnId,
            "HsnCode": val?.hsnCode,
            "SellPrice": 0,
            "Qty": val?.qty,
            "POS": val?.pos,
            "Amount": val?.amount,
            "Discount": val?.discount,
            "DiscountAmt": val?.discountAmt,
            "TotalAmount": val?.totalAmount,
            "Unit": val?.unit,
            "Factor": 0,
            "BaseUnitId": val?.baseUnitID,
            "SubUnitId": val?.subUnitID,
            "Flag": val?.flag,
            "TaxableAmt": val?.taxableAmt,
            "CGSTAmt": val?.cgst_Amt,
            "SGSTAmt": val?.sgst_Amt,
            "IGSTAmt": val?.igst_Amt,
            "CessAmt": val?.cess_Amt,
            "CGSTPer": val?.cgst_Per,
            "SGSTPer": val?.sgst_Per,
            "IGSTPer": val?.igst_Per,
            "CessPer": val?.cess_Per,
            "MRPAmt": val?.mrP_Amt,
            "BatchNo": val?.batchNo,
            "ExpiryDate": val?.expiryDate

          }
          this.itemData.push(data);
        });
      }

      this.isDisable = true
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
        this.productId = res?.body?.data?.proid;
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
    this.serchBarCode = this.selectedData.BarCodeId;
    this.selectedProduct = this.selectedData.ProductName;
    const dateString = this.selectedData?.ExpiryDate;


    this.purchaseOrderForm = this.fb.group({
      hsn: [this.selectedData?.HsnCode, [Validators.required, Validators.pattern('')]],
      unit: [this.selectedData?.Unit, [Validators.required, Validators.pattern('')]],
      pRate: ['', [Validators.required, Validators.pattern('')]],
      expiry: [new Date(`${dateString}`), [Validators.required, Validators.pattern('')]],
      qty: [this.selectedData?.Qty, [Validators.required, Validators.pattern('')]],
      amt: [this.selectedData?.Amount, [Validators.required, Validators.pattern('')]],
      discount: [this.selectedData?.Discount, [Validators.required, Validators.pattern('')]],
      disAmt: [this.selectedData?.DiscountAmt, [Validators.required, Validators.pattern('')]],
      netAmt: ['', [Validators.required, Validators.pattern('')]],
      cGst: [this.selectedData?.CGSTPer, [Validators.required, Validators.pattern('')]],
      cgstAmt: [this.selectedData?.CGSTAmt, [Validators.required, Validators.pattern('')]],
      sgst: [this.selectedData?.SGSTPer, [Validators.required, Validators.pattern('')]],
      sgstAmt: [this.selectedData?.SGSTAmt, [Validators.required, Validators.pattern('')]],
      igst: [this.selectedData?.IGSTPer, [Validators.required, Validators.pattern('')]],
      igstAmt: [this.selectedData?.IGSTAmt, [Validators.required, Validators.pattern('')]],
      cess: [this.selectedData?.CGSTPer, [Validators.required, Validators.pattern('')]],
      cessAmt: [this.selectedData?.CessAmt, [Validators.required, Validators.pattern('')]],
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
      val.SLNo = this.getRpfdetatial?.slno,
        // val.ProId = val.ProId,
        val.ProductName = this.selectedProduct, 
        val.BarCodeId = this.serchBarCode,
        val.HsnId = this.selectedData?.HsnId,
        val.HsnCode = formvalue.hsn,
        val.SellPrice = formvalue.pRate,
        val.Qty = Number(formvalue.qty),
        val.POS = this.getRpfdetatial?.pos,
        val.Amount = Number(formvalue.amt),
        val.Discount = Number(formvalue.discount),
        val.DiscountAmt = formvalue.disAmt,
        val.TotalAmount = this.getRpfdetatial?.totalAmount,
        val.Unit = this.getRpfdetatial?.unit,
        val.Factor = 0,
        val.BaseUnitId = this.getRpfdetatial?.baseUnitID,
        val.SubUnitId = this.getRpfdetatial?.subUnitID,
        val.Flag = 0,
        val.TaxableAmt = this.selectedData?.TaxableAmt,
        val.CGSTAmt = formvalue.cgstAmt,
        val.SGSTAmt = formvalue.sgstAmt,
        val.IGSTAmt = formvalue.igstAmt,
        val.CessAmt = formvalue.cessAmt,
        val.CGSTPer = Number(formvalue.cGst),
        val.SGSTPer = Number(formvalue.sgst),
        val.IGSTPer = Number(formvalue.igst),
        val.CessPer = Number(formvalue.cess),
        val.MRPAmt = this.getRpfdetatial?.mrP_Amt,
        val.BatchNo = this.getRpfdetatial?.batchNo,
        val.ExpiryDate = formatDate(formvalue.expiry, 'yyyy-MM-dd', 'en-US')

    });
console.log("this.itemData",this.itemData);

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
      this.CgstAmt += val?.CGSTAmt;
      this.igstAmt += val?.IGSTAmt;
      this.totalSgst += val?.SGSTAmt;
      this.rounding = 0;
      this.cessAmt += val?.CessAmt
      this.totalTaxtible += val?.TaxableAmt
      delete val?.ProductName
      return
    })

    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "SessionId": 1,
      "RFPNo": this.basicform.value.quotationNo,
      "SupId": localStorage.getItem('sup_id'),
      "QTNDate": formatDate(this.basicform.value.quotationDate, 'yyyy-MM-dd', 'en-US'),
      "TotalAmount": this.toalamt,
      "GrandTotal": 0,
      "SellAmount": 0,
      "VatPer": 0,
      "Description": "",
      "BranchId": "ADS-B1",
      "POS": this.getRpfdetatial.pos,
      "TaxableAmt": this.totalTaxtible,
      "CGSTAmt": this.CgstAmt,
      "SGSTAmt": this.totalSgst,
      "IGSTAmt": this.igstAmt,
      "CessAmt": this.cessAmt,
      "Rounding": 0,
      "FinalAmount": 0,
      "DiscountAmount": this.totaldiscount,
      "listQuotationChild": this.itemData
    }
    console.log("payload",payload);
    

    this.vendorSevice.CreateQuotation(payload).subscribe((res: any) => {
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
          this.rotuer.navigateByUrl('/vendordashboard/total_Quotation')
        }, 3000);
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


