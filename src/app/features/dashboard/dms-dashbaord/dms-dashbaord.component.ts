import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { SessionService } from '../../http-services/session.service';
import { DashboardService } from '../services/dashboard.service';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieDirective } from 'ngx-lottie';

@Component({
  selector: 'dms-dashbaord',
  templateUrl: './dms-dashbaord.component.html',
  styleUrls: ['./dms-dashbaord.component.scss'],
})
export class DmsDashbaordComponent {
  allStatusData2 = [];
  allStatusData: any;
  dmsdata: any;
  fleetData: any;
  tripData: any;
  trackingData: any;
  qualityData: any;
  complaintStatus: any;
  accidentData: any;
  realTimeData: any;
  totalfleetData: any;
  trackingDataCount: any;
  totalQuality: any;
  totalComplain: any;
  totalAccident: any;
  totalRealTimeData: any;
  TotaltripData: any;
  fmsData: any;
  routesData: any;
  shiftStatus: any;
  maintenanceData: any;
  deviationData: any;
  outSheddingData: any;
  deviceTypeData: any;
  fmscount: any;
  routescount: any;
  shiftCount: any;
  maintenanceCount: any;
  outSehddingCount: any;
  deviationCount: any;
  deviceTypeCount: any;
  totalComplainData: any;
  totalComplainCount: any;
  closeCountValue: any
  openCountValue: any
  accidentList: any;
  totalAccidentCount: any;
  intervalId: any;
  time = new Date();
  userTypeID: any;
  fms: AnimationOptions = {
    path: '/assets/json/fms.json',
  }

  fleet: AnimationOptions = {
    path: '/assets/json/fleet.json',
  }

  trip: AnimationOptions = {
    path: '/assets/json/trip.json',
  }

  gps: AnimationOptions = {
    path: '/assets/json/gps.json',
  }

  quality: AnimationOptions = {
    path: '/assets/json/quality.json',
  }

  routes: AnimationOptions = {
    path: '/assets/json/routes.json',
  }

  shift: AnimationOptions = {
    path: '/assets/json/shift.json',
  }

  busStatus: AnimationOptions = {
    path: '/assets/json/bus-status.json',
  }

  maintanace: AnimationOptions = {
    path: '/assets/json/maintanace.json',
  }

  deviation: AnimationOptions = {
    path: '/assets/json/deviation.json',
  }

  passenger: AnimationOptions = {
    path: '/assets/json/passenger.json',
  }

  device: AnimationOptions = {
    path: '/assets/json/device.json',
  }

  fms1: AnimationOptions = {
    path: '/assets/json/fms-1.json',
  }

  styles: Partial<CSSStyleDeclaration> = {
    margin: '0px',
  };
  showRealData: boolean = false;

  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userTypeID = parseInt(localStorage.getItem('user_Id') || '');
    if (this.userTypeID == 1011) {
      this.showRealData = true
    }
    this.getdata();
    this.passengerList();
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  /**
   * get all dashboard data
   */
  getdata() {
    let count = 0
    let payload = {
      UserID: parseInt(localStorage.getItem('user_Id') || ''),
      Dept_ID: parseInt(localStorage.getItem('dept_id') || ''),
      MenuVersion: 'v1',
    };
    this.dashboardService.dmsdashboard(payload).subscribe((res: any) => {
      this.dmsdata = res?.body.data;
      this.fleetData = this.dmsdata.fleet_status;
      this.tripData = this.dmsdata.trip_status;
      this.trackingData = this.dmsdata.list_tracking_status;
      this.qualityData = this.dmsdata.quality_inspection_status;
      this.complaintStatus = this.dmsdata.complaint_status;
      this.accidentData = this.dmsdata.accident_status;
      this.realTimeData = this.dmsdata.co2emissions_status;
      if (this.realTimeData && this.realTimeData.last_updated_date) {
        this.realTimeData.last_updated_date = this.convertToDate(this.realTimeData.last_updated_date);
      }      
      this.fmsData = this.dmsdata?.fms;
      this.routesData = this.dmsdata?.routes;
      this.shiftStatus = this.dmsdata?.shift_status;
      this.maintenanceData = this.dmsdata?.maintenance;
      this.deviationData = this.dmsdata?.deviation;
      this.outSheddingData = this.dmsdata?.out_shedding;
      this.deviceTypeData = this.dmsdata?.device_type;

      this.totalfleetData = this.fleetData?.on_trip + this.fleetData?.in_depot + this.fleetData?.off_road + this.fleetData?.accident;
      this.TotaltripData = this.tripData?.on_time + this.tripData?.running_late + this.tripData?.bus_replacement + this.tripData?.driver_replacement;
      this.trackingData.forEach((item: any) => {
        count += item.total;
        this.trackingDataCount = count
      })
      this.totalQuality = this.qualityData?.pending + this.qualityData?.operational + this.qualityData?.operational_but_not_ok + this.qualityData?.not_operational;
      this.totalComplain = this.complaintStatus?.total_complaint + this.complaintStatus?.resolved + this.complaintStatus?.pending;
      this.totalAccident = this.accidentData?.total_accident;
      this.totalRealTimeData = this.realTimeData?.total_odom_all_fleet + this.realTimeData?.co2_emissions + this.realTimeData?.fual_saved;
      this.fmscount = this.fmsData?.dynamic_count + this.fmsData?.route_count + this.fmsData?.obu_count + this.fmsData?.gps_count;
      this.routescount = this.routesData?.no_of_routes + this.routesData?.no_of_drivers + this.routesData?.no_of_veh_routes;
      this.shiftCount = this.shiftStatus?.no_of_shifts + this.shiftStatus?.driver_on_shifts + this.shiftStatus?.no_driver_change + this.shiftStatus.no_veh_change;
      this.maintenanceCount = this.maintenanceData?.total_complaint + this.maintenanceData?.permit_expire + this.maintenanceData?.pollution_expire + this.maintenanceData.insurance_expire + this.maintenanceData.driver_licence_ex;
      this.deviationCount = this.deviationData?.miss_bus_stop + this.deviationData?.route_violance + this.deviationData?.over_speed + this.deviationData.miss_trip;
      this.outSehddingCount = this.outSheddingData?.depo_out + this.outSheddingData?.depo_in + this.outSheddingData?.quality_testing;
      this.deviceTypeCount = this.deviceTypeData?.total_veh + this.deviceTypeData?.total_obu + this.deviceTypeData?.total_mdvr + this.deviceTypeData?.total_gps;
    });
  }

  convertToDate(dateString: string): Date | null {   
    return new Date(dateString);
  }

  navigateUrl(id: any) {
    let url = 'Dashboard/Fleet_Status_Outshelding/id'.replace(
      "id",
      id
    )
    this.router.navigateByUrl(url);
  }

  navigatetoheld(id: any) {
    let url = 'Dashboard/Fleet_Status_heldup/id'.replace(
      "id",
      id
    )
    this.router.navigateByUrl(url);
  }

  operational(id: any) {
    let url = 'Dashboard/quality_Status_operational/id'.replace(
      "id",
      id
    )
    this.router.navigateByUrl(url);
  }

  navigateUrlfromDashboard(path: any) {
    console.log("path",path);
    
    this.router.navigateByUrl(path)
  }

  navigateToSubData(path: any, id: any) {
    let url = path.replace('id', id)
    this.router.navigateByUrl(url)
  }


  navigateUrlfromComplaint(path: any, stauts: any) {
    this.router.navigateByUrl(path, { state: { complainStatus: stauts } })
  }


  nevigateToClickData(path: any, id: any) {
    let url = path.replace(
      "id",
      id
    )
    this.router.navigateByUrl(url);
  }

  passengerList() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "Status": "1",
      "Mode": 1
    }

    this.dashboardService.passengerComplain(payload).subscribe((res: any) => {
      this.totalComplainData = res?.body?.data
      this.totalComplainCount = this.totalComplainData?.length;
      this.getCount()
    });
  }

  getCount() {
    let openCount = 0;
    let closeCount = 0;
    let total = this.totalComplainData
    for (var i = 0; i < total.length; i++) {
      if (total[i].status.toLowerCase() == 'close') {
        closeCount++
      } else if (total[i].status.toLowerCase() == 'open') {
        openCount++
      }
    }
    this.openCountValue = openCount;
    this.closeCountValue = closeCount

  }

  // checkUser() {
  //   this.userTypeID = parseInt(localStorage.getItem('user_Id'));  
  //   if(this.userTypeID === 75 || this.userTypeID === 2){
  //     return true
  //   } 
  //   return false
  // }


}
