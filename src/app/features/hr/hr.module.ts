import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PayrollComponent } from './pages/payroll/payroll.component';


@NgModule({
  declarations: [
  
    PayrollComponent
  ],
  imports: [    
    CommonModule,
    HrRoutingModule,
    NgxChartsModule,
    SharedModule,
    TimepickerModule.forRoot(),
    FormsModule
  ]
})
export class HrModule { }
