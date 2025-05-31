import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationalRoutingModule } from './operational-routing.module';
import { UpdateRcDetailComponent } from './update-rc-detail/update-rc-detail.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    UpdateRcDetailComponent
  ],
  imports: [
    CommonModule,
    OperationalRoutingModule,
    TimepickerModule,
    BsDatepickerModule,
    TabsModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule, 
  ]
})
export class OperationalModule { }
