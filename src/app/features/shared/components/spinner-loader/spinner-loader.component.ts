import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'spinner-loader',
  templateUrl: './spinner-loader.component.html',
  styleUrls: ['./spinner-loader.component.scss']
})
export class SpinnerLoaderComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService){};
  @Input() loadersize :any= "medium";
  
  ngOnInit(): void {
    this.spinner.show();
  }

}
