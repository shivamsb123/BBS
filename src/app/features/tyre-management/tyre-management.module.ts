import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TyreManagementRoutingModule } from './tyre-management-routing.module';
import { TyreMasterComponent } from './tyre-master/tyre-master.component';
import { TyreNsdComponent } from './tyre-nsd/tyre-nsd.component';
import { TyreLinkingDelinkingComponent } from './tyre-linking-delinking/tyre-linking-delinking.component';
import { RetreadtyreSendToVendorComponent } from './retreadtyre-send-to-vendor/retreadtyre-send-to-vendor.component';
import { DamageTyreComponent } from './damage-tyre/damage-tyre.component';
import { DamageTyreSummaryComponent } from './damage-tyre-summary/damage-tyre-summary.component';
import { NsdSummaryReportComponent } from './nsd-summary-report/nsd-summary-report.component';
import { ReportCurrentyLinkedTyreComponent } from './report-currenty-linked-tyre/report-currenty-linked-tyre.component';
import { ReportDamageTyreSummaryComponent } from './report-damage-tyre-summary/report-damage-tyre-summary.component';
import { ReportDisposedTyreComponent } from './report-disposed-tyre/report-disposed-tyre.component';
import { ReportPunctureCountComponent } from './report-puncture-count/report-puncture-count.component';
import { ReportCountforbusComponent } from './report-countforbus/report-countforbus.component';
import { ReportTyrehistoryComponent } from './report-tyrehistory/report-tyrehistory.component';
import { ReportLdComponent } from './report-ld/report-ld.component';
import { ReporttyreLinkingforbusComponent } from './reporttyre-linkingforbus/reporttyre-linkingforbus.component';
import { ReportTyreNsdComponent } from './report-tyre-nsd/report-tyre-nsd.component';
import { ReportTyrePunctureComponent } from './report-tyre-puncture/report-tyre-puncture.component';
import { ReportTyreStockinhandComponent } from './report-tyre-stockinhand/report-tyre-stockinhand.component';
import { StockSummaryReportComponent } from './stock-summary-report/stock-summary-report.component';

import { SharedModule } from '../shared/shared.module';
// import { TyreDetailsComponent } from './tyre-details/tyre-details.component';
import { TyreModeUpdateComponent } from './tyre-mode-update/tyre-mode-update.component';
import { AddTyreLinkingDelinkingComponent } from './add-tyre-linking-delinking/add-tyre-linking-delinking.component';
import { AddTyreNsdComponent } from './add-tyre-nsd/add-tyre-nsd.component';
import { RetreadTyreReceivedStockComponent } from './retread-tyre-received-stock/retread-tyre-received-stock.component';
import { AddTyreMasterComponent } from './add-tyre-master/add-tyre-master.component';
import { ReportTyreCountComponent } from './report-tyre-count/report-tyre-count.component';
import { ReportTyreLinkingComponent } from './report-tyre-linking/report-tyre-linking.component';


@NgModule({
  declarations: [
    TyreMasterComponent,
    TyreNsdComponent,
    TyreLinkingDelinkingComponent,
    RetreadtyreSendToVendorComponent,
    DamageTyreComponent,
    DamageTyreSummaryComponent,
    NsdSummaryReportComponent,
    ReportCurrentyLinkedTyreComponent,
    ReportDamageTyreSummaryComponent,
    ReportDisposedTyreComponent,
    ReportPunctureCountComponent,
    ReportCountforbusComponent,
    ReportTyrehistoryComponent,
    ReportLdComponent,
    ReporttyreLinkingforbusComponent,
    ReportTyreNsdComponent,
    ReportTyrePunctureComponent,
    ReportTyreStockinhandComponent,
    StockSummaryReportComponent,
    TyreModeUpdateComponent,
    AddTyreLinkingDelinkingComponent,
    AddTyreNsdComponent,
    RetreadTyreReceivedStockComponent,
    AddTyreMasterComponent,
    ReportTyreCountComponent,
    ReportTyreLinkingComponent
  ],
  imports: [
    CommonModule,
    TyreManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TyreManagementModule { }
