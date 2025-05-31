import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../../registration/services/registration.service';

@Component({
  selector: 'app-show-trip',
  templateUrl: './show-trip.component.html',
  styleUrls: ['./show-trip.component.scss']
})
export class ShowTripComponent {
  vehicleData: any;
  department: any;
  routeList: any;
  driverList: any;
  tableData :any;
  searchKeyword:any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];

  constructor(
    private shardService: SharedService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.setInitailaTable()
    this.getVehicleZoneData();
    this.departmentData();
    this.getRouteListData();
    this.getDriverDetail()
  }

  setInitailaTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Serial No' },
      { key: 'keyValue', val: 'Shift On' },
      { key: 'keyValue', val: 'Depot Out' },
      { key: 'keyValue', val: 'Lunch Start' },
      { key: 'keyValue', val: 'Lunch End' },
      { key: 'keyValue', val: 'Depo In' },
      { key: 'keyValue', val: 'Shift Off' },
      { key: 'keyValue', val: 'Days Of Week' },
    ]
  }
  
  getVehicleZoneData() {
    this.shardService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

    /**
*get department data
*/
departmentData() {
  this.shardService.getDepartmentData().subscribe((res: any) => {
    this.department = res?.body?.data;
  });
}

getDriverDetail() {
  this.shardService.getdriverlist().subscribe((res: any) => {
    this.driverList = res?.body?.data;
  })
}


getRouteListData() {
  let newData = {
    value: '',
    text: ''
  };
  let payload = {
    "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
    "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
    "Page_No": 1,
    "Page_Size": 100,
    "Flag": 1,
    "bStatus": 1
  }

  this.registrationService.routeListData(payload).subscribe((res: any) => {
    let data = res?.body?.data;
    if (data && data.length > 0) { }
    this.routeList = data.map((val: any) =>
      newData = {
        value: val?.routE_ID,
        text: val?.routE_NAME +' /' + val?.routE_NO
      }
    )
  })
}


  confirm(event:any) {

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
