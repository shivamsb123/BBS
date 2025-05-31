import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-imgview',
  templateUrl: './imgview.component.html',
  styleUrls: ['./imgview.component.scss']
})
export class ImgviewComponent {
  @Input() img1:any;
  @Input() img2:any;
  @Input() img3:any;
  @Input() modalRef: any

  ngOnInit() {
    
  }

  decline() {
    this.modalRef.hide();
  };
 
}
