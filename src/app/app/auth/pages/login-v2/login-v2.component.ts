import { afterNextRender, afterRender, AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import { RefundpolicyComponent } from '../refundpolicy/refundpolicy.component';
import { PrivacypolicyComponent } from '../privacypolicy/privacypolicy.component';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AboutMeComponent } from '../about-me/about-me.component';
import { DOCUMENT, IMAGE_CONFIG, isPlatformBrowser, isPlatformServer, NgOptimizedImage, provideImgixLoader } from '@angular/common';
import { OauthLoginComponent } from '../oauth-login/oauth-login.component';
import { Meta, provideClientHydration, Title, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { authInterceptor } from 'src/app/shared/authserverinterceptor/authserverinterceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
declare var AOS: any;
@Component({
  selector: 'app-login-v2',
  templateUrl: './login-v2.component.html',
  styleUrl: './login-v2.component.scss',
  // host: {ngSkipHydration: "true"},
  // standalone: true,
  // imports:[NgOptimizedImage],
  // providers:[
    // provideImgixLoader('https://placeholder.pics/svg/200x200'),
    // {
    //   provide: IMAGE_CONFIG,
    //   useValue: {
    //     breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
    //   }
    // },
   
  // ]
})
export class LoginV2Component implements OnInit, AfterViewInit{
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
      if (isPlatformBrowser(this.platformId)) {
        AOS.init();
        this.gototop();
        this.titleServ.setTitle("The best ai resume builder among top ai resume builders in the whole web");
        this.metaTagService.addTag({ name: "keywords", content: "ai resume, what is the best ai resume builder, best ai resume, top ai resume builder, top free ai resume builder, best ai resume builder, open ai resume builder" });
        this.metaTagService.addTag({ name: "description", content: "If you are wondering what is the best ai resume builder among top ai resume builders then you are looking at kaamresume the best ai resume builder in the whole web among other top ai resume builders. " });
        this.metaTagService.addTag({ name: "robots", content: "index, follow" });
        this.metaTagService.addTag({ name: "author", content: "Gowri Shankar D" });
        this.metaTagService.addTag({ name: "viewport", content: "width=device-width, initial-scale=1" });
        this.metaTagService.addTag({ name: "date", content: "2024-09-01", scheme: "YYYY-MM-DD" });
        this.metaTagService.addTag({ charset: "UTF-8" });

      }
    });

   
   
    // Fixed Discount Dish JS
    // $(document).ready(function () {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer2 = rendererFactory.createRenderer(null, null);
      this.document = document;
      this.window = this.document.defaultView?.window;

      this.activeRoute.queryParams.subscribe((routeParam: any) => {
        console.log(routeParam, "Router events AAAAAAAAAAAAAAA");

        this.code = routeParam.code;
        if (routeParam.code) {
          this.redirectWithHash();
        }

      });
    }
   

    // }
    // );
   
  }

  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      console.log('this is client code');
      let cardBlock: any = this.document.querySelectorAll('.task_block');
      let topStyle = 120;

      cardBlock.forEach((card: any) => {
        card.style.top = `${topStyle}px`;
        topStyle += 30;
      });
    } 
  
         
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.window.scroll({
      top: 80,
      left: 80,
      behavior: "smooth",
    });
  }
}

  handleCredentialResponse(response: any, code: string) {
    if (isPlatformBrowser(this.platformId)) {
    console.log(response, "response for url isddddddddddddddddd");
    // Send the ID token to your server for verification
    this.sendtoserver(response, code);
  }
}


  sendtoserver(details: any = {}, code: string) {
    if (isPlatformBrowser(this.platformId)) {
    let data = {
      data: details,
      code: code
    };
    this.signinServ.registerlogin(data).subscribe((response: any) => {
      console.log(response, "this is the response from backend for login/register");
      if (response?.success) {
        if (response?.url?.split(".")?.includes("google")) {
         
          this.window.location.href = response?.url;
         
        } else {
          if (isPlatformBrowser(this.platformId)) {
          // this.authCheck(response?.data);
          this.localstorage.setItem('logindetails', JSON.stringify(response?.data[0]));
          this.localstorage.setItem('token', response.data[0].jwt);
            let uri = '/pro_area/dashboard';
            this.router.navigate([uri]);
          }
        }
        this.signinServ.logging(true);
      }
    });
  }
  }
  redirectWithHash() {
    if (isPlatformBrowser(this.platformId)) {
    this.router.navigate(['/'], { queryParams: { code: this.code } });
    this.sendtoserver('', this.code);
  }
}
  authCheck(data: any) {
    if (isPlatformBrowser(this.platformId)) {
    this.signinServ.authCheck(data)
      .subscribe((response: any) => {
        console.log(response, "response from node is");
        if (response.success) {
          // this.tokencheck(data);
          this.router.navigate(['/pro_area/dashboard']);
        }
      });
    }
  }
 tokencheck(data: any) {
   if (isPlatformBrowser(this.platformId)) {
    this.signinServ.tokencheck(data).subscribe((data: any) => {
      console.log(data);
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
      this.navigate('/aboutus')
    } else {
   
      this.navigate('/privacypolicy')
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
    if(isPlatformBrowser(this.platformId)){
      this.window.open(url, "_blank");
    }
    
  }
  gototop(){
    if (isPlatformBrowser(this.platformId)) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
  oauthPopup(){
    if (isPlatformBrowser(this.platformId)) {
    let oauthpopup = this.dialog.open(OauthLoginComponent,{
      panelClass: 'oauth-welcome'
    });
  }
}
}
