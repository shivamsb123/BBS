import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { SetAlertComponent } from './pages/set-alert/set-alert.component';
import { GenerateTokenComponent } from './pages/generate-token/generate-token.component';
import { BusListComponent } from './pages/bus-list/bus-list.component';
import { RouteListComponent } from './pages/route-list/route-list.component';
import { NotificationListComponent } from '../notification/pages/notification-list/notification-list.component';
import { MyUserComponent } from './pages/my-user/my-user.component';
import { MyProfileLayoutComponent } from './components/my-profile-layout/my-profile-layout.component';
import { StopListComponent } from './pages/stop-list/stop-list.component';
import { AlertHistoryComponent } from './pages/alert-history/alert-history.component';
const routes: Routes = [
  {
    path: "",
    component: MyProfileLayoutComponent,
    children: [
      {
        path: "",
        pathMatch:'full',
        redirectTo : 'company-details'
      },
      {
        path: "company-details",
        data: { component: "company-details", name: 'Company Details' },
        component: CompanyDetailComponent,
      },
      {
        path: "set-alert",
        data: { component: "set-alert", name: 'Set Alert' },
        component: SetAlertComponent,
      },
      {
        path: "generate-token",
        data: { component: "generate-token", name: 'Generate Token' },
        component: GenerateTokenComponent,
      },
      {
        path: "Bus-list",
        data: { component: "Bus-list", name: 'Bus list' },
        component: BusListComponent,
      },
      {
        path: "route-list",
        data: { component: "route-list", name: 'Route List' },
        component: RouteListComponent,
      },
      {
        path: "all-notification",
        data: { component: "all-notification", name: 'All Notification' },
        component: NotificationListComponent,
      },
      {
        path: "my-user",
        data: { component: "my-user", name: 'My User' },
        component: MyUserComponent,
      },
      {
        path: "stop-list",
        data: { component: "stop-list", name: 'Stop List' },
        component: StopListComponent,
      },
      {
        path: "alert-history",
        data: { component: "alert-history", name: 'alert-history' },
        component: AlertHistoryComponent,
      }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileRoutingModule { }
