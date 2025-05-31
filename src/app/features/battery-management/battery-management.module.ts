import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryManagementRoutingModule } from './battery-management-routing.module';
import { AddBatteryLinkComponent } from './pages/add-battery-link/add-battery-link.component';
import { AddBatteryMasterComponent } from './pages/add-battery-master/add-battery-master.component';
import { BatteryDelinkComponent } from './pages/battery-delink/battery-delink.component';
import { WarrantyClaimComponent } from './pages/warranty-claim/warranty-claim.component';
import { WarrantyBatteryRecieveComponent } from './pages/warranty-battery-recieve/warranty-battery-recieve.component';
import { DisposeBatteryComponent } from './pages/dispose-battery/dispose-battery.component';
import { ChargingDetailBatteryComponent } from './pages/charging-detail-battery/charging-detail-battery.component';
import { BatteryHealthCheckupComponent } from './pages/battery-health-checkup/battery-health-checkup.component';
import { TerminalRepairDetailsComponent } from './pages/terminal-repair-details/terminal-repair-details.component';
import { BatteryChargingReportComponent } from './pages/battery-charging-report/battery-charging-report.component';
import { BatteryHealthCheckupReportComponent } from './pages/battery-health-checkup-report/battery-health-checkup-report.component';
import { BatteryHealthStatusReportComponent } from './pages/battery-health-status-report/battery-health-status-report.component';
import { BatteryStockReportComponent } from './pages/battery-stock-report/battery-stock-report.component';
import { BatteryWarrantyClaimReportComponent } from './pages/battery-warranty-claim-report/battery-warranty-claim-report.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CreateBatteryLinkPageComponent } from './pages/create-battery-link-page/create-battery-link-page.component';


@NgModule({
  declarations: [
    AddBatteryLinkComponent,
    AddBatteryMasterComponent,
    BatteryDelinkComponent,
    WarrantyClaimComponent,
    WarrantyBatteryRecieveComponent,
    DisposeBatteryComponent,
    ChargingDetailBatteryComponent,
    BatteryHealthCheckupComponent,
    TerminalRepairDetailsComponent,
    BatteryChargingReportComponent,
    BatteryHealthCheckupReportComponent,
    BatteryHealthStatusReportComponent,
    BatteryStockReportComponent,
    BatteryWarrantyClaimReportComponent,
    CreateBatteryLinkPageComponent,
  ],
  imports: [
    CommonModule,
    BatteryManagementRoutingModule, SharedModule,
    ReactiveFormsModule,
    TimepickerModule,
    BsDatepickerModule,
    TabsModule
  ]
})
export class BatteryManagementModule { }
