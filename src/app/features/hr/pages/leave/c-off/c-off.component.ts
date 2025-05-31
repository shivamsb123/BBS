import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-off',
  templateUrl: './c-off.component.html',
  styleUrls: ['./c-off.component.scss']
})
export class COffComponent implements OnInit{

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
