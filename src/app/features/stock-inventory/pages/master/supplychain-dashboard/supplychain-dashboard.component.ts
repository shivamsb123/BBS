import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StockService } from '../../../services/stock.service';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { DashboardChildListComponent } from '../dashboard-child-list/dashboard-child-list.component';
import { ApprovalRequestComponent } from '../approval-request/approval-request.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplychain-dashboard',
  templateUrl: './supplychain-dashboard.component.html',
  styleUrls: ['./supplychain-dashboard.component.scss']
})
export class SupplychainDashboardComponent {
  requestList: any
  tableData: any;
  page = 1;
  count = 0;
  tableSizes = [25, 9, 12];
  tableSize = 25;
  isloading: boolean = false;
  searchKeyword: any
  selectedItem: any = 'Open'
  complaintDashboardItems: any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  bsModalRef!: BsModalRef
  statusDropdown: any;

  constructor(
    private stockService: StockService,
    private modalService: BsModalService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.setInitialTable()
    this.getDashboardData()
    this.getCardData('')
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'S. No.' },
      { key: '', value: 'Request No.' },
      { key: '', value: 'Request Date' },
      { key: '', value: 'Request By' },
      { key: '', value: 'Priority' },
      { key: '', value: 'Request Type' },
      { key: '', value: 'Level' },
      { key: '', value: 'Status' },
      { key: '', value: 'Remarks' },
      { key: '', value: 'Action' },
    ]
  }

  getDashboardData() {
    this.isloading = true
    let payload = {
      "empId": Number(localStorage.getItem('user_Id') || ''),
      "request_status": this.selectedItem
    }
    this.stockService.getDashboardRquestList(payload).subscribe((res: any) => {
      this.isloading = false
      if (res?.body?.status == 'success') {
        this.requestList = res?.body?.data
        this.statusDropdown = res?.body?.actionList
        this.getCardData(this.requestList)

      }
    })
  }

  getCardData(cardItem: any) {
    this.complaintDashboardItems = [
      { count: cardItem?.open, label: 'Open', type: 'Open', color: '#17a2b8' },
      { count: cardItem?.progress, label: 'Progress', type: 'Progress', color: '#ffc107' },
      { count: cardItem?.approved, label: 'Approved', type: 'Approved', color: '#28a745' },
      { count: cardItem?.rejected, label: 'Rejected', type: 'Rejected', color: '#dc3545' },
      { count: cardItem?.closed, label: 'Closed', type: 'Closed', color: '#6c757d' },
      { count: cardItem?.cancelled, label: 'Cancelled', type: 'Cancelled', color: '#343a40' }
    ];
  }

  showList(item: any) {
    this.requestList = []
    console.log("event", item);
    this.selectedItem = item
    this.getDashboardData()

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onShowChildList(value:any,type:any) {
      const initialState: ModalOptions = {
        initialState: {
          Type:type,
          childData:value?.childData
        },
      };
      this.bsModalRef = this.modalService.show(
        DashboardChildListComponent,
        Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
      );
    }

     requestApproved(value:any) {
      const initialState: ModalOptions = {
        initialState: {
          requestId:value?.pk_request_id,
          statusDropdown:this.statusDropdown
        },
      };
      this.bsModalRef = this.modalService.show(
        ApprovalRequestComponent,
        Object.assign(initialState, { class: "modal-md modal-dialog-centered" })
      );
        this.bsModalRef?.content.mapdata.subscribe(
        (value: any) => {
       this.getDashboardData()
        }
      );
    }

    stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

    generateRequest(path: any) {
    this.route.navigateByUrl(path)
  }



}
