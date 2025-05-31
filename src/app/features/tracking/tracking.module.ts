import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackingRoutingModule } from './tracking-routing.module';
import { GroupWiseComponent } from './group-wise/group-wise.component';
import { VehicleWiseComponent } from './vehicle-wise/vehicle-wise.component';
import { HistoryVehicleWiseComponent } from './history-vehicle-wise/history-vehicle-wise.component';
import { ReplayVehicleWiseComponent } from './replay-vehicle-wise/replay-vehicle-wise.component';
import { ReplayCopyDataComponent } from './replay-copy-data/replay-copy-data.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackVehicleComponent } from './track-vehicle/track-vehicle.component';
import { TrackingliveComponent } from './trackinglive/trackinglive.component';
import { PlotRouteComponent } from './plot-route/plot-route.component';
import { FastTrackerComponent } from './fast-tracker/fast-tracker.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NewLiveVehicleComponent } from './new-live-vehicle/new-live-vehicle.component';
import { LiveVideoComponent } from './live-video/live-video.component';
import { SpeedGraphComponent } from './speed-graph/speed-graph.component';
import { TotalDriveComponent } from './total-drive/total-drive.component';
import { LiveWithVehicleComponent } from './live-with-vehicle/live-with-vehicle.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { NewHistoryComponent } from './new-history/new-history.component';



@NgModule({
  declarations: [
    GroupWiseComponent,
    VehicleWiseComponent,
    HistoryVehicleWiseComponent,
    ReplayVehicleWiseComponent,
    ReplayCopyDataComponent,
    TrackVehicleComponent,
    TrackingliveComponent,
    PlotRouteComponent,
    FastTrackerComponent,
    NewLiveVehicleComponent,
    LiveVideoComponent,
    SpeedGraphComponent,
    TotalDriveComponent,
    LiveWithVehicleComponent,
    VehicleListComponent,
    NewHistoryComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TrackingRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AccordionModule.forRoot()

    
  
  ]
})
export class TrackingModule { }
