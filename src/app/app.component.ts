
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from './features/http-services/session.service';
import { SharedService } from './features/http-services/shared.service';
import { Location } from '@angular/common';

import { ActivityService } from './features/shared/user/services/activity.service';
import { StorageService } from './features/http-services/storage.service';
import { Subscription } from 'rxjs';
import { CountdownService } from './features/http-services/countdown.service';
import { TokenService } from './features/http-services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dms';
  isloading: boolean = true;

  @ViewChild('beforeExpired')
  beforeExpired!: TemplateRef<any>;

  @ViewChild('expired')
  expired!: TemplateRef<any>;
  seconds: number | undefined;
  url: any;
  private countdownSubscription: Subscription;
  remainingTime: number;
  alertTime: any;
  audioPath: string;
  googleHindiVoice: any;
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private location: Location,
    private indexedDB: StorageService,
    private countdownService: CountdownService,
    private storageService: StorageService,
    private tokenService: TokenService
  ) {
    if ('speechSynthesis' in window) {
      speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        this.googleHindiVoice = voices.find(voice => voice.name === 'Google हिन्दी');
        console.log("google honmer", voices);
        if (!this.googleHindiVoice) {
          console.error('Google Hindi voice not found');
        }
      };
    } else {
      console.error('Speech synthesis not supported');
    }
    
    this.storageService.getItem('alert').subscribe((res: any) => {      
      if (res !== this.alertTime || this.alertTime === undefined) {
        this.alertTime = res === undefined ? 5 : res;
        console.log("New alert time:", this.alertTime);
        if (!this.tokenService.hasToken()) {
          this.countdownService.stopTimer();
          return
        }
        this.countdownService.stopTimer();
        const durationInSeconds = this.alertTime;
        this.countdownService.startTimer(durationInSeconds);
        this.countdownService.getTimerObservable().subscribe((remainingTime) => {
          this.remainingTime = remainingTime;
          //  console.log("New time", this.remainingTime);

          // if (remainingTime > 0 && remainingTime <= 10) {
          //   const countdownMessage = `New alert in ${remainingTime - 7} second${remainingTime - 7 !== 1 ? 's' : ''}`;
          //   const numericValueMatch = countdownMessage.match(/-?\d+/);
          //   if (numericValueMatch) {
          //     const numericValue: any = numericValueMatch[0];
          //     if (numericValue > 0) {
          //       this.speak(countdownMessage);
          //     }
          //   }



          //   // Display the countdownMessage wherever you want in your UI
          // }

          // if (remainingTime == 0) {
          //   this.audioPath =
          //   '/assets/alert.mp3';
          //   this.audioplay();
          // }
        });
      }
    });

  }
  speak(message: string) {
    if (this.googleHindiVoice) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.lang = 'hi-IN';
      speech.voice = this.googleHindiVoice;
      window.speechSynthesis.speak(speech);
    } else {
      console.error('Google Hindi voice not available');
    }
  }


  ngOnInit(): void {
    this.url = this.location.path();
    setTimeout(() => {
      this.isloading = false;
    }, 200);


  }
  signIn() {
    // this.activityService.releaseSessionLock();
    localStorage.clear();
    sessionStorage.clear();
    this.indexedDB.clear();
    window.location.href = 'login';
  }

  @ViewChild('audio') audio: ElementRef;
  @ViewChild('button') btn: ElementRef;

  audioplay(): void {
    const audio = this.audio.nativeElement as HTMLAudioElement;
    audio.loop = false;
    audio.play();
    audio.remove()

  }
}