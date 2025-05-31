import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AllRpfDetailsComponent } from './dashboard/all-rpf-details/all-rpf-details.component';
import { PoListComponent } from './dashboard/po-list/po-list.component';
import { TotalQuotaionComponent } from './dashboard/total-quotaion/total-quotaion.component';
import { VendorQuotationGenerateComponent } from './dashboard/vendor-quotation-generate/vendor-quotation-generate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VenderGrnlistComponent } from './dashboard/vender-grnlist/vender-grnlist.component';
import { DeliveryChallanComponent } from './dashboard/delivery-challan/delivery-challan.component';
import { ChallanListComponent } from './dashboard/challan-list/challan-list.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AllRpfDetailsComponent,
    PoListComponent,
    TotalQuotaionComponent,
    VendorQuotationGenerateComponent,
    VenderGrnlistComponent,
    DeliveryChallanComponent,
    ChallanListComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VendorModule { }
