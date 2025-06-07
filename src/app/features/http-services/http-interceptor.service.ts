import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { TokenService } from "./token.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { SessionService } from "./session.service";
 
@Injectable({
  providedIn: "root",
})
export class HttpInterceptorsService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private SessionService : SessionService
  ) { }
 
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip interception for these URLs
    if (httpRequest.url.startsWith("https://maps.google.com/maps/api/geocode/json")) {
      return next.handle(httpRequest);
    }
    if (httpRequest.url.startsWith("https://maps.googleapis.com/maps/api/geocode/json")) {
      return next.handle(httpRequest);
    }
    // Add authorization header if token exists
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      const authReq = httpRequest.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
 
      return next.handle(authReq).pipe(
        catchError((error: any) => {
          if (error.status === 401) {
             this.SessionService.logout();
            this.router.navigate(['/login']);
          }
         
          if (this.invalidTokenError(error) || this.unAuthorizedError(error)) {
             this.SessionService.logout();
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }
 
    // For requests without token
    return next.handle(httpRequest);
  }
 
 
  private invalidTokenError(error: any): boolean {
    const errorsArray = error.error?.errors;
    return errorsArray?.some((object: any) => object.type === "InvalidTokenError") ?? false;
  }
 
  private unAuthorizedError(error: any): boolean {
    const errorsArray = error.error?.errors;
    return errorsArray?.some((object: any) => object.type === "UnauthorizedError") ?? false;
  }
}
