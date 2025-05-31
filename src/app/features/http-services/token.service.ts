import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, take } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
// import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { API_CONSTANTS } from '../shared/constant/API_CONSTANT';
import { UserService } from '../shared/user/services/user.service';
import { ActivityService } from '../shared/user/services/activity.service';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from './shared.service';
import { NotificationService } from './notification.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  secondsToRefreshBeforeExpiring = 10;
  tokenSubject: BehaviorSubject<string>;
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    // this.indexedDB.clear();
    // window.location.href = environment.hostURL;
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private indexedDB: StorageService,
    private userService: UserService,
    private activityService: ActivityService,
    private storageService: StorageService,
    private NotificationService: NotificationService
  ) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  }
  // getExpirationSeconds() {
  //   let expirationTime = sessionStorage.getItem('tokenExpires');
  //   let currentTime = new Date().getTime() / 1000;
  //   console.log('getexpiration time ====>', currentTime);
    
  //   return Number(expirationTime) - currentTime;
  // }

  // setRefreshTimer(seconds: number) {
  //   if (seconds < 0) seconds = 0;
  //   setTimeout(() => {
  //     this.refeshToken();
  //   }, seconds * 1000);
  // }
  // redirectToLogin(currentURL: string) {
  //   this.storeCurrentLocation(currentURL);
  //   // window.location.href = 'login';
  //   this.router.navigateByUrl('login' )
  // }
  // refeshToken() {
    
  //   console.log('jwttoken session',  sessionStorage.getItem('token'));
  //   console.log('refreshtoken session ',  sessionStorage.getItem('refresh_token'));
    
    
  //   let payload = {
  //     jwtToken: sessionStorage.getItem('token'),
  //     refreshToken:  sessionStorage.getItem('refresh_token')
  //   };
  //   if (this.activityService.userIsActive()) {
  //     this.userService.refreshtoken(payload).subscribe((res: any) => {
  //       console.log('resfresh======>',res);
  //       const userDetail = res;
  //         console.log('token looking =======>', userDetail.jwtToken);
  //         sessionStorage.setItem('token', userDetail.jwtToken);
  //         localStorage.setItem('token', userDetail.jwtToken);
  //         sessionStorage.setItem('refresh_token', userDetail.refreshToken);
  //         this.setExpiration(1000);
  //         return userDetail.jwtToken;
      
  //     });
  //   }
  //   else {
  //     this.activityService.userResumedSession.pipe(take(1)).subscribe(() => {
  //       this.refeshToken();
  //     });
  //   }
  // }
  // storeCurrentLocation(currentURL: string) {
  //   sessionStorage.setItem('redirectURL', currentURL);
  // }
  getTokens(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
  generateToken(username: string, password: string) {
    let payload = {
      UserName: username,
      Password: password,
    };
    console.log('payload check =====>', payload);
    this.userService.userLogin(payload).subscribe((res: any) => {
      const userDetail = res.body.data;
      if (res.body?.flag == '1') {
        // this.router.navigateByUrl('Dashboard/DashboardDMS');
        window.location.href ='Dashboard/DashboardDMS'
        console.log('token looking =======>', userDetail.jwtToken);
        sessionStorage.setItem('token', userDetail.jwtToken);
        localStorage.setItem('token', userDetail.jwtToken);
        sessionStorage.setItem('refresh_token', userDetail.refreshToken);
        localStorage.setItem('user_Id', userDetail.userID);
        localStorage.setItem('dept_id', userDetail.dept_ID);
        localStorage.setItem('userType','user')
        this.storageService.setItem('userDetail', res.userDetail);
        this.NotificationService.showSuccess('Login Successfully')

        return userDetail.jwtToken;
      } else {
        this.NotificationService.showError('Please check User Id and Password')
      }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
  // setExpiration(seconds: number) {
  //   if (seconds > 3600) seconds = 3600;
  //   let currentTime = new Date().getTime() / 1000;
  //   console.log('current time======>',currentTime); 
  //   sessionStorage.setItem("tokenExpires", (currentTime + seconds).toString());
  //   this.setRefreshTimer(seconds - this.secondsToRefreshBeforeExpiring);
  // }

  hasToken() {
    return localStorage.getItem('token') !== null;
  }

  // tokenIsExpired(): boolean {
  //   let expirationTime = sessionStorage.getItem('tokenExpires');
  //   console.log('expiration time====>', expirationTime);

  //   if (expirationTime === null) return true;
  //   let currentTime = new Date().getTime() / 1000;
  //   return Number(expirationTime) - currentTime < 0;
  // }
}
