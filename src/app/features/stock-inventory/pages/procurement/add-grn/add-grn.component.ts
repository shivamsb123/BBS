import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
@Component({
  selector: 'app-add-grn',
  templateUrl: './add-grn.component.html',
  styleUrls: ['./add-grn.component.scss']
})
export class AddGrnComponent implements OnInit {
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
  totalamt = 0;
  totalDiscount = 0;
  totalCgstAmt = 0;
  totalIgstAmt = 0;
  totalSgst = 0;
  totalTaxtible: any;
  cessAmt: any;
  quotationMasterid: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  disabled: boolean = false;

  quotationNoList: any;
  poListArr: any[] = []
  selectedIndex: any;
  poListChild: any;
  poChildData: any;
  constructor(
    private route: Router,
    private stockService: StockService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.poId = this.activeRoute.snapshot.paramMap.get("id");
    let data = JSON.parse(localStorage.getItem('item'));
    if (data) {
      this.itemData = data;
    }
    if (this.poId) {
      this.itemData = []
      // this.getPODataFromId();
      this.getPoListChildData()

    }
    this.setInitialValue();
    this.initialTable();
    // this.getPoListChildData()
  }

  setInitialValue() {
    this.basicform = this.fb.group({
      po_no: ['', [Validators.required, Validators.pattern('')]],
      grn_date: [new Date(), [Validators.required, Validators.pattern('')]],
      Pos: ['', [Validators.required, Validators.pattern('')]],
      Description: ['', [Validators.required, Validators.pattern('')]]
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

  getPoListChildData() {
    this.poChildData = []
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "POID": parseInt(this.poId)
    }
    this.stockService.getPoListChild(payload).subscribe((res: any) => {
      let data = res?.body?.data
      this.poListChild = res?.body?.data
      this.isloading = false

      this.basicform = this.fb.group({
        po_no: [data[0].pO_No, [Validators.required, Validators.pattern('')]],
        grn_date: [new Date(), [Validators.required, Validators.pattern('')]],
        Pos: [data[0].pos, [Validators.required, Validators.pattern('')]],
        Description: ['', [Validators.required, Validators.pattern('')]]
      })
      data.forEach((val: any, i:any) => {
        val['SLNo'] = i
        let data = {
          "SLNo": val?.SLNo,
          "ProId": val?.proID,
          "BarCodeId": val?.barcodeID,
          "HsnId": val?.hsnId,
          "HsnCode": val?.hsnCode,
          "SellPrice": 0,
          "TotalQty": val?.qty,
          "AcceptQty": 0,
          "RejectQty": 0,
          "ShortQty": 0,
          "POS": val?.pos,
          "Amount": val?.amount,
          "Discount": val?.discount,
          "DiscountAmt": val?.discountAmt,
          "TotalAmount": val?.totalAmount,
          "Unit": val?.unit,
          "Factor": val?.factor,
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
        
        this.itemData.push(data)
      })
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
        this.productId = res?.body?.data?.proid;
        this.selectedProduct = res?.body?.data?.productName
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

  update(data: any, type: any, i: number) {  
    this.productNameData = []
    this.getProductName();
    this.disabled = false;
    this.showChild = type;
    this.selectedData = data;
    this.serchBarCode = this.selectedData.BarCodeId;
    this.productId = data?.ProId;
    this.selectedProduct = this.selectedData.ProdName;
    let formatdate = this.selectedData?.ExpiryDate.slice(0, 10).split('-').reverse().join('-')
    let formatTime = this.selectedData?.ExpiryDate.slice(11, 20);

    setTimeout(() => {      
      this.productNameData?.forEach((ele:any) => {
        if(ele?.value == this.productId) {
          this.selectedProduct = ele?.text          
        }
      })
    }, 100);

    this.purchaseOrderForm = this.fb.group({
      hsn: [this.selectedData?.HsnCode, [Validators.required, Validators.pattern('')]],
      unit: [this.selectedData?.Unit, [Validators.required, Validators.pattern('')]],
      pRate: ['', [Validators.required, Validators.pattern('')]],
      expiry: [new Date(`${formatdate} ${formatTime}`), [Validators.required, Validators.pattern('')]],
      qty: [this.selectedData?.TotalQty, [Validators.required, Validators.pattern('')]],
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
      cess: [this.selectedData?.CessPer, [Validators.required, Validators.pattern('')]],
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
      if (val?.quotationID == this.selectedData?.quotationID) {
      val.ProdName = this.selectedProduct;
       val.SLNo = this.selectedData?.SLNo,
       val.ProId = this.productId,
       val.BarCodeId = this.serchBarCode,
       val.HsnId = this.selectedData?.HsnId,
       val.HsnCode = formvalue.hsn,
       val.SellPrice =  Number(formvalue.pRate),
       val.TotalQty = Number(formvalue.qty),
       val.AcceptQty = this.selectedData?.AcceptQty,
       val.RejectQty = this.selectedData?.RejectQty,
       val.ShortQty = this.selectedData?.ShortQty,
       val.POS = this.selectedData?.POS,
       val.Amount = Number(formvalue.amt),
       val.Discount = Number(formvalue.discount),
       val.DiscountAmt = Number(formvalue.disAmt),
       val.TotalAmount = this.selectedData?.TotalAmount,
       val.Unit = this.selectedData?.Unit,
       val.Factor =  this.selectedData?.Factor,
       val.BaseUnitId = this.selectedData?.BaseUnitId,
       val.SubUnitId = this.selectedData?.SubUnitId,
       val.Flag = this.selectedData?.Flag,
       val.TaxableAmt = this.selectedData?.TaxableAmt,
       val.CGSTAmt = Number(formvalue.cgstAmt),
       val.SGSTAmt = Number(formvalue.sgstAmt),
       val.IGSTAmt = Number(formvalue.igstAmt),
       val.CessAmt = Number(formvalue.cessAmt),
       val.CGSTPer = Number(formvalue.cGst),
       val.SGSTPer = Number(formvalue.sgst),
       val.IGSTPer = Number(formvalue.igst),
       val.CessPer = Number(formvalue.cess),
       val.MRPAmt = this.selectedData?.MRPAmt,
       val.BatchNo = this.selectedData?.BatchNo,
       val.ExpiryDate = formatDate(formvalue.expiry, 'yyyy-MM-yy hh:mm:ss', 'en-US');
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
  }


  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  grnGenerate(formValue: any) {
    this.totalamt = 0;
      this.totalDiscount = 0;
      this.totalCgstAmt = 0;
      this.totalIgstAmt = 0;
      this.totalSgst = 0;
      this.cessAmt = 0
      this.totalTaxtible = 0
      this.itemData.forEach((val: any) => {
        this.totalamt += val?.Amount;
        this.totalDiscount += val?.DiscountAmt;
        this.totalCgstAmt += val?.CGSTAmt;
        this.totalIgstAmt += val?.IGSTAmt;
        this.totalSgst += val?.SGSTAmt;
        this.cessAmt += val?.CessAmt
        this.totalTaxtible += val?.TaxableAmt
        delete val?.ProdName
        return 
      })
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id')),
      "DeptId": parseInt(localStorage.getItem('dept_id')),
      "SessionId": 1,
      "PONo": formValue.po_no,
      "InvoiceNo": "",
      "InvoiceDate": "",
      "SupId": this.poListChild[0]?.supID,
      "GRNNo": "",
      "GRNDate": formatDate(formValue.grn_date, 'yyyy-MM-dd', 'en-US'),
      "TotalAmount": this.totalamt,
      "GrandTotal": 0,
      "SellAmount": 0,
      "VatPer": 0,
      "Description":formValue.Description,
      "BranchId": "",
      "POS": Number(formValue.Pos),
      "TaxableAmt":this.totalTaxtible,
      "CGSTAmt": this.totalCgstAmt,
      "SGSTAmt": this.totalSgst,
      "IGSTAmt": this.totalIgstAmt,
      "CessAmt": this.cessAmt,
      "Rounding": 0,
      "FinalAmount":0,
      "DiscountAmount": this.totalDiscount,
      "listGRNChild": this.itemData
    }        
    
    this.stockService.createGrn(payload).subscribe((res: any) => {
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
          this.route.navigateByUrl('/vendordashboard/GRN_List')
        }, 2000);

      } else {
        this.alertData = {
          message: 'Grn Not Generated',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }
}



