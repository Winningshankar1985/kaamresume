import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  links: Array<any> = [
    {
      name: "Subscription",
      icon: "subscriptions",
      link: "subscriptions",
      active: true
    },
    {
      name: "Invoice",
      icon: "receipt_long",
      link: "invoice",
      active: true
    }
  ];
activelink:string=this.links[0]?.name;
constructor(
  private router: Router,

  @Inject(DOCUMENT) private document: Document,
  @Inject(PLATFORM_ID) private platformId: Object
){

}

  
  activelinkchange(linkname:string){
    if (isPlatformBrowser(this.platformId)) {
    this.activelink = linkname;
  }
}
}
