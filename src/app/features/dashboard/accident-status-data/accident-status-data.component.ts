import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-accident-status-data',
  templateUrl: './accident-status-data.component.html',
  styleUrls: ['./accident-status-data.component.scss']
})
export class AccidentStatusDataComponent implements OnInit {
  flag: string;
  accidentList: any;
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50 , 100];

  constructor(private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.flag = this.route.snapshot.paramMap.get("id");
    this.setInitialTable();
    this.getAccidentList();
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Route No.' },
      { key: '', value: 'Vehicle No.' },
      { key: '', value: 'Driver Name' },
      { key: '', value: 'Date' },
      { key: '', value: 'Case Of Accident' },
      { key: '', value: 'Remark' },
    ]
  }

  onTableSizeChange(event: any): void {
    this.tableSize = parseInt(event.target.value);
    this.page = 1;
    this.getAccidentList()
  }


  getAccidentList() {
    this.isloading = true;
    let payload = {
      "PageNO": this.page,
      "PageSize": this.tableSize,
      "id": 0
    }
    this.dashboardService.totalAccident(payload).subscribe((res: any) => {
   console.log("check res data", res);
   this.accidentList = res?.body?.data;
   this.count = res?.body?.totaL_RECORDS
   this.isloading = false
    })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAccidentList()
  }


}
