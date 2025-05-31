import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OnRoadOffroadComponent } from './on-road-offroad/on-road-offroad.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { UserVehicleAccessComponent } from './user-vehicle-access/user-vehicle-access.component';
import { AddRoasterComponent } from './add-roaster/add-roaster.component';
import { ViewRoasterComponent } from './view-roaster/view-roaster.component';
import { RoasterAttendanceComponent } from './roaster-attendance/roaster-attendance.component';
import { ManageGpsDataComponent } from './manage-gps-data/manage-gps-data.component';
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';
import { BomComponent } from './bom/bom.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ShowAttendanceComponent } from './show-attendance/show-attendance.component';
import { TripComplaintComponent } from './trip-complaint/trip-complaint.component';
import { AddEditBomComponent } from './add-edit-bom/add-edit-bom.component';
import { AddUserAppDmsDriverComponent } from './add-user-app-dms-driver/add-user-app-dms-driver.component';
import { AddStaffRoasterComponent } from './add-staff-roaster/add-staff-roaster.component';
import { ViewStaffRoasterComponent } from './view-staff-roaster/view-staff-roaster.component';
import { ManageStaffAttendanceComponent } from './manage-staff-attendance/manage-staff-attendance.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BreakDownComplaintComponent } from './break-down-complaint/break-down-complaint.component';
import { AddStaffAttendanceComponent } from './add-staff-attendance/add-staff-attendance.component';
import { AssetZoneComponent } from './asset-zone/asset-zone.component';
import { RouteVehicleComponent } from './route-vehicle/route-vehicle.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { AssetsManagementReportComponent } from './assets-management-report/assets-management-report.component';
import { AlertMasterComponent } from './alert-master/alert-master.component';
import { AlertAssignComponent } from './alert-assign/alert-assign.component';
import { AlertSettingWithVehicleComponent } from './alert-setting-with-vehicle/alert-setting-with-vehicle.component';
import { MenuMasterComponent } from './menu-master/menu-master.component';
@NgModule({
  declarations: [
    ChangePasswordComponent,
    OnRoadOffroadComponent,
    UserAccessComponent,
    UserVehicleAccessComponent,
    AddRoasterComponent,
    ViewRoasterComponent,
    RoasterAttendanceComponent,
    ManageGpsDataComponent,
    ManageAlertsComponent,
    BomComponent,
    AttendanceComponent,
    ShowAttendanceComponent,
    TripComplaintComponent,
    AddEditBomComponent,
    AddUserAppDmsDriverComponent,
    AddStaffRoasterComponent,
    ViewStaffRoasterComponent,
    ManageStaffAttendanceComponent,
    BreakDownComplaintComponent,
    AddStaffAttendanceComponent,
    AssetZoneComponent,
    RouteVehicleComponent,
    AssetsManagementComponent,
    AssetsManagementReportComponent,
    AlertMasterComponent,
    AlertAssignComponent,
    AlertSettingWithVehicleComponent,
    MenuMasterComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TimepickerModule,
    BsDatepickerModule,
    TabsModule
  ]
})
export class ManagementModule { }
