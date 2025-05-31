import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargingStationComponent } from './pages/charging-station/charging-station.component';
import { BomModuleComponent } from './pages/bom-module/bom-module.component';
import { AddBomModuleComponent } from './pages/add-bom-module/add-bom-module.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/master/master.module').then(
        (mod) => mod.MasterModule
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('./pages/inventory/inventory.module').then(
        (mod) => mod.InventoryModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/procurement/procurement.module').then(
        (mod) => mod.ProcurementModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/supplychain-report/supplychain-report.module').then(
        (mod) => mod.SupplychainReportModule
      ),
  },
  {path: 'Charging_Station/:id', component: ChargingStationComponent},
  {path: 'Bom_module', component : BomModuleComponent},
  {path: 'add_bom_module', component : AddBomModuleComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockInventoryRoutingModule { }
