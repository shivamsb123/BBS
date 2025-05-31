import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SupplychainReportRoutingModule } from './supplychain-report-routing.module';
import { ItemWastageComponent } from './item-wastage/item-wastage.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { StockAbilityComponent } from './stock-ability/stock-ability.component';

@NgModule({
  declarations: [
    ItemWastageComponent,
    StockAbilityComponent
  ],
  imports: [
    CommonModule,
    SupplychainReportRoutingModule,
    BsDatepickerModule,
    SharedModule
  ]
})
export class SupplychainReportModule { }
