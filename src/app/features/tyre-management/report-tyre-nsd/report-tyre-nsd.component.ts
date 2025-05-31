import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-report-tyre-nsd',
  templateUrl: './report-tyre-nsd.component.html',
  styleUrls: ['./report-tyre-nsd.component.scss']
})
export class ReportTyreNsdComponent {
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
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'NSD Date' },
      { key: 'keyValue', val: 'FRT RH' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
      { key: 'keyValue', val: 'FRT LH' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
      { key: 'keyValue', val: 'RR Rhs Inner' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
      { key: 'keyValue', val: 'RR Rhs Outer' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
      { key: 'keyValue', val: 'RR Lhs Inner' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
      { key: 'keyValue', val: 'RR Lhs Outer' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
      { key: 'keyValue', val: 'Milo Km' },
      { key: 'keyValue', val: 'Tyre Type ' },
      { key: 'keyValue', val: 'Tyre Ware' },
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
