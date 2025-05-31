import { Component } from '@angular/core';

@Component({
  selector: 'app-token-generate',
  templateUrl: './token-generate.component.html',
  styleUrls: ['./token-generate.component.scss']
})
export class TokenGenerateComponent {
  textToCopy: string = 'Text to be copied';
  constructor(){}
  
  ngOnInit(){}
  
  copyToken(){
     
    }
}
