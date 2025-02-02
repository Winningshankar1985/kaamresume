import { RouterModule, Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { NgModule } from '@angular/core';

export const PagesRoutes: Routes = [

  {
    path: 'dashboard',
    component: StarterComponent,
  },
  {
    path: 'ui-components',
    loadChildren: ()=> import('./ui-components/ui-components.routes').then((m)=>m.UiComponentsRoutes)
  }
 
];
