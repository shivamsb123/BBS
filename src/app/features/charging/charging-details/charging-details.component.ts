
import { Location, formatDate } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChargingService } from '../services/charging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-charging-details',
  templateUrl: './charging-details.component.html',
  styleUrls: ['./charging-details.component.scss']
})
export class ChargingDetailsComponent {
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
  singleDevice: any;
  tableData1: any;
  transactionDetails: any;
  transactionForm!: FormGroup
  selectedId: any;


  constructor(
    private route: Router,
    private location: Location,
    private chargingServie: ChargingService,
    private http: HttpClient,
    private elem: ElementRef,
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
      this.initialTable();
      this.setInitialValue();
      this.singleDeviceData()
  }

  setInitialValue () {
    this.transactionForm = this.fb.group({
      fromDate : [new Date(), [Validators.required, Validators.pattern('')]],
      toDate : [new Date(), [Validators.required, Validators.pattern('')]]
    })
  }


  initialTable() {
    this.tableData1 = [
      { key: 'keyValue', val: 'Device ID' },
      { key: 'keyValue', val: 'TXN ID' },
      { key: 'keyValue', val: 'Connector ID' },
      { key: 'keyValue', val: 'ID tag' },
      { key: 'keyValue', val: 'Driver Details' },
      { key: 'keyValue', val: 'Vehicle No' },
      { key: 'keyValue', val: 'Device Name' },
      { key: 'keyValue', val: 'SOC' },
      { key: 'keyValue', val: 'Total Usage' },
      { key: 'keyValue', val: 'voltage' },
      { key: 'keyValue', val: 'Address' },
    ]
  }



  singleDeviceData() {
    let payload = {
      "device_id": this.selectedId
    }
    this.http.post<any>('https://platform.kazam.in/getDeviceState', payload).subscribe(data => {
      this.singleDevice = data;
    });

  }

  submit(formvalue: any) {
    this.isloading = true;
    let payload = {
      "device_id": this.selectedId,
      "start_time":  formatDate(formvalue.fromDate.getTime(), 'dd-MM-yyyy', 'en-US').toString(),
      "end_time":  formatDate(formvalue.toDate.getTime(), 'dd-MM-yyyy', 'en-US').toString()
  
    }    

    this.http.post<any>('https://platform.kazam.in/getTransactions', payload).subscribe(data => {
      this.transactionDetails = data?.transactions;
      this.isloading = false;
    });
    
  }

  camelCase(data: any) {
    const camelCaseOutput = data?.split('_')
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ')
    return camelCaseOutput
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
}
