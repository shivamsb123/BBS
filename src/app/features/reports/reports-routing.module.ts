import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintReportComponent } from './complaint-report/complaint-report.component';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { LocationReportComponent } from './location-report/location-report.component';
import { RouteViolationReportComponent } from './route-violation-report/route-violation-report.component';
import { StayComponent } from './stay/stay.component';
import { GeofenceComponent } from './geofence/geofence.component';
import { IOComponent } from './io/io.component';
import { AlertComponent } from './alert/alert.component';
import { NearByVehicleComponent } from './near-by-vehicle/near-by-vehicle.component';
import { ShiftStatusComponent } from './shift-status/shift-status.component';
import { TripStatusComponent } from './trip-status/trip-status.component';
import { BiometricAttendanceComponent } from './biometric-attendance/biometric-attendance.component';
import { DutyChangeReportComponent } from './duty-change-report/duty-change-report.component';
import { DutyReportComponent } from './duty-report/duty-report.component';
import { MissStopComponent } from './miss-stop/miss-stop.component';
import { InfractionReportComponent } from './infraction-report/infraction-report.component';
import { ShowTripComponent } from './show-trip/show-trip.component';
import { DriverMemoComponent } from './driver-memo/driver-memo.component';
import { EmployeeSalaryReportComponent } from './employee-salary-report/employee-salary-report.component';
import { DriverSalaryReportComponent } from './driver-salary-report/driver-salary-report.component';
import { ComplaintTimelineComponent } from './complaint-timeline/complaint-timeline.component';
import { BreakDownComplaintComponent } from '../management/break-down-complaint/break-down-complaint.component';
import { DeviationStatusDataComponent } from './deviation-status-data/deviation-status-data.component';
import { BreakdownReportComponent } from './breakdown-report/breakdown-report.component';
import { VehicleDetailsReportComponent } from './vehicle-details-report/vehicle-details-report.component';
import { BillingFormatComponent } from './billing-format/billing-format.component';
import { GpsWiseBillingComponent } from './gps-wise-billing/gps-wise-billing.component';
import { TripLossReportComponent } from './trip-loss-report/trip-loss-report.component';
import { OverSpeedingReportComponent } from './over-speeding-report/over-speeding-report.component';
import { DistanceReportComponent } from './distance-report/distance-report.component';
import { OdometerReportComponent } from './odometer-report/odometer-report.component';
import { StopreportIntervalwiseComponent } from './stopreport-intervalwise/stopreport-intervalwise.component';
import { DriverWiseTripReportComponent } from './driver-wise-trip-report/driver-wise-trip-report.component';
import { BillingReportComponent } from './billing-report/billing-report.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { ChargingReportComponent } from './charging-report/charging-report.component';
import { StoppageReportComponent } from './stoppage-report/stoppage-report.component';
import { BillingManualGpsComponent } from './billing-manual-gps/billing-manual-gps.component';
import { ComplaintStatusReportComponent } from './complaint-status-report/complaint-status-report.component';
import { VehicleWiseShiftComponent } from './vehicle-wise-shift/vehicle-wise-shift.component';
import { DailySummaryReportComponent } from './daily-summary-report/daily-summary-report.component';
import { RouteSurveyReportComponent } from './route-survey-report/route-survey-report.component';
import { SocChangeReportComponent } from './soc-change-report/soc-change-report.component';
import { DeviceHealthReportComponent } from './device-health-report/device-health-report.component';
import { DorReportComponent } from './dor-report/dor-report.component';
import { DriverTripReportComponent } from './driver-trip-report/driver-trip-report.component';
import { CarbonReportComponent } from './carbon-report/carbon-report.component';

const routes: Routes = [
  {
    path: 'Show_Complaints', component: ComplaintReportComponent
  },

  {
    path: 'Show_Complaints/:id', component: ComplaintReportComponent
  },
  {
    path: 'add-Show_Complaints', component: AddComplaintComponent
  },
  {
    path: 'Complaint_Timeline', component: ComplaintTimelineComponent
  },
  {
    path: 'Location_Report', component: LocationReportComponent
  },
  {
    path: 'RouteViolation_Report', component: RouteViolationReportComponent
  },
  {
    path: 'Stay_Report', component: StayComponent
  },
  {
    path: 'Geo_Fence_Report', component: GeofenceComponent
  },
  {
    path: 'IO_Report', component: IOComponent
  },
  {
    path: 'Alert_Report', component: AlertComponent
  },
  {
    path: 'NearByVehicles', component: NearByVehicleComponent
  },
  {
    path: 'Shift_Status_Report', component: ShiftStatusComponent
  },
  // {
  //   path: 'QualityTesting_Report' , component:quali
  // }
  {
    path: 'Trips_Status_Report', component: TripStatusComponent
  },
  // {
  //   path:'Regenerate_Trip_Report' , component:trip
  // }
  // {
  //   path: 'biometric_Attendance', component: BiometricAttendanceComponent
  // },
  {
    path: 'Duty_Change_Report', component: DutyChangeReportComponent
  },
  {
    path: 'Duty_Report', component: DutyReportComponent
  },
  {
    path: 'Miss_Stop_Report', component: MissStopComponent
  },
  // {
  //   path:'Missing_Data_Report' , component:miss
  // }
  {
    path: 'Infraction_Report', component: InfractionReportComponent
  },
  {
    path: 'Show_Trip', component: ShowTripComponent
  },

  {
    path: 'Driver_Memo', component: DriverMemoComponent
  },
  // {
  //   path:'showDocument' , component : docu
  // }
  {
    path: 'Employee_Salary_Report', component: EmployeeSalaryReportComponent
  },
  {
    path: 'Employee_Salary_Report', component: EmployeeSalaryReportComponent
  },
  {
    path: 'Driver_Salary_Report', component: DriverSalaryReportComponent
  },
  {
    path: 'BreakDownComplaintReport', component: BreakdownReportComponent
  },
  {
    path: 'deviation_status/:id', component: DeviationStatusDataComponent
  },
  {
    path: 'VehicleDetailsReport', component: VehicleDetailsReportComponent
  },
  {
    path: 'Billing_Via_Km', component: BillingFormatComponent
  },
  {
    path: 'GPSwiseBillingkm', component: GpsWiseBillingComponent
  },
  {
    path: 'Trip_Loss_Report', component: TripLossReportComponent
  },
  {
    path: 'OverSpeedReport', component: OverSpeedingReportComponent
  },
  {
    path: 'DistanceReport', component: DistanceReportComponent
  },
  {
    path: 'OdometerReport', component:OdometerReportComponent
  },
  {
    path:'StopReportIntervalWise',component:StopreportIntervalwiseComponent
  },
{
  path:'DriverWiseTripReport',component:DriverWiseTripReportComponent
},
{
  path:'BillingReportDateWise', component:BillingReportComponent
},
{
  path:'biometric_Attendance', component:AttendanceReportComponent
},
{
  path:'ChargingSOCReport', component:ChargingReportComponent
},
{
  path: 'BillingManualVsGPS', component: BillingManualGpsComponent
},
{
  path: 'StoppageReport', component: StoppageReportComponent
}, 
{
  path : 'Complaint_Report', component : ComplaintStatusReportComponent
},
{
  path : 'VehicleWiseShift', component : VehicleWiseShiftComponent
},
{
  path : 'Daily_Summary_Report', component : DailySummaryReportComponent
},
{
  path : 'Route_Survey_Report', component : RouteSurveyReportComponent
},
{
  path : 'SOC_Change_Report', component : SocChangeReportComponent
},
{
  path : 'DeviceHealthReport', component : DeviceHealthReportComponent
},
{
  path : 'DORReport', component : DorReportComponent
},
{
  path : 'DriverTripReport', component : DriverTripReportComponent
},
{
  path : 'carbon_report', component : CarbonReportComponent
}






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
