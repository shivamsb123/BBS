import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { SharedService } from '../../http-services/shared.service';

@Component({
  selector: 'app-update-rc',
  templateUrl: './update-rc.component.html',
  styleUrls: ['./update-rc.component.scss']
})
export class UpdateRCComponent implements OnInit {
  tableData: any
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  company: any;
  department: any;
  rcDetailList: any;
  isloading: boolean = false;
  searchKeyword:any

  constructor(
    private registrationService: RegistrationService,
    private shardService: SharedService
  ) { }

  ngOnInit(): void {
    this.setTaleData();
    this.departmentData()
  }

  setTaleData() {
    this.tableData = [
      { key: 'stauts', value: 'Status' },
      { key: 'stauts', value: 'Company' },
      { key: 'stauts', value: 'IMEI No' },
      { key: 'stauts', value: 'Mobile No' },
      { key: 'stauts', value: 'Asset No' },
      { key: 'stauts', value: 'Assets Type' },
      { key: 'stauts', value: 'Vendor' },
      { key: 'stauts', value: 'Model' },
      { key: 'stauts', value: 'Receipt No' },
      { key: 'stauts', value: 'RC Regn No' },
      { key: 'stauts', value: 'RC Owner Name' },
      { key: 'stauts', value: 'RC Name' },
      { key: 'stauts', value: 'RC Present Addr' },
    ]
  }

    /**
 *get department data
 */
 departmentData() {
  this.shardService.getDepartmentData().subscribe((res: any) => {
    this.department = res?.body?.data;
  });
}

  confirm(event:any) {
    this.company = event.id
    this.getRcDetailsList()
  }

  getRcDetailsList() {
  this.isloading = true;
    let payload = {
      "PageNo": 1,
      "PageSize": 100,
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "DEPT_ID": parseInt(this.company || ''),
      "ASSET_NO": "",
      "MOBILE_NO": "",
      "DEVICE_ID": "",
      "ID": 0,
      "FLAG": 1

    }
    this.registrationService.RcDetailsList(payload).subscribe((res: any) => {
      this.rcDetailList = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
