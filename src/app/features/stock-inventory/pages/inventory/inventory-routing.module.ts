import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockInventoryComponent } from './stock-inventory/stock-inventory.component';
import { StockReceivingComponent } from './stock-receiving/stock-receiving.component';
import { WastageEntryComponent } from './wastage-entry/wastage-entry.component';
import { MaterialIssueComponent } from './material-issue/material-issue.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';

const routes: Routes = [
  {
    path: 'Stock_Inventory', component: StockInventoryComponent
  },
  {
    path: 'Stock_Receiving', component: StockReceivingComponent
  },
  {
    path: 'Wastage_Entry', component: WastageEntryComponent
  },
  {
    path: 'Material_Issue', component: MaterialIssueComponent
  },
  {
    path: 'Stock_Adjiustment', component: StockAdjustmentComponent
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
