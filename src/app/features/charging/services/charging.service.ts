import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS, chargingBaseUrl } from '../../shared/constant/API_CONSTANT';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChargingService {
 headers:any = { 'Authorization':  'Bearer VgMxIXSes1Ky.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA0NjEzNjAwMTAsImVhdCI6MTcwODIzNzM2MDAxMH0.Jt_RmuOZCsKFiGvzhO590YdCDjyv2Eh32qxBIaVkPRQ' };
  constructor(
    private http : HttpClient
  ) { }

  
  totalDevices(payload: any): Observable<any> {
    let url = chargingBaseUrl + API_CONSTANTS.totalDevice
      return this.http.post<any>(url, payload,  this.headers ).pipe(catchError((error: HttpErrorResponse) => of(error)))
  }
}
