import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/auth/auth.service';
import { LocalstorageService } from '../../../shared/localStorage/localstorage.service';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import { RefundpolicyComponent } from '../refundpolicy/refundpolicy.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-oauth-login',
  templateUrl: './oauth-login.component.html',
  styleUrl: './oauth-login.component.scss'
})
export class OauthLoginComponent implements OnInit {
  window: (Window & typeof globalThis) | any;
  dontenable: boolean=false;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<OauthLoginComponent>,
  private signinServ: AuthService,
  @Inject(PLATFORM_ID) private platformId: Object,
  @Inject(DOCUMENT) private document:Document,
  private router: Router,
  private localstorage: LocalstorageService,
  private renderer: Renderer2,
  private dialog: MatDialog,

){
  this.window = this.document.defaultView?.window;

}

ngOnInit(): void {
    
}
  sendtoserver(details: any = {}, code: string) {
    if (isPlatformBrowser(this.platformId)) {
      let data = {
        data: details,
        code: code
      };
     
      this.signinServ.registerlogin(data)
      .pipe(
        debounceTime(400)
      )
      .subscribe((response: any) => {
        this.dontenable = true;
        console.log(response, "this is the response from backend for login/register");
        if (response?.success) {
          if (response?.url?.split(".")?.includes("google")) {

            this.window.location.href = response?.url;

          } 
          }
         
        
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
    const newTab = this.document.createElement('a');
    this.renderer.setAttribute(newTab, 'href', url);
    this.renderer.setAttribute(newTab, 'target', '_blank');
    newTab.click();
  }
  }


