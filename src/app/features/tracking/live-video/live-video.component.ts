import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-live-video',
  templateUrl: './live-video.component.html',
  styleUrls: ['./live-video.component.scss']
})
export class LiveVideoComponent {
  data : any;
  total : any;
  totalArray: number[];
  completedata : any;
  constructor(private modalService: BsModalService){

  }
  ngOnInit() {
    this.totalArray = Array.from({ length: this.total }, (_, index) => index);
console.log(this.data,'video camera', this.total);

  }
  cancel() {
    this.modalService.hide();
  }
  closeVideo(index: number) {
    this.totalArray.splice(index, 1);

  }
}
