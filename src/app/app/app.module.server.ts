import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { provideServerRendering, ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { InterceptorService } from './shared/interceptor/interceptor.service';
import { DatePipe } from '@angular/common';
import { RouteReuseService } from './shared/routereuse/routereuse';
import { RouteReuseStrategy } from '@angular/router';
import { authInterceptor } from './shared/authserverinterceptor/authserverinterceptor';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers:[
    provideServerRendering(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent],
 
})
export class AppServerModule {}
