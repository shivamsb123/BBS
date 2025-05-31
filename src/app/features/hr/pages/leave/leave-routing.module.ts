import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ApprovalStatusComponent } from './approval-status/approval-status.component';
import { MispunchRequestComponent } from './mispunch-request/mispunch-request.component';
import { OverTimeComponent } from './over-time/over-time.component';
import { COffComponent } from './c-off/c-off.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';

const routes: Routes = [
  { path: 'leave-request', component: LeaveRequestComponent },
  { path: 'Approval_Status', component: ApprovalStatusComponent },
  { path: 'Mispunch_Request', component: MispunchRequestComponent },
  { path: 'OverTime_Request', component: OverTimeComponent },
  { path: 'C_Off', component: COffComponent },
  { path: 'mark_attendance', component: MarkAttendanceComponent },
  { path: 'Attendance_Summery', component: AttendanceSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }
