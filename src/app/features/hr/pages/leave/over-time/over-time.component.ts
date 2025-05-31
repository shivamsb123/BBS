import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-over-time',
  templateUrl: './over-time.component.html',
  styleUrls: ['./over-time.component.scss']
})
export class OverTimeComponent implements OnInit{

  bsValue = new Date();
  hstep = 1;
  mstep = 1;
  isMeridian = false;
  inTime: Date = new Date();
  outtime: Date = new Date();
  name = 'Apply Over Time'
  
  ngOnInit(): void {
    
  }
}
