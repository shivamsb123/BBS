import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/shared/user/login/login/login.component';
import { HeaderComponent } from './features/shared/site-layout/header/header/header.component';
import { TokenService } from './features/http-services/token.service';
import { MainLayoutComponent } from './features/shared/main-layout/main-layout/main-layout.component';
import { MapComponent } from './features/shared/components/map/map.component';
import { DummyTrackComponent } from './features/shared/components/dummy-track/dummy-track.component';
import { AuthGuard } from './features/http-services/auth.guard';
import { MyProfileLayoutComponent } from './features/my-profile/components/my-profile-layout/my-profile-layout.component';
import { OperationStatisticsComponent } from './features/shared/user/operation-statistics/operation-statistics.component';

const routes: Routes = [
  {
    path: 'bus' , component:DummyTrackComponent
  },
  {
    path: '',redirectTo: 'login',pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "operation-statistics", component: OperationStatisticsComponent
  },
  {
    path: 'Dashboard',
    component: MainLayoutComponent,    
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (mod) => mod.DashboardModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'vendordashboard',
    component: MainLayoutComponent,    
    loadChildren: () =>
      import('./features/vendor/vendor.module').then(
        (mod) => mod.VendorModule
      ),
      // canActivate: [AuthGuard]
  },
  {
    path: 'Registration',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/registration/registration.module').then(
        (mod) => mod.RegistrationModule
      ),
      canActivate: [AuthGuard]
  },
  

  {
    path: 'Management',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/management/management.module').then(
        (mod) => mod.ManagementModule
      ),
      canActivate: [AuthGuard]
  },

  {
    path: 'Reports',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/reports/reports.module').then(
        (mod) => mod.ReportsModule
      ),
      canActivate: [AuthGuard]
  },
 
  {
    path: 'Battery Management',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/battery-management/battery-management.module').then(
        (mod) => mod.BatteryManagementModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'Tracking',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/tracking/tracking.module').then(
        (mod) => mod.TrackingModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'SupplyChain',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/stock-inventory/stock-inventory.module').then(
        (mod) => mod.StockInventoryModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'HR',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/hr/hr.module').then(
        (mod) => mod.HrModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'Operational',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/operational/operational.module').then(
        (mod) => mod.OperationalModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'Maintenance',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/maintenance/maintenance.module').then(
        (mod) => mod.MaintenanceModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'Charging',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/charging/charging.module').then(
        (mod) => mod.ChargingModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'WorkShop',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/workshop/workshop.module').then(
        (mod) => mod.WorkshopModule
      ),
      canActivate: [AuthGuard]
  },
  {
    path: "my-profile",
    component: MainLayoutComponent,
    loadChildren: () =>
      import("./features/my-profile/my-profile.module").then((m) => m.MyProfileModule),
      canActivate: [AuthGuard]
  },
  {
    path: 'Notification',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./features/notification/notification.module').then(
        (mod) => mod.NotificationModule
      ),
      canActivate: [AuthGuard]
  },
];

@NgModule({

  imports: [RouterModule.forRoot(routes, {}),
    RouterModule.forRoot([...routes], {
			scrollOffset: [0, 160],
			onSameUrlNavigation: 'ignore',
			scrollPositionRestoration: 'top',
			
		}),],
  exports: [RouterModule],
})
export class AppRoutingModule {}
