import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { StockInventoryComponent } from './stock-inventory/stock-inventory.component';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StockReceivingComponent } from './stock-receiving/stock-receiving.component';
import { WastageEntryComponent } from './wastage-entry/wastage-entry.component';
import { MaterialIssueComponent } from './material-issue/material-issue.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { AddMaterialComponent } from './add-material/add-material.component';


@NgModule({
  declarations: [
    StockInventoryComponent,
    StockReceivingComponent,
    WastageEntryComponent,
    MaterialIssueComponent,
    StockAdjustmentComponent,
    AddMaterialComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
