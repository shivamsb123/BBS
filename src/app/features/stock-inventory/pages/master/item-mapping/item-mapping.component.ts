import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-item-mapping',
  templateUrl: './item-mapping.component.html',
  styleUrls: ['./item-mapping.component.scss']
})
export class ItemMappingComponent {
  searchKeyword: any;
  isloading: boolean = true;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  // imgValue: any;
  bsModalRef!: BsModalRef
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  itemMappingList: any;
  supplierList: any
  selectedSupplier
  itemId: any;
  itemList: any;
  mappingListSearch:any
  tableData2: any;
  isMappingLoading:any
  constructor(
    // private route: Router,
    private stockService: StockService,
    // private modalService: BsModalService,

  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getSupplierData();
    this.getItemList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S. No.' },
      { key: 'keyValue', val: 'Item Name' },
      { key: 'keyValue', val: 'Action' },
    ]

     this.tableData2 = [
      { key: 'keyValue', val: 'S. No.' },
      { key: 'keyValue', val: 'Item Name' },
      { key: 'keyValue', val: 'Supplier Name' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  linkAllItems() {
    const itemsToLink = this.itemMappingList?.filter(item => item.deleted) || [];

    if (itemsToLink.length === 0) {
      this.alertData = {
        message: 'No items available to link.',
      };
      this.alertType = "warning";
      this.alertTrigger = true;
      this.stopAlert();
      return;
    }

    const payload = {
      fk_supplier_id: Number(itemsToLink[0]?.fk_supplier_id),  // Assuming all items belong to same supplier
      Logged_by: Number(localStorage.getItem('user_Id') || ''),
      itemLists: itemsToLink.map(item => ({
        pk_item_id: Number(item?.pk_sup_item_map_id)
      }))
    };

    this.isloading = true;

    this.stockService.linkItem(payload).subscribe((res: any) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (res?.body?.status === 'success') {
        this.alertData = { message: res?.body?.alert };
        this.alertType = "success";
        this.alertTrigger = true;
        this.getItemMappingListById(this.itemId)
        this.stopAlert();
      } else {
        this.alertData = { message: res?.body?.alert };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    });
  }


  linkitem(value: any) {
    if(!this.itemId) return
    console.log('wtyu',this.selectedSupplier);
    
    this.isloading = true;
    let payload = {
      "fk_supplier_id": Number(this.itemId),
      "Logged_by": Number(localStorage.getItem('user_Id') || ''),
      "itemLists": [
        {
          "pk_item_id": Number(value?.pk_item_id)
        },
      ]

    }
    this.stockService.linkItem(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getItemMappingListById(this.itemId)

      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      this.isloading = false;

    })

  }

  deLinkitem(value: any) {
    this.isMappingLoading = true;
    let payload = {
      "fk_supplier_id": Number(value?.fk_supplier_id),
      "pk_item_id": Number(value?.fk_item_id),
      "Logged_by": Number(localStorage.getItem('user_Id') || ''),
      "deleted": value?.deleted == true ? false : value?.deleted == false ? true : ''

    }
    this.stockService.deLinkItemMapping(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getItemMappingListById(this.itemId)

      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      this.isMappingLoading = false;

    })

  }

   getItemList() {
    this.isloading = true;
    let payload = {
      "PageNumber": this.page,
      "PageSize": this.tableSize,
      "SearchTerm": this.searchKeyword ? this.searchKeyword : ""
    }
    this.stockService.itemList(payload).subscribe((res: any) => {
      this.itemList = res?.body?.data;
      this.count = res?.body?.totaL_RECORDS;
      this.isloading = false;

    })
  }
  getItemMappingListById(suppId: any) {
    this.isMappingLoading = true;
    let payload = {
      "pk_supplier_id": Number(suppId)

    }
    this.stockService.getMappingList(payload).subscribe((res: any) => {
      this.itemMappingList = res?.body?.data;
      this.isMappingLoading = false;

    })
  }

  getSupplierData() {
    let newData = {
      value: '',
      text: ''
    };
    this.isloading = true
    let payload = {
      "pk_supplier_id": 0,

    };
    this.stockService.contactList(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.supplierList = data.map((val: any) =>
        newData = {
          value: val?.pk_supplier_id,
          text: val?.supplier_name
        }
      )
      // this.selectedSupplier = this.supplierList[0]
            // console.log('itemId',this.selectedSupplier.value);

      // this.getItemMappingListById(this.selectedSupplier.value)
      this.isloading = false
    })
  }

  confirm(event: any) {
    console.log("event", event);
          this.selectedSupplier = null

    if (event.selectType == 'supplier') {
      this.itemId = event.id
                // this.selectedSupplier = event

      this.getItemMappingListById(event.id);
      console.log('itemId',this.itemId);
      
    }else{
      this.selectedSupplier = null
    }


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
    // this.getItemMappingList()
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getItemMappingList()
  };
}
