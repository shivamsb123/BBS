import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { SessionService } from "./session.service";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: "root",
})
export class HttpInterceptorsService implements HttpInterceptor {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private sessionService: SessionService
  ) {}

  invalidTokenError(error: any): boolean {
    let errorsArray = error.error.errors;
    if (errorsArray === undefined) return false;
    return errorsArray.some(
      (object: any) => object.type === "InvalidTokenError"
    );
  }

  unAuthorizedError(error: any): boolean {
    let errorsArray = error.error.errors;
    if (errorsArray === undefined) return false;
    return errorsArray.some(
      (object: any) => object.type === "UnauthorizedError"
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   
    if (request.url.startsWith("https://maps.google.com/maps/api/geocode/json")) {
      return next.handle(request);
    }
    if (request.url.startsWith("https://maps.googleapis.com/maps/api/geocode/json")) {
      return next.handle(request);
    }
    if (localStorage.getItem('chargingtoken')) {
      return next
        .handle(
          request.clone({
            setHeaders: {
              Authorization: "Bearer " + localStorage.getItem('chargingtoken'),
            },
          })
        )
        .pipe(
          catchError((error: any) => {
            if (this.invalidTokenError(error)) {
              this.sessionService.redirectToLogin(this.router.url);
            }
            if (this.unAuthorizedError(error)){
              this.sessionService.redirectToLogin(this.router.url);
            }
            return throwError(error);
          })
        );
    }

    if (this.tokenService.hasToken()) {
      localStorage.removeItem('chargingtoken');
      return next
        .handle(
          request.clone({
            setHeaders: {
              Authorization: "Bearer " + this.tokenService.getToken(),
            },
          })
        )
        .pipe(
          catchError((error: any) => {
            if (this.invalidTokenError(error)) {
              this.sessionService.redirectToLogin(this.router.url);
            }
            if (this.unAuthorizedError(error)){
              this.sessionService.redirectToLogin(this.router.url);
            }
            return throwError(error);
          })
        );
    }

    return next.handle(request);
  }
}
