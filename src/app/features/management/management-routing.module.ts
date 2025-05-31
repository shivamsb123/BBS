import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OnRoadOffroadComponent } from './on-road-offroad/on-road-offroad.component';
import { AddRoasterComponent } from './add-roaster/add-roaster.component';
import { ViewRoasterComponent } from './view-roaster/view-roaster.component';
import { RoasterAttendanceComponent } from './roaster-attendance/roaster-attendance.component';
import { ManageGpsDataComponent } from './manage-gps-data/manage-gps-data.component';
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';
import { BomComponent } from './bom/bom.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { TripComplaintComponent } from './trip-complaint/trip-complaint.component';
import { AddEditBomComponent } from './add-edit-bom/add-edit-bom.component';
import { AddUserAppDmsDriverComponent } from './add-user-app-dms-driver/add-user-app-dms-driver.component';
import { AddStaffRoasterComponent } from './add-staff-roaster/add-staff-roaster.component';
import { ManageStaffAttendanceComponent } from './manage-staff-attendance/manage-staff-attendance.component';
import { UserAccessComponent } from './user-access/user-access.component';
import { UserVehicleAccessComponent } from './user-vehicle-access/user-vehicle-access.component';
import { BreakDownComplaintComponent } from './break-down-complaint/break-down-complaint.component';
import { ViewStaffRoasterComponent } from './view-staff-roaster/view-staff-roaster.component';
import { AddStaffAttendanceComponent } from './add-staff-attendance/add-staff-attendance.component';
import { AssetZoneComponent } from './asset-zone/asset-zone.component';
import { RouteVehicleComponent } from './route-vehicle/route-vehicle.component';
import { AssetsManagementComponent } from './assets-management/assets-management.component';
import { AssetsManagementReportComponent } from './assets-management-report/assets-management-report.component';
import { AlertMasterComponent } from './alert-master/alert-master.component';
import { AlertAssignComponent } from './alert-assign/alert-assign.component';
import { AlertSettingWithVehicleComponent } from './alert-setting-with-vehicle/alert-setting-with-vehicle.component';
import { MenuMasterComponent } from './menu-master/menu-master.component';


const routes: Routes = [
  {
    path: 'Change_Password',
    component: ChangePasswordComponent,
  },

 
 
  {
    path: 'Access_Wizard',
    component: UserAccessComponent
  },
  {
    path: 'User_Vehicle_Access',
    component : UserVehicleAccessComponent
  },

  {
    path: 'Manage_GPS_Data_On_Map', component: ManageGpsDataComponent
  },
  {
    path: 'Alert_Settings', component: ManageAlertsComponent
  },
  {
    path: 'BOM_Prod', component: BomComponent
  },
  {
    path: 'attendance_', component: AttendanceComponent
  },
  {
    path: 'show_att', component: AttendanceComponent
  },
  {
    path: 'Complain', component: TripComplaintComponent
  },
  {
    path: 'Add_Edit_BOM', component: AddEditBomComponent
  },
  {
    path: 'Add_User_App_DmsDriver', component: AddUserAppDmsDriverComponent
  },
  {
    path: 'Device_Zone_Linking', component: AssetZoneComponent
  },
  {
    path: 'Device_Route', component: RouteVehicleComponent
  },
  {
    path: 'DepotAssets', component: AssetsManagementReportComponent
  },
  {
    path: 'Assets_Management', component: AssetsManagementComponent
  },
  {
    path: 'AlertMaster', component: AlertMasterComponent
  },
  {
    path: 'AlertAssign', component: AlertAssignComponent
  },
  {
    path: 'AlertSettingVehicle', component: AlertSettingWithVehicleComponent
  }, {
    path: 'Menu_Master', component: MenuMasterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
