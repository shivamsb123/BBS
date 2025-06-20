import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.scss']
})
export class AppAlertComponent implements OnInit {
  @Input() alertData: any = {};
  @Input() alertType: any = {};
  data: any;
  constructor() { }

  ngOnInit(): void {
    this.data = this.alertData;
  }
}