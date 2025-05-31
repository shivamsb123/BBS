import { formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { SharedService } from 'src/app/features/http-services/shared.service';
import { ManagementService } from 'src/app/features/management/services/management.service';

@Component({
  selector: 'app-add-mispunch-request',
  templateUrl: './add-mispunch-request.component.html',
  styleUrls: ['./add-mispunch-request.component.scss']
})
export class AddMispunchRequestComponent {
  @Output() mapdata = new EventEmitter<string>();
  title: string = 'Mispunch Request';
  content: string = 'Would you like to continue?';
  primaryActionLabel: string = 'Apply';
  secondaryActionLabel: string = 'Cancel';
  time:Date = new Date()

  constructor(
    private sharedService: SharedService,
    private _fb: FormBuilder,
    private managementService: ManagementService,
    private modalService: BsModalService,
  ) { }
  ngOnInit() {
    // this.setInitialValue()
  }

  // setInitialValue() {
  //   this.addDriver = this._fb.group({
  //     driver: ['', [Validators.required, Validators.pattern('')]],
  //     vehicle: ['', [Validators.required, Validators.pattern('')]]
  //   })
  // }




  cancel() {
    this.modalService.hide();
  }

}

