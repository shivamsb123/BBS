import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ProductMasterComponent } from './product-master/product-master.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HSNCodeComponent } from './hsn-code/hsn-code.component';
import { AddHSNComponent } from './add-hsn/add-hsn.component';
import { CategoryMasterComponent } from './category-master/category-master.component';
import { AddCategoryMasterComponent } from './add-category-master/add-category-master.component';
import { SubCategoryMasterComponent } from './sub-category-master/sub-category-master.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { UnitListComponent } from './unit-list/unit-list.component';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { UnitConversionListComponent } from './unit-conversion-list/unit-conversion-list.component';
import { AddUnitConversionComponent } from './add-unit-conversion/add-unit-conversion.component';
import { BrandMasterComponent } from './brand-master/brand-master.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { AddManufacturerComponent } from './add-manufacturer/add-manufacturer.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SupplierAddressComponent } from './supplier-address/supplier-address.component';
import { CountryMasterComponent } from './country-master/country-master.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { DistrictMasterComponent } from './district-master/district-master.component';
import { ItemMappingComponent } from './item-mapping/item-mapping.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LevelMasterComponent } from './level-master/level-master.component';
import { LocationListComponent } from './location-list/location-list.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { LevelMappingComponent } from './level-mapping/level-mapping.component';
import { LocationMappingComponent } from './location-mapping/location-mapping.component';
import { SessionListComponent } from './session-list/session-list.component';
import { VoucherSetupMasterComponent } from './voucher-setup-master/voucher-setup-master.component';
import { SupplychainDashboardComponent } from './supplychain-dashboard/supplychain-dashboard.component';
import { DashboardChildListComponent } from './dashboard-child-list/dashboard-child-list.component';
import { ApprovalRequestComponent } from './approval-request/approval-request.component';
import { GenerateRequestComponent } from './generate-request/generate-request.component';
@NgModule({
  declarations: [
    ProductMasterComponent,
    AddProductComponent,
    HSNCodeComponent,
    AddHSNComponent,
    CategoryMasterComponent,
    AddCategoryMasterComponent,
    SubCategoryMasterComponent,
    AddSubCategoryComponent,
    UnitListComponent,
    AddUnitComponent,
    UnitConversionListComponent,
    AddUnitConversionComponent,
    BrandMasterComponent,
    AddBrandComponent,
    ManufacturerComponent,
    AddManufacturerComponent,
    ContactListComponent,
    AddContactComponent,
    SupplierAddressComponent,
    CountryMasterComponent,
    StateMasterComponent,
    DistrictMasterComponent,
    ItemMappingComponent,
    LevelMasterComponent,
    LocationListComponent,
    AddLocationComponent,
    LevelMappingComponent,
    LocationMappingComponent,
    SessionListComponent,
    VoucherSetupMasterComponent,
    SupplychainDashboardComponent,
    DashboardChildListComponent,
    ApprovalRequestComponent,
    GenerateRequestComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
     MatMenuModule,
    MatIconModule,
    MatButtonModule,
    

  ]
})
export class MasterModule { }
