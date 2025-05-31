import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-held-up',
  templateUrl: './held-up.component.html',
  styleUrls: ['./held-up.component.scss']
})
export class HeldUpComponent {
  outsheldingdata: any;
  flag: string;

  constructor( private dashboardService : DashboardService,
    private router: Router,
    private route: ActivatedRoute,){}
  ngOnInit(): void {
  
    this.flag = this.route.snapshot.paramMap.get("id");
    this.setInitialTable() 
    this.outshelding() 
 console.log(this.flag);
 
  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'OffRoad_Date time' },
      { key: '', value: 'OffRoad_Odometer' },
      { key: '', value: 'Mobile Number' },
      { key: '', value: 'Assets No' },
      { key: '', value: 'Speed Correction' },
      { key: '', value: 'Destination' },
    ]
  }
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  }
  outshelding() {
    let newDta :any;
    let payload = {
      "flag": parseInt(this.flag) || '' ,
      "emp_id":parseInt(localStorage.getItem('user_Id') || ''),
      "view":1,
      "MenuVersion":"v1" 
  
    }
    this.dashboardService.dashboardAllStatus(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data
    });
  }
}
