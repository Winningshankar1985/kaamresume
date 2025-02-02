import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterRender, Component, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';

@Component({
  selector: 'app-analysetoolpage',
  
  templateUrl: './analysetoolpage.component.html',
  styleUrl: './analysetoolpage.component.scss'
})
export class AnalysetoolpageComponent implements OnInit {
  code: any;

  window: (Window & typeof globalThis) | any;
  renderer2!: Renderer2;
  constructor(
    private localstorage: LocalstorageService,
    private router: Router,
    private signinServ: AuthService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private metaTagService: Meta,
    private titleServ: Title,
  ) {
   
    afterRender(() => {
  
    })

      

    
  }

  ngOnInit(): void {
          if (isPlatformBrowser(this.platformId)  || isPlatformServer(this.platformId)) {

      this.titleServ.setTitle("WANT THE BEST FREE ATS CHECKER TOOL AMONG TOP FREE RESUME CHECKER TOOLS FOR YOUR INSTITUTION OR WEBSITE");
      this.metaTagService.addTag({ name: "keywords", content: "resume ats, resume ats scanner, resume checker, ats checker, resume ai, resume score checker, free ats checker, free resume checker" });
      this.metaTagService.addTag({ name: "description", content: "Want To Know How Good Your Resume Is Try Our Resume Score Checker. This Resume Ats Checker Is The Best Among Top Resume Ats Scanner On The Whole Web. That Will Give You The Approximate Resume ATS Score Which Is What This Resume Ats Scorer Is About." });
      this.metaTagService.addTag({ name: "robots", content: "index, follow" });
      this.metaTagService.addTag({ name: "author", content: "Gowri Shankar D" });
      this.metaTagService.addTag({ name: "viewport", content: "width=device-width, initial-scale=1" });
      this.metaTagService.addTag({ name: "date", content: "2024-09-01", scheme: "YYYY-MM-DD" });
      this.metaTagService.addTag({ charset: "UTF-8" });

    } 
  }
  copyToClipboard(elementId:any) {
    if (isPlatformBrowser(this.platformId)) {
    var copyText:any = document.getElementById(elementId);
    navigator.clipboard.writeText(copyText.textContent)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }
}

}
