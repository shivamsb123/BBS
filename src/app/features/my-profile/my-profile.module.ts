import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileLayoutComponent } from './components/my-profile-layout/my-profile-layout.component';
import { SetAlertComponent } from './pages/set-alert/set-alert.component';
import { GenerateTokenComponent } from './pages/generate-token/generate-token.component';
import { MyUserComponent } from './pages/my-user/my-user.component';
import { BusListComponent } from './pages/bus-list/bus-list.component';
import { RouteListComponent } from './pages/route-list/route-list.component';
import { CompanyDetailComponent } from './pages/company-detail/company-detail.component';
import { SharedModule } from '../shared/shared.module';
import { StopListComponent } from './pages/stop-list/stop-list.component';
import { AlertHistoryComponent } from './pages/alert-history/alert-history.component';


@NgModule({
  declarations: [
    MyProfileLayoutComponent,
    SetAlertComponent,
    GenerateTokenComponent,
    MyUserComponent,
    BusListComponent,
    RouteListComponent,
    CompanyDetailComponent,
    StopListComponent,
    AlertHistoryComponent
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    SharedModule,
  ]
})
export class MyProfileModule { }
