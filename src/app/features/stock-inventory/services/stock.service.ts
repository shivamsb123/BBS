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
    private http: HttpClient
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

  itemList(payload: any): Observable<any> {
    let url = API_CONSTANTS.itemList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteItem(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteItem
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

  countryList(): Observable<any> {
    let url = API_CONSTANTS.countryListData
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateList(countryId: any): Observable<any> {
    let url = API_CONSTANTS.stateListData.replace("{countryId}", countryId)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  districtList(districtId: any): Observable<any> {
    let url = API_CONSTANTS.cityListData.replace("{districtId}", districtId)
    return this.apiService
      .get(url)
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

  updateUnit(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateUnit
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

  addSupplier(payload: any): Observable<any> {
    let url = API_CONSTANTS.addSupplier
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateSupplier(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateSupplier
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addSupplierAddress(payload: any): Observable<any> {
    let url = API_CONSTANTS.addSupplierAddress
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateSupplierAddress(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateSupplierAddress
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteSupplier(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteSupplier
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

  updateHSN(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateHsn
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteHSN(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteHsn
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteUnit(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteUnit
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteBrand(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteBrand
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteSubcategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteSubategory
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteCategory
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

  updateProduct(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateProduct
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

  updateBrand(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateBrand
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

  updateCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateCategoryData
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

  updateSubCategory(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateSubCategory
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getCategoryDD(): Observable<any> {
    let url = API_CONSTANTS.categoryDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getSubCategoryDD(catId: any): Observable<any> {
    let url = API_CONSTANTS.subCategoryDropdown.replace("{id}", catId)
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getUnitDD(): Observable<any> {
    let url = API_CONSTANTS.unitDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getHsnDD(): Observable<any> {
    let url = API_CONSTANTS.hsnDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getBrandDD(): Observable<any> {
    let url = API_CONSTANTS.brandDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getBillingforDD(): Observable<any> {
    let url = API_CONSTANTS.billingForDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getBillingCategoryDD(): Observable<any> {
    let url = API_CONSTANTS.billingCategoryDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  countryListData(payload: any): Observable<any> {
    let url = API_CONSTANTS.countryMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createCountry(payload: any): Observable<any> {
    let url = API_CONSTANTS.createCountry
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateCountry(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateCountry
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteCountry(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteCountry
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateListData(payload: any): Observable<any> {
    let url = API_CONSTANTS.stateMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createState(payload: any): Observable<any> {
    let url = API_CONSTANTS.createState
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateState(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateState
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteState(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteState
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  districtListData(payload: any): Observable<any> {
    let url = API_CONSTANTS.districtMasterList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createDistrict(payload: any): Observable<any> {
    let url = API_CONSTANTS.createDistrict
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDistrict(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateDistrict
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteDistrict(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteDistrict
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getMappingList(payload: any): Observable<any> {
    let url = API_CONSTANTS.itemMappigList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

    linkItem(payload: any): Observable<any> {
    let url = API_CONSTANTS.linkItemMapping
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deLinkItemMapping(payload: any): Observable<any> {
    let url = API_CONSTANTS.deLinkItemMapping
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  generateSupplierLogin(payload: any): Observable<any> {
    let url = API_CONSTANTS.supplierLogin
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   resetSupplierLogin(payload: any): Observable<any> {
    let url = API_CONSTANTS.resetSupplierLogin
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

   levelList(payload: any): Observable<any> {
    let url = API_CONSTANTS.levelList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createLevel(payload: any): Observable<any> {
    let url = API_CONSTANTS.createLevel
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateLevel(payload: any): Observable<any> {
    let url = API_CONSTANTS.updateLevel
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteLevel(payload: any): Observable<any> {
    let url = API_CONSTANTS.deleteLevel
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
