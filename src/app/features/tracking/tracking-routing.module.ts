import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryVehicleWiseComponent } from './history-vehicle-wise/history-vehicle-wise.component';
import { VehicleWiseComponent } from './vehicle-wise/vehicle-wise.component';
import { ReplayVehicleWiseComponent } from './replay-vehicle-wise/replay-vehicle-wise.component';
import { TrackVehicleComponent } from './track-vehicle/track-vehicle.component';
import { TrackingliveComponent } from './trackinglive/trackinglive.component';
import { PlotRouteComponent } from './plot-route/plot-route.component';
import { FastTrackerComponent } from './fast-tracker/fast-tracker.component';
import { ReplayCopyDataComponent } from './replay-copy-data/replay-copy-data.component';
import { NewLiveVehicleComponent } from './new-live-vehicle/new-live-vehicle.component';
import { LiveWithVehicleComponent } from './live-with-vehicle/live-with-vehicle.component';
import { NewHistoryComponent } from './new-history/new-history.component';

const routes: Routes = [
  {
    path: 'Tracking_History',
    component: NewHistoryComponent,
  },
  {
    path: 'Tracking_History/:id',
    component: NewHistoryComponent,
  },
  // {
  //   path: 'Tracking_Live',
  //   component: FastTrackerComponent
  // },
  // {
  //   path: 'Tracking_Live/:id',
  //   component: TrackingliveComponent,
  // },
  {
    path: 'Tracking_History_Replay',
    component: ReplayVehicleWiseComponent,
  },
  {
    path: 'PlotRouteOnMap',
    component: PlotRouteComponent,
  },
  {
    path: 'Tracking_History_Replay_With_Copy',
    component: ReplayCopyDataComponent,
  },
  {
    path: 'Tracking_Live',
    component: LiveWithVehicleComponent
  },
  {
    path: 'Tracking_Live/:id',
    component: LiveWithVehicleComponent
  },
  {
    path: 'Live_Vehicle_with_stoppage',
    component: NewLiveVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingRoutingModule { }
