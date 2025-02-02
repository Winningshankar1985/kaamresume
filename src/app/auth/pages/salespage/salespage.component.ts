import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterRender, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';
import { LocalstorageService } from '../../../shared/localStorage/localstorage.service';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import { RefundpolicyComponent } from '../refundpolicy/refundpolicy.component';
import { OauthLoginComponent } from '../oauth-login/oauth-login.component';
import { PrivacypolicyComponent } from '../privacypolicy/privacypolicy.component';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-salespage',

  templateUrl: './salespage.component.html',
  styleUrl: './salespage.component.scss'
})
export class SalespageComponent implements OnInit, OnDestroy {

  code: any;

  window: (Window & typeof globalThis) | any;
  renderer2!: Renderer2;
  isLtDesktop!: number;
  istablet!: boolean;
  ismobilelg!: boolean;
  ismobile!: boolean;
  isDesktop!: boolean;
  isSmallScreen: boolean=false;
  
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

   
  
 
    if (isPlatformBrowser(this.platformId)) {
      this.renderer2 = rendererFactory.createRenderer(null, null);
      this.document = document;
      this.window = this.document.defaultView?.window;


    }
    afterRender(() => {

    })
   }


  goup(){
    if (isPlatformBrowser(this.platformId)) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    // Initialize Rellax on the elements with the "rellax" class
  
      const mediaQueryList = window.matchMedia('(max-width: 580px)');
      this.isSmallScreen = mediaQueryList.matches;
      mediaQueryList.addEventListener('change', event => {
        this.isSmallScreen = event.matches;
        
      });
    this.activeRoute.queryParams.pipe(take(1)).subscribe((routeParam: any) => {
        console.log(routeParam, "Router events AAAAAAAAAAAAAAA");

        this.code = routeParam.code;
        if (routeParam.code) {
          this.redirectWithHash();
        }
        else{
          // if (this.router.url == '/') {
          //   this.router.navigate(['/']);
          // }
        }

      });
  }

    if (isPlatformBrowser(this.platformId) || isPlatformServer(this.platformId)) {
      this.titleServ.setTitle("The best ai resume builder among top ai resume builders in the whole web");
      this.metaTagService.addTag({ name: "keywords", content: "ai resume, resume review ai, best ai resume, top ai resume builder, resume review, best ai resume builder, resume order" });
      this.metaTagService.addTag({ name: "description", content: "If you are wondering what is the best ai resume builder among top ai resume builders then you are looking at kaamresume the best ai resume builder in the whole web among other top ai resume builders. " });
      this.metaTagService.addTag({ name: "robots", content: "index, follow" });
      this.metaTagService.addTag({ name: "author", content: "Gowri Shankar D" });
      this.metaTagService.addTag({ name: "viewport", content: "width=device-width, initial-scale=1" });
      this.metaTagService.addTag({ name: "date", content: "2024-09-01", scheme: "YYYY-MM-DD" });
      this.metaTagService.addTag({ charset: "UTF-8" });


      
    }
    if (isPlatformBrowser(this.platformId)) {
    this.document = document;
    this.window = this.document.defaultView?.window;
    }
  }
ngOnDestroy(): void {
    
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
              this.localstorage.setItem("loggedin", JSON.stringify('yes'));
              this.localstorage.setItem("signup",response?.signup);
              let uri:string;
              if(response?.signup){
                uri = '/pro_area/settings/subscriptions';
              }else{
                uri = '/pro_area/dashboard';
              }
              
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
        // let termsdialog = this.dialog.open(TermsandconditionsComponent, {
          
        // });
        this.router.navigate(['/terms'])
      } else if (condition == 'refunds') {
        // let refundsdialog = this.dialog.open(RefundpolicyComponent, {

        // });
         this.router.navigate(['/cancellationandrefunds'])
      } else if (condition == 'about') {
        this.navigate('/aboutus');
      } else if(condition == 'privacy') {
        this.router.navigate(['/privacypolicy']);
        // this.navigate('/privacypolicy');
        // let privacypolicy = this.dialog.open(PrivacypolicyComponent, {

        // });
      } else if (condition == 'resumeatschecker'){
        this.navigate('/check-resumeatschecker');
      } else if (condition == 'tools-resumeatschecker'){

        this.navigate('/tools-resumeatschecker');
      }else if(condition == 'faq'){
        this.navigate('/faq');
      } else if (condition == 'contact') {
        this.router.navigate(['/contact'])
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
  oauthPopup() {
    if (isPlatformBrowser(this.platformId)) {
      let oauthpopup = this.dialog.open(OauthLoginComponent, {
        panelClass: 'oauth-welcome'
      });
    }
  }

}


