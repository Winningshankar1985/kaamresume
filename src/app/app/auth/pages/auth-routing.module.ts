import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignoutComponent } from './signout/signout.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { AuthGaurd } from 'src/app/shared/gaurds/gaurd.service';
import { SalespageComponent } from './salespage/salespage.component';
import { ResumeatscheckerComponent } from './resumeatschecker/resumeatschecker.component';
import { AnalysetoolpageComponent } from './analysetoolpage/analysetoolpage.component';
import { ResumeatscheckerFAQComponent } from './resumeatschecker-faq/resumeatschecker-faq.component';
import { Error404Component } from './error404/error404.component';
import { RefundpolicyComponent } from './refundpolicy/refundpolicy.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  {
    path: '',
    component: SalespageComponent,
  
  },
  
  {
    path: 'login',
    component: SalespageComponent,

  },
 
  {
    path: 'signout',
    component: SignoutComponent,

  },
  {
    path: 'privacypolicy',
    component: PrivacypolicyComponent,
   
  },
   {
    path: 'terms',
     component: TermsandconditionsComponent,
   
  },
  {
    path: 'cancellationandrefunds',
    component: RefundpolicyComponent,

  },
  {
    path: 'contact',
    component: ContactComponent,

  },
  {
    path: 'aboutus',
    component: AboutMeComponent,
 
  },
    {
    path: 'welcome',
      component: LoginV2Component,
 
  },
  {
    path: 'check-resumeatschecker',
    component: ResumeatscheckerComponent,
   
  },
  {
    path: 'tools-resumeatschecker',
    component: AnalysetoolpageComponent,
 
  },
  {
    path: 'faq',
    component: ResumeatscheckerFAQComponent,
  
  
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],


exports: [RouterModule]
})
export class AuthRoutingModule { }
