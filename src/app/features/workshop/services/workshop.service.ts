import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  constructor(
    private apiService: ApiService
  ) { }

  addInspection(payload: any): Observable<any> {
    let url = API_CONSTANTS.addInspection
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getInspection(payload: any): Observable<any> {
    let url = API_CONSTANTS.getInspection
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getInspectionchild(payload: any): Observable<any> {
    let url = API_CONSTANTS.InspectionChild
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getServiceType(): Observable<any> {
    let url = API_CONSTANTS.getServiceType
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getPassIndata(payload: any): Observable<any> {
    let url = API_CONSTANTS.getPassInData
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createGatePass(payload: any): Observable<any> {
    let url = API_CONSTANTS.createGatePass
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getMechanicData(): Observable<any> {
    let url = API_CONSTANTS.MechanicData
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createJobCard(payload:any): Observable<any> {
    let url = API_CONSTANTS.createJob
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  jobCardList(payload:any): Observable<any> {
    let url = API_CONSTANTS.jobCardData
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getchildList(jobCardId:any): Observable<any> {
    let url = API_CONSTANTS.jobCardChildData.replace("id",jobCardId);
  return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  issueMaterial(payload:any): Observable<any> {
    let url = API_CONSTANTS.issueMaterial
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  productChild(payload:any): Observable<any> {
    let url = API_CONSTANTS.productChild
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
