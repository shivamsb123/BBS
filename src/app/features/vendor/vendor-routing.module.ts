import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AllRpfDetailsComponent } from './dashboard/all-rpf-details/all-rpf-details.component';
import { AddGrnComponent } from '../stock-inventory/pages/procurement/add-grn/add-grn.component';
import { PoListComponent } from './dashboard/po-list/po-list.component';
import { TotalQuotaionComponent } from './dashboard/total-quotaion/total-quotaion.component';
import { VendorQuotationGenerateComponent } from './dashboard/vendor-quotation-generate/vendor-quotation-generate.component';
import { VenderGrnlistComponent } from './dashboard/vender-grnlist/vender-grnlist.component';
import { DeliveryChallanComponent } from './dashboard/delivery-challan/delivery-challan.component';
import { ChallanListComponent } from './dashboard/challan-list/challan-list.component';

const routes: Routes = [
  {
    path: 'homepage',
    component:DashboardComponent
  },
  {
    path: 'RPF_Details/:id', component: AllRpfDetailsComponent
  },
  {
    path: 'po_list', component:PoListComponent
  },
  {
    path: 'Add_GRN_Generate/:id', component: AddGrnComponent
  },
  {
    path: 'total_Quotation', component: TotalQuotaionComponent
  },
  {
    path:'Quotation_Generate/:id', component: VendorQuotationGenerateComponent
  },
  {
    path:'GRN_List', component: VenderGrnlistComponent
  },
  {
    path:'delivery_challan/:id',component:DeliveryChallanComponent
  },
  {
    path:'Challan_list',component:ChallanListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
