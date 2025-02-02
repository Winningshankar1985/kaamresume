

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignoutComponent } from './signout/signout.component';
import {MaterialModule} from '../../material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { RefundpolicyComponent } from './refundpolicy/refundpolicy.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OauthLoginComponent } from './oauth-login/oauth-login.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { authInterceptor } from '../../shared/authserverinterceptor/authserverinterceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { HeaderComponent } from '../../childComponents/childcomponent/header/header.component';
import { FooterComponent } from '../../childComponents/childcomponent/footer/footer.component';
import { ChildcomponentModule } from '../../childComponents/childcomponent/childcomponent.module';
import { SalespageComponent } from './salespage/salespage.component';
import { AnalysetoolpageComponent } from './analysetoolpage/analysetoolpage.component';
@NgModule({
  declarations: [
    SignoutComponent,
    LoginComponent,
    LoginV2Component,
    TermsandconditionsComponent,
    PrivacypolicyComponent,
    RefundpolicyComponent,
    AboutMeComponent,
    OauthLoginComponent,
    SalespageComponent,
    AnalysetoolpageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthRoutingModule,
    MatDialogModule,
    MaterialModule,
    MatCardModule,
    RouterModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    ChildcomponentModule,
  ],
  providers: [
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ],
  schemas: []
})
export class AuthModule { }
