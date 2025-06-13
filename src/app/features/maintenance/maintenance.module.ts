import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { JobCardsComponent } from './pages/job-cards/job-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MaintenanceAllStatusComponent } from './pages/maintenance-all-status/maintenance-all-status.component';
import { ComplaintDashboardComponent } from '../dashboard/complaint-dashboard/complaint-dashboard.component';
import { PassengerComplainStausComponent } from './pages/passenger-complain-staus/passenger-complain-staus.component';
import { AddNewJobcardComponent } from './pages/add-new-jobcard/add-new-jobcard.component';


@NgModule({
  declarations: [
    JobCardsComponent,
    MaintenanceAllStatusComponent,
    ComplaintDashboardComponent,
    PassengerComplainStausComponent,
    AddNewJobcardComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot()
  ]
})
export class MaintenanceModule { }
