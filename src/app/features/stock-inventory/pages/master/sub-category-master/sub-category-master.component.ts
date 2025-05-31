import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-sub-category-master',
  templateUrl: './sub-category-master.component.html',
  styleUrls: ['./sub-category-master.component.scss']
})
export class SubCategoryMasterComponent implements OnInit {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  subCategoryData: any;
  categoryData: any;
  selectedValue: any;
  category: any;
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
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getCategoryList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S NO' },
      { key: 'keyValue', val: 'Sub Category Name' },
      { key: 'keyValue', val: 'Category Name' },
      { key: 'keyValue', val: 'Action' }
    ]
  }

  getCategoryList() {
    let newData = {
      value: '',
      text: ''
    };
    let payload = {
      "pk_category_id": 0
    }
    this.stockService.categoryList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.categoryData = data.map((val: any) =>
        newData = {
          value: val?.pk_category_id,
          text: val?.category_name
        }
      )
      if (this.categoryData.length > 0) {
        const firstCategory = this.categoryData[0];
        this.selectedValue = firstCategory; // bind this to the select-filter

        this.category = firstCategory.value; // update category id
        this.getSubcategoryData();           // fetch subcategories
      }
    });

  }

  getSubcategoryData() {
    this.isloading = true;
    let payload = {
      "fk_category_id": Number(this.category),
      "pk_subcategory_id": 0
    };
    this.stockService.subCategoryList(payload).subscribe((res: any) => {
      this.subCategoryData = res?.body?.data;
      this.isloading = false
    })
  }

  redirectTo(id: any) {
    let url = '/SupplyChain/Add-Subcategory/id/catId'.replace(
      "id",
      id
    ).replace('catId',this.category)
    this.route.navigateByUrl(url)
  }


  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  confirm(event: any) {
    console.log('event', event);

    this.category = event.id;
    this.selectedValue = {
      value: event.id,
      text: event.assets_no
    };
    this.getSubcategoryData();
  }

     deleteSubCategory(item: any) {
        let payload = {
          "pk_subcategory_id": Number(item?.pk_subcategory_id),
        }
        let url = this.stockService.deleteSubcategory(payload)
        const initialState: ModalOptions = {
          initialState: {
            title: item?.subcategory_name,
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
              this.getSubcategoryData();
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
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  AddSubCategory(path: any) {
    this.route.navigateByUrl(path)
  }
}

