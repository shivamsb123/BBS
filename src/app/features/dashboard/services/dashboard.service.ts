import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  dmsdashboard(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetDashboardData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  mapview1(payload: any): Observable<any> {
    let url = API_CONSTANTS.getmapviewData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  mapview2(payload: any): Observable<any> {
    let url = API_CONSTANTS.getmapview2data
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  shiftdata(payload: any): Observable<any> {
    let url = API_CONSTANTS.getShiftData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  canData(payload: any): Observable<any> {
    let url = API_CONSTANTS.getCANData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  allCanData(payload: any): Observable<any> {
    let url = API_CONSTANTS.allCanData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  OutsheddingDashboardData(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetOutsheddingDashboardData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  complaintDashboard(payload: any): Observable<any> {
    let url = API_CONSTANTS.complaintData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  /** department list */

  departmentList(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetDepartmentList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  /** vehicle based on zone  */
  // payload = {
  //   "DeptId":19,
  //   "ZoneId":0,
  //   "UserId":75,
  //   "OnlyVehicle":1

  // };
  vehicleBasedonZone(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetVehicleBasedOnZone
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  /** GetVehicleChasisNo */

  //   {
  //     "IncludeSelf":0,
  //     "VehicleId":11851
  // } 
  chesisNumber(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetVehicleChasisNo
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  /** get complaint category */
  //   {
  //   "mode": 0
  // }

  complaintCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetComplaintCategory
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  /** GetCloseComplaint */
  //   {
  //     "UserId":75,
  //     "Disposition":1
  // }
  complaintcategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetCloseComplaint
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** post complaint will come here  */
  /** ShowComplaintTimeLine */
  // {
  //   "UserId":"75",
  //   "ComplaintId":374        
  // }
  complaintTimeline(payload: any): Observable<any> {
    let url = API_CONSTANTS.ShowComplaintTimeLine
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** ShowComplaintThreads  */
  // {
  //   "UserId":"75",
  //   "ComplaintId":374        
  // }
  complaintThread(payload: any): Observable<any> {
    let url = API_CONSTANTS.ShowComplaintThreads
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** AddComplaintTimeLine */

  // {
  //     "Complaint_ID":374,
  //     "User_ID":75,
  //     "complaints":"WHEEL ALIEMENT PRO.",
  //     "Complaint_Body":"LEFT SIDE HEAD LIGHT FITTED AND CHECK, OK",
  //     "Doc_1":"",
  //     "Doc_2":"",
  //     "Doc_3":"",
  //     "Part_No":"",
  //     "Quantity":"",
  //     "Disposition":1
  // }
  addcomplaintTimeline(payload: any): Observable<any> {
    let url = API_CONSTANTS.AddComplaintTimeLine
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** GetOpenComplaint */
  // {
  //   "UserId":75
  // }

  opencomplaint(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetOpenComplaint
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** ShowComplaint  */
  // {
  //   "UserId":"75",
  //   "ChassisNo":"0",
  //   "ComplaintId":0,
  //   "FromDate":"2023-01-01",
  //   "ToDate":"2023-05-01"        
  // } 
  viewcomplaint(payload: any): Observable<any> {
    let url = API_CONSTANTS.ShowComplaint
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** GetSearchComplaintPartNo */
  // {
  //   "UserId":"75",
  //   "Disposition":"1",
  //   "Complaint":””,
  //   "PartNo":""
  // } 
  searchComplaintPartNo(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetSearchComplaintPartNo
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  PostComplaint(payload: any): Observable<any> {
    let url = API_CONSTANTS.PostComplaint
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  dashboardAllStatus(payload: any): Observable<any> {
    let url = API_CONSTANTS.dashboardfleetstatus
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  quality(payload: any): Observable<any> {
    let url = API_CONSTANTS.qualityinspection
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  allTripStatus(payload: any): Observable<any> {
    let url = API_CONSTANTS.allTripStatus
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  totalAccident(payload: any): Observable<any> {
    let url = API_CONSTANTS.accidentList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stopWise(payload: any): Observable<any> {
    let url = API_CONSTANTS.stopWiseData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  passengerComplain(payload: any): Observable<any> {
    let url = API_CONSTANTS.totalpassenger
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));

  }

  dutyTracking(payload: any): Observable<any> {
    let url = API_CONSTANTS.dutytracking
    return this.apiService
    .post(url,payload)
    .pipe(catchError((error:HttpErrorResponse)=> of(error)));
  }

  emmissionreport(): Observable<any> {
    let url = API_CONSTANTS.emissionReport
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
