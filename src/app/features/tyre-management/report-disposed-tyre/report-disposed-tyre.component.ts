import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-report-disposed-tyre',
  templateUrl: './report-disposed-tyre.component.html',
  styleUrls: ['./report-disposed-tyre.component.scss']
})
export class ReportDisposedTyreComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  department: any;
  
  constructor(
    private sharedService: SharedService
   ) {}

  ngOnInit(): void {
    this.setInitialtable();
    this.departmentData()
  }
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Disposed Make' },
      { key: 'keyValue', val: 'Tyre Nsd' },
      { key: 'keyValue', val: 'Disposed Date' },
      { key: 'keyValue', val: 'Retread Tyre' },
      { key: 'keyValue', val: 'Reason Remark' },
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
