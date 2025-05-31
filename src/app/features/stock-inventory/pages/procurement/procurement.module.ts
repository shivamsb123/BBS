import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementRoutingModule } from './procurement-routing.module';
import { POEnteryComponent } from './po-entery/po-entery.component';
import { APOEnteryComponent } from './apo-entery/apo-entery.component';
import { MRNEnteryComponent } from './mrn-entery/mrn-entery.component';
import { MRNEnteryAPOComponent } from './mrn-entery-apo/mrn-entery-apo.component';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ChildListComponent } from './child-list/child-list.component';


@NgModule({
  declarations: [
    POEnteryComponent,
    APOEnteryComponent,
    MRNEnteryComponent,
    MRNEnteryAPOComponent,
    AddPoEntryComponent,
    AddApoEntryComponent,
    AddMRNentryPoComponent,
    AddMRNentryApoComponent,
    QuotationGenerateComponent,
    AddQuotationComponent,
    VendorGenerateComponent,
    AddVendorComponent,
    GRNGenerateComponent,
    AddGrnComponent,
    AddPoGenerateComponent,
    ChildListComponent
  ],
  imports: [
    CommonModule,
    ProcurementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProcurementModule { }
