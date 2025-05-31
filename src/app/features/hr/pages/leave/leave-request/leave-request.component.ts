import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit{
  bsValue= new Date();
  hstep = 1;
  mstep = 1;
  isMeridian = false;
  fromtime: Date = new Date();
  totime: Date = new Date();

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  leaveRequest = [
    {
      "name": "SL",
      "value": 12,
    },
    {
      "name": "CL",
      "value": 3,
    },
    {
      "name": "EL",
      "value": 4,
    },
    {
      "name": "Total",
      "value": 5,
    },
  ]
  ngOnInit(): void {
    
  }

}
