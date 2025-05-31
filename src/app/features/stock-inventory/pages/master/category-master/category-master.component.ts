

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-category-master',
  templateUrl: './category-master.component.html',
  styleUrls: ['./category-master.component.scss']
})
export class CategoryMasterComponent implements OnInit{

  searchKeyword:any;
  isloading:boolean= false;
  page= 1;
  count= 0;
  tableSize= 25;
  tableSizes= [25, 50, 100];
  tableData:any;
  categoryData: any;
 bsModalRef!: BsModalRef
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  constructor(
    private route: Router,
    private StockService: StockService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.initialTable();
    this.getCategoryList()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S No' },
      { key: 'keyValue', val: 'Category Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getCategoryList() {
    this.isloading = true
    let payload = {
      "pk_category_id":0
    }
    this.StockService.categoryList(payload).subscribe((res:any) => {
      this.categoryData = res?.body?.data;
      
      this.isloading = false;
    })
  }

   deleteCategory(item: any) {
        let payload = {
          "pk_category_id": Number(item?.pk_category_id),
          "Logged_by": Number(localStorage.getItem('user_Id') || '')
        }
        let url = this.StockService.deleteCategory(payload)
        const initialState: ModalOptions = {
          initialState: {
            title: item?.category_name,
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
              this.getCategoryList();
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

    AddCategory(path:any) {
      this.route.navigateByUrl(path)
    }
    redirectTo(id:any){
      let url = '/SupplyChain/Add-category/id'.replace("id",id)
      this.route. navigateByUrl(url)
    }
}

