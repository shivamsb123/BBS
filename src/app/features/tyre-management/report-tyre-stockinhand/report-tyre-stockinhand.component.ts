import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-report-tyre-stockinhand',
  templateUrl: './report-tyre-stockinhand.component.html',
  styleUrls: ['./report-tyre-stockinhand.component.scss']
})
export class ReportTyreStockinhandComponent {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  vehicleData: any;
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
      { key: 'keyValue', val: 'Stock In Hand' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'New Tyre' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Retread Tyre' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Stepany Tyre In Stock' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Old Tyre' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Tyre Pending For Retread In Depot' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Tyre With Vendor For Retreading' },
      { key: 'keyValue', val: 'Make' },
      { key: 'keyValue', val: 'Damage tyre' },
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
