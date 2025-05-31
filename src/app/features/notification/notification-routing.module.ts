import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent } from './pages/notification-list/notification-list.component';
import { NotificationTimeComponent } from './pages/notification-time/notification-time.component';

const routes: Routes = [
  {
    path:'notification_list',component:NotificationListComponent
  },
  {
    path:'notification_time',component:NotificationTimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
