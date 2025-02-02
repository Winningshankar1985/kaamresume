import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-samplepopup',
  templateUrl: './samplepopup.component.html',
  styleUrl: './samplepopup.component.scss'
})
export class SamplepopupComponent implements OnInit{
  themes:Array<any>=[
    {
      theme:'austinmcconnell',
      name: 'Roman Prime Theme',
      src: '/assets/resumes/austinmcconnell-theme.pdf'
    },
    {
      theme: 'contempo',
      name: 'Contempt Theme',
      src: '/assets/resumes/contempo-theme.pdf'
    },
    {
      theme: 'direct',
      name: 'All Timers Theme',
      src: '/assets/resumes/direct-theme.pdf'
    },
    {
      theme: 'latte',
      name: 'Coders Theme',
      src: '/assets/resumes/latte-theme.pdf'
    },
    {
      theme: 'engineering',
      name: "Engineer's Theme",
      src: '../../../../../assets/resumes/engineering-theme.pdf'
    },
  ]
  foundData!: any;
  pdfSource!: any;
  constructor(
    public dialogRef: MatDialogRef<SamplepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    public domSanitizer: DomSanitizer,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.data);
      this.foundData = this.themes.find((x: any) => x.theme == this.data.theme);
      console.log(this.foundData, "FOUND DATA");
      this.pdfSource = this.domSanitizer.bypassSecurityTrustResourceUrl(this.foundData?.src + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH');
    }

  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    
    }
  }

  loadresume(data:any):any{
    if (isPlatformBrowser(this.platformId)) {
   

      // Create a URL for the Blob
      return this.domSanitizer.bypassSecurityTrustResourceUrl(data);
  }
  return;
  }



}
