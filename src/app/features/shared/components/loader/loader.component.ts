import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy {

  public currentTimeout:any = null;

  isDelayedRunning:boolean = false;

  @Input() delay:number= 10


  /**
   * start spinner
   */
  @Input()
  set isRunning(value: boolean) {
    if(!value) {
      this.cancelTimout();
      this.isDelayedRunning = false;

      return
    };

    if(this.currentTimeout) return;

    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimout();
    }, this.delay);
  }

  /**
   * cancel timeout 
   */
  public cancelTimout():void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }


  ngOnDestroy(): any {
    this.cancelTimout();
  }

}

