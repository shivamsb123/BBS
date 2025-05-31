import { Component } from '@angular/core';
import { ReportsService } from '../../reports/services/reports.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infraction-page',
  templateUrl: './infraction-page.component.html',
  styleUrls: ['./infraction-page.component.scss']
})
export class InfractionPageComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  infractionReport:any;
  vehicleId:any = ''

  constructor(private reportService:ReportsService, private activateRoute:ActivatedRoute){}

  ngOnInit(){
    this.vehicleId = this.activateRoute.snapshot.paramMap.get("id")
    if(this.vehicleId){
      this.infraction()
    }
   this.initialTable()
  }

  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Category' },
      { key: 'keyValue', val: 'Infraction Details' },
      { key: 'keyValue', val: 'Panalty Rate' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Infraction Status' },
    ]
  }

  infraction() {
    this.isloading = true;
    let payload = {
      "Flag": 0,
      "User_ID": parseInt(localStorage.getItem('user_Id')),
      "Vehicle_ID": parseInt(this.vehicleId) ,
      "FromDate": formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "todate": formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      "status": 2
    }
    this.reportService.InfractionStatusReport(payload).subscribe((res: any) => {
      this.infractionReport = res?.body?.data;
      this.isloading = false;
    })
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
}
