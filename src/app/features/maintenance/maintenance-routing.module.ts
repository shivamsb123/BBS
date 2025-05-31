import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobCardsComponent } from './pages/job-cards/job-cards.component';
import { OnRoadOffroadComponent } from '../management/on-road-offroad/on-road-offroad.component';
import { ComplaintDashboardComponent } from '../dashboard/complaint-dashboard/complaint-dashboard.component';
import { MaintenanceAllStatusComponent } from './pages/maintenance-all-status/maintenance-all-status.component';
import { PassengerComplainStausComponent } from './pages/passenger-complain-staus/passenger-complain-staus.component';

const routes: Routes = [
  {
    path: 'JobCard', component: JobCardsComponent
  },
  {
    path: 'ON_Off_Road_Vehicle', component: OnRoadOffroadComponent
  },
  {
    path:'Complaint_Dashboard', component : ComplaintDashboardComponent
  },
  {
    path:'maintenance_status/:id', component : MaintenanceAllStatusComponent
  },
  {
    path:'passenger_complain_status/:id', component : PassengerComplainStausComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('../tyre-management/tyre-management.module').then(
        (mod) => mod.TyreManagementModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('../battery-management/battery-management.module').then(
        (mod) => mod.BatteryManagementModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
