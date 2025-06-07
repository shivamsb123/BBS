import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  constructor(private apiService: ApiService) { }
/** GetShiftForRoster */
// {
//   "route_id":22,
//   "shift_type":"M",
//   "weekday_type":"WK",
//   "from_date":"2021-08-08",
//   "to_date":"2021-08-14"
// }

ShiftForRoster(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetShiftForRoster;
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   /** DeviceList */
//    {
//     "PageNo":1,
//     "PageSize":100,
//     "User_ID":75,
//     "DEPT_ID":19,
//     "ASSET_NO":"",
//     "MOBILE_NO":"",
//     "DEVICE_ID":""
// }
listofDevices(payload: any): Observable<any> {
  let url = API_CONSTANTS.DeviceList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
/** addRoaster */
// {
//   "r_id":0,
//   "dept_id":19,
//   "from_date":"2023-05-29",
//   "to_date":"2023-05-31",
//   "route_id":22,
//   "shift_id":5,
//   "driver_id":805,
//   "vehicle_id":14503,
//   "user_id":75
// }
createRoaster(payload: any): Observable<any> {
  let url = API_CONSTANTS.addRoaster;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 /** ViewRoster */
//  {
//   "dept_id":19,
//   "route_id":22,
//   "shift_type":"M",
//   "weekday_type":"WK",
//   "from_date":"2023-04-08",
//   "to_date":"2023-05-14",
//   "driver_id":0,
//   "vehicle_id":0
// }
ViewRosterlist(payload: any): Observable<any> {
  let url = API_CONSTANTS.ViewRoster;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
/** ViewRosterForAtt */
ViewRosterForAttt(payload: any): Observable<any> {
//   {
//     "dept_id":19,
//     "route_id":22,
//     "shift_type":"M",
//     "weekday_type":"WK",
//     "from_date":"2023-04-10",
//     "to_date":"2023-04-10",
//     "driver_id":0,
//     "vehicle_id":0
// }

  let url = API_CONSTANTS.ViewRosterForAtt;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
/** MarkAttDMS */
// {
//   "driver_id":745,
//   "conductor_id":775,
//   "vehicle_id":13855,
//   "driver_id_next":715,
//   "conductor_id_next":756,
//   "vehicle_id_next":13856,
//   "r_id":349,
//   "shift_id":7,
//   "flag":1,
//   "user_id":75,
//   "is_first_shift":1,
//   "mode":0,
//   "odometer_depo_in":100000.50,
//   "soc_percentage_depo_in":100000.50,
//   "input_date_time":"2023-05-26"
// }

MarkAttendanceDMS(payload: any): Observable<any> {
  let url = API_CONSTANTS.MarkAttDMS;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 
changePass(payload: any): Observable<any> {
  let url = API_CONSTANTS.changePassword;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 routeList(payload: any): Observable<any> {
  let url = API_CONSTANTS.getRouteList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 showshiftstatus(payload: any): Observable<any> {
  let url = API_CONSTANTS.getshiftlist;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 driverlist(payload: any): Observable<any> {
 let url = API_CONSTANTS.GetDriverList;
 return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 onOffRoadVehilce(payload: any): Observable<any> {
  let url = API_CONSTANTS.onOffRoadVehilce;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 viewRosterList(payload: any): Observable<any> {
  let url = API_CONSTANTS.viewRosterList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 complainType(payload: any): Observable<any> {
  let url = API_CONSTANTS.complainType;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 addRoster(payload: any): Observable<any> {
  let url = API_CONSTANTS.addRoster;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }


 addGeneralComplain(payload: any): Observable<any> {
  let url = API_CONSTANTS.addGeneralComplain;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 
 attendanceList(payload: any): Observable<any> {
  let url = API_CONSTANTS.attendanceList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 checkStatus(payload: any): Observable<any> {
  let url = API_CONSTANTS.checkStatus;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 addMarkManual(payload: any): Observable<any> {
  let url = API_CONSTANTS.addMarkManual;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 breakdownList(payload: any): Observable<any> {
  let url = API_CONSTANTS.breakdownList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 partName(payload: any): Observable<any> {
  let url = API_CONSTANTS.partName;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 addBreakdown(payload: any): Observable<any> {
  let url = API_CONSTANTS.addBreakdown;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 addMarkAtt(payload: any): Observable<any> {
  let url = API_CONSTANTS.addMarkAtt;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 gpsStatusData(payload: any): Observable<any> {
  let url = API_CONSTANTS.gpsStatusData;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 obuStatusData(vehicleid: any): Observable<any> {
  let url = API_CONSTANTS.obuStatusData.replace("id",vehicleid);
  return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 markShiftOn(payload: any): Observable<any> {
  let url = API_CONSTANTS.markShiftOn;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 staffAttendanceEmp(payload: any): Observable<any> {
  let url = API_CONSTANTS.staffAttendance;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 roleList(payload: any): Observable<any> {
  let url = API_CONSTANTS.attendanceRoleList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 attendanceStaffList(payload: any): Observable<any> {
  let url = API_CONSTANTS.staffAttendanceList;
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 onOffRoadVehicle(payload: any): Observable<any> {
  let url = API_CONSTANTS.onOffRoadVehicle
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

onOffRoadKms(payload: any): Observable<any> {
  let url = API_CONSTANTS.onOffRoadKms
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

manageAlertList(payload: any): Observable<any> {
  let url = API_CONSTANTS.manageAlert
  return this.apiService
  .post(url, payload)
  .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

markOnRoad(payload: any): Observable<any> {
  let url = API_CONSTANTS.markOnRoad
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

manageAssignedNotAssigned(payload: any): Observable<any> {
  let url = API_CONSTANTS.manageAlertAsigned
  return this.apiService
  .post(url, payload)
  .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

markOffRoad(payload: any): Observable<any> {
  let url = API_CONSTANTS.markOffRoad
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

GetZoneAssignedVehicleList(payload: any): Observable<any> {
  let url = API_CONSTANTS.GetZoneAssignedVehicleList
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

assignSelectedZone(payload: any): Observable<any> {
  let url = API_CONSTANTS.assignSelectedZone
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

unAssignSelectedZone(payload: any): Observable<any> {
  let url = API_CONSTANTS.unAssignSelectedZone
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

ShowAlertSettings(payload: any): Observable<any> {
  let url = API_CONSTANTS.ShowAlertSettings
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

RemoveAlertSettings(payload: any): Observable<any> {
  let url = API_CONSTANTS.RemoveAlertSettings
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

UpdateAlertSettings(payload: any): Observable<any> {
  let url = API_CONSTANTS.UpdateAlertSettings
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

GetContactDetailsForAlert(payload: any): Observable<any> {
  let url = API_CONSTANTS.GetContactDetailsForAlert
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

staffViewList(payload: any): Observable<any> {
  let url = API_CONSTANTS.viewStaff
  return this.apiService
  .post(url, payload)
  .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

UpdateLinkingZone(payload: any): Observable<any> {
  let url = API_CONSTANTS.UpdateLinkingZone
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

addStaffRoaster(payload: any): Observable<any> {
  let url = API_CONSTANTS.addStaff
  return this.apiService
  .post(url, payload)
  .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

AddAlertSettings(payload: any): Observable<any> {
  let url = API_CONSTANTS.AddAlertSettings
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

markDepotOut(payload: any): Observable<any> {
  let url = API_CONSTANTS.markDepotOut
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

markDepotIn(payload: any): Observable<any> {
  let url = API_CONSTANTS.markDepotIn
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

MarkShiftOff(payload: any): Observable<any> {
  let url = API_CONSTANTS.MarkShiftOff
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

breakdownReason(payload: any): Observable<any> {
  let url = API_CONSTANTS.breakdownReason
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

rosterApplyChange(payload: any): Observable<any> {
  let url = API_CONSTANTS.rosterApplyChange
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}
employeeListData(payload: any): Observable<any> {
  let url = API_CONSTANTS.employeeList
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

checkInData(payload: any): Observable<any> {
  let url = API_CONSTANTS.checkInData
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

saveCheckInOut(payload: any): Observable<any> {
  let url = API_CONSTANTS.saveCheckIn
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

adduserAccess(payload: any): Observable<any> {
  let url = API_CONSTANTS.adduserAccess
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

undoProcess(payload: any): Observable<any> {
  let url = API_CONSTANTS.undoProcess
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

alertMaster(payload: any): Observable<any> {
  let url = API_CONSTANTS.alertMaster
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}

updateAlertMaster(payload: any): Observable<any> {
  let url = API_CONSTANTS.updateAlertMaster
  return this.apiService
    .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
}


  moduleList(): Observable<any> {
    let url = API_CONSTANTS.moduleList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

    moduleMenuList(moduleId:any): Observable<any> {
    let url = API_CONSTANTS.moduleMenuList.replace('{moduleId}',moduleId)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  menuList(payload: any): Observable<any> {
    let url = API_CONSTANTS.menu
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addMenu(payload: any): Observable<any> {
    let url = API_CONSTANTS.addMenu
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   updateMenu(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateMenu
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  accessList(payload: any): Observable<any> {
    let url = API_CONSTANTS.accessList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  postMenuAccess(payload: any): Observable<any> {
    let url = API_CONSTANTS.postMenuAccess
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
