import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { DriverTripComponent } from './driver-trip/driver-trip.component';


@NgModule({
  declarations: [
    DriverTripComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule
  ]
})
export class ActivitiesModule { }
