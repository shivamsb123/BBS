import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TyreMasterComponent } from './tyre-master/tyre-master.component';
import { TyreLinkingDelinkingComponent } from './tyre-linking-delinking/tyre-linking-delinking.component';
import { TyreNsdComponent } from './tyre-nsd/tyre-nsd.component';
import { RetreadtyreSendToVendorComponent } from './retreadtyre-send-to-vendor/retreadtyre-send-to-vendor.component';
import { DamageTyreComponent } from './damage-tyre/damage-tyre.component';
import { DamageTyreSummaryComponent } from './damage-tyre-summary/damage-tyre-summary.component';
import { NsdSummaryReportComponent } from './nsd-summary-report/nsd-summary-report.component';
import { ReportCurrentyLinkedTyreComponent } from './report-currenty-linked-tyre/report-currenty-linked-tyre.component';
import { ReportDamageTyreSummaryComponent } from './report-damage-tyre-summary/report-damage-tyre-summary.component';
import { ReportDisposedTyreComponent } from './report-disposed-tyre/report-disposed-tyre.component';
import { ReportPunctureCountComponent } from './report-puncture-count/report-puncture-count.component';
import { ReporttyreLinkingforbusComponent } from './reporttyre-linkingforbus/reporttyre-linkingforbus.component';
import { ReportTyrehistoryComponent } from './report-tyrehistory/report-tyrehistory.component';
import { ReportTyreNsdComponent } from './report-tyre-nsd/report-tyre-nsd.component';
import { ReportTyrePunctureComponent } from './report-tyre-puncture/report-tyre-puncture.component';
import { ReportTyreStockinhandComponent } from './report-tyre-stockinhand/report-tyre-stockinhand.component';
import { StockSummaryReportComponent } from './stock-summary-report/stock-summary-report.component';
import { AddTyreLinkingDelinkingComponent } from './add-tyre-linking-delinking/add-tyre-linking-delinking.component';
import { AddTyreNsdComponent } from './add-tyre-nsd/add-tyre-nsd.component';
import { RetreadTyreReceivedStockComponent } from './retread-tyre-received-stock/retread-tyre-received-stock.component';
import { AddTyreMasterComponent } from './add-tyre-master/add-tyre-master.component';
import { ReportTyreCountComponent } from './report-tyre-count/report-tyre-count.component';
import { ReportTyreLinkingComponent } from './report-tyre-linking/report-tyre-linking.component';

const routes: Routes = [
  {
    path:'TyreMaster', component:TyreMasterComponent
  },
  {
    path:'Add_Tyre_Master', component:AddTyreMasterComponent
  },
  {
    path:'Add_Tyre_Master/:id', component:AddTyreMasterComponent
  },
  {
    path:'Add_Tyre_Linking', component:TyreLinkingDelinkingComponent
  },
  {
    path:'AddTyreNSD', component:TyreNsdComponent
  },
  {
    path:'Retreading_Tyre_Send_to_Vendor', component:RetreadtyreSendToVendorComponent
  },
  {
    path:'Damage_Tyre_Disposed', component:DamageTyreComponent
  },
  {
    path:'Damage_Tyre_Summary' , component: DamageTyreSummaryComponent
  },
  {
    path:'NSD_Summary_Report' , component: NsdSummaryReportComponent
  },
  {
    path:'Report_Currently_Linked_Tyre' , component: ReportCurrentyLinkedTyreComponent
  },
  {
    path:'Report_Damage_Tyre_Summary' , component: ReportDamageTyreSummaryComponent
  },
  {
    path:'Report_Disposed_Tyre' , component: ReportDisposedTyreComponent
  },
  {
    path:'Report_Puncture_Count' , component: ReportPunctureCountComponent
  },
  {
    path:'Report_Tyre_Count_For_Bus' , component: ReportTyreCountComponent
  },
  {
    path:'Report_Tyre_History' , component: ReportTyrehistoryComponent
  },
  {
    path:'Report_Tyre_Linking_De_Linking' , component: ReporttyreLinkingforbusComponent
  },
  {
    path:'Report_Tyre_Linking_For_Bus' , component: ReportTyreLinkingComponent
  },
  {
    path:'Report_Tyre_Nsd' , component: ReportTyreNsdComponent
  },
  {
    path:'Report_Tyre_Puncture' , component: ReportTyrePunctureComponent
  },
  {
    path:'Report_Tyre_Stock_In_Hand' , component: ReportTyreStockinhandComponent
  },
  {
    path: 'Stock_Summary_Report' , component : StockSummaryReportComponent
  },
  {
    path: 'Add_Tyre_Linking_delinking' , component : AddTyreLinkingDelinkingComponent
  },
  {
    path: 'Add_Tyre_Linking_delinking/:id' , component : AddTyreLinkingDelinkingComponent
  },
  {
    path:'Add_Nsd',component:AddTyreNsdComponent
  },
  {
    path:'Add_Nsd/:id',component:AddTyreNsdComponent
  },
  {
    path:'Retreading_Tyre_Issued_In_Stock',component: RetreadTyreReceivedStockComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TyreManagementRoutingModule { }
