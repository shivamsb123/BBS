import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  if(window){
    // window.console.log = function(){};
    //  window.console.error = function(){};
    // window.console.warn = function(){};
  }