import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TyreManagementRoutingModule } from './tyre-management-routing.module';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TyreManagementRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TyreManagementModule { }
