import { Injectable } from "@angular/core";

import { StorageService } from "./storage.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class SessionService {
    constructor(private indexedDB: StorageService,
        private router: Router){}

    logout() {

        localStorage.clear();
        sessionStorage.clear();
        this.indexedDB.clear();
        // window.location.href = 'login'
        this.router.navigateByUrl('login' )
       }
    

    redirectToLogin(currentURL: string) {
        this.storeCurrentLocation(currentURL);
        sessionStorage.removeItem('inactiveSession');
        // window.location.href = 'login';
        this.router.navigateByUrl('login' )
    }

    storeCurrentLocation(currentURL: string) {
        sessionStorage.setItem("redirectURL", currentURL);
    }
}