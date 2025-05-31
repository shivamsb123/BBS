import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './pages/notification-list/notification-list.component';
import { NotificationTimeComponent } from './pages/notification-time/notification-time.component';


@NgModule({
  declarations: [
    NotificationListComponent,
    NotificationTimeComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule { }
