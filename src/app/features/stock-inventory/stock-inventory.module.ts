import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { StockInventoryRoutingModule } from './stock-inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChargingStationComponent } from './pages/charging-station/charging-station.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BomModuleComponent } from './pages/bom-module/bom-module.component';
import { AddBomModuleComponent } from './pages/add-bom-module/add-bom-module.component';


@NgModule({
  declarations: [  
    ChargingStationComponent, BomModuleComponent, AddBomModuleComponent
  ],
  imports: [
    CommonModule,
    StockInventoryRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
  ],
  providers: [
    DatePipe,
  ],
})
export class StockInventoryModule { }
