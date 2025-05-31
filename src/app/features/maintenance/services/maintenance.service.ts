import { Injectable } from '@angular/core';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../http-services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(
    private apiService: ApiService
  ) { }

  partDescription(payload: any): Observable<any> {
    let url = API_CONSTANTS.partDescription
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  complaintType(payload: any): Observable<any> {
    let url = API_CONSTANTS.complaintType
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batteryNoList(payload: any): Observable<any> {
    let url = API_CONSTANTS.batteryNoList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getLocation(payload: any): Observable<any> {
    let url = API_CONSTANTS.getLocation
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addBatteryLinking(payload: any): Observable<any> {
    let url = API_CONSTANTS.addBatteryLinking
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batteryMasterList(payload: any): Observable<any> {
    let url = API_CONSTANTS.batteryMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addBatteryMaster(payload: any): Observable<any> {
    let url = API_CONSTANTS.addBatteryMaster
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batteryLinkList(payload: any): Observable<any> {
    let url = API_CONSTANTS.batteryLinkList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  warrentyClaimist(payload: any): Observable<any> {
    let url = API_CONSTANTS.warrentyClaimist
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  warrentySendToVendor(payload: any): Observable<any> {
    let url = API_CONSTANTS.warrentySendToVendor
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  warrentyClaimReceivedList(payload: any): Observable<any> {
    let url = API_CONSTANTS.warrentyClaimReceivedList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batteryChargeStatus(payload: any): Observable<any> {
    let url = API_CONSTANTS.batteryChargeStatus
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addBatteryHealthCheckup(payload: any): Observable<any> {
    let url = API_CONSTANTS.addBatteryHealthCheckup
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batteryHealthList(payload: any): Observable<any> {
    let url = API_CONSTANTS.batteryHealthList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batTeriminallist(payload: any): Observable<any> {
    let url = API_CONSTANTS.batTeriminallist
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addBatteryTeriminal(payload: any): Observable<any> {
    let url = API_CONSTANTS.addBatteryTeriminal
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  warrentyReceivedAdd(payload: any): Observable<any> {
    let url = API_CONSTANTS.warrentyReceivedAdd
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}