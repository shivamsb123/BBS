import { Component } from '@angular/core';

@Component({
  selector: 'under-development',
  templateUrl: './under-development.component.html',
  styleUrls: ['./under-development.component.scss']
})
export class UnderDevelopmentComponent {
  newTime:any;
  myTime: HTMLElement = document.getElementById("getTimeValue")
  ngOnInit() {
  }  

  getTimeDateValue = setInterval(function () {
    const myElement: HTMLElement = document.getElementById("startDateText");
    let countDownDate = new Date("Sep 10, 2023 10:00:00").getTime();
    let now = new Date().getTime();
    let distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("getTimeValue").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
    if (distance < 0 || document.getElementById("getTimeValue").innerHTML == null) {
      clearInterval(this.getTimeDateValue);
      document.getElementById("getTimeValue").innerHTML = "";
    }
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.getTimeDateValue );
}
}
