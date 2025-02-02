import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from 'express';
import { ArrayserviceService } from 'src/app/shared/arrayservice/arrayservice.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { PaymentsService } from 'src/app/shared/payments/payments.service';
import { resumesService } from 'src/app/shared/resume/resume.service';

@Component({
  selector: 'app-payments-v2',
  standalone: true,
  imports: [],
  templateUrl: './payments-v2.component.html',
  styleUrl: './payments-v2.component.scss'
})
export class PaymentsV2Component {
  resumeAIResponse: any;
  constructor(


    private router: Router,
    public dialog: MatDialog,
    private resumeserv: resumesService,
    private localStorage: LocalstorageService,
    private arrayserv: ArrayserviceService,
    private payServ: PaymentsService,

    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const localdata: any = JSON.stringify(this.localStorage.getItem('AIresumeResponse'));
      this.resumeAIResponse = JSON.parse(JSON.parse(localdata));
    }
  }
}
