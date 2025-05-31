import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WorkshopRoutingModule } from './workshop-routing.module';
import { WarehouseSparesTransferComponent } from './warehouse-spares-transfer/warehouse-spares-transfer.component';
import { WorkshopDashboardComponent } from './workshop-dashboard/workshop-dashboard.component';
import { WarehouseSparesPurchageComponent } from './warehouse-spares-purchage/warehouse-spares-purchage.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AddWarehouseSparesTransferComponent } from './add-warehouse-spares-transfer/add-warehouse-spares-transfer.component';
import { AddPartComponent } from './add-part/add-part.component';
import { AddInspectionComponent } from './add-inspection/add-inspection.component';
import { AddWorkshopSparesPurchaseComponent } from './add-workshop-spares-purchase/add-workshop-spares-purchase.component';
import { WorkshopJobCardsComponent } from './workshop-job-cards/workshop-job-cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkshopQCComponent } from './workshop-qc/workshop-qc.component';
import { BillingComponent } from './billing/billing.component';
import { GateInComponent } from './gate-in/gate-in.component';
import { GatePassInListComponent } from './gate-pass-in-list/gate-pass-in-list.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { WorkshopJobCardListComponent } from './workshop-job-card-list/workshop-job-card-list.component';
import { JobCardChildListComponent } from './job-card-child-list/job-card-child-list.component';
import { GatePassOutComponent } from './gate-pass-out/gate-pass-out.component';

@NgModule({
  declarations: [
    WarehouseSparesTransferComponent,
    WorkshopDashboardComponent,
    WarehouseSparesPurchageComponent,
    InspectionComponent,
    AddWarehouseSparesTransferComponent,
    AddPartComponent,
    AddInspectionComponent,
    AddWorkshopSparesPurchaseComponent,
    WorkshopJobCardsComponent,
    WorkshopQCComponent,
    BillingComponent,
    GateInComponent,
    GatePassInListComponent,
    WorkshopJobCardListComponent,
    JobCardChildListComponent,
    GatePassOutComponent
  ],
  imports: [
    CommonModule,
    WorkshopRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
  ]
})
export class WorkshopModule { }
