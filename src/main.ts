import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';

platformBrowserDynamic().bootstrapModule(AppModule)
.then((data:any)=>{console.log(data)})
  .catch(err => console.error(err));


if (environment.production) {
  enableProdMode();
}

