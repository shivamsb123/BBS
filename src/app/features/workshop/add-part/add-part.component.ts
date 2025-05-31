import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.scss']
})
export class AddPartComponent {
  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
   
  }

  cancel() {
    this.modalService.hide();
  }
}
