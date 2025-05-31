import { Component } from '@angular/core';
import { SharedService } from '../../http-services/shared.service';
import { SessionService } from '../../http-services/session.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-rrl',
  templateUrl: './dashboard-rrl.component.html',
  styleUrls: ['./dashboard-rrl.component.scss']
})
export class DashboardRrlComponent {
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
  TotaltripData: any;
  totalQuality: any;
  totalComplain: any;
  totalAccident: any;
  totalRealTimeData: any;
  trackingDataCount: any;
  constructor(
    private sharedService: SharedService,
    private sessionService: SessionService,
    private dashboardService: DashboardService
  ) {}
  ngOnInit(): void {
    this.getdata();
  }

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

      this.totalfleetData = this.fleetData?.on_trip + this.fleetData?.in_depot + this.fleetData?.off_road + this.fleetData?.accident;
      this.TotaltripData = this.tripData?.on_time + this.tripData?.running_late + this.tripData?.bus_replacement + this.tripData?.driver_replacement;
      this.trackingData.forEach((item:any) => {        
        count += item.total;
        this.trackingDataCount = count
      })
      this.totalQuality = this.qualityData?.pending + this.qualityData?.operational + this.qualityData?.operational_but_not_ok + this.qualityData?.not_operational;
      this.totalComplain = this.complaintStatus?.total_complaint + this.complaintStatus?.resolved + this.complaintStatus?.pending;
      this.totalAccident = this.accidentData?.total_accident;
      this.totalRealTimeData = this.realTimeData?.total_odom_all_fleet + this.realTimeData?.co2_emissions + this.realTimeData?.fual_saved
      
    });
  }
}
