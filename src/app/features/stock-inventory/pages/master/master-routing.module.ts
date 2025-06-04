import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { SupplierAddressComponent } from './supplier-address/supplier-address.component';
import { CountryMasterComponent } from './country-master/country-master.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { DistrictMasterComponent } from './district-master/district-master.component';
import { ItemMappingComponent } from './item-mapping/item-mapping.component';
import { LevelMasterComponent } from './level-master/level-master.component';


const routes: Routes = [
  {
    path: 'ProductMaster_List', component: ProductMasterComponent
  },
  {
    path: 'Add-Product', component: AddProductComponent
  },
  {
    path: 'Edit-Product/:id', component: AddProductComponent
  },
  {
    path: 'HSNMaster_List', component: HSNCodeComponent
  },
  {
    path: 'Add-HSN', component: AddHSNComponent
  },
  {
    path: 'Add-HSN/:id', component: AddHSNComponent
  },
  {
    path: 'CategoryMaster_List', component: CategoryMasterComponent
  },
  {
    path: 'Add-category', component: AddCategoryMasterComponent
  },
  {
    path: 'Add-category/:id', component: AddCategoryMasterComponent
  },
  {
    path: 'SubCategoryMaster_List', component: SubCategoryMasterComponent
  },
  {
    path: 'Add-Subcategory', component: AddSubCategoryComponent
  },
  {
    path: 'Add-Subcategory/:id/:catId', component: AddSubCategoryComponent
  },
  {
    path: 'ProductMaster_Unit_List', component: UnitListComponent
  },
  {
    path: 'Add-Unit', component: AddUnitComponent
  },
  {
    path: 'Add-Unit/:id', component: AddUnitComponent
  },
  {
    path: 'Master_Unit_Conversion_List', component: UnitConversionListComponent
  },
  {
    path: 'Add-Unit-Conversion', component: AddUnitConversionComponent
  },
  {
    path: 'Add-Unit-Conversion/:id', component: AddUnitConversionComponent
  },
  {
    path: 'Brand_Master_List', component: BrandMasterComponent
  },
  {
    path: 'Add-Brand', component: AddBrandComponent
  },
  {
    path: 'Add-Brand/:id', component: AddBrandComponent
  },
  {
    path: 'Master_Manufacturer_List', component: ManufacturerComponent
  },
  {
    path: 'Add-Manufacturer', component: AddManufacturerComponent
  },
  {
    path: 'Add-Manufacturer/:id', component: AddManufacturerComponent
  },
  {
    path: 'Contact_Master_List', component: ContactListComponent
  },
  {
    path: 'Add-Contact', component: AddContactComponent
  },
  {
    path: 'Add-Contact/:id', component: AddContactComponent
  },
   {
    path: 'supplier-address/:id', component: SupplierAddressComponent
  },
  {
    path:'Country_Master_List',component:CountryMasterComponent,
  },
   {
    path:'State_Master_List',component:StateMasterComponent
  },

    {
    path:'District_Master_List',component:DistrictMasterComponent
  },
  
   {
    path:'Supplier_Item_Mapping_List',component:ItemMappingComponent
  },
   {
    path:'Level_Master',component:LevelMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
