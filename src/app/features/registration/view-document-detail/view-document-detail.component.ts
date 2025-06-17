import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteConfirmationComponent } from '../../shared/components/delete-confirmation/delete-confirmation.component';
import { RegistrationService } from '../services/registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-document-detail',
  templateUrl: './view-document-detail.component.html',
  styleUrls: ['./view-document-detail.component.scss']
})
export class ViewDocumentDetailComponent {
  isloading: boolean = false
  documentdata: any
  tableData: any;
  searchKeyword: any
  alertData: any = {
    message: "success",
  };
  alertType: any = "success";
  alertTrigger: any = false;
  alertMessage = 'Deleted';
  bsModalRef!: BsModalRef
  vehicleId: any
  documentForm: any;
  docTypeList: any;
  selectedImageBase64: string;
  selectedDocType: any
  documentType: any
  constructor(
    private modalService: BsModalService,
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.setInitialTable();
    if (this.vehicleId) {
      this.getDocumentList()
    }
    this.setInitialValue()
    this.getDocTypeList()
  }

  setInitialValue() {

    this.documentForm = this.fb.group({
      docType: ['', [Validators.required]],
      docNo: ['', [Validators.required]],
      startDate: [new Date(), [Validators.required]],
      endDate: [new Date(), [Validators.required]],
      imgData: [''],
    })
  }


  setInitialTable() {
    this.tableData = [
      { 'key': '', val: 'Document Type' },
      { 'key': '', val: 'Document Number' },
      { 'key': '', val: 'Start Date' },
      { 'key': '', val: 'End date' },
      { 'key': '', val: 'Document' },
      { 'key': '', val: 'Action' },
    ]
  }

  getDocTypeList() {
    let newData = {
      value: '',
      text: ''
    }
    this.registrationService.getDocTypeList().subscribe((res: any) => {
      let data = res?.body?.data
      this.docTypeList = data.map((val: any) =>
        newData = {
          value: val?.code,
          text: val?.name
        }
      )
    })
  }

  addItem(type: any) {
    this.documentType = type
  }

  getDocumentList() {
    this.isloading = true
    let payload = {
      "pk_vehicle_id": Number(this.vehicleId),
      "fk_Doc_type_id": 0,
      "logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    this.registrationService.getVehicleDoc(payload).subscribe((res: any) => {
      this.isloading = false
      if (res?.body?.status == 'success') {
        this.documentdata = res?.body?.data
      }
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.selectedImageBase64 = base64.split(',')[1]
      };
      reader.readAsDataURL(file);
    }
  }

  confirm(event: any) {
    if (event.selectType == 'Doc-Type') {
      this.documentForm.controls['docType'].setValue(event.id)
    }
  }

  uploadDocument(formvalue: any) {
    let payload = {
      "pk_vehicle_id": Number(this.vehicleId),
      "fk_Doc_type_id": formvalue?.docType,
      "doc_no": formvalue?.docNo,
      "end_date": formatDate(formvalue?.startDate, 'yyyy-MM-dd', 'en-US'),
      "start_date": formatDate(formvalue?.startDate, 'yyyy-MM-dd', 'en-US'),
      "Logged_by": Number(localStorage.getItem('user_Id') || ''),
      "doc_file_name": "",
      "imageData1": this.selectedImageBase64
    }

    this.registrationService.uploadVehicleDoc(payload).subscribe((res: any) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (res?.body?.status == 'success') {
        this.alertData = {
          message: res?.body?.alert
        };
        this.alertType = "success";
        this.alertTrigger = true;
        this.stopAlert();
        this.getDocumentList()
        this.documentForm.reset();
        this.selectedImageBase64 = null;
        this.selectedDocType = {
          text: '',
          value: ''
        }
      } else {
        this.alertData = {
          message: `Data Not ${this.alertMessage}`,
        };
        this.alertType = "danger";
        this.alertTrigger = true;
        this.stopAlert();
      }
    })
  }

  deleteDocument(item: any) {
    let payload = {
      "pk_vehicle_doc_id": Number(item?.pk_vehicle_doc_id),
      "logged_by": Number(localStorage.getItem('user_Id') || '')
    }
    let url = this.registrationService.deletevehicleDoc(payload)
    const initialState: ModalOptions = {
      initialState: {
        title: item?.fk_Doc_type_name,
        content: 'Are you sure you want to delete?',
        primaryActionLabel: 'Delete',
        secondaryActionLabel: 'Cancel',
        service: url,
        autoClose: false,
      },
    };
    this.bsModalRef = this.modalService.show(
      DeleteConfirmationComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: "modal-md modal-dialog-centered",
      })
    );
    this.bsModalRef?.content.mapdata.subscribe(
      (value: any) => {
        if (value?.body?.status == 'success') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          this.alertData = {
            message: value?.body?.alert
          };
          this.alertType = "success";
          this.alertTrigger = true;
          this.getDocumentList()
          this.stopAlert();
        } else {
          this.alertData = {
            message: `Data Not ${this.alertMessage}`
          };
          this.alertType = "danger";
          this.alertTrigger = true;
          this.stopAlert();
        }
      }
    );
  }

  stopAlert() {
    setTimeout(() => {
      this.alertTrigger = false;
    }, 2000);
  }

  cancel() {
    this.modalService.hide();

  }
}
