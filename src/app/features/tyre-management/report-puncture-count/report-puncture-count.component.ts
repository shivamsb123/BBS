import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-report-puncture-count',
  templateUrl: './report-puncture-count.component.html',
  styleUrls: ['./report-puncture-count.component.scss']
})
export class ReportPunctureCountComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  department: any;
  vehicleData: any;
  constructor(
    private sharedService: SharedService
   ) {}

  ngOnInit(): void {
    this.departmentData()
    this.setInitialtable()
  }
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Bus No' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'KM Installation' },
      { key: 'keyValue', val: 'NSD Location' },
      { key: 'keyValue', val: 'Tyre Installation Date' },
      { key: 'keyValue', val: 'Nsd Name' },
      { key: 'keyValue', val: 'Created By' },
      { key: 'keyValue', val: 'Created Date' },
      { key: 'keyValue', val: 'Updated By' },
      { key: 'keyValue', val: 'Updated Date' },
    ]
  }

  departmentData() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }


  confirm(event:any) {

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  onTableDataChange(event: any) {
    this.page = event;
  };

}
