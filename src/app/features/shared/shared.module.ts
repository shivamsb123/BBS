import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './user/login/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './site-layout/header/header/header.component';
import { FooterComponent } from './site-layout/footer/footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout/main-layout.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { SwitchTabModalComponentComponent } from './components/switch-tab-modal-component/switch-tab-modal-component.component';
import { RouterModule } from '@angular/router';

import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TyreModeUpdateComponent } from '../tyre-management/tyre-mode-update/tyre-mode-update.component';
import { TyreManagementModule } from '../tyre-management/tyre-management.module';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppAlertComponent } from './components/app-alert/app-alert.component';
import { AlertModule } from "ngx-bootstrap/alert";
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { LoaderComponent } from './components/loader/loader.component';
import { searchFilterPipe } from './Pipe/serachFilter.pipe';
import { MapViewLightboxComponent } from './components/map-view-lightbox/map-view-lightbox.component';
import { AgmDrawingModule, AgmDrawingManager } from '@agm/drawing'
import { ConfirmationPopupComponent } from './components/confirmation-popup/confirmation-popup.component';
import { MegamenuComponent } from './site-layout/megamenu/megamenu.component';
import { MapView2PopupComponent } from './components/map-view2-popup/map-view2-popup.component';
import { DummyTrackComponent } from './components/dummy-track/dummy-track.component';
import { SearchComponentComponent } from './components/search-component/search-component.component';
import { ToastrModule } from 'ngx-toastr';
import { OBUPopupComponent } from './components/obu-popup/obu-popup.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SpinnerLoaderComponent } from './components/spinner-loader/spinner-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SkySearchControlComponent } from './components/sky-search-control/sky-search-control.component';
import { AddInformationComponent } from './components/add-information/add-information.component';
import { RouteWiseMapComponent } from './components/route-wise-map/route-wise-map.component';
import { UnderDevelopmentComponent } from './components/under-development/under-development.component';
import { ImgviewComponent } from './components/imgview/imgview.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { ChartViewComponent } from './components/chart-view/chart-view.component';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { NotificationPopupComponent } from './components/notification-popup/notification-popup.component';
import { LottieModule } from 'ngx-lottie';
import player from "lottie-web";
import { OperationStatisticsComponent } from './user/operation-statistics/operation-statistics.component';

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    SwitchTabModalComponentComponent,
    SelectFilterComponent,
    AppAlertComponent,
    MapComponent,
    LoaderComponent,
    searchFilterPipe,
    MapViewLightboxComponent,
    ConfirmationPopupComponent,
    MegamenuComponent,
    MapView2PopupComponent,
    DummyTrackComponent,
    SearchComponentComponent,
    OBUPopupComponent,
    SpinnerLoaderComponent,
    SkySearchControlComponent,
    AddInformationComponent,
    RouteWiseMapComponent,
    UnderDevelopmentComponent,
    ImgviewComponent,
    ChartViewComponent,
    AlertPopupComponent,
    NotificationPopupComponent,
    OperationStatisticsComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcuET7Vey36x_ok8bidTwsiEWuOodEn8Y',
    }),
    AgmDrawingModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    NgxChartsModule,
    NgxSpinnerModule,
    SortablejsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    CommonModule,
    BsDatepickerModule,
    BsDropdownModule,
    NgxPaginationModule,
    PaginationModule,
    FormsModule,
    ModalModule,
    TabsModule,
    NgMultiSelectDropDownModule,
    SelectFilterComponent,
    AppAlertComponent,
    AlertModule,
    MapComponent,
    searchFilterPipe,
    TooltipModule,
    LoaderComponent,
    MapViewLightboxComponent,
    AgmCoreModule,
    AgmDrawingModule,
    ConfirmationPopupComponent,
    MegamenuComponent,
    DummyTrackComponent,
    SearchComponentComponent,
    ToastrModule,
    NgxChartsModule,
    SpinnerLoaderComponent,
    NgxSpinnerModule,
    SkySearchControlComponent,
    UnderDevelopmentComponent,
    SortablejsModule,
    ChartViewComponent,
    AlertPopupComponent,
    LottieModule



  ],
  providers: [
    DatePipe,
  ],
})
export class SharedModule { }
