import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-reporttyre-linkingforbus',
  templateUrl: './reporttyre-linkingforbus.component.html',
  styleUrls: ['./reporttyre-linkingforbus.component.scss']
})
export class ReporttyreLinkingforbusComponent {

  bsValue = new Date();
  bsRangeValue: Date[];
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
    this.departmentData()
    this.setInitialtable()
  }
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Invoice Date' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Install In Bus No' },
      { key: 'keyValue', val: 'Date Of Tyre Install' },
      { key: 'keyValue', val: 'status' },
      { key: 'keyValue', val: 'Tyre Removed Date' },
      { key: 'keyValue', val: 'Tyre Dead Average Age Month' },
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
