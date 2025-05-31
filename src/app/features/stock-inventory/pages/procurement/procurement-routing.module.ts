import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POEnteryComponent } from './po-entery/po-entery.component';
import { APOEnteryComponent } from './apo-entery/apo-entery.component';
import { MRNEnteryComponent } from './mrn-entery/mrn-entery.component';
import { MRNEnteryAPOComponent } from './mrn-entery-apo/mrn-entery-apo.component';
import { AddPoEntryComponent } from './add-po-entry/add-po-entry.component';
import { AddApoEntryComponent } from './add-apo-entry/add-apo-entry.component';
import { AddMRNentryPoComponent } from './add-mrnentry-po/add-mrnentry-po.component';
import { AddMRNentryApoComponent } from './add-mrnentry-apo/add-mrnentry-apo.component';
import { QuotationGenerateComponent } from './quotation-generate/quotation-generate.component';
import { AddQuotationComponent } from './add-quotation/add-quotation.component';
import { VendorGenerateComponent } from './vendor-generate/vendor-generate.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { GRNGenerateComponent } from './grn-generate/grn-generate.component';
import { AddGrnComponent } from './add-grn/add-grn.component';
import { AddPoGenerateComponent } from './add-po-generate/add-po-generate.component';

const routes: Routes = [
  {path:'PO_Generate', component:AddPoGenerateComponent},
  {path:'po_quo_List', component:POEnteryComponent},
  {path: 'Add_PO_Generate/:id', component: AddPoEntryComponent},
  {path:'APoentry', component:APOEnteryComponent},
  {path: 'add-APoentry', component: AddApoEntryComponent},
  {path:'MRN_Generate', component:MRNEnteryComponent},
  {path: 'Add_MRN_Generate', component: AddMRNentryPoComponent},
  {path: 'Edit_MRN_Generate/:id', component: AddMRNentryPoComponent},
  {path:'MRNentryAPO', component:MRNEnteryAPOComponent},
  {path: 'add-MRNentryAPO', component: AddMRNentryApoComponent},
  {path: 'RFP_Generate', component: QuotationGenerateComponent},
  {path: 'Add_RFP_Generate', component: AddQuotationComponent},
  {path: 'Quotation_Generate', component: VendorGenerateComponent},
  {path: 'Add_Quotation', component: AddVendorComponent},
   {path: 'GRN_Generate', component: GRNGenerateComponent},
   {path: 'Add_GRN_Generate', component: AddGrnComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementRoutingModule { }
