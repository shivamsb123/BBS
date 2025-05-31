import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { ApprovalStatusComponent } from './approval-status/approval-status.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule } from '@angular/forms';
import { MispunchRequestComponent } from './mispunch-request/mispunch-request.component';
import { OverTimeComponent } from './over-time/over-time.component';
import { COffComponent } from './c-off/c-off.component';
import { MarkAttendanceComponent } from './mark-attendance/mark-attendance.component';
import { AttendanceSummaryComponent } from './attendance-summary/attendance-summary.component';
import { AddMispunchRequestComponent } from './add-mispunch-request/add-mispunch-request.component';


@NgModule({
  declarations: [
    LeaveRequestComponent,
    ApprovalStatusComponent,
    MispunchRequestComponent,
    OverTimeComponent,
    COffComponent,
    MarkAttendanceComponent,
    AttendanceSummaryComponent,
    AddMispunchRequestComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    NgxChartsModule,
    SharedModule,
    TimepickerModule.forRoot(),
    FormsModule
  ]
})
export class LeaveModule { }
