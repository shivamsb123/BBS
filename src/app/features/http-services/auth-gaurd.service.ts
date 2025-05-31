import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private _http: HttpClient,
    private storageService: StorageService
  ) { }

  /**
   * set token in local storage
   * @param token 
   */
  setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  /**
   * get token from local storage
   * @returns 
   */
  getToken() {
    return localStorage.getItem('token') ;
    // this.storageService.getItem("uid").subscribe((uid: number) => {
    //   if (uid == null) {
    //     return false
    //   }
    //   else {
    //     return true
    //   }
    // })
  }

  /**
   * check user logged in otherwise it will return null
   * @returns 
   */
  isLoggedIn() {
    return this.getToken() !== null
  }

  /**
   * user logout
   */
  logout() {
    this.storageService.clear();
    localStorage.removeItem('uid');
    this.router.navigate(['/login']);
  }


}

