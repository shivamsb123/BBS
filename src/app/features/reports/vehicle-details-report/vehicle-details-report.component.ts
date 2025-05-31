import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-vehicle-details-report',
  templateUrl: './vehicle-details-report.component.html',
  styleUrls: ['./vehicle-details-report.component.scss']
})
export class VehicleDetailsReportComponent {
  isloading: boolean = false;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  vehicleData: any;
  selectedVehicle:any;
  selectedValue:any;
  toatlRecordData: any;
  constructor(
    private shardService: SharedService,
    private reportService: ReportsService
  ) { }

  ngOnInit(): void {
    this.setInitialvalue();
    this.getTotalRecord()

  }

  setInitialvalue() {
    this.tableData = [
      { key: 'keyValue', val: 'Total Vehicle' },
      { key: 'keyValue', val: 'Total Driver' },
      { key: 'keyValue', val: 'Total Tyre Change' },
      { key: 'keyValue', val: 'Total Battery Change' },
      { key: 'keyValue', val: 'Total Driver Complain' },
      { key: 'keyValue', val: 'Total Passenger Complain' },
      { key: 'keyValue', val: 'Total Breakdown Complain' },
      { key: 'keyValue', val: 'Total Accident' }
    ]
  }


  getTotalRecord() {
    this.isloading = true;
    let payload = {
      "Result":""
    }

    this.reportService.totalVehicleRecord(payload).subscribe((res:any) => {
      this.toatlRecordData = res?.body?.data
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
