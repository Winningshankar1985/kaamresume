import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthLoginComponent } from 'src/app/auth/pages/oauth-login/oauth-login.component';
import { RefundpolicyComponent } from 'src/app/auth/pages/refundpolicy/refundpolicy.component';
import { TermsandconditionsComponent } from 'src/app/auth/pages/termsandconditions/termsandconditions.component';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';

@Component({
  selector: 'app-header',
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

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

  ) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.document = document;
      this.window = this.document.defaultView?.window;
    }
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
      } else {

        this.navigate('/privacypolicy');
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
