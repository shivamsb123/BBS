

import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-charging-device',
  templateUrl: './charging-device.component.html',
  styleUrls: ['./charging-device.component.scss']
})
export class ChargingDeviceComponent implements OnInit, OnDestroy {
  searchKeyword: any;
  isloading: boolean = false;
  page = 1;
  count = 0;
  tableSize = 25;
  tableSizes = [25, 50, 100];
  tableData: any;
  unitData: any;
  deviceType: any;
  token = 'VgMxIXSes1Ky.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDA0NjEzNjAwMTAsImVhdCI6MTcwODIzNzM2MDAxMH0.Jt_RmuOZCsKFiGvzhO590YdCDjyv2Eh32qxBIaVkPRQ'
  totalDevice: any;
  show = false;
  totalLength:any
  deviceId: any;
  transactionData: any;
  transactionDetails: any;
  isTransloading: boolean = false
  tableData2: any;
  tenId:any;
  vehicleNo:any

  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private modalService: BsModalService,
    private datePipe: DatePipe

  ) { }

  ngOnInit(): void {    
     this.deviceId = this.activeRoute.snapshot.paramMap.get("id");
    this.initialTable();
    if(this.tenId) {
      this.onTransactionDetails()
    }
    
  }

  ngOnDestroy() {
    localStorage.removeItem('chargingtoken')
  }

 

  initialTable() {
    this.tableData2 = [
      { key: 'keyValue', val: 'Device ID' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Date' },
      { key: 'keyValue', val: 'Start Time' },
      { key: 'keyValue', val: 'End Time' },
      { key: 'keyValue', val: 'SOC' },
      { key: 'keyValue', val: 'Total Usage' },
    ]
    
  }


  onTransactionDetails() {
    if (!localStorage.getItem('chargingtoken')) {
      localStorage.setItem('chargingtoken', this.token)
    }

    this.isTransloading = true;
    let payload = {
      "txn_id": this.tenId
    }
    this.http.post<any>('https://platform.kazam.in/getTransactionDetails', payload).subscribe(data => {
      this.transactionDetails = data;
     
      this.isTransloading = false;
    });
  }

  changeTimeFormat(date:any) {
    return this.datePipe.transform(date * 1000, 'dd-MM-yyyy HH:mm:ss');
   }

  cancel() {
    this.modalService.hide();
  }

 



}

