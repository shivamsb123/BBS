import { Injectable } from '@angular/core';
import { ApiService } from '../../http-services/api.service';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private apiService: ApiService
  ) { }

  getRouteVoilationReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeVoilationReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  statusReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.statusReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stayReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.stayReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  tripReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.tripReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  dutyChangeReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.dutyChangeReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  missBusStop(payload): Observable<any> {
    let url = API_CONSTANTS.missBusStop
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  geoFance(payload: any): Observable<any> {
    let url = API_CONSTANTS.geoFance
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  dutyReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.dutyReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  LocationStatusReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.LocationStatusReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  InfractionStatusReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.InfractionStatusReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  breakdownReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.breakdownReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  totalVehicleRecord(payload: any): Observable<any> {
    let url = API_CONSTANTS.totalVehicleRecord
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  billingReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.billingReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  OperatorDetails(): Observable<any> {
    let url = API_CONSTANTS.operatorData
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDutyReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateDutyReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  missStopData(payload: any): Observable<any> {
    let url = API_CONSTANTS.missStopDetail
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getGpsWiseBilling(payload: any): Observable<any> {
    let url = API_CONSTANTS.gpsWiseBilling
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  overSpeed(payload: any): Observable<any> {
    let url = API_CONSTANTS.overSpeedReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  odometerreport(payload: any): Observable<any> {
    let url = API_CONSTANTS.odometerreport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stopreportintervalwise(payload: any): Observable<any> {
    let url = API_CONSTANTS.stopreportintervalwise
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  distancereport(payload: any): Observable<any> {
    let url = API_CONSTANTS.distancereport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
   
  getDutyChangeData(payload: any): Observable<any> {
    let url = API_CONSTANTS.allTripStatus
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  DriverWiseTripReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.DriverWiseTripReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  BillingReportDateWise(payload: any): Observable<any> {
    let url = API_CONSTANTS.BillingReportDateWise
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

/**
 * In place of actual infraction report 
 * @param payload 
 * @returns 
 */

  InfractionReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.InfractionReport
    return this.apiService
      .get(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  missStopReason(payload:any): Observable<any> {
    let url = API_CONSTANTS.missStopReason
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  showAttendance(payload:any): Observable<any> {
    let url = API_CONSTANTS.showAttendance
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getChargingReport(payload:any): Observable<any> {
    let url = API_CONSTANTS.chargingReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  getstoopagedata(payload:any): Observable<any> {
    let url = API_CONSTANTS.getstoopagedata
    return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  reportManualVsGPS(payload:any): Observable<any> {
    let url = API_CONSTANTS.reportManualVsGPS
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  routeFance(payload:any): Observable<any> {
    let url = API_CONSTANTS.routeFance
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  driverDutychange(payload:any): Observable<any> {
    let url = API_CONSTANTS.driverDutyChangeReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  complaintReport(payload:any): Observable<any> {
    let url = API_CONSTANTS.complaintReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehileShiftreport(payload:any): Observable<any> {
    let url = API_CONSTANTS.vehicleshift
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  dailySummaryReport(payload:any): Observable<any> {
    let url = API_CONSTANTS.dailySummaryReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  routeSurvey(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeSurveyDropDwon
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  routeSurveyReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeSurveyList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  socChangeReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.socChangeReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deviceHealth(payload: any): Observable<any> {
    let url = API_CONSTANTS.deviceHealth
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  dorReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.dorReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  driverTripReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.driverTripReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  carbonReport(payload: any): Observable<any> {
    let url = API_CONSTANTS.carbonReport
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
}
