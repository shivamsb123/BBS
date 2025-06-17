import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateRCComponent } from './update-rc/update-rc.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AddAccidentComponent } from './add-accident/add-accident.component';
import { BatteryMakerComponent } from './battery-maker/battery-maker.component';
import { DamageTypeComponent } from './damage-type/damage-type.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddZoneComponent } from './add-zone/add-zone.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { RouteRegistrationComponent } from './route-registration/route-registration.component';
import { AddGeoFenceZigZagComponent } from './add-geo-fence-zig-zag/add-geo-fence-zig-zag.component';
import { AddLocationMapComponent } from './add-location-map/add-location-map.component';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { DeviceStatusDataComponent } from './device-status-data/device-status-data.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddFamilyComponent } from './add-employe-details/add-family/add-family.component';
import { AddHealthComponent } from './add-employe-details/add-health/add-health.component';
import { AddProfessinalComponent } from './add-employe-details/add-professinal/add-professinal.component';
import { AddDocumentComponent } from './add-employe-details/add-document/add-document.component';
import { CreateRouteOnMapComponent } from './create-route-on-map/create-route-on-map.component';
import { MapingVehicleDeviceComponent } from './maping-vehicle-device/maping-vehicle-device.component';
import { CreateDeviceComponent } from './create-device/create-device.component';
import { AddDriverBehaviourComponent } from './add-driver-behaviour/add-driver-behaviour.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { RouteFancingComponent } from './route-fancing/route-fancing.component';
import { NewRouteRegistrationComponent } from './new-route-registration/new-route-registration.component';
import { AddLocationMapV2Component } from './add-location-map-v2/add-location-map-v2.component';
import { AddGeoFanceZigZagV2Component } from './add-geo-fance-zig-zag-v2/add-geo-fance-zig-zag-v2.component';
import { RouteFancingV2Component } from './route-fancing-v2/route-fancing-v2.component';
import { AddNewVehicleComponent } from './add-new-vehicle/add-new-vehicle.component';
import { VehicleMasterV2Component } from './vehicle-master-v2/vehicle-master-v2.component';

const routes: Routes = [
  {
    path: 'Installation_MCG', component: UpdateRCComponent
  },
  {
    path: 'Add_Role', component: UserRoleComponent
  },
  {
    path: 'ADD_Accident', component: AddAccidentComponent
  },
  {
    path: 'Battery_Maker', component: BatteryMakerComponent
  },
  {
    path: 'DamageType', component: DamageTypeComponent
  },
  {
    path: 'User_Master_App', component: StaffManagementComponent
  },
  {
    path: 'add-driver', component: AddDriverComponent
  },
  {
    path: 'Add_Department', component: AddDepartmentComponent
  },
  {
    path: 'Add_Zone', component: AddZoneComponent
  },
  {
    path: 'Add_Device', component: AddDeviceComponent
  },
  {
    path: 'Create_Device', component: CreateDeviceComponent
  },
  {
    path: 'Location_Master', component: LocationMasterComponent
  },
  {
    path: 'Route_Registration', component: NewRouteRegistrationComponent
  },
  {
    path:'Add_GeoFence_ZigZag' , component:AddGeoFanceZigZagV2Component
  },
  {
    path:'Add_Location' , component: AddLocationMapV2Component
  },
  {
    path: "edit-driver/:id", 
    component:AddDriverComponent
  },
  {
    path:'Vehicle_Master' , component:VehicleMasterV2Component
  },
  {
    path:'device_status/:id' , component:DeviceStatusDataComponent
  },
  {
    path:'edit-employeeDetails/:id' , component:EmployeeDetailsComponent
  },
  {
    path:'add-family/:id' , component:AddFamilyComponent
  },
  {
    path:'add-health/:id' , component:AddHealthComponent
  },
  {
    path:'add-professional/:id' , component:AddProfessinalComponent
  }, 
  {
    path:'add-documnet/:id' , component: AddDocumentComponent
  },
  {
    path:'add-driver-behaviour/:id' , component: AddDriverBehaviourComponent
  },
  {
    path:'Create_Route_On_Map' , component: CreateRouteOnMapComponent
  },
  {
    path:'Maping_Vehicle_Device' , component: MapingVehicleDeviceComponent
  },
  {
    path:'Route_Master' , component: RouteMasterComponent
  },
  {
    path:'Route_Fencing' , component: RouteFancingV2Component
  },
  {
    path:'add-new-vehicle' , component: AddNewVehicleComponent
  },
   {
    path:'add-new-vehicle/:id' , component: AddNewVehicleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
