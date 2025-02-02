import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Directive, HostListener, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[routerExternalLink]',
  standalone: true
})
export class ExternalrouterdirectiveDirective {

  @Input('routerExternalLink')
  externalUrl!: any;
  window: (Window & typeof globalThis) | any;
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
private router: Router) { }

  @HostListener('click')
  onClick() {
    if (isPlatformBrowser(this.platformId)) {
    // Navigate to the external URL
    window.location.href = this.externalUrl;
  }
}
}
