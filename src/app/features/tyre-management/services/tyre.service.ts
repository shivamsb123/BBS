import { Injectable } from '@angular/core';
import { ApiService } from '../../http-services/api.service';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TyreService {

  constructor(
    private apiService: ApiService
  ) { }

  tyreMasterList(payload: any): Observable<any> {
    let url = API_CONSTANTS.tyreMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getTyreLinkingList(payload: any): Observable<any> {
    let url = API_CONSTANTS.tyrelinkingList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addTyre(payload: any): Observable<any> {
    let url = API_CONSTANTS.addTyreMaster
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  AddTyreLinkingData(payload: any): Observable<any> {
    let url = API_CONSTANTS.addTyreLinking
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  getTyreLocation(payload: any): Observable<any> {
    let url = API_CONSTANTS.getLocation
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  nsdList(payload: any): Observable<any> {
    let url = API_CONSTANTS.getNsdList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addTyreNsdData(payload: any): Observable<any> {
    let url = API_CONSTANTS.addTyreNsd
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  tyreVendorList(payload: any): Observable<any> {
    let url = API_CONSTANTS.tyreVendorList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addRetreadVendor(payload: any): Observable<any> {
    let url = API_CONSTANTS.addRetreadVendor
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  recievedTyreList(payload: any): Observable<any> {
    let url = API_CONSTANTS.recievedTyreList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addStoreReceived(payload: any): Observable<any> {
    let url = API_CONSTANTS.addStoreReceived
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addDamageTyre(payload: any): Observable<any> {
    let url = API_CONSTANTS.addDamageTyre
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  tyreNumber(payload: any): Observable<any> {
    let url = API_CONSTANTS.tyreNumberLIst
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  tyreVehicleWise(payload: any): Observable<any> {
    let url = API_CONSTANTS.tyreNoVehicleWise
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  damageTyreList(payload: any): Observable<any> {
    let url = API_CONSTANTS.damageTyreList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  linkingReportList(payload: any): Observable<any> {
    let url = API_CONSTANTS.linkingReportList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  punctureTyreReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.punctureTyreReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
