import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/pages/dashboard/dashboard.component';
import { ProfileComponent } from '../components/pages/profile/profile.component';
import { QueriesPageComponent } from '../components/pages/queries-page/queries-page.component';
import { GenerateresumeComponent } from '../components/pages/generateresume/generateresume.component';
import { SettingsComponent } from '../components/pages/settings/settings.component';
import { AiquestionsComponent } from '../components/pages/aiquestions/aiquestions.component';
import { EditdownloadresumeComponent } from '../components/pages/editdownloadresume/editdownloadresume.component';
import { AuthChildGaurd, AuthGaurd } from '../shared/gaurds/gaurd.service';
import { SubscriptionComponent } from '../components/pages/subscription/subscription.component';
import { InvoiceComponent } from '../components/pages/invoice/invoice.component';
import { SamplesComponent } from '../components/pages/samples/samples.component';
import { Error404Component } from '../auth/pages/error404/error404.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGaurd],
    data: {
      requiresLogin: true
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGaurd],
    data: {
      requiresLogin: true
    }
  },
  {
    path: 'myqueries',
    component: QueriesPageComponent,
    canActivate: [AuthGaurd],
    data: {
      requiresLogin: true
    }
  },
  {
    path: 'buildresume',
    component: GenerateresumeComponent,
    canActivate: [AuthGaurd],
    data: { key: "reuse" }
  },
 
  {
    path: 'ourquestions',
    component: AiquestionsComponent,
    canActivate: [AuthGaurd],
    data: {
      requiresLogin: true
    }
  },
  {
    path: 'editdownloadresume',
    component: EditdownloadresumeComponent,
    canActivate: [AuthGaurd],
    data: {
      requiresLogin: true
    }
  },
  {
    path: 'samples',
    component: SamplesComponent,
    canActivate: [AuthGaurd],
    data: {
      requiresLogin: true
    }
  },
 
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGaurd],
    canActivateChild: [AuthChildGaurd],
    data: {
      requiresLogin: true
    },
  
    children: [
      {
        path: '',
        redirectTo: 'subscriptions',
        pathMatch: 'full',
      
      },
      {
        path: 'subscriptions',
        component: SubscriptionComponent,
  
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
        
      },
    
    ]
  },
  // {
  //   path: '**',
  //   component: Error404Component
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
