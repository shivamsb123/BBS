import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss'],
})
export class AlertPopupComponent {
  data: any;
  newData: any;
  speechSynthesisUtterance: SpeechSynthesisUtterance | null = null;
  constructor(
    private modalService: BsModalService,
    private router: Router
    ) { }


  ngOnInit() {

    // console.log(last5MinutesData, 'last 5 minute data');

    if(this.data) {
      const alertmsg = this.data?.map((item:any) => item?.alerT_MSG);
      this.speak(alertmsg);
    }
  }

  // speak(message: string[]) {
    
  //   // if ('speechSynthesis' in window) {
  //   //   const speech = new SpeechSynthesisUtterance(message);
  //   //   speech.lang = 'hi-IN';
  //   //   const voices = window.speechSynthesis.getVoices();

  //   //   const googleHindiVoice = voices.find(
  //   //     (voice) => voice.name === 'Google हिन्दी'
  //   //   );
  //   //   if (googleHindiVoice) {
  //   //     speech.voice = googleHindiVoice;
  //   //   } else {
  //   //     console.error('Google Hindi voice not found');
  //   //   }

  //   //   window.speechSynthesis.speak(speech);
  //   // } else {
  //   //   console.error('Speech synthesis not supported');
  //   // }

 
  // }

  speak(messages: string[]) {
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const googleHindiVoice = voices.find((voice) => voice.name === 'Google हिन्दी');
  
      if (googleHindiVoice) {
        messages.forEach((message) => {
          const speech = new SpeechSynthesisUtterance(message);
          speech.lang = 'hi-IN';
          speech.voice = googleHindiVoice;
          window.speechSynthesis.speak(speech);
        });
      } else {
        console.error('Google Hindi voice not found');
      }
    } else {
      console.error('Speech synthesis not supported');
    }
  }

  cancel() {
    this.modalService.hide();
    window.speechSynthesis.cancel();
  }

  redirectToHistroy() {
    this.modalService.hide();
    this.router.navigateByUrl('/my-profile/alert-history');
  }
}
