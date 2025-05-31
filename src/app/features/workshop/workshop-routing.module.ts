import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../vendor/dashboard/dashboard/dashboard.component';
import { WarehouseSparesTransferComponent } from './warehouse-spares-transfer/warehouse-spares-transfer.component';
import { WorkshopDashboardComponent } from './workshop-dashboard/workshop-dashboard.component';
import { WarehouseSparesPurchageComponent } from './warehouse-spares-purchage/warehouse-spares-purchage.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AddWarehouseSparesTransferComponent } from './add-warehouse-spares-transfer/add-warehouse-spares-transfer.component';
import { AddInspectionComponent } from './add-inspection/add-inspection.component';
import { AddWorkshopSparesPurchaseComponent } from './add-workshop-spares-purchase/add-workshop-spares-purchase.component';
import { WorkshopJobCardsComponent } from './workshop-job-cards/workshop-job-cards.component';
import { WorkshopQCComponent } from './workshop-qc/workshop-qc.component';
import { MRNEnteryComponent } from '../stock-inventory/pages/procurement/mrn-entery/mrn-entery.component';
import { QuotationGenerateComponent } from '../stock-inventory/pages/procurement/quotation-generate/quotation-generate.component';
import { VendorGenerateComponent } from '../stock-inventory/pages/procurement/vendor-generate/vendor-generate.component';
import { AddPoGenerateComponent } from '../stock-inventory/pages/procurement/add-po-generate/add-po-generate.component';
import { GRNGenerateComponent } from '../stock-inventory/pages/procurement/grn-generate/grn-generate.component';
import { BillingComponent } from './billing/billing.component';
import { GateInComponent } from './gate-in/gate-in.component';
import { GatePassInListComponent } from './gate-pass-in-list/gate-pass-in-list.component';
import { WorkshopJobCardListComponent } from './workshop-job-card-list/workshop-job-card-list.component';
import { GatePassOutComponent } from './gate-pass-out/gate-pass-out.component';

const routes: Routes = [
  {
    path: 'DashBoard_Workshop', component:WorkshopDashboardComponent
  },
  {
    path: 'Inter_Warehouse_Spares_Transfer', component:WarehouseSparesTransferComponent
  },
  {
    path: 'Inter_Warehouse_Spares_Purcahse', component:WarehouseSparesPurchageComponent
  },
  {
    path: 'Inspection', component:InspectionComponent
  },
  {
    path: 'add_inter_warehouse_spares_transfer', component:AddWarehouseSparesTransferComponent
  },
  {
    path: 'add_inspection', component:AddInspectionComponent
  },
  {
    path: 'add_inspection/:id', component:AddInspectionComponent
  },
  {
    path: 'add_workshop_purchase', component:AddWorkshopSparesPurchaseComponent
  },
  {
    path: 'workshop_job_card', component:WorkshopJobCardListComponent
  },
  {
    path: 'Add_job_card', component:WorkshopJobCardsComponent
  },
  {
    path: 'Add_job_card/:id', component:WorkshopJobCardsComponent
  },
  {
    path: 'workshop_QC', component:WorkshopQCComponent
  },
  {
    path:'MRN_Generate', component:MRNEnteryComponent
  },
  {
    path: 'RFP_Generate', component: QuotationGenerateComponent
  },
  {
    path: 'Quotation_Generate', component: VendorGenerateComponent
  },
  {
    path:'PO_Generate', component:AddPoGenerateComponent
  },
  {
    path: 'GRN_Generate', component: GRNGenerateComponent
  },
  {
    path: 'BIlling', component: BillingComponent
  },
  {
    path: 'In', component: GatePassInListComponent
  },
  {
    path: 'create_gate_pass_in', component: GateInComponent
  },
  {
    path: 'Out', component: GatePassOutComponent
  },
  {
    path: 'create_gate_pass_in/:id', component: GateInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }
