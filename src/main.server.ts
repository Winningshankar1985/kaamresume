import { platformServer } from '@angular/platform-server';
import { environment } from './environments/environment';
import 'zone.js';
import { AppServerModule } from './app/app.module.server';
import { enableProdMode } from '@angular/core';

if(environment.production){
    enableProdMode();
    platformServer().bootstrapModule(AppServerModule)
    .then((data:any)=>{console.log(data)})
    .catch(err => console.error(err));
   
}

export { AppServerModule as default } from './app/app.module.server';