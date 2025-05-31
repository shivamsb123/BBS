import { formatDate } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.component.html',
  styleUrls: ['./delivery-challan.component.scss']
})
export class DeliveryChallanComponent {
  isloading: boolean = false;
  challanForm!: FormGroup;
  itemCreateform: any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  tableData: { key: string; val: string; }[];
  vehicleData: any;
  selectedVehicle: any;
  po_no: any;
  barcodeData: any;
  productNameData: any;
  serchBarCode: any;
  searchProductName: any;
  statelistdiv: boolean = false;
  productdiv: boolean = false;
  disabled: boolean = false;
  selectedProduct: any = '';
  selectedbar: any = '';
  productId: any;
  isDisable: boolean = false;
  disablerop: boolean = false;
  itemData: any[] = [];
  selectedData: any;
  vendorList: any;
  vendorName: any;
  posListData: any;
  selectedPOS: any;

  constructor(private fb: FormBuilder, private sharedService: SharedService, private activateRoute: ActivatedRoute, private stockService: StockService, private vendorService:VendorService, private  route:Router) { }

  ngOnInit() {
    this.po_no = this.activateRoute.snapshot.paramMap.get("id");
    let data = JSON.parse(localStorage.getItem('item'));
    if (data) {
      this.itemData = data;
      console.log("itemdata", data);

    }
    this.setInitialValue()
    this.initialTable()
    this.getVehicleZoneData()
    this.getVendorList()
    this.getPosList()
  }

  setInitialValue() {
    this.challanForm = this.fb.group({
      challan_no: ['', [Validators.required, Validators.pattern('')]],
      challan_date: [new Date(), [Validators.required, Validators.pattern('')]],
      challan_type: ['1', [Validators.required, Validators.pattern('')]],
      party_name: ['1', [Validators.required, Validators.pattern('')]],
      party_address: ['', [Validators.required, Validators.pattern('')]],
      place_of_supply: ['1', [Validators.required, Validators.pattern('')]],
      vehicle_no: ['1', [Validators.required, Validators.pattern('')]],
      transport_id: ['', [Validators.required, Validators.pattern('')]],
      distance: ['', [Validators.required, Validators.pattern('')]],
      company_address: ['', [Validators.required, Validators.pattern('')]],
    })

    this.itemCreateform = this.fb.group({
      productName: ['', [Validators.required, Validators.pattern('')]],
      barcodeNo: ['', [Validators.required, Validators.pattern('')]],
      unit: ['', [Validators.required, Validators.pattern('')]],
      amt: ['', [Validators.required, Validators.pattern('')]],
      qty: ['', [Validators.required, Validators.pattern('')]],
      rate: ['', [Validators.required, Validators.pattern('')]],
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
      { key: 'keyValue', val: 'BarCode No' },
      { key: 'keyValue', val: 'Product Name' },
      { key: 'keyValue', val: 'Quantity' },
      { key: 'keyValue', val: 'Rate' },
      { key: 'keyValue', val: 'Estimated Taxable Value' },
      { key: 'keyValue', val: 'Sgst Rate %' },
      { key: 'keyValue', val: 'Sgst Tax' },
      { key: 'keyValue', val: 'Cgst Rate %' },
      { key: 'keyValue', val: 'Cgst Tax' },
      { key: 'keyValue', val: 'Igst Rate %' },
      { key: 'keyValue', val: 'Igst Tax' },
      { key: 'keyValue', val: 'Cess Rate %' },
      { key: 'keyValue', val: 'Cess Tax ' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
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

        this.selectedData = res?.body?.data;
        this.selectedProduct = res?.body?.data?.proid;

        this.itemCreateform = this.fb.group({
          productName: [res?.body?.data?.productName, [Validators.required, Validators.pattern('')]],
          barcodeNo: [res?.body?.data?.barcodeid, [Validators.required, Validators.pattern('')]],
          unit: [res?.body?.data?.unitName, [Validators.required, Validators.pattern('')]],
          amt: ['', [Validators.required, Validators.pattern('')]],
          qty: ['', [Validators.required, Validators.pattern('')]],
          rate: ['', [Validators.required, Validators.pattern('')]],
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
      this.selectedbar = '';
      this.searchProductName = ''
      this.isDisable = true;
    })
  }


  onSelectBarData(data: any) {
    this.itemCreateform.controls['barcodeNo'].patchValue(data?.text)
    this.selectedbar = data?.value;
    this.itemCreateform.value['productName'] = ''
    this.getDetailsformBarCode()
  }

  onSelectproductData(data: any) {
    this.selectedbar = ''
    this.itemCreateform.controls['productName'].setValue(data?.text)
    this.selectedProduct = data?.value;
    this.getDetailsformBarCode()
  }

  createItem(formvalue: any) {
    console.log("formvalue", formvalue);

    let index = this.itemData?.findIndex((val: any) => formvalue?.barcodeNo == val?.BarCodeId);
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
        BarCodeNo: formvalue?.barcodeNo,
        ProductName: formvalue?.productName,
        Quantity: parseInt(formvalue?.qty),
        EstimatedRate: formvalue?.rate? formvalue?.rate.toString():'',
        EstimatedTaxableValue: formvalue?.amt,
        CgstPer: parseInt(formvalue?.cGst),
        Cgst_Amt: formvalue?.cgstAmt,
        SgstPer: parseInt(formvalue?.sgst),
        Sgst_Amt: formvalue?.sgstAmt,
        IgstPer: formvalue?.igst,
        Igst_Amt: formvalue?.igstAmt,
        CessRate: parseInt(formvalue?.cess),
        Challan_No: "",
        PO_No: "",
        Challan_Date: "",
        Total_Amount: 0,
        Description: ""
        // Cess_Amt: formvalue?.cessAmt,
      };

      this.itemData.push(data);
      localStorage.setItem('item', JSON.stringify(this.itemData));
      console.log("this.itemData", this.itemData);

    }
    this.itemCreateform.reset()
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
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
      console.log("",data);
      
      this.vendorList = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.vendorName
        }
      )
    })
  }

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

  // changedisvalue() {
  //   let discountvalue = this.itemCreateform.value.amt * this.itemCreateform.value.discount / 100;
  //   this.itemCreateform.controls['disAmt'].setValue(discountvalue);
  //   if (this.itemCreateform.value.disAmt) {
  //     let disNetvalue = this.itemCreateform.value.amt - this.itemCreateform.value.disAmt;
  //     this.itemCreateform.controls['netAmt'].setValue(disNetvalue);
  //   } else {
  //     this.itemCreateform.controls['netAmt'].setValue(0);
  //   }
  // }

  changCgstAmt() {
    let cgstAmtValue = this.itemCreateform.value.amt * this.itemCreateform.value.cGst / 100;
    this.itemCreateform.controls['cgstAmt'].setValue(cgstAmtValue);
  }

  changSgstAmt() {
    let cgstAmtValue = this.itemCreateform.value.amt * this.itemCreateform.value.sgst / 100;
    this.itemCreateform.controls['sgstAmt'].setValue(cgstAmtValue);

    let igstAmitvale = parseInt(this.itemCreateform.value.cGst) + parseInt(this.itemCreateform.value.sgst);
    this.itemCreateform.controls['igst'].setValue(igstAmitvale);

    let sgstAmtValue = this.itemCreateform.value.amt * this.itemCreateform.value.igst / 100;
    this.itemCreateform.controls['igstAmt'].setValue(sgstAmtValue);
  }

  // changIgstAmt() {
  //   let cgstAmtValue = this.itemCreateform.value.amt * this.itemCreateform.value.igst / 100;
  //   this.itemCreateform.controls['igstAmt'].setValue(cgstAmtValue);
  // }

  changCessAmt() {
    let CessAmtValue = this.itemCreateform.value.amt * this.itemCreateform.value.cess / 100;
    this.itemCreateform.controls['cessAmt'].setValue(CessAmtValue);
  }

  changePRValue() {
    let prvalue = this.itemCreateform.value.amt / this.itemCreateform.value.qty;
    this.itemCreateform.controls['rate'].setValue(prvalue);
  }

  submitChallan() {

    let payload = {
      "challanID": parseInt(this.challanForm.value.challan_no),
      "UserId": localStorage.getItem('user_Id') || '',
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "SessionId": 1,
      "PO_No": this.po_no,
      "Challan_Date": formatDate(this.challanForm.value.challan_date, 'yyyy-MM-dd hh:mm:ss', "en-US"),
      "Challan_Type": "",
      "Party_Name": this.vendorName,
      "Party_Address": this.challanForm.value.party_address,
      "POS": this.selectedPOS,
      "Transaction_Id": parseInt(this.challanForm.value.transport_id),
      "Distance": this.challanForm.value.distance,
      "Company_Address": this.challanForm.value.company_address,
      "CreatedBy": "",
      "SupId": "",
      "SupName": "",
      "lisChallanChildTable": this.itemData
    }
    console.log("check payload", payload);

    this.vendorService.challan(payload).subscribe((res: any) => {
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
          this.route.navigateByUrl('/vendordashboard/Challan_list')
        }, 2000);

      } else {
        this.alertData = {
          message: 'Challan Not Generated',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }
  

  confirm(event: any) {
    if (event.selectType == 'Vendor') {
      this.vendorName = event.assets_no;
    } else if (event.selectType == 'vehicle') {
      this.selectedVehicle = event.assets_no
      console.log("this.vendorName", this.selectedVehicle);
    }else if(event.selectType == 'Pos'){
      this.selectedPOS = event.assets_no
      console.log("pos",this.selectedPOS);
    }

  }
}
