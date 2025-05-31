import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { RegistrationService } from '../../registration/services/registration.service';
import { SharedService } from '../../http-services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { StopListPopupComponent } from '../stop-list-popup/stop-list-popup.component';
@Component({
  selector: 'app-routes-status-all-data',
  templateUrl: './routes-status-all-data.component.html',
  styleUrls: ['./routes-status-all-data.component.scss']
})
export class RoutesStatusAllDataComponent implements OnInit {
  @ViewChild("staticTabs", { static: true }) staticTabs?: TabsetComponent;
  outsheldingdata: any;
  flag: string;
  tabId: string = '2';
  tableData2: any;
  tableData3: any;
  tableData4: any;
  routeList: any;
  driverList: any;
  isloading: boolean = false;
  tableData: any;
  routeCount = {
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100]
  }
  vehicleData: any;
  selectedVehicle: any;
  routeform!: FormGroup;
  selectedValue: any;
  stopWiseList: any;
  bsModalRef!: BsModalRef

  diverData = {
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100]
  }

  stopVehicleData = {
    page: 1,
    count: 0,
    tableSize: 25,
    tableSizes: [25, 50, 100]
  }

  constructor(
    private dashboardService: DashboardService,
    private registrationService: RegistrationService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getVehicleZoneData()
    this.setInitialValue()

    this.flag = this.route.snapshot.paramMap.get("id");
    if (this.flag == '1') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[0].active = true;
    } else if (this.flag == '2') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[1].active = true;
    } else if (this.flag == '3') {
      this.tabId = this.flag;
      this.staticTabs!.tabs[2].active = true;
    }
    this.setInitialTable()
    this.getRouteListData();

  }

  setInitialTable() {
    this.tableData = [
      // { key: '', value: 'Sr. no.' },
      { key: '', value: 'Route Name' },
      { key: '', value: 'Route Id' },
      { key: '', value: 'Stop Details' }
    ],

      this.tableData2 = [
        { key: '', value: 'Driver Name' },
        { key: '', value: 'Driver Id' },
      ]

    this.tableData3 = [
      { key: '', value: 'Route no' },
      { key: '', value: 'Route Name' },
      { key: '', value: 'Stop Name' },
      { key: '', value: 'Action' },
    ]
  }

  setInitialValue() {
    this.routeform = this.fb.group({
      fromDate: [new Date(), [Validators.required, Validators.pattern('')]],
      toDate: [new Date(), [Validators.required, Validators.pattern('')]]
    })
  }


  outshelding() {
    let newDta: any;
    let payload = {
      "flag": parseInt(this.tabId) || '',
      "emp_id": parseInt(localStorage.getItem('user_Id') || ''),
      "view": 1,
      "MenuVersion": "v1"

    }
    this.dashboardService.dashboardAllStatus(payload).subscribe((res: any) => {
      this.outsheldingdata = res?.body?.data
    });
  }

  onTablValue(id: any) {
    this.tabId = id;
    if (this.tabId === '1') {
      this.getRouteListData();
    } else if (this.tabId == '2') {
      this.getDriverDetail()
    }

    // this.outshelding()
  }

  getRouteListData() {
    this.isloading = true;
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "Page_No": this.routeCount.page,
      "Page_Size": this.routeCount.tableSize,
      "Flag": 1,
      "bStatus": 1,
    }

    this.registrationService.routeListData(payload).subscribe((res: any) => {
      this.routeList = res?.body?.data;
      this.routeCount.count = this.routeList?.length;
      this.isloading = false;
    })
  }

  getStopWiseVehicle(formValue: any) {
    this.isloading = true;
    let payload = {
      "Result": "",
      "ASSET_NO": this.selectedVehicle,
      "FROM_TIME": formValue.fromDate ? formatDate(formValue.fromDate, 'yyyy-MM-dd hh:mm:ss', 'en-US') : '',
      "TO_TIME": formValue.fromDate ? formatDate(formValue.toDate, 'yyyy-MM-dd hh:mm:ss', 'en-US') : ''
    }

    this.dashboardService.stopWise(payload).subscribe((res: any) => {
      this.stopWiseList = res?.body?.data
      this.isloading = false;
    })
  }

  getDriverDetail() {
    this.isloading = true;
    this.sharedService.getdriverlist().subscribe((res: any) => {
      this.driverList = res?.body?.data;
      this.isloading = false;
    })
  }

  onTableSizeChange(event: any): void {
    this.routeCount.tableSize = parseInt(event.target.value);
    this.routeCount.page = 1;
    this.getRouteListData()
  }

  onTableDataChange(event: any) {
    this.routeCount.page = event;
    this.getRouteListData()
  }

  onDriverTableChange(event: any) {
    this.diverData.tableSize = event;
    this.diverData.page = 1;
  }

  onDriverDataChange(event: any) {
    this.diverData.page = event;
  }

  onStopVehicleSizeChange(event: any) {
    this.stopVehicleData.tableSize = event.target.value;
    this.stopVehicleData.page = 1;
  }

  onStopVehicleDataChange(event: any) {
    this.stopVehicleData.page = event;
  }


  /**
  * vehicle list here
  */
  getVehicleZoneData() {
    this.sharedService.getVehicleZone().subscribe((res: any) => {
      this.vehicleData = res?.body?.data;
    })
  }

  confirm(event: any) {
    this.selectedVehicle = event.assets_no
    console.log("this.selectedVehicle", this.selectedVehicle);

  }

  cancel() {
    this.routeform.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }

  }

  onShowStop(route:any) {
    const initialState: ModalOptions = {
      initialState: {
        route:route
      },
    };
    this.bsModalRef = this.modalService.show(
      StopListPopupComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }
}