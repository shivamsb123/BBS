import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverTimeReportComponent } from './over-time-report/over-time-report.component';
import { TeamAttendanceReportComponent } from './team-attendance-report/team-attendance-report.component';
import { CoffReportComponent } from './coff-report/coff-report.component';
import { MispunchReportComponent } from './mispunch-report/mispunch-report.component';
import { ApproveLeveveReportComponent } from './approve-leveve-report/approve-leveve-report.component';
import { ApproveMispunchReportComponent } from './approve-mispunch-report/approve-mispunch-report.component';

const routes: Routes = [
  {path: 'Over_Time_report', component : OverTimeReportComponent},
  {path: 'Team_Attendance_report', component : TeamAttendanceReportComponent},
  {path: 'Coff_report', component : CoffReportComponent},
  {path: 'mispunch_details', component: MispunchReportComponent},
  {path: 'Leave_Report', component : ApproveLeveveReportComponent},
  {path: 'Mispunch_Report', component: ApproveMispunchReportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrReportRoutingModule { }
