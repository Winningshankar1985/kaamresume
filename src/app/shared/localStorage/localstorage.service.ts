import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private localStorage!: any;
  currentUserSubject: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.localStorage = document.defaultView?.localStorage;
   }

  setItem(key: string, data: any) {
    if (isPlatformBrowser(this.platformId)) {
      
      return  localStorage.setItem(key, data);
      
    }
    return;
   
  }
  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
   return localStorage.getItem(key);
    }
    return;
  }
  removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
   return localStorage.removeItem(key);
    }
    return;
  }
  clear(){
    if (isPlatformBrowser(this.platformId)) {
   localStorage.clear();
    }
    return;
  }
  platformBrowser(){
    return isPlatformBrowser(this.platformId);
  }
  platformServer(){
   return isPlatformServer(this.platformId)
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl(uri, { skipLocationChange: false }).then(() => {
      this.router.navigate([uri]);
    });
  }
}
