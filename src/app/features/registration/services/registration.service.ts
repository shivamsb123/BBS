import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/features/http-services/api.service';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private apiService: ApiService) { }
  /**  Departmentadd */
  // {

  //   "Mode":1,
  //   "DeptName":"NCBRAJKOT",
  //   "PDept":1,
  //   "DCode":"test001551",
  //   "Result":""
  // }

  createDepartment(payload: any): Observable<any> {
    let url = API_CONSTANTS.Departmentadd
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** ZoneMasterList */
  // {
  //   "DEPT_ID":19,
  //   "EXCLUDE_VEHICLES":1,
  //   "User_ID":75
  //  }
  zonemasterlist(payload: any): Observable<any> {
    let url = API_CONSTANTS.ZoneMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** DeviceRegistration */
  //  {
  //   "STATUS":1,
  //   "USER_ID":75,
  //   "IMEI":"5677867111",
  //   "DEVICE_ID":"876557888",
  //   "DEVICE_VENDOR":"simRt",
  //   "DEVICE_MODEL":"ertRTi",
  //   "SIM_VENDOR":"ertTj",
  //   "MOBILE_NO":"0987766",
  //   "SIM_NO":"57665511",
  //   "ASSET_ID":6781,
  //   "ASSET_SUB_ID":12345,
  //   "ASSET_VENDOR":"466551345",
  //   "ASSET_MODEL":"787111",
  //   "ASSET_NO":"E-61",
  //   "DEPT_ID":75,
  //   "SPEED_CORRECTION":5,
  //    "GMT_HOUR":6,
  //   "GMT_MNT":8,
  //   "IP":"132.3454.231",
  // "PORT":789,
  //   "GPRS_INTERVAL":5,
  //   "Current_Password":"1234",
  //   "APN":"877666",
  //   "DESTINATION":"776656",
  //   "USER_NAMES":"RAMtest",
  //   "ConsentNotRequired":1,
  //   "RESULT":""
  // }
  deviceregitation(payload: any): Observable<any> {
    let url = API_CONSTANTS.DeviceRegistration
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** GetDeviceRegistration */
  // {
  //   "PageNo":1,
  //   "PageSize":100,
  //   "User_ID":75,
  //   "DEPT_ID":19,
  //   "ASSET_NO":"",
  //   "MOBILE_NO":"",
  //   "DEVICE_ID":""
  // }
  getdevicegrgistration(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetDeviceRegistration
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** AccidentRegistration */
  //  {
  //   "RouteNo":"MCA-123189",
  // "VehicleNo":"E-28",
  // "date":"12/06/2023",
  // "time":"4.30",
  // "photo":"PNG.image",
  // "COA":"test",
  // "Remarks":"test1",
  // "RESULT":""
  // }
  Accidentregistration(payload: any): Observable<any> {
    let url = API_CONSTANTS.AccidentRegistration
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** AddBatteryMaker */
  //  {
  //   "Bat_Name":"test1",
  // "Mode":0,
  // "CREATED_BY":1,
  // "RESULT":"",
  // "STATUS":1
  // }

  Addbatterymaker(payload: any): Observable<any> {
    let url = API_CONSTANTS.AddBatteryMaker
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** UpdateBatteryMaker */
  // {
  //   "Bat_Name":"testing",
  // "Mode":1,
  // "Id":5,
  // "CREATED_BY":1,
  // "RESULT":"",
  // "STATUS":1
  // }
  UpdateBatterymaker(payload: any): Observable<any> {
    let url = API_CONSTANTS.UpdateBatteryMaker
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** AddDamageType */
  // {
  //   "DAMAGE_NAME":"test3",
  // "Mode":0,
  // "CREATED_BY":1,
  // "RESULT":"",
  // "STATUS":1
  // }

  AddDamageType(payload: any): Observable<any> {
    let url = API_CONSTANTS.AddDamageType
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  /** DriverRegistration */
  //  {
  //   "RoleID":12389,
  //   "UserName":"yadav",
  //   "Password":"yyy",
  //   "Fname":"kkkk",
  //   "Lname":"test",
  //   "Dept_Id":19,
  //   "Contact":"987789231",
  //   "Status":1,
  //   "Email":"as@gmail.com",
  //   "USER_ID":75,
  //   "DEVICE_REGISTRATION_ID":"987129811",
  //   "IMEI_NO":"888721232",
  //   "RFID_TAG_ID":"899999988",
  //   "DOB":"01/02/2023",
  //   "EMP_CODE":"12004",
  //   "FATHER_NAME":"jk",
  //   "ALT_NUMBER":"87654111",
  //       "PHOTO_ID":"imag1.png",
  //       "PERM_ADDR":"",
  //       "PERM_STATE":1,
  //       "PERM_PIN":"100341",
  //   "CURR_ADDR":"s",
  //               "CURR_STATE":3,
  //           "CURR_PIN":"delhtest",
  //               "ID_TYPE_1":2,
  //               "ID_NUMBER_1": "0983333339",
  //               "ID_DOC_1":"pan",
  //               "ID_TYPE_2": 9,
  //               "ID_NUMBER_2":"8765321111",
  //               "ID_DOC_2":"",
  //               "ID_TYPE_3":4,
  //               "ID_NUMBER_3":"",
  //               "ID_DOC_3":"",
  //               "ID_TYPE_4":1,
  //               "ID_DOC_4":"",
  //               "DL_NO":"",
  //               "AuthorityName":"",
  //               "DL_Type_ID":19,
  //               "DL_Valid_FROM":"03/01/2023",
  //               "DL_Valid_TO":"",
  //               "TRANS_ID_TO_LINK":19,
  //               "TRANS_NAME":"",
  //               "TRANS_EMAIL":"",
  //               "TRANS_EMAIL_OTHER":"",
  //               "TRANS_Emp_ID":7181,
  //               "TRANS_CODE":"",
  //               "TRANS_ThirdPartyCode":"",
  //               "TRANS_ThirdPartyGroupCode":"",
  //               "ESIC_No":"",
  //               "Account_No":"",
  //               "IFSC_Code":"",
  //               "Duties_Done":2,
  //               "Spare_Duties":2,
  //               "Total_Duties":9,
  //               "Minimum_Wage":12342,
  //               "Incentive_Category":"",
  //               "Incentive_Amount":98745,
  //               "Total_DRVR_SALARY":98245,
  //               "EMP_ID_NEW":812,
  //               "Result":""
  //   }
  Driverregistration(payload: any): Observable<any> {
    let url = API_CONSTANTS.DriverRegistration
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  /** UpdateDriverRegistration */
  // {
  //   "EMP_ID":800,
  // "RoleID":123,
  // "UserName":"k",
  // "Password":"tga",
  // "Fname":"test kumar",
  // "Lname":"raja",
  // "Dept_Id":19,
  // "Contact":"9877666552",
  // "Status":1,
  // "Email":"sdfg@gmail.com",
  // "USER_ID":75,
  // "DEVICE_REGISTRATION_ID":"9871234456",
  // "IMEI_NO":"8887234561",
  // "RFID_TAG_ID":"8999999919",
  // "DOB":"03/02/2023",
  // "EMP_CODE":"120007",
  // "FATHER_NAME":"kjhgf",
  // "ALT_NUMBER":"876543210",
  //    "PHOTO_ID":"imag.png",
  //    "PERM_ADDR":"",
  //    "PERM_STATE":1,
  //    "PERM_PIN":"987667",
  // "CURR_ADDR":"state",
  //            "CURR_STATE":3,
  //        "CURR_PIN":"delh",
  //            "ID_TYPE_1":4,
  //            "ID_NUMBER_1": "0983733333",
  //            "ID_DOC_1":"pancard",
  //            "ID_TYPE_2": 5,
  //            "ID_NUMBER_2":"8765321119",
  //            "ID_DOC_2":"",
  //            "ID_TYPE_3":8,
  //            "ID_NUMBER_3":"",
  //            "ID_DOC_3":"",
  //            "ID_TYPE_4":7,
  //            "ID_DOC_4":"",
  //            "DL_NO":"",
  //            "AuthorityName":"",
  //            "DL_Type_ID":19,
  //            "DL_Valid_FROM":"1/01/2023",
  //            "DL_Valid_TO":"",
  //            "TRANS_ID_TO_LINK":19,
  //            "TRANS_NAME":"",
  //            "TRANS_EMAIL":"",
  //            "TRANS_EMAIL_OTHER":"",
  //            "TRANS_Emp_ID":7881,
  //            "TRANS_CODE":"",
  //            "TRANS_ThirdPartyCode":"",
  //            "TRANS_ThirdPartyGroupCode":"",
  //            "ESIC_No":"",
  //            "Account_No":"",
  //            "IFSC_Code":"",
  //            "Duties_Done":2,
  //            "Spare_Duties":2,
  //            "Total_Duties":9,
  //            "Minimum_Wage":12342,
  //            "Incentive_Category":"",
  //            "Incentive_Amount":987745,
  //            "Total_DRVR_SALARY":987245,
  //            "EMP_ID_NEW":912,
  //            "Result":""

  // }
  UpdateDriverregistration(payload: any): Observable<any> {
    let url = API_CONSTANTS.UpdateDriverRegistration
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  routeList(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  batteryMaker(payload: any): Observable<any> {
    let url = API_CONSTANTS.batteryMaker
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  damageList(payload: any): Observable<any> {
    let url = API_CONSTANTS.damageList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  roleList(payload: any): Observable<any> {
    let url = API_CONSTANTS.roleList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateList(payload: any): Observable<any> {
    let url = API_CONSTANTS.stateList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  idProof(payload: any): Observable<any> {
    let url = API_CONSTANTS.idProof
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  userRoleList(payload: any): Observable<any> {
    let url = API_CONSTANTS.userRoleList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addUserRole(payload: any): Observable<any> {
    let url = API_CONSTANTS.addUserRole
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deviceList(payload: any): Observable<any> {
    let url = API_CONSTANTS.deviceList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  subVehicleType(payload: any): Observable<any> {
    let url = API_CONSTANTS.subVehicleType
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  zoneList(payload: any): Observable<any> {
    let url = API_CONSTANTS.zoneList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addZone(payload: any): Observable<any> {
    let url = API_CONSTANTS.addZone
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateZone(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateZone
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  department(payload: any): Observable<any> {
    let url = API_CONSTANTS.department
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addRouteRegistration(payload: any): Observable<any> {
    let url = API_CONSTANTS.addRouteRegistration
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  routeListData(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeListData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  statelist(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetStateMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  geofencelist(payload: any): Observable<any> {
    let url = API_CONSTANTS.geoFenceList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  RcDetailsList(payload: any): Observable<any> {
    let url = API_CONSTANTS.RcDetailsList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  stopTypeList(payload: any): Observable<any> {
    let url = API_CONSTANTS.stopTypeList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  districtList(payload: any): Observable<any> {
    let url = API_CONSTANTS.districtList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addLocation(payload: any): Observable<any> {
    let url = API_CONSTANTS.addLocation
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  driverList(payload: any): Observable<any> {
    let url = API_CONSTANTS.driverList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  listofgeofence(payload: any): Observable<any> {
    let url = API_CONSTANTS.getgeofencelist
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateGeofence(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateGeofence
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vechileMasterList(payload: any): Observable<any> {
    let url = API_CONSTANTS.vechileMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addVehicleMaster(payload: any): Observable<any> {
    let url = API_CONSTANTS.addVehicle
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  familyList(payload: any): Observable<any> {
    let url = API_CONSTANTS.familyList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  healthList(payload: any): Observable<any> {
    let url = API_CONSTANTS.healthList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  professionalList(payload: any): Observable<any> {
    let url = API_CONSTANTS.professionalList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addFamily(payload: any): Observable<any> {
    let url = API_CONSTANTS.addFamily
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addHealth(payload: any): Observable<any> {
    let url = API_CONSTANTS.addHealth
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addProfessional(payload: any): Observable<any> {
    let url = API_CONSTANTS.addProfessional
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  gpsStatusData(payload: any): Observable<any> {
    let url = API_CONSTANTS.gpsStatusData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  
  addVehicleDoucment(payload: any): Observable<any> {
    let url = API_CONSTANTS.addVehicleDoucment
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehicleDocumentList(payload: any): Observable<any> {
    let url = API_CONSTANTS.vehicleDocumentList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

occupationData(payload: any): Observable<any> {
    let url = API_CONSTANTS.occupationList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  locationList(payload: any): Observable<any> {
    let url = API_CONSTANTS.locationList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addStopData(payload: any): Observable<any> {
    let url = API_CONSTANTS.addStop
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addRouteMaster(payload: any): Observable<any> {
    let url = API_CONSTANTS.addRouteMaster
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  routeMasterList(payload: any): Observable<any> {
    let url = API_CONSTANTS.routeMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehicleList(payload: any): Observable<any> {
    let url = API_CONSTANTS.vehicleList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  fencingList(payload:any): Observable<any> {
    let url = API_CONSTANTS.fencingList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addNewRoute(payload:any): Observable<any> {
    let url = API_CONSTANTS.addNewRoute
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateRouteDetails(payload:any): Observable<any> {
    let url = API_CONSTANTS.updateRouteDetails
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
