import { AuthModule } from './auth/pages/auth.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ContainerModule } from './container/container.module';
import { MatInputModule } from '@angular/material/input';
import { QuillModule } from 'ngx-quill';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, HashLocationStrategy, LocationStrategy, NgOptimizedImage } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHandlerFn, HttpRequest, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { InterceptorService } from './shared/interceptor/interceptor.service';
import { NgxStripeModule } from 'ngx-stripe';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from './shared/routereuse/routereuse';
import { AppComponent } from './app.component';
import { authInterceptor } from './shared/authserverinterceptor/authserverinterceptor';
import { AuthChildGaurd, AuthGaurd } from './shared/gaurds/gaurd.service';
import { Error404Component } from './auth/pages/error404/error404.component';
import { ChildcomponentModule } from './childComponents/childcomponent/childcomponent.module';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    // FormsModule,
    // ReactiveFormsModule,
    ContainerModule, 
    MaterialModule, 
    MatInputModule,
    QuillModule.forRoot(),
    NgbModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51OODACSIlX5eKJquLWNoSPyZvKHBwoL6J5Cg4v7w6bNCBWofCiAZeFOHIWpqsnHPnRrkKWzZbNEQjiUH3h1Mg10000KYFkmFhP'),
    MatSnackBarModule,
    // NgOptimizedImage,
    AuthModule, 
   
  ],
  providers: [
    AuthGaurd,
    AuthChildGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
  },
  
    {

      provide: RouteReuseStrategy,

      useClass: RouteReuseService

    },
    DatePipe,
    provideClientHydration(withHttpTransferCacheOptions({ includePostRequests: true })), // Important!
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ],
   
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }


