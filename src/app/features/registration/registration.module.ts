import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { UpdateRCComponent } from './update-rc/update-rc.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AddAccidentComponent } from './add-accident/add-accident.component';
import { BatteryMakerComponent } from './battery-maker/battery-maker.component';
import { DamageTypeComponent } from './damage-type/damage-type.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { AddGeoFenceZigZagComponent } from './add-geo-fence-zig-zag/add-geo-fence-zig-zag.component';


import { AddZoneComponent } from './add-zone/add-zone.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import { LocationMasterComponent } from './location-master/location-master.component';
import { RouteRegistrationComponent } from './route-registration/route-registration.component';
import { AddLocationMapComponent } from './add-location-map/add-location-map.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { VehicleMasterComponent } from './vehicle-master/vehicle-master.component';
import { NewGeofenceComponent } from './new-geofence/new-geofence.component';
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
import { RegistrationPipe } from './pipe/registration.pipe';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddNewStopComponent } from './add-new-stop/add-new-stop.component';
import { RouteMasterComponent } from './route-master/route-master.component';
import { RoutePlotPopupComponent } from './route-plot-popup/route-plot-popup.component';
import { RouteFancingComponent } from './route-fancing/route-fancing.component';
import { NewRouteRegistrationComponent } from './new-route-registration/new-route-registration.component';
import { ShowRouteOnMapComponent } from './show-route-on-map/show-route-on-map.component';
import { AddLocationMapV2Component } from './add-location-map-v2/add-location-map-v2.component';
import { AddGeoFanceZigZagV2Component } from './add-geo-fance-zig-zag-v2/add-geo-fance-zig-zag-v2.component';
import { RouteFancingV2Component } from './route-fancing-v2/route-fancing-v2.component';


@NgModule({
  declarations: [
    UpdateRCComponent,
    UserRoleComponent,
    AddAccidentComponent,
    BatteryMakerComponent,
    DamageTypeComponent,
    StaffManagementComponent,
    AddDepartmentComponent,
    AddDriverComponent,
    AddGeoFenceZigZagComponent,
    AddZoneComponent,
    AddDeviceComponent,
    LocationMasterComponent,
    RouteRegistrationComponent,
    AddLocationMapComponent,
    VehicleMasterComponent,
    NewGeofenceComponent,
    DeviceStatusDataComponent,
    EmployeeDetailsComponent,
    AddFamilyComponent,
    AddHealthComponent,
    AddProfessinalComponent,
    AddDocumentComponent,
    CreateRouteOnMapComponent,
    MapingVehicleDeviceComponent,
    CreateDeviceComponent,
    AddDriverBehaviourComponent,
    RegistrationPipe,
    AddNewStopComponent,
    RouteMasterComponent,
    RoutePlotPopupComponent,
    RouteFancingComponent,
    NewRouteRegistrationComponent,
    ShowRouteOnMapComponent,
    AddLocationMapV2Component,
    AddGeoFanceZigZagV2Component,
    RouteFancingV2Component,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TimepickerModule,
    BsDatepickerModule,
    TabsModule,
    NgMultiSelectDropDownModule,
    GoogleMapsModule,
    

  ]
})
export class RegistrationModule { }
