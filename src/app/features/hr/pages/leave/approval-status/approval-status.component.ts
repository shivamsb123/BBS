import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approval-status',
  templateUrl: './approval-status.component.html',
  styleUrls: ['./approval-status.component.scss']
})
export class ApprovalStatusComponent implements OnInit {
  tableData: any;
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [6, 9, 12];
  ngOnInit(): void {
    this.setInitialValue()
  }

  setInitialValue() {
    this.tableData = [
      { key: 'reserveNumber', value: 'Apply Date' },
      { key: 'reserveName', value: 'Leave Type' },
      { key: 'reservedBy', value: 'Day' },
      { key: 'reserveName', value: 'From Date' },
      { key: 'reservedBy', value: 'From Time' },
      { key: 'reserveName', value: 'To Date' },
      { key: 'reservedBy', value: 'To Time' },
      { key: 'reserveName', value: ' Approved By' },
      { key: 'reserveName', value: 'Reason' },
      { key: 'reservedBy', value: 'Status' },
      { key: 'reservedBy', value: 'Action' },
    ]
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

}
