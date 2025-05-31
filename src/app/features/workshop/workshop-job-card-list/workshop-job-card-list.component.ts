import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopService } from '../services/workshop.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { JobCardChildListComponent } from '../job-card-child-list/job-card-child-list.component';

@Component({
  selector: 'app-workshop-job-card-list',
  templateUrl: './workshop-job-card-list.component.html',
  styleUrls: ['./workshop-job-card-list.component.scss']
})
export class WorkshopJobCardListComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsmodal!: BsModalRef;
  jobCardList: any;

  constructor(
    private route: Router,
    private workshopService: WorkshopService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getJobList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Seriol No.' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Odometer Reading' },
      { key: 'keyValue', val: 'Incharge (Created By)' },
      { key: 'keyValue', val: 'Creation Date & Time' },
      { key: 'keyValue', val: 'Scheduled Date & Time' },
      { key: 'keyValue', val: 'Delivery Date & Time' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  getJobList() {
    this.isloading = true
    let payload = {
      "date": null,
      "createdby": null,
      "vehicleId": null
    }
    this.workshopService.jobCardList(payload).subscribe((res: any) => {
      this.jobCardList = res?.body
      this.isloading = false
    });
  }

  viewDetail(id: any,job:any) {
    const initialState: ModalOptions = {
      initialState: {
        jobCardId: id,
        jobDetail:job
      },
    };

    this.bsmodal = this.modalService.show(
      JobCardChildListComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );

  }

  /**
* tabel size chage method
* @param event 
*/
  onTableSizeChange(event: any): void {
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  };

  AddJobCard(path: any, data: any) {
    let url = path.replace('id', data?.jobCardID)
    this.route.navigateByUrl(url, { state: data})
  }
}
