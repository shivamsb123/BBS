
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from 'src/app/features/shared/components/delete-confirmation/delete-confirmation.component';
import { StockService } from 'src/app/features/stock-inventory/services/stock.service';
@Component({
  selector: 'app-job-cards',
  templateUrl: './job-cards.component.html',
  styleUrls: ['./job-cards.component.scss']
})
export class JobCardsComponent implements OnInit {
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
  jobCardList: any;
  bsModalRef!: BsModalRef

  constructor(
    private stockService: StockService,
    private route: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.setInitialTable()
    this.getJoCardDashboard()
    this.getCardData('')
  }

  setInitialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'S. No.' },
      { key: 'keyValue', val: 'Job Card  No' },
      { key: 'keyValue', val: 'Bus  No' },
      { key: 'keyValue', val: 'Km' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Shift' },
      { key: 'keyValue', val: 'Complaint Report Time' },
      { key: 'keyValue', val: 'Attend Time' },
      { key: 'keyValue', val: 'Types Of Compaint' },
      { key: 'keyValue', val: 'Nature Of Complaint' },
      { key: 'keyValue', val: 'ActionTaken' },
      { key: 'keyValue', val: 'Store Incharge Name' },
      { key: 'keyValue', val: 'Name of Mechanical/Election' },
      { key: 'keyValue', val: 'Action' },
    ]
  }

  getJoCardDashboard() {
    this.isloading = true
    let payload = {
      "pk_jobcard_id": 0,
      "JobCardStatus": this.selectedItem,
      "empId": Number(localStorage.getItem('user_Id') || '')
    }
    this.stockService.jobCardList(payload).subscribe((res: any) => {
      console.log('res',res);
      
      this.isloading = false
      if (res?.body?.status == 'success') {
        this.jobCardList = res?.body?.data
        this.getCardData(this.jobCardList)

      }
    })
  }

  getCardData(cardItem: any) {
    this.complaintDashboardItems = [
      { count: cardItem?.open, label: 'Open', type: 'Open', color: '#17a2b8' },
      { count: cardItem?.pending, label: 'Pending', type: 'Pending', color: '#ffc107' },
      { count: cardItem?.close, label: 'Closed', type: 'Closed', color: '#6c757d' },
    ];
  }

  showList(item: any) {
    this.requestList = []
    console.log("event", item);
    this.selectedItem = item
    this.getJoCardDashboard()

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  generateRequest(path: any) {
    this.route.navigateByUrl(path)
  }
  deleteJobCard(item: any) {
    let payload = {
      "pk_jobcard_id": Number(item?.pk_jobcard_id),
    }
    let url = this.stockService.deleteJobCards(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.jobCardNo,
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
          this.getJoCardDashboard();
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

  addNewJobCard(path: any) {
    this.route.navigateByUrl(path)
  }
  redirectTo(id: any) {
    let url = '/Maintenance/add-job-card/id'.replace(
      "id",
      id
    )
    this.route.navigateByUrl(url)
  }

}
