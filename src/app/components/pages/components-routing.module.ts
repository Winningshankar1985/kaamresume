import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AuthGaurd } from '../../shared/gaurds/gaurd.service';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
