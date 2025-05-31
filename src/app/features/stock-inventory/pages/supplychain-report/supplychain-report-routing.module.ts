import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemWastageComponent } from './item-wastage/item-wastage.component';
import { StockAbilityComponent } from './stock-ability/stock-ability.component';


const routes: Routes = [
  {path: 'Item_Wastage', component:ItemWastageComponent},
  {path: 'Stock_As_On_Date', component:StockAbilityComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplychainReportRoutingModule { }
