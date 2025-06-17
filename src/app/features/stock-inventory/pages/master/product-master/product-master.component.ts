import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = true;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  productList: any;
  imgValue: any;
   bsModalRef!: BsModalRef
    alertData: any = {
      message: "success",
    };
    alertType: any = "success";
    alertTrigger: any = false;
    alertMessage = 'Deleted';

  constructor(
    private route: Router,
    private stockService: StockService,
        private modalService: BsModalService,
    
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getProductList();
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Item Location' },
      { key: 'keyValue', val: 'Item Name' },
      { key: 'keyValue', val: 'Category' },
      { key: 'keyValue', val: 'Sub Category' },
      { key: 'keyValue', val: 'Brand' },
      { key: 'keyValue', val: 'Hsn Code' },
      { key: 'keyValue', val: 'Billing' },
      { key: 'keyValue', val: 'Billing Category Name' },
      { key: 'keyValue', val: 'Unit' },
      { key: 'keyValue', val: 'Amount' },
      { key: 'keyValue', val: 'Tax (%)' },
      { key: 'keyValue', val: 'Net Amount' },
      { key: 'keyValue', val: 'Item Alias' },
      { key: 'keyValue', val: 'Min Alert Value' },
      { key: 'keyValue', val: 'Min Order Value' },
      // { key: 'keyValue', val: 'Description' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  searchItem(){
    this.getProductList()
  }

  getProductList() {
    this.isloading = true;
    let payload = {
      "PageNumber": this.page,
      "PageSize": this.tableSize,
      "SearchTerm": this.searchKeyword ? this.searchKeyword : ""
    }
    this.stockService.itemList(payload).subscribe((res: any) => {
      this.productList = res?.body?.data;
      this.count = res?.body?.totaL_RECORDS;
      this.isloading = false;

    })
  }

  
    deleteItem(item: any) {
      let payload = {
        "pk_item_id": Number(item?.pk_item_id),
        "Logged_by": Number(localStorage.getItem('user_Id') || '')
      }
      let url = this.stockService.deleteItem(payload)
      const initialState: ModalOptions = {
        initialState: {
          title: item?.item_name,
          content: 'Are you sure you want to delete?',
          primaryActionLabel: 'Delete',
          secondaryActionLabel: 'Cancel',
          service: url
        },
      };
      this.bsModalRef = this.modalService.show(
        DeleteConfirmationComponent,
        Object.assign(initialState, {
          id: "confirmation",
          class: "modal-md modal-dialog-centered",
        })
      );
      this.bsModalRef?.content.mapdata.subscribe(
        (value: any) => {
          if (value?.body?.status == 'success') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
            this.alertData = {
              message: value?.body?.alert
            };
            this.alertType = "success";
            this.alertTrigger = true;
            this.stopAlert();
            this.getProductList();
          } else {
            this.alertData = {
              message: value?.body?.alert
            };
            this.alertType = "danger";
            this.alertTrigger = true;
            this.stopAlert();
          }
        }
      );
    }

      stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }


  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
    this.getProductList()
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getProductList()
  };

  AddProduct(path: any, id: any) {
    let url = path.replace('id', id)
    this.route.navigateByUrl(url)
  }

  view(img: any) {
    this.imgValue = img?.imageUpload
  }
}
