import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, take } from "rxjs";
import { AuthService } from "./auth-gaurd.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  employeedata: any;
  constructor(
    private router: Router,
    private storageService: StorageService,
    private AuthService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.AuthService.getToken()) {
      return true;
    } 
    this.router.navigate(['/login']);
    return false
  }
}

