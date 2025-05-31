import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from '../../http-services/shared.service';
import { TyreService } from '../services/tyre.service';
@Component({
  selector: 'app-report-tyrehistory',
  templateUrl: './report-tyrehistory.component.html',
  styleUrls: ['./report-tyrehistory.component.scss']
})
export class ReportTyrehistoryComponent {

  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  department: any;
  tyrNumberList: any;
 
  constructor(
    private sharedService: SharedService,
    private tyreService: TyreService
   ) {}

  ngOnInit(): void {
    this.departmentData();
    this.getTyreNumber();
    this.setInitialtable();
  }
  
  setInitialtable() {
    this.tableData = [
      { key: 'keyValue', val: 'Depot Name' },
      { key: 'keyValue', val: 'Vendor Name' },
      { key: 'keyValue', val: 'Tyre No' },
      { key: 'keyValue', val: 'Tyre Make' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Fitted Date' },
      { key: 'keyValue', val: 'Km At Which Tyre Fitted' },
      { key: 'keyValue', val: 'Location' },
      { key: 'keyValue', val: 'Removal Tyre Date' },
      { key: 'keyValue', val: 'Kms At Which Tyre Removed' },
      { key: 'keyValue', val: 'Total Km' },
      { key: 'keyValue', val: 'Fitted Tyre Nsd' },
      { key: 'keyValue', val: 'Removal Tyre Nsd' },
      { key: 'keyValue', val: 'Reasons For Removed' },
    ]
  }

  departmentData() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  getTyreNumber() {
    let newData = {
      value:'',
      text:''
    }
    let payload = {
      "Result":""
    }
    this.tyreService.tyreNumber(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.tyrNumberList = data?.map((val:any)=>
      newData = {
        value : val?.tyre_Id,
        text : val?.tyre_No
      })
    })
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
