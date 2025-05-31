import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmsDashbaordComponent } from './dms-dashbaord/dms-dashbaord.component';
import { MapviewComponent } from './mapview/mapview.component';
import { Mapview2Component } from './mapview2/mapview2.component';
import { ShiftComponent } from './shift/shift.component';
import { CanDataComponent } from './can-data/can-data.component';
import { OutsheddingDashboardComponent } from './outshedding-dashboard/outshedding-dashboard.component';
import { DashboardRrlComponent } from './dashboard-rrl/dashboard-rrl.component';
import { ComplaintDashboardComponent } from './complaint-dashboard/complaint-dashboard.component';
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
import { GPSDataComponent } from './gps-data/gps-data.component';
import { ObuDataDetailComponent } from './obu-data-detail/obu-data-detail.component';
import { TokenGenerateComponent } from './token-generate/token-generate.component';
import { EmployeeStatusComponent } from './employee-status/employee-status.component';
import { Co2EmissionReportComponent } from './co2-emission-report/co2-emission-report.component';

const routes: Routes = [{
  path: 'DashboardDMS', component: DmsDashbaordComponent
}, 
{
  path: 'FleetStatus_DMS_RouteWise_v2', component: MapviewComponent

},
{
  path: 'FleetStatus_DMS', component: Mapview2Component
},
{
  path: 'FleetStatus_DMS/:id', component: Mapview2Component
},
// {
//   path: 'Dashboard_Can', component:CanDataComponent
// },
{
  path: 'Dashboard_DMRC', component:DashboardRrlComponent
},
{
  path: 'Fleet_Status_OffRoad', component:FleetStatusOffRoadComponent
},
{
  path: 'Fleet_Status_Outshelding/:id', component:OutSheldingComponent
},
{
  path: 'Fleet_Status_heldup/:id', component:HeldUpComponent
},
{
  path: 'quality_Status_operational/:id', component:OperationalComponent
},
{
  path: 'on_trip_status/:id', component:TripStatusAllDataComponent
},
{
  path: 'quality_status/:id', component: QualityStatusAllDataComponent
},
{
  path: 'Allacc_status/:id', component: AccidentStatusDataComponent
},
{
  path: 'routes_status/:id', component: RoutesStatusAllDataComponent
},
{
  path: 'Shift_status/:id', component: ShiftStatusAllDataComponent
},
{
  path: 'Real_data_access_status/:id', component: RealDataAccessStatusComponent
},
{
  path:'infraction_report_byId/:id', component:InfractionPageComponent
},
{
  path:'Dashboard_Can', component:OBUDataComponent
},
{
  path: 'GPS-data', component : GPSDataComponent
},
{
  path: 'obu_data_detail/:id', component : ObuDataDetailComponent
},
{
  path: 'token_generate', component : TokenGenerateComponent
},
{
  path: 'Employee-status/:id', component : EmployeeStatusComponent
},
{
  path: 'co2-emission-report', component : Co2EmissionReportComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
