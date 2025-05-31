import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalaryRoutingModule } from './salary-routing.module';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ApproveLeaveRequestComponent } from './approve-leave-request/approve-leave-request.component';
import { ApproveMispunchRequestComponent } from './approve-mispunch-request/approve-mispunch-request.component';
import { COffRequestComponent } from './c-off-request/c-off-request.component';
import { OverTimeRequestComponent } from './over-time-request/over-time-request.component';


@NgModule({
  declarations: [
    ApproveLeaveRequestComponent,
    ApproveMispunchRequestComponent,
    COffRequestComponent,
    OverTimeRequestComponent,
  ],
  imports: [
    CommonModule,
    SalaryRoutingModule,
    SharedModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]})
export class SalaryModule { }
