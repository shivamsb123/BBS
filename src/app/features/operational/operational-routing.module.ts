import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoasterComponent } from '../management/add-roaster/add-roaster.component';
import { ViewRoasterComponent } from '../management/view-roaster/view-roaster.component';
import { RoasterAttendanceComponent } from '../management/roaster-attendance/roaster-attendance.component';
import { AddStaffRoasterComponent } from '../management/add-staff-roaster/add-staff-roaster.component';
import { ViewStaffRoasterComponent } from '../management/view-staff-roaster/view-staff-roaster.component';
import { ManageStaffAttendanceComponent } from '../management/manage-staff-attendance/manage-staff-attendance.component';
import { ShiftComponent } from '../dashboard/shift/shift.component';
import { OutsheddingDashboardComponent } from '../dashboard/outshedding-dashboard/outshedding-dashboard.component';
import { BreakDownComplaintComponent } from '../management/break-down-complaint/break-down-complaint.component';
import { UpdateRcDetailComponent } from './update-rc-detail/update-rc-detail.component';
import { AddStaffAttendanceComponent } from '../management/add-staff-attendance/add-staff-attendance.component';
import { ChargingStationComponent } from '../stock-inventory/pages/charging-station/charging-station.component';

const routes: Routes = [
  {
    path: 'AddRoster_v2',
    component: AddRoasterComponent,
  },
  {
    
    path: 'View_Roster_v2',
    component: ViewRoasterComponent
  },
  {
    path: 'Roster_Master_Attendance_v2', component: RoasterAttendanceComponent
  },
  {
    path: 'AddRosterStaff', component: AddStaffRoasterComponent
  },
  {
    path: 'ViewEmpRoster', component: ViewStaffRoasterComponent
  },
  {
    path: 'EmployeeRosterMaster_V2', component: ManageStaffAttendanceComponent
  },
  {
    path: 'Shift_Status', component:ShiftComponent
  
  },
  {
    path: 'Driver_Wise_Bus_DepoInOut_Report', component:OutsheddingDashboardComponent
  
  },
  {
    path: 'Driver_Wise_Bus_DepoInOut_Report/:id', component:OutsheddingDashboardComponent
  
  },
  
  {
    path: 'Update_RC_Details', component:UpdateRcDetailComponent
  
  },
  {
    path: 'BreakDownComplaintaspx', component: BreakDownComplaintComponent
  },
  {
    path: 'Add_Staff_Attendance', component: AddStaffAttendanceComponent
  },
  {path: 'Charging_Station', component: ChargingStationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationalRoutingModule { }
