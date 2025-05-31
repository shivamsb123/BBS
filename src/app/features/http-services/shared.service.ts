import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from '../shared/user/services/user.service';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { ManagementService } from '../management/services/management.service';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  employeeId: any;
  mapdata: any;
  userId: any;
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private dashboardService: DashboardService,
    private managementService: ManagementService,
    private apiService: ApiService,
    private http : HttpClient
  ) { }

  getUserId() {
    return localStorage.getItem('uid');
    // this.storageService.getItem('employee_role_data').subscribe(res => {
    //  this.employeeId = res.employee_id

    //   return this.employeeId;
    // })
    // if (this.userEmail === undefined) {
    //   this.userEmail = localStorage.getItem("userNames");
    //   return this.userEmail;
    // } else {
    //   return this.userEmail;
    // }
  }

  getDepartmentData(): any {
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "IncludeSelf": 1
    };
    return this.dashboardService.departmentList(payload).pipe(map(response => {
      return response
    }))
  }

  getVehicleZone() {
    let payload = {
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "ZoneId": 0,
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "OnlyVehicle": 2
    };
    return this.dashboardService.vehicleBasedonZone(payload).pipe(map(response => {
      return response
    }))
  }
  getRoutelist() {
    let payload = {
      "DEPT_ID": parseInt(localStorage.getItem('dept_id') || ''),
      "User_ID": parseInt(localStorage.getItem('user_Id') || ''),
    }
    return this.managementService.routeList(payload).pipe(map(response => {
      return response
    }))
  }
  getdriverlist() {
    let payload = {
      "UserId": parseInt(localStorage.getItem('user_Id') || ''),
      "DeptId": parseInt(localStorage.getItem('dept_id') || ''),
      "RoleId": 101

    }
    return this.managementService.driverlist(payload).pipe(map(response => {
      return response
    }))
  }
  formatedTime(value: any) {
    const fromdateFormatted = value?.toLocaleString('en-US', {
      hour12: false,
    });
    return formatDate(fromdateFormatted.replace(/,/g, "").replace(/\//g, "-"), 'yyyy-MM-dd HH:mm:ss', 'en-US')
  }
  formateddifference(formdate: any, toDatee: any) {
    const fromDate = new Date(formdate);
    const toDate = new Date(toDatee);

    // Calculate the time difference in milliseconds
    const timeDifference = toDate.getTime() - fromDate.getTime();

    // Convert time difference to days
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference

  }

  // formatDateValue(dateString) {
  //   const pipe = new DatePipe('en-US');
  //   let originalDate = new Date(dateString);
  //   let formattedDate = pipe.transform(originalDate, 'dd/MM/yyyy');
  //   return formattedDate
  // }

  formatDateValue(dateString: string): string | null {
    if (!dateString) return null;
    const pipe = new DatePipe('en-US');
    const [day, month, year, time] = dateString.split(/[-\s]/);
        if (!day || !month || !year) return null;
    const formattedDate = new Date(`${year}-${month}-${day}T${time || '00:00:00'}`);
    if (isNaN(formattedDate.getTime())) {
        console.error('Invalid Date:', dateString);
        return null;
    }
    return pipe.transform(formattedDate, 'dd/MM/yyyy');
}


  formatedDateTimeHtml(dateString) {
    const pipe = new DatePipe('en-US');
    let originalDate = new Date(dateString);
    let formattedDate = pipe.transform(originalDate, 'dd/MM/yyyy HH:mm:ss');
    return formattedDate
  }


  getAddress(address:any) : Observable<any> {
    let url = `https://address.skylabsapp.com/geocode?lat=${address.lat}&long=${address.lng}`
    return this.http
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
