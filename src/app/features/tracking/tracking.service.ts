import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../shared/constant/API_CONSTANT';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor(private apiService: ApiService, private http : HttpClient) { }
  livetrackinghistory(payload: any): Observable<any> {
    let url = API_CONSTANTS.getlistoftracking
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
    // const url = 'http://103.190.95.186/skyitmsapi/'+ API_CONSTANTS.getlistoftracking;
  
    // return this.http.post(url, payload)
    // .pipe(catchError((error: HttpErrorResponse) => of(error)));;
  }

  replay(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetTrackingHistoryReplay
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  getLive(payload: any): Observable<any> {
    let url = API_CONSTANTS.tracking
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getStopData(payload: any): Observable<any> {
    let url = API_CONSTANTS.getStopData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  private apiUrl = 'http://49.248.198.102:12060/live.flv?devid=008802AC59&chl=3&svrid=127.0.0.1&svrport=17891&st=1&audio=1';
  getLiveVideo(): Observable<any> {
    const params = {
      key: '123aaeq3jjkljrqweoiu',
      terid: '008120567',
      chl: '1',
      audio: '1',
      st: '0',
      port: '12060'
    };

    return this.http.get(this.apiUrl, { params });
  }

  routeDetailsForEdit(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeDetailsForEdit
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
