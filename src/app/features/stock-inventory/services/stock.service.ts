import { Injectable } from '@angular/core';
import { ApiService } from '../../http-services/api.service';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANTS } from '../../shared/constant/API_CONSTANT';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private apiService: ApiService,
    private http : HttpClient
  ) { }

  categoryList(payload: any): Observable<any> {
    let url = API_CONSTANTS.categoryList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  manufactureList(payload: any): Observable<any> {
    let url = API_CONSTANTS.manufactureList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  chargingData(payload: any): Observable<any> {
    let url = API_CONSTANTS.chargingData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  unitList(payload: any): Observable<any> {
    let url = API_CONSTANTS.unitList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  supplierList(payload: any): Observable<any> {
    let url = API_CONSTANTS.supplierList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  manufactureNameList(payload: any): Observable<any> {
    let url = API_CONSTANTS.manufactureNameList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  productList(payload: any): Observable<any> {
    let url = API_CONSTANTS.productList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  poList(payload: any): Observable<any> {
    let url = API_CONSTANTS.poList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  barCodeList(payload: any): Observable<any> {
    let url = API_CONSTANTS.barCodeList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  productNameList(payload: any): Observable<any> {
    let url = API_CONSTANTS.productNameList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  detailsFromBarcode(payload: any): Observable<any> {
    let url = API_CONSTANTS.detailsFromBarcode
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  hsnList(payload: any): Observable<any> {
    let url = API_CONSTANTS.hsnList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  subCategoryList(payload: any): Observable<any> {
    let url = API_CONSTANTS.subCategoryList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  contactList(payload: any): Observable<any> {
    let url = API_CONSTANTS.contactList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  countryList(payload: any): Observable<any> {
    let url = API_CONSTANTS.countryListData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateList(payload: any): Observable<any> {
    let url = API_CONSTANTS.stateListData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  districtList(payload: any): Observable<any> {
    let url = API_CONSTANTS.cityListData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  brandList(payload: any): Observable<any> {
    let url = API_CONSTANTS.brandList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addUnit(payload: any): Observable<any> {
    let url = API_CONSTANTS.addUnit
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addManufacture(payload: any): Observable<any> {
    let url = API_CONSTANTS.addManufacture
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addvendor(payload: any): Observable<any> {
    let url = API_CONSTANTS.addvendor
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  unitConversion(payload: any): Observable<any> {
    let url = API_CONSTANTS.unitConversion
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  subCateDrop(payload: any): Observable<any> {
    let url = API_CONSTANTS.subCateDrop
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addHSN(payload: any): Observable<any> {
    let url = API_CONSTANTS.addHSN
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addunitConversion(payload: any): Observable<any> {
    let url = API_CONSTANTS.addunitConversion
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  chargingList(payload: any): Observable<any> {
    let url = API_CONSTANTS.chargingList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  jobCardList(payload: any): Observable<any> {
    let url = API_CONSTANTS.jobCardList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addJob(payload: any): Observable<any> {
    let url = API_CONSTANTS.addJob
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  hsnDroplist(payload: any): Observable<any> {
    let url = API_CONSTANTS.hsnDroplist
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addMenufatcure(payload: any): Observable<any> {
    let url = API_CONSTANTS.addMenufatcure
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addProduct(payload: any): Observable<any> {
    let url = API_CONSTANTS.addProduct
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addCharging(payload: any): Observable<any> {
    let url = API_CONSTANTS.addCharging
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addBrand(payload: any): Observable<any> {
    let url = API_CONSTANTS.addBrand
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehicleBattery(payload: any): Observable<any> {
    let url = API_CONSTANTS.vehicleBattery
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  mrnList(payload: any): Observable<any> {
    let url = API_CONSTANTS.mrnList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  mrnChildList(payload: any): Observable<any> {
    let url = API_CONSTANTS.mrnChildList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  quotationMrn(payload: any): Observable<any> {
    let url = API_CONSTANTS.quotationMrn
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  mrnListDetails(payload: any): Observable<any> {
    let url = API_CONSTANTS.mrnListDetails
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  quotationVendor(payload: any): Observable<any> {
    let url = API_CONSTANTS.quotationVendor
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  mrnType(payload: any): Observable<any> {
    let url = API_CONSTANTS.mrnType
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  RFPGenerate(payload: any): Observable<any> {
    let url = API_CONSTANTS.RFPGenerate
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  RPFList(payload: any): Observable<any> {
    let url = API_CONSTANTS.RPFList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  rfpChildList(payload: any): Observable<any> {
    let url = API_CONSTANTS.rfpChildList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  mrnCreate(payload: any): Observable<any> {
    let url = API_CONSTANTS.mrnCreate
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  editmrnDetails(payload: any): Observable<any> {
    let url = API_CONSTANTS.editmrnDetails
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getVendorDetails(payload: any): Observable<any> {
    let url = API_CONSTANTS.getVendorDetails
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  QuotationBaseOnPOList(payload: any): Observable<any> {
    let url = API_CONSTANTS.QuotationBaseOnPOList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  GetQuotationDetails(payload: any): Observable<any> {
    let url = API_CONSTANTS.GetQuotationDetails
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getPoListChild(payload: any): Observable<any> {
    let url = API_CONSTANTS.poListChild
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  GRNDetailsList(payload: any): Observable<any> {
    let url = API_CONSTANTS.GRNDetailsList
    return this.apiService
      .post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  CreatePurchageOrder(payload: any): Observable<any> {
    let url = API_CONSTANTS.CreatePurchageOrder
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  quotationList(payload: any): Observable<any> {
    let url = API_CONSTANTS.quotationNoDropdown
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  poListData(payload: any): Observable<any> {
    let url = API_CONSTANTS.poLIst
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createGrn(payload: any): Observable<any> {
    let url = API_CONSTANTS.createGrn
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.addCategoryData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  categoryListById(payload: any): Observable<any> {
    let url = API_CONSTANTS.categoryListById
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addSubCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.addSubCategory
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

 
}
