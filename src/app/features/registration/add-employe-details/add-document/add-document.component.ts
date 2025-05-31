import { Component } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent {
  idProofeList: any;
  addDocumentForm!: FormGroup

  constructor(
    private ragistrationService: RegistrationService,
    private fb: FormBuilder
  ){}
  ngOnInit() {
    this.setInitialValue();
    this.getIdProofeList()
  }

  setInitialValue() {
    this.addDocumentForm = this.fb.group({
      idProof1: ['', [Validators.required, Validators.pattern('')]],
      idProofno1: ['', [Validators.required, Validators.pattern('')]],
      id1document: ['', [Validators.required, Validators.pattern('')]],
    })
  }

  confirm(event: any) {
   if (event.selectType == 'ID Proof') {
      this.addDocumentForm.controls['idProof1'].setValue(event.id)
    } 
  }

  getIdProofeList() {
    let newData = {
      value: '',
      text: ''
    }
    let payload = {
      "USER_ID": parseInt(localStorage.getItem('user_Id') || '')
    }

    this.ragistrationService.idProof(payload).subscribe((res: any) => {
      let data = res?.body?.data;
      this.idProofeList = data.map((val: any) =>
        newData = {
          value: val?.iD_PROOF_ID,
          text: val?.iD_PROOF_NAME
        }
      )
    })
  }

}
