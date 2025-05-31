import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MapviewComponent } from './mapview/mapview.component';
import { Mapview2Component } from './mapview2/mapview2.component';
import { ShiftComponent } from './shift/shift.component';
import { CanDataComponent } from './can-data/can-data.component';
import { OutsheddingDashboardComponent } from './outshedding-dashboard/outshedding-dashboard.component';
import { DashboardRrlComponent } from './dashboard-rrl/dashboard-rrl.component';
import { ComplaintDashboardComponent } from './complaint-dashboard/complaint-dashboard.component';
import { DmsDashbaordComponent } from './dms-dashbaord/dms-dashbaord.component';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetStatusOffRoadComponent } from './dashboard-pages/fleet-status-off-road/fleet-status-off-road.component';
import { OutSheldingComponent } from './out-shelding/out-shelding.component';
import { HeldUpComponent } from './held-up/held-up.component';
import { OperationalComponent } from './operational/operational.component';
import { TripStatusAllDataComponent } from './trip-status-all-data/trip-status-all-data.component';
import { QualityStatusAllDataComponent } from './quality-status-all-data/quality-status-all-data.component';
import { AccidentStatusDataComponent } from './accident-status-data/accident-status-data.component';
import { RoutesStatusAllDataComponent } from './routes-status-all-data/routes-status-all-data.component';
import { ShiftStatusAllDataComponent } from './shift-status-all-data/shift-status-all-data.component';
import { RealDataAccessStatusComponent } from './real-data-access-status/real-data-access-status.component';
import { InfractionPageComponent } from './infraction-page/infraction-page.component';
import { OBUDataComponent } from './obu-data/obu-data.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GPSDataComponent } from './gps-data/gps-data.component';
import { ObuDataDetailComponent } from './obu-data-detail/obu-data-detail.component';
import { TokenGenerateComponent } from './token-generate/token-generate.component';
import { StopListPopupComponent } from './stop-list-popup/stop-list-popup.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { GpsfromcanComponent } from './gpsfromcan/gpsfromcan.component';
import { BmsfromcanComponent } from './bmsfromcan/bmsfromcan.component';
import { AllfromcanComponent } from './allfromcan/allfromcan.component';
import { Co2EmissionReportComponent } from './co2-emission-report/co2-emission-report.component';



@NgModule({
  declarations: [
    MapviewComponent,
    Mapview2Component,
    ShiftComponent,
    CanDataComponent,
    OutsheddingDashboardComponent,
    DashboardRrlComponent,
    DmsDashbaordComponent,
    FleetStatusOffRoadComponent,
    OutSheldingComponent,
    HeldUpComponent,
    OperationalComponent,
    TripStatusAllDataComponent,
    QualityStatusAllDataComponent,
    AccidentStatusDataComponent,
    RoutesStatusAllDataComponent,
    ShiftStatusAllDataComponent,
    RealDataAccessStatusComponent,
    InfractionPageComponent,
    OBUDataComponent,
    GPSDataComponent,
    ObuDataDetailComponent,
    TokenGenerateComponent,
    StopListPopupComponent,
    EmployeeStatusComponent,
    GpsfromcanComponent,
    BmsfromcanComponent,
    AllfromcanComponent,
    Co2EmissionReportComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule
  ]
})
export class DashboardModule { }
