import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrReportRoutingModule } from './hr-report-routing.module';
import { OverTimeReportComponent } from './over-time-report/over-time-report.component';
import { ApproveLeveveReportComponent } from './approve-leveve-report/approve-leveve-report.component';
import { ApproveMispunchReportComponent } from './approve-mispunch-report/approve-mispunch-report.component';
import { TeamAttendanceReportComponent } from './team-attendance-report/team-attendance-report.component';
import { CoffReportComponent } from './coff-report/coff-report.component';
import { MispunchReportComponent } from './mispunch-report/mispunch-report.component';
import { SharedModule } from 'src/app/features/shared/shared.module';


@NgModule({
  declarations: [
    OverTimeReportComponent,
    ApproveLeveveReportComponent,
    ApproveMispunchReportComponent,
    TeamAttendanceReportComponent,
    CoffReportComponent,
    MispunchReportComponent
  ],
  imports: [
    CommonModule,
    HrReportRoutingModule,
    SharedModule
  ]
})
export class HrReportModule { }
