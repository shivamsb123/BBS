import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
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
import { MissingGpsComponent } from './missing-gps/missing-gps.component';
import { InfractionReportComponent } from './infraction-report/infraction-report.component';
import { ShowTripComponent } from './show-trip/show-trip.component';
import { ComplaintReportComponent } from './complaint-report/complaint-report.component';
import { DriverMemoComponent } from './driver-memo/driver-memo.component';
import { EmployeeSalaryReportComponent } from './employee-salary-report/employee-salary-report.component';
import { DriverSalaryReportComponent } from './driver-salary-report/driver-salary-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AddComplaintComponent } from './add-complaint/add-complaint.component';
import { SharedModule } from '../shared/shared.module';
import { ComplaintTimelineComponent } from './complaint-timeline/complaint-timeline.component';
import { DeviationStatusDataComponent } from './deviation-status-data/deviation-status-data.component';
import { BreakdownReportComponent } from './breakdown-report/breakdown-report.component';
import { VehicleDetailsReportComponent } from './vehicle-details-report/vehicle-details-report.component';
import { BillingFormatComponent } from './billing-format/billing-format.component';
import { EditDutyReportComponent } from './edit-duty-report/edit-duty-report.component';
import { GpsWiseBillingComponent } from './gps-wise-billing/gps-wise-billing.component';
import { MissStopDetailComponent } from './miss-stop-detail/miss-stop-detail.component';
import { TripLossReportComponent } from './trip-loss-report/trip-loss-report.component';
import { OverSpeedingReportComponent } from './over-speeding-report/over-speeding-report.component';
import { DistanceReportComponent } from './distance-report/distance-report.component';
import { OdometerReportComponent } from './odometer-report/odometer-report.component';
import { StopreportIntervalwiseComponent } from './stopreport-intervalwise/stopreport-intervalwise.component';
import { LocationTrackPopupComponent } from './location-track-popup/location-track-popup.component';
import { DriverWiseTripReportComponent } from './driver-wise-trip-report/driver-wise-trip-report.component';
import { BillingReportComponent } from './billing-report/billing-report.component';
import { LocationTrackAllPopupComponent } from './location-track-all-popup/location-track-all-popup.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { AttendanceLocationMapComponent } from './attendance-location-map/attendance-location-map.component';
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


@NgModule({
  declarations: [
    LocationReportComponent,
    RouteViolationReportComponent,
    StayComponent,
    GeofenceComponent,
    IOComponent,
    AlertComponent,
    NearByVehicleComponent,
    ShiftStatusComponent,
    TripStatusComponent,
    BiometricAttendanceComponent,
    DutyChangeReportComponent,
    DutyReportComponent,
    MissStopComponent,
    MissingGpsComponent,
    InfractionReportComponent,
    ShowTripComponent,
    ComplaintReportComponent,
    DriverMemoComponent,
    EmployeeSalaryReportComponent,
    DriverSalaryReportComponent,
    AddComplaintComponent,
    ComplaintTimelineComponent,
    DeviationStatusDataComponent,
    BreakdownReportComponent,
    VehicleDetailsReportComponent,
    BillingFormatComponent,
    EditDutyReportComponent,
    GpsWiseBillingComponent,
    MissStopDetailComponent,
    TripLossReportComponent,
    OverSpeedingReportComponent,
    DistanceReportComponent,
    OdometerReportComponent,
    StopreportIntervalwiseComponent,
    LocationTrackPopupComponent,
    DriverWiseTripReportComponent,
    BillingReportComponent,
    LocationTrackAllPopupComponent,
    AttendanceReportComponent,
    AttendanceLocationMapComponent,
    ChargingReportComponent,
    StoppageReportComponent,
    BillingManualGpsComponent,
    ComplaintStatusReportComponent,
    VehicleWiseShiftComponent,
    DailySummaryReportComponent,
    RouteSurveyReportComponent,
    SocChangeReportComponent,
    DeviceHealthReportComponent,
    DorReportComponent,
    DriverTripReportComponent,
    CarbonReportComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    TimepickerModule,
    BsDatepickerModule,
    TabsModule,
    SharedModule
    
  ]
})
export class ReportsModule { }
