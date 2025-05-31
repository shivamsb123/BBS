import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-job-card-child-list',
  templateUrl: './job-card-child-list.component.html',
  styleUrls: ['./job-card-child-list.component.scss']
})
export class JobCardChildListComponent {
  jobDetail:any
  jobCardId: any
  isloading: boolean = false;
  tableData: any;
  jobCardChildList: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];


  constructor(
    private modalService: BsModalService,
    private workshopService: WorkshopService,
  ) { }

  ngOnInit() {
    this.initialTable()
    this.getJobList()
  }

  initialTable() {
      this.tableData = [
        { key: 'keyValue', val: 'Description Name' },
        { key: 'keyValue', val: 'Mechanic' },
      ]
  }

  getJobList() {
    this.isloading = true
    this.workshopService.getchildList(this.jobCardId).subscribe((res: any) => {
      this.jobCardChildList = res?.body
      this.isloading = false
    });
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  cancel() {
    this.modalService.hide();
  }
}
