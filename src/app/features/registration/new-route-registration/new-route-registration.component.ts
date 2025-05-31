import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import * as L from 'leaflet';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AddNewStopComponent } from '../add-new-stop/add-new-stop.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { SortablejsModule } from 'ngx-sortablejs';
import { RegistrationService } from '../services/registration.service';
import { TrackingService } from '../../tracking/tracking.service';
import { NotificationService } from '../../http-services/notification.service';
import { ShowRouteOnMapComponent } from '../show-route-on-map/show-route-on-map.component';

@Component({
  selector: 'app-new-route-registration',
  templateUrl: './new-route-registration.component.html',
  styleUrls: ['./new-route-registration.component.scss'],
})
export class NewRouteRegistrationComponent {
  alertData: any = {
    message: 'success',
  };
  alertType: any = 'success';
  alertTrigger: any = false;
  bsModalRef?: BsModalRef;
  addRoute!: FormGroup;
  selectedValue: any;
  routeValue: any;
  routeId: any;
  stopDeatils: any;
  selectedRouteData: any = [];
  selectedStop: any = [];
  department: any;
  listVehicleStopDetails: any;
  multiselection: boolean = true;
  closeDropdown: boolean = true;
  multiselected: any;
  selectedRouteName: any;
  sortOrderr: any = 'asc'; // Default sorting order
  sortByy: any = 'index'; // Default property to sort by
  options: SortablejsModule = {
    group: 'test',
  };
  showCount: number = 12;
  showMore: boolean = false;
  isRouteLoading: boolean;
  button = 'Add Record';
  routeList: any;
  selectedRouteId: any;
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 75];
  bsmodelRef : BsModalRef

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sharedService: SharedService,
    private registrationService: RegistrationService,
    private trackingService: TrackingService,
    private notificationService : NotificationService,
    private bsmodelService: BsModalService
  ) {}

  ngOnInit(): void {
    this.departmentData();
    this.setInitialValue();
    this.getRouteListData();
    this.getStoplist();
    this.setInitialTable()
  }
  setInitialValue() {
    this.addRoute = this.fb.group({
      company: ['', [Validators.required, Validators.pattern('')]],
      route_no: ['', [Validators.required, Validators.pattern('')]],
      route_name: ['', [Validators.required, Validators.pattern('')]],
      scheduelKm: ['', [Validators.required, Validators.pattern('')]],
      direction: ['BOTH', [Validators.required, Validators.pattern('')]],
      // scheduleTime: ['', [Validators.required, Validators.pattern('')]]
    });
  }

  setInitialTable() {
    this.tableData = [
      { key: '', value: 'Route No' },
      { key: '', value: 'Route Name' },
      // { key: '', value: 'Origin' },
      // { key: '', value: 'Destination' },
      { key: '', value: 'Scheduled KM' },
      { key: '', value: 'Action' }
    ]
  }

  getRouteListData() {
    this.isRouteLoading = true;
    let payload = {
      DEPT_ID: parseInt(localStorage.getItem('dept_id')),
      USER_ID: parseInt(localStorage.getItem('user_Id') || ''),
      Page_No: 1,
      Page_Size: 100,
      Flag: 2,
      bStatus: 1,
    };
    this.registrationService.routeListData(payload).subscribe((res: any) => {
      this.routeList = res?.body?.data;
      this.isRouteLoading = false;
    });
  }

  getStoplist() {
    let newData = {
      value: '',
      text: '',
    };
    let payload = {
      route_id: 0,
      user_id: parseInt(localStorage.getItem('user_Id') || ''),
      dept_id: parseInt(localStorage.getItem('dept_id') || ''),
      direction: 1,
      ReqFor: 2,
    };
    this.trackingService.getStopData(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.stopDeatils = res?.body?.data;
      this.listVehicleStopDetails = data.map(
        (val: any) =>
          (newData = {
            value: val?.stopId,
            text: val?.stopName,
          })
      );
    });
  }

  onAddNewStop() {
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(
      AddNewStopComponent,
      Object.assign(initialState, { class: 'modal-xl modal-dialog-centered' })
    );
  }

  /**
   *get department data
   */
  departmentData() {
    this.sharedService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  confirm(event: any) {
    if (event.selectType == 'Stop') {
      this.routeValue = event.assets_no;
      this.routeId = event.id;
      this.changeSelection();
      this.selectedStop = this.selectedRouteData?.map((val) => ({
        StopId: val.stopId,
        StopName: val.stopName,
        ScheduledKM: this.addRoute.get('scheduelKm').value,
      }));
    } else if (event.selectType == 'AllVehicle') {
      this.formatAllVehicle(event);
    } else {
      this.addRoute.controls['company'].setValue(event.id);
    }
  }

  formatAllVehicle(event: any) {
    if (!event?.data || event.data == null) {
      this.selectedRouteData = [];
      this.selectedStop = [];
      return;
    }

    const anyVehicleSelected =
      this.selectedRouteData.length !== this.stopDeatils.length;

    if (anyVehicleSelected) {
      this.selectedRouteData = [];
    }
    this.selectedRouteData = [...this.stopDeatils];
    setTimeout(() => {
      this.selectedStop = this.selectedRouteData.map((val) => ({
        StopId: val.stopId,
        StopName: val.stopName,
        ScheduledKM: this.addRoute.value?.scheduelKm,
      }));
    }, 100);
    console.log(
      'check selectedRouteData',
      this.selectedRouteData,
      this.stopDeatils.length
    );
  }

  changeSelection() {
    if (this.routeId && this.routeValue) {
      this.stopDeatils?.forEach((val: any) => {
        if (val.stopId == this.routeId) this.selectedRouteData?.push(val);
      });
    } else if (this.routeId && !this.routeValue) {
      let index = this.selectedRouteData?.findIndex(
        (x: any) => x.stopId == this.routeId
      );
      this.selectedRouteData?.splice(index, 1);
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 100);
  }

  onDrop(event: any) {
    setTimeout(() => {
      this.selectedStop = this.selectedRouteData.map((val) => ({
        StopId: val.stopId,
        StopName: val.stopName,
        ScheduledKM: this.addRoute.value?.scheduelKm,
      }));
      this.cdr.detectChanges();
    }, 100);
  }

  toggleShowMoreLess() {
    this.showMore = !this.showMore;
    this.showCount = this.showMore ? this.selectedRouteData.length : 30;
  }

  submit(formvalue: any) {
    if (!this.selectedStop || this.selectedStop?.length === 0) {
      this.notificationService.showInfo('Stop Must be Selected');
      return; 
    }
    let payload = {
      DeptId: parseInt(formvalue.company || ''),
      UserId: parseInt(localStorage.getItem('user_Id') || ''),
      RouteNo: formvalue.route_no,
      RouteName: formvalue.route_name,
      ScheduledKM: formvalue.scheduelKm,
      NoOfStops: this.selectedStop ? this.selectedStop?.length : 0,
      Direction: formvalue.direction,
      listRoutesStops: this.selectedStop,
    };
    let service: any;
    if (this.button === 'Update Record') {
      payload['RouteId'] = this.selectedRouteId;
      service = this.registrationService.updateRouteDetails(payload);
    } else {
      service = this.registrationService.addNewRoute(payload);
    }

    service.subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = 'success';
        this.alertTrigger = true;
        this.stopAlert();
        this.getRouteListData();
        this.button = 'Add Record';
        this.selectedRouteData = [];
        this.multiselected = [];
        // this.clearMap();
        this.addRoute.reset();
        this.addRoute.controls['direction'].patchValue('BOTH');
        this.selectedValue = {
          value: '',
          text: '',
        };
      } else {
        this.alertData = {
          message: res?.body?.alert,
        };
        this.alertType = 'danger';
        this.alertTrigger = true;
        this.stopAlert();
      }
    });
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  onTableSizeChange(event: any, type: any): void {
    if (type == 'routepage') {
      this.tableSize = event.target.value;
      this.page = 1;
    } 
  }

  onTableDataChange(event: any, type: any) {
    if (type == 'routepage') {
      this.page = event;
    }
  }

  onEditRoute(route: any) {
    this.selectedRouteId = route?.routE_ID
    let newData = {
      value: "",
      text: ""
    }
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id')),
      "RouteId": route?.routE_ID
    }
    this.trackingService.routeDetailsForEdit(payload).subscribe((res: any) => {
      let editData = res?.body?.data
      this.addRoute.controls['company'].setValue(editData?.deptId)
      this.addRoute.controls['route_no'].setValue(editData?.routeNo);
      this.addRoute.controls['route_name'].setValue(editData?.routeName)
      this.addRoute.controls['scheduelKm'].setValue(editData?.scheduledKM)
      this.addRoute.controls['direction'].setValue(editData?.direction)
      this.selectedRouteData = editData?.listRoutesStops;
      // this.listVehicleStopDetailsformap = editData?.listRoutesStops;
      let newVehicleValue = this.department?.filter((ele: any) => ele?.value == editData?.deptId);
      newVehicleValue.forEach((data: any) => {
        this.selectedValue = data
      });
      this.multiselected = this.selectedRouteData?.map((val: any) => {
        return newData = {
          value: val?.stopId,
          text: val?.stopName
        }
      })
      this.button = "Update Record";
      // this.plotStopsOnGoogleMap();
    })
  }

  showRoute() {
    const initialState: ModalOptions = {
      initialState: {
       selectedStop : this.selectedRouteData?.map((route: any) => ({ lat: route.lat, lng: route.lon, name : route.stopName }))
      },
    };

    this.bsModalRef = this.modalService.show(
      ShowRouteOnMapComponent,
      Object.assign(initialState, { class: "modal-xl modal-dialog-centered" })
    );
  }


}
