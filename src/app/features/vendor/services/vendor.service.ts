import { Injectable } from '@angular/core';
import { ApiService } from '../../http-services/api.service';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private apiService: ApiService
  ) { }

  poListData(payload: any): Observable<any> {
    let url = API_CONSTANTS.poLIst
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  rfpList(payload: any): Observable<any> {
    let url = API_CONSTANTS.rfpList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  CreateQuotation(payload: any): Observable<any> {
    let url = API_CONSTANTS.CreateQuotation
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  rpfChild(payload: any): Observable<any> {
    let url = API_CONSTANTS.rpfChild
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vendorDashboard(payload: any): Observable<any> {
    let url = API_CONSTANTS.vendorDashboard
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  challan(payload: any): Observable<any> {
    let url = API_CONSTANTS.deliveryChallan
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  posList(payload: any): Observable<any> {
    let url = API_CONSTANTS.posDetailsList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


}
