import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { ContainerComponent } from './container/container/container.component';
import { LoginV2Component } from './auth/pages/login-v2/login-v2.component';
import { SalespageComponent } from './auth/pages/salespage/salespage.component';
import { Error404Component } from './auth/pages/error404/error404.component';
import { FullComponent } from './affiliate/layouts/full.component';
import { PrivacypolicyComponent } from './auth/pages/privacypolicy/privacypolicy.component';
import { TermsandconditionsComponent } from './auth/pages/termsandconditions/termsandconditions.component';
import { RefundpolicyComponent } from './auth/pages/refundpolicy/refundpolicy.component';
import { ContactComponent } from './auth/pages/contact/contact.component';
import { AboutMeComponent } from './auth/pages/about-me/about-me.component';
import { ResumeatscheckerComponent } from './auth/pages/resumeatschecker/resumeatschecker.component';
import { AnalysetoolpageComponent } from './auth/pages/analysetoolpage/analysetoolpage.component';
import { ResumeatscheckerFAQComponent } from './auth/pages/resumeatschecker-faq/resumeatschecker-faq.component';
import { AppSideLoginComponent } from './affiliate/authentication/side-login/side-login.component';
import { AppSideRegisterComponent } from './affiliate/authentication/side-register/side-register.component';


const routes: Routes = [
  {
    path:"",
    component: SalespageComponent,
    // loadChildren: () => import('./auth/pages/auth.module').then((m: any) => m.AuthModule)
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
    path: "pro_area",
    component: ContainerComponent,
    loadChildren: ()=> import('./container/container.module').then((m:any)=> m.ContainerModule)
  },
  {
    path: "affiliate_area",
    // component: FullComponent,
    loadChildren: () => import('./affiliate/layouts/layout.routes').then((m: any) => m.layoutRoutes)
  },
  {
    path: 'affiliate',
    redirectTo: '/affiliate/login',
    pathMatch: 'full'
  },
  {
    path: 'affiliate/login',
    component: AppSideLoginComponent
  },
  {
    path: 'affiliate/register',
    component: AppSideRegisterComponent
  },
  {
    path: '**',
    component: Error404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
