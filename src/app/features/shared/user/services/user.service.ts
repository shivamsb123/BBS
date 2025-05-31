import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../../constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(  private apiService:ApiService) { }

  getMenuList(payload:any): Observable<any> {
    let url = API_CONSTANTS.menuList
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  userLogin(payload:any): Observable<any> {
    let url = API_CONSTANTS.login
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vendorLogin(payload:any): Observable<any> {
    let url = API_CONSTANTS.vendorLogin
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  refreshtoken(payload:any): Observable<any> {
    let url = API_CONSTANTS.refreshToken
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  userAccessMenu(payload:any): Observable<any> {
    let url = API_CONSTANTS.userAccess
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  userListDetail(payload:any): Observable<any> {
    let url = API_CONSTANTS.userList
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
 
  alertcall(payload: any): Observable<any> {
    let url = API_CONSTANTS.alertCall
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  operationStat():Observable<any>{
    let url = API_CONSTANTS.operationStat
    return this.apiService
     .get(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}