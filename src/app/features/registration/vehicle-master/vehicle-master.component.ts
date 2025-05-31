import { RegistrationService } from '../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../http-services/shared.service';
import { Component, Input, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ScrollService } from '../../http-services/scroll.service';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss']
})
export class VehicleMasterComponent implements OnInit {
  @Input() requestType: any
  searchKeyword: any;
  documentSearchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  bsValue = new Date()
  vechileMaster: any;
  vechileMasterForm !: FormGroup
  documentForm!: FormGroup
  documentTable: any;
  AssetList: any;
  department: any;
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  button: string = 'Add';
  vehicleButton: string = 'Add';
  formData!: FormData;
  vechileDucumentData: any;
  docId: any = 0;
  mode: any = 0;
  id: any = 0;
  selectedValue: any;
  vehicleMode: any = 0
  alertMessage: string = 'Added';
  documentAlert:string = 'Added'


  constructor(private RegistrationService: RegistrationService,
     private shardService: SharedService, 
     private fb: FormBuilder,
     private scrollService: ScrollService
     ) { }

  ngOnInit(): void {
    this.initialTable();
    this.getVechileList();
    this.departmentData();
    this.setInitialValue();
    this.getAssestList()
    this.setDocumentValue();
    this.getVehicleDoumentList()
  }
  initialTable() {
    this.tableData = [
      { key: 'keyValue', val: 'Company' },
      { key: 'keyValue', val: 'Chessie Number ' },
      { key: 'keyValue', val: 'Vechile Number ' },
      { key: 'keyValue', val: 'Assest Type ' },
      { key: 'keyValue', val: 'Vender ' },
      { key: 'keyValue', val: 'RC Owner Name   ' },
      { key: 'keyValue', val: 'RC Present Address   ' },
      { key: 'keyValue', val: 'Status' },
      { key: 'keyValue', val: 'Action' },
    ]

    this.documentTable = [
      { key: 'keyValue', val: 'Doucment Type' },
      { key: 'keyValue', val: 'Doucment Number' },
      { key: 'keyValue', val: 'Registration Date' },
      { key: 'keyValue', val: 'Expiry Date ' },
      { key: 'keyValue', val: 'Authority Name ' },
      { key: 'keyValue', val: 'Upload Document' },
      { key: 'keyValue', val: 'Action' },

    ]
  }

  setInitialValue() {
    this.vechileMasterForm = this.fb.group({
      company_name: ['', [Validators.required, Validators.pattern('')]],
      asset_type: ['Bus', [Validators.required, Validators.pattern('')]],
      Chassis_number: ['', [Validators.required, Validators.pattern('')]],
      Bus_number: ['', [Validators.required, Validators.pattern('')]],
      vendor_name: ['', [Validators.required, Validators.pattern('')]],
      // Present_address: ['', [Validators.required, Validators.pattern('')]],
      owner_name: ['', [Validators.required, Validators.pattern('')]],
      authority_name: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  setDocumentValue() {
    this.documentForm = this.fb.group({
      documentType: ['rc', [Validators.required, Validators.pattern('')]],
      ducmentNo: ['', [Validators.required, Validators.pattern('')]],
      registration_Date: [new Date(), [Validators.required, Validators.pattern('')]],
      expiry_date: [new Date(), [Validators.required, Validators.pattern('')]],
      upload_document: ['', [Validators.required, Validators.pattern('')]],
      authority: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  changeDocument(event: any) {
    this.formData = new FormData();
    this.formData.append("file", event.target.files[0].name);
  }


  /**
 * tabel size chage method
 * @param event 
 */
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  /**
   * table data change
   * @param event 
   */
  onTableDataChange(event: any) {
    this.page = event;
  };

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  getVechileList() {
    this.isloading = true;
    let payload = {
      "PageNo": 1,
      "PageSize": 100,
      "Id": this.id
    }
    this.RegistrationService.vechileMasterList(payload).subscribe((result: any) => {
      this.vechileMaster = result.body.data;
      this.isloading = false
    })
  }

  getVehicleDoumentList() {
    this.isloading = true;
    let payload = {
      "PageNO": 1,
      "PageSize": 100,
      "Doc_Id": this.docId
    }
    this.RegistrationService.vehicleDocumentList(payload).subscribe((result: any) => {
      this.vechileDucumentData = result?.body?.data;
      this.isloading = false;

    })
  }

  departmentData() {
    this.shardService.getDepartmentData().subscribe((res: any) => {
      this.department = res?.body?.data;
    });
  }

  confirm(event: any) {
    if (event.selectType == 'Company') {
      this.vechileMasterForm.controls['company_name'].setValue(event.assets_no)
    }
  }

  getAssestList() {
    let newData = {
      value: '',
      text: '',
    }
    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || ''),
      "FLAG": 1,
    }

    this.RegistrationService.subVehicleType(payload).subscribe((res: any) => {
      let data = res?.body?.data;

      this.AssetList = data.map((val: any) =>
        newData = {
          value: val?.asseT_SUB_ID,
          text: val?.asseT_SUB_NAME
        }
      )

    })
  }

  submitDucument(formvalue: any) {
    let payload = {
      "MODE": this.mode,
      "Documenttype": formvalue?.documentType,
      "DocumentNo": formvalue?.ducmentNo,
      "RegistrationDate": formatDate(formvalue?.registration_Date, 'dd-MM-yyyy', 'en-US'),
      "ExpiryDate": formatDate(formvalue?.expiry_date, 'dd-MM-yyyy', 'en-US'),
      "UploadDocument": "",
      "AuthorityName": formvalue?.authority

    }
    if (this.mode == 1) {
      payload["doc_Id"] = this.docId
    }
    this.RegistrationService.addVehicleDoucment(payload).subscribe((res: any) => {
      if (res?.body?.status == 'Success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.docId = 0
        this.getVehicleDoumentList();
        this.documentForm.reset()
      } else {
        this.alertData = {
          message: `Document Not ${this.documentAlert}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
    this.vechileDucumentData.reset();
    this.documentAlert = 'Added'
    this.button = 'Add'
  }

  submit(formvalue: any) {
    let payload = {
      "MODE": this.vehicleMode,
      "Company_Name": formvalue.company_name,
      "Assest_Type": formvalue.asset_type,
      "Chassis_Number": formvalue.Chassis_number,
      "Bus_Number": formvalue.Bus_number,
      "Vendor_Name": formvalue.vendor_name,
      "Owner_Name": formvalue.owner_name,
      "Regist_Date": "",
      "Exp_Date": "",
      "Upload_Document": "",
      "Authority_Name": formvalue.authority_name,
      "Status": "",
      "RESULT": ""
    }
    if (this.vehicleMode == 1) {
      payload["id"] = this.id
    }
    this.RegistrationService.addVehicleMaster(payload).subscribe((result: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (result?.body?.status == 'Success') {
        this.alertData = {
          message: result?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.id = 0;
        this.getVechileList();
      } else {
        this.alertData = {
          message: `Vehicle Data Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
      this.alertMessage = 'Added'
    })
    this.vechileMasterForm.reset()
    this.vehicleButton = 'Add'
    this.selectedValue = {
      value: '',
      text: ''
    }
  }

  updateDocument(id: any) {
    this.docId = id;
    this.mode = 1;
    this.button = 'Update';
    this.documentAlert = 'Updated'
    this.vechileDucumentData.forEach((element: any) => {
      if (this.docId == element?.doc_Id) {
        let reg_date = element.registrationDate.slice(0, 10).split('-').reverse().join('-')
        let expiry_date = element.expiryDate.slice(0, 10).split('-').reverse().join('-')

        this.documentForm = this.fb.group({
          documentType: [element?.documenttype, [Validators.required, Validators.pattern('')]],
          ducmentNo: [element?.documentNo, [Validators.required, Validators.pattern('')]],
          registration_Date: [new Date(reg_date), [Validators.required, Validators.pattern('')]],
          expiry_date: [new Date(expiry_date), [Validators.required, Validators.pattern('')]],
          upload_document: [element?.uploadDocument, [Validators.required, Validators.pattern('')]],
          authority: [element?.authorityName, [Validators.required, Validators.pattern('')]],
        })
      }

    })

  }

  updateVehicle(id: any) {
    this.id = id;
    this.vehicleMode = 1
    this.vehicleButton = 'Update';
    this.alertMessage = 'Updated'
    this.vechileMaster.forEach((val: any) => {
      if (this.id == val?.id) {
        let newDepartmentValue = this.department?.filter((ele: any) => ele?.text == val?.company_Name);
        newDepartmentValue.forEach((data: any) => {
          this.selectedValue = data;
        });

        this.vechileMasterForm = this.fb.group({
          company_name: ['', [Validators.required, Validators.pattern('')]],
          asset_type: [val?.assest_Type, [Validators.required, Validators.pattern('')]],
          Chassis_number: [val?.chassis_Number, [Validators.required, Validators.pattern('')]],
          Bus_number: [val?.bus_Number, [Validators.required, Validators.pattern('')]],
          vendor_name: [val?.vendor_Name, [Validators.required, Validators.pattern('')]],
          // Present_address: ['', [Validators.required, Validators.pattern('')]],
          owner_name: [val?.owner_Name, [Validators.required, Validators.pattern('')]],
          authority_name: [val?.authority_Name, [Validators.required, Validators.pattern('')]],
        })
        this.vechileMasterForm.controls['company_name'].setValue(this.selectedValue.text)

      }


    })
    this.scrollService.scrollToElementById('content');

  }
  cancelDocument(){
    this.documentForm.reset();
  }
  cancelVehicle(){
    this.vechileMasterForm.reset();
    this.selectedValue = {
      value: '',
      text: ''
    }
  }
}
