import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit{
  isloading: boolean = false;
  ngOnInit(): void {

   
    this.isloading = true;
    setTimeout(() => {
      this.isloading = false;
    }, 200)
  }

}
