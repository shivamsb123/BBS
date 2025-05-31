import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operational',
  templateUrl: './operational.component.html',
  styleUrls: ['./operational.component.scss']
})
export class OperationalComponent {
  flag: string;
  quality: any;
  dynamicCrum: any

  constructor( private dashboardService : DashboardService,
    private router: Router,
    private route: ActivatedRoute,){}
  ngOnInit(): void {
  
    this.flag = this.route.snapshot.paramMap.get("id");
    if(this.flag === '0'){
this.dynamicCrum = 'Minor Fault But OK'
    }
    if(this.flag === '1'){
      this.dynamicCrum = 'Operational'
          }
          if(this.flag === '2'){
            this.dynamicCrum = 'Operational But Not Ok  '
                }

    this.setInitialTable() 
    this.qualityData() 
 console.log(this.flag);
 
  }
  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Action' },
      { key: '', value: 'Entry By' },
      { key: '', value: 'Entry On' },
      { key: '', value: 'Vehicle Number' },
      { key: '', value: 'Remark(s)' },
      { key: '', value: 'Status' },
      { key: '', value: 'Document' },
      { key: '', value: 'Location' },
    
   
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
  qualityData() {
    let newDta :any;
    let payload = {
      "flag":2,
      "emp_id":parseInt(localStorage.getItem('user_Id') || '208'),
      "view":parseInt(this.flag),
      "MenuVersion":"v1" 
  
  
    }
    this.dashboardService.quality(payload).subscribe((res: any) => {
      this.quality = res?.body?.data
    });
  }
}
