import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargingRoutingModule } from './charging-routing.module';
import { ChargingDeviceComponent } from './charging-device/charging-device.component';
import { SharedModule } from '../shared/shared.module';
import { NgxNavDrawerModule } from '@ngx-lite/nav-drawer';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChargingDetailsComponent } from './charging-details/charging-details.component';


@NgModule({
  declarations: [
    ChargingDeviceComponent,
    ChargingDetailsComponent,
  ],
  imports: [
    CommonModule,
    ChargingRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxNavDrawerModule,
    BsDatepickerModule

  ]
})
export class ChargingModule { }
