import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ContainerRoutingModule } from './container-routing.module';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/pages/components.module';
import { AuthModule } from '../auth/pages/auth.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ChildcomponentModule } from '../childComponents/childcomponent/childcomponent.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ExternalrouterdirectiveDirective } from '../shared/externalrouterdirective/externalrouterdirective.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { Error404Component } from '../auth/pages/error404/error404.component';
import { AuthGaurd } from '../shared/gaurds/gaurd.service';



@NgModule({
  declarations: [
    ContainerComponent,
    
  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    MaterialModule,
    ComponentsModule,
    AuthModule,
    MatCardModule,
    ChildcomponentModule,
    MatProgressSpinnerModule,
    ExternalrouterdirectiveDirective,
    MatTooltipModule,
    MatDialogModule,
    NgOptimizedImage
    
  ],
  providers:[AuthGaurd]
})
export class ContainerModule { }
