import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { ProfileComponent } from './profile/profile.component';
import { ChildcomponentModule } from "../../childComponents/childcomponent/childcomponent.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { QueriesPageComponent } from './queries-page/queries-page.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { GenerateresumeComponent } from './generateresume/generateresume.component';
import { SettingsComponent } from './settings/settings.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentpopupComponent } from './paymentpopup/paymentpopup.component';
import { scrolltopcomponent } from './generateresume/scrolltopcomponent';
import { AiquestionsComponent } from './aiquestions/aiquestions.component';
import { EditdownloadresumeComponent } from './editdownloadresume/editdownloadresume.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SamplesComponent } from './samples/samples.component';
import { SamplepopupComponent } from './samples/samplepopup/samplepopup.component';


@NgModule({
    declarations: [
        DashboardComponent,
        ProfileComponent,
        QueriesPageComponent,
        GenerateresumeComponent,
        SettingsComponent,
        SubscriptionComponent,
        InvoiceComponent,
        PaymentsComponent,
        PaymentpopupComponent,
        scrolltopcomponent,
        AiquestionsComponent,
         EditdownloadresumeComponent,
         SamplesComponent,
         SamplepopupComponent
    ],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        MaterialModule,
        ChildcomponentModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        FormsModule,
        MaterialModule,
        MatDialogModule,
        MatTooltipModule,
        
    ],
    providers:[DatePipe]
})
export class ComponentsModule { }
