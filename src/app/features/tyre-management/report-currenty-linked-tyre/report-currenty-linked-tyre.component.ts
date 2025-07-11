import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { TyreService } from '../services/tyre.service';

@Component({
  selector: 'app-report-currenty-linked-tyre',
  templateUrl: './report-currenty-linked-tyre.component.html',
  styleUrls: ['./report-currenty-linked-tyre.component.scss']
})
export class ReportCurrentyLinkedTyreComponent {
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
  vehicleData: any;
  selectedValue:any
  department: any;
  tyrNumberList: any;

  constructor(
    private sharedService: SharedService,
    private tyreService: TyreService
   ) {}

  ngOnInit(): void {
    this.setInitialtable();
    this.getVehicleZoneData();
    this.departmentData();
    this.getTyreNumber()
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

  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
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
