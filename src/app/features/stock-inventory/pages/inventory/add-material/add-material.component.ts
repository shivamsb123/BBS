import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkshopService } from 'src/app/features/workshop/services/workshop.service';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.scss']
})
export class AddMaterialComponent {
  @Output() productAdded = new EventEmitter();
  isloading: boolean = false;
  productlist: any;
  selectedValue: any
  tittle: any;
  quantity: any
  productId: any;
  productName: any;
  itemList: any = []
  childTable: any;
  jobCardId: any
  subJobId: any
  subId: any;
  jobId: any;
  table: any;
  productchildList: any;
  editQuantity: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  editData: any;

  constructor(
    private modalService: BsModalService,
    private workshopService: WorkshopService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.initialTable()
    // this.getProductList()
    if (this.subId) {
      this.getProductChild()
    } else {
      this.getProductList()
    }
  }

  initialTable() {
    this.childTable = [
      { key: '', val: 'Sr.No.' },
      { key: '', val: 'Product Name' },
      { key: '', val: 'Quantity' },
      { key: '', val: 'Action' },
    ]

    this.table = [
      { key: '', val: 'Sr.No.' },
      { key: '', val: 'Product Name' },
      { key: '', val: 'Quantity' },
      { key: '', val: 'Action' },
    ]
  }

  getProductList() {
    this.isloading = true
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "PageNO": 1,
      "PageSize": 25,
      "Sno": 0
    }
    this.stockService.productList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.productlist = data.map((val: any) =>
        newData = {
          value: val?.id,
          text: val?.productName
        }
      )
      this.isloading = false
    });
  }

  addProduct() {
    let value = {
      ID: null,
      jobCardId: parseInt(this.jobCardId),
      subJobId: parseInt(this.subJobId),
      proId: this.productId,
      proName: this.productName,
      qty: this.quantity
    }
    this.productAdded.emit(value)
    this.itemList.push(value)
    this.selectedValue = {
      text: '',
      value: ''
    }
    this.quantity = '';
  }

  getProductChild() {
    this.isloading = true
    let payload = {
      "JobCardID": parseInt(this.jobId),
      "SubJobID": parseInt(this.subId)
    }
    this.workshopService.productChild(payload).subscribe((res: any) => {
      this.productchildList = res?.body
      this.isloading = false
    });
  }

  updateProduct(value: any) {
    this.editData = value
    let filteredArray = []
    let data = {
        "id": parseInt(this.editData.id),
        "jobCardId": parseInt(this.editData.jobCardId),
        "subJobId": parseInt(this.editData.subJobID),
        "productId": parseInt(this.editData.productID),
        "qty": parseInt(this.editData.qty)
    }
    filteredArray.push(data)
    console.log("filteredArray",filteredArray);
    this.workshopService.issueMaterial(filteredArray).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.status == 200) {
        this.alertData = {
          message: 'Material Update Succesfully'
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();

      } else {
        this.alertData = {
          message: 'Material Not Updated',
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    });
    this.editQuantity = null;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  confirm(event: any) {
    this.productName = event.assets_no
    this.productId = event.id
  }
  delete(i) {
    this.itemList.splice(i, 1);
  }

  editProduct(index: any) {
    this.editQuantity = index
  }

  cancel() {
    this.modalService.hide();
  }
}
