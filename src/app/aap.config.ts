import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { ApplicationConfig } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLottieOptions({
      player: () => player,
    }),
  ],
};