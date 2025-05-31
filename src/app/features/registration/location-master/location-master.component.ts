import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { RegistrationService } from '../services/registration.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Overlay } from 'ol';
import { AddLocationMapComponent } from '../add-location-map/add-location-map.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent implements OnInit {
  department: any;
  zoneList: any;
  overlays: Overlay | null = null;
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  departmentValue: any
  locationData: any;
  constructor(
    private shardService: SharedService,
    private registrationService: RegistrationService,
    private modalService: BsModalService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.departmentData();
    this.setInitialTable()
    this.showRecord()
  }
  bsModalRef?: BsModalRef;
  /**
*get department data
*/
  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data
    });
  }

  setInitialTable() {
    this.tableData = [
      { key: '', val: 'Company' },
      { key: '', val: 'Loaction Name' },
      { key: '', val: 'Latitude' },
      { key: '', val: 'Longitude' },
      { key: '', val: 'State' },
      { key: '', val: 'District' },
      { key: '', val: 'Zone' },
      { key: '', val: 'Location Type' },
      { key: '', val: 'Location No.' },
      { key: '', val: 'Shared With' },
      { key: '', val: 'Google Point' },
    ]
  }

  confirm(event: any) {
    if (event.selectType == 'Department') {
      this.departmentValue = event.id
    }

  }
  openAddlocation() {
    let url = 'Registration/Add_Location';
    this.router.navigateByUrl(url);
  }

  showRecord() {
    this.isloading = true;
    let payload = {
      "userID": 0,
      "stop_ID": 0,
      "stopName": "",
      "stopTypes": "",
      "pageNo": 0,
      "pageSize": 0,
      "depT_ID": this.departmentValue ? parseInt(this.departmentValue) : parseInt(localStorage.getItem('dept_id')),
      "zonE_ID": 0,
      "stoP_TYPE": 0,
      "order_By": "",
      "depT_ID_OTHER": "",
      "is_Google_Point": 0,
      "state": 0,
      "district": 0
    }
    this.registrationService.locationList(payload).subscribe((res:any) => {
      this.locationData = res?.body?.data;
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
