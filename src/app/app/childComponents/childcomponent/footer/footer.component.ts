import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthLoginComponent } from 'src/app/auth/pages/oauth-login/oauth-login.component';
import { PrivacypolicyComponent } from 'src/app/auth/pages/privacypolicy/privacypolicy.component';
import { RefundpolicyComponent } from 'src/app/auth/pages/refundpolicy/refundpolicy.component';
import { TermsandconditionsComponent } from 'src/app/auth/pages/termsandconditions/termsandconditions.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';

@Component({
  selector: 'app-footer',

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  window: (Window & typeof globalThis) | any;
  renderer2!: Renderer2;
  constructor(
    private dialog: MatDialog,
    private localstorage: LocalstorageService,
    private router: Router,
    private signinServ: AuthService,
    private activeRoute: ActivatedRoute,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private metaTagService: Meta,
    private titleServ: Title,
  
  ) {
    if (isPlatformBrowser(this.platformId)) {

      this.titleServ.setTitle("The best ai resume builder among top ai resume builders in the whole web");
      this.metaTagService.addTag({ name: "keywords", content: "ai resume, resume review ai, best ai resume, top ai resume builder, resume review, best ai resume builder, resume order" });
      this.metaTagService.addTag({ name: "description", content: "If you are wondering what is the best ai resume builder among top ai resume builders then you are looking at kaamresume the best ai resume builder in the whole web among other top ai resume builders. " });
      this.metaTagService.addTag({ name: "robots", content: "index, follow" });
      this.metaTagService.addTag({ name: "author", content: "Gowri Shankar D" });
      this.metaTagService.addTag({ name: "viewport", content: "width=device-width, initial-scale=1" });
      this.metaTagService.addTag({ name: "date", content: "2024-09-01", scheme: "YYYY-MM-DD" });
      this.metaTagService.addTag({ charset: "UTF-8" });


      this.document = document;
      this.window = this.document.defaultView?.window;
    }
   }


  ngOnInit(): void {
      
  }

  oauthPopup() {
    if (isPlatformBrowser(this.platformId)) {
      let oauthpopup = this.dialog.open(OauthLoginComponent, {
        panelClass: 'oauth-welcome'
     
      });
    


    }
  }
    openpopup(condition: string) {
      if (isPlatformBrowser(this.platformId)) {
        //dummy comment
        if (condition == 'terms') {
          let termsdialog = this.dialog.open(TermsandconditionsComponent, {

          });
        } else if (condition == 'refunds') {
          let refundsdialog = this.dialog.open(RefundpolicyComponent, {

          });
        } else if (condition == 'about') {
          this.navigate('/aboutus');
        } else if (condition == 'privacy') {
          // this.router.navigate(['/privacypolicy']);
          // this.navigate('/privacypolicy');
          let privacypolicy = this.dialog.open(PrivacypolicyComponent, {

          });
        } else if (condition == 'resumeatschecker') {
          this.navigate('/check-resumeatschecker');
        } else if (condition == 'tools-resumeatschecker') {

          this.navigate('/tools-resumeatschecker');
        } else if (condition == 'faq') {
          this.navigate('/faq');
        }
      }
    }
    navigate(url: string) {
      // const newTab = this.document.createElement('a');
      // this.renderer2.setAttribute(newTab, 'href', url);
      // this.renderer2.setAttribute(newTab, 'target', '_blank');
      // newTab.click();
      if (isPlatformBrowser(this.platformId)) {
        this.openInNewTab(url);
      }
    }
    openInNewTab(url: string) {
      if (isPlatformBrowser(this.platformId)) {
        this.window.open(url, "_blank");
      }

    }
}
