import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './features/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorsService } from './features/http-services/http-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  SharedModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcuET7Vey36x_ok8bidTwsiEWuOodEn8Y',

    }),
  
    
  ],
  providers:   [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorsService,
    multi: true,
  },
  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
