import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatteryLinkComponent } from './pages/add-battery-link/add-battery-link.component';
import { BatteryDelinkComponent } from './pages/battery-delink/battery-delink.component';
import { WarrantyBatteryRecieveComponent } from './pages/warranty-battery-recieve/warranty-battery-recieve.component';
import { BatteryHealthCheckupComponent } from './pages/battery-health-checkup/battery-health-checkup.component';
import { ChargingDetailBatteryComponent } from './pages/charging-detail-battery/charging-detail-battery.component';
import { BatteryHealthCheckupReportComponent } from './pages/battery-health-checkup-report/battery-health-checkup-report.component';
import { BatteryStockReportComponent } from './pages/battery-stock-report/battery-stock-report.component';
import { WarrantyClaimComponent } from './pages/warranty-claim/warranty-claim.component';
import { CreateBatteryLinkPageComponent } from './pages/create-battery-link-page/create-battery-link-page.component';
import { AddBatteryMasterComponent } from './pages/add-battery-master/add-battery-master.component';
import { DisposeBatteryComponent } from './pages/dispose-battery/dispose-battery.component';
import { TerminalRepairDetailsComponent } from './pages/terminal-repair-details/terminal-repair-details.component';
import { BatteryChargingReportComponent } from './pages/battery-charging-report/battery-charging-report.component';
import { BatteryHealthStatusReportComponent } from './pages/battery-health-status-report/battery-health-status-report.component';
import { BatteryWarrantyClaimReportComponent } from './pages/battery-warranty-claim-report/battery-warranty-claim-report.component';

const routes: Routes = [ 
  {
    path:'Bat_Battery_Link_Depot' , component:AddBatteryLinkComponent
  },
   {
    path:'Add-Battery-link' , component:CreateBatteryLinkPageComponent
  },
  {
    path:'Add-Battery-link/:id' , component:CreateBatteryLinkPageComponent
  },
  {
    path: 'Bat_Battery_master', component: AddBatteryMasterComponent
  },
  {
    path:'Bat_Delinking' , component:BatteryDelinkComponent
  },
  {
    path:'Report_Battery_Warranty_Claim' , component:BatteryWarrantyClaimReportComponent
  },
  {
    path:'Bat_Warrenty' , component:WarrantyBatteryRecieveComponent
  },
  {
    path:'Bat_Battery_Scrap_Master' , component:DisposeBatteryComponent
  },
  {
    path:'Bat_Charging_Stat' , component:ChargingDetailBatteryComponent
  },
  {
    path:'Bat_Battery_Health_Check_Up' , component:BatteryHealthCheckupComponent
  },
  {
    path:'Bat_Battery_terminal_repair' , component:TerminalRepairDetailsComponent
  },
  
  {
    path : 'Report_Battery_Charging' , component: BatteryChargingReportComponent
  },
  {
    path : 'Report_Battery_Health_Check_Up' , component: BatteryHealthCheckupReportComponent
  },
  {
    path : 'Report_Battery_Stock' , component: BatteryStockReportComponent
  },
  {
    path:'Bat_Battery_Send_To_Vendor' , component: WarrantyClaimComponent
  },
  {
    path:'Report_Battery_Health_Status' , component: BatteryHealthStatusReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatteryManagementRoutingModule { }
