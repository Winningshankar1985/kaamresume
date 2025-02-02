import { DatePipe, DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../../shared/localStorage/localstorage.service';
import { SessionstorageService } from '../../shared/session/sessionstorage.service';
import { LoaderService } from '../../shared/loader/loader.service';
import { AuthService } from '../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { PaymentsService } from '../../shared/payments/payments.service';
import { error } from 'console';
import { Meta, Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { TermsandconditionsComponent } from '../../auth/pages/termsandconditions/termsandconditions.component';
import { RefundpolicyComponent } from '../../auth/pages/refundpolicy/refundpolicy.component';
import { PrivacypolicyComponent } from '../../auth/pages/privacypolicy/privacypolicy.component';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  
})
export class ContainerComponent implements OnInit, AfterViewInit, OnDestroy{
  //this will load the loader service and show the spinner
  
  isLoading$!: Observable<boolean>;
  isMenuOpen:boolean=false;
  isLtDesktop!: number;
  browser!: string;
  location!: Geolocation;
  usable: boolean=false;
  usable_count!: any;
  user_id!: number;
  userdetails!: any;
  isDesktop:boolean=false;
  istablet:boolean=false;
  ismobile:boolean=false;
  ismobilelg: boolean=false;
  usageChecking: any;
  @HostListener("window:resize", ['$event']) 
  onscreenresize() {
    if(isPlatformBrowser(this.platformId)){
      this.isLtDesktop = window.innerWidth;
      if (this.isLtDesktop >= 996) {
        this.isDesktop = true;
      } else if(this.isLtDesktop >= 768 && this.isLtDesktop < 996) {
        this.istablet = true;
      }
      else if (this.isLtDesktop > 480 && this.isLtDesktop < 768){
        this.ismobilelg = true;
      }
      else if (this.isLtDesktop > 200 && this.isLtDesktop < 480){
        this.ismobile = true;
      }
      
      else {
        this.isDesktop = false;
      }
    }
 
    // console.log(window.innerWidth,"rrrrrrrrrrrrrrrrrrr")
  } 
  window: (Window & typeof globalThis) | any;
  renderer2!: Renderer2;
  signup!: any;
  constructor(
    private localStorage: LocalstorageService,
    private sessionStorage: SessionstorageService,
    private datepipe: DatePipe,
    private loaderService: LoaderService, 
    private router: Router,
    private payService: PaymentsService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private metaTagService: Meta,
    private titleServ: Title,
    private rendererFactory: RendererFactory2,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private loginServ: AuthService,
  ) {
    if(isPlatformBrowser(this.platformId)){
      this.isLtDesktop = window.screen.width;
      console.log(this.isLtDesktop, "rrrrrrrrrrrrrrrrr");
      let user_data = JSON.parse(JSON.stringify(this.localStorage.getItem('logindetails')));
      let parsed = JSON.parse(user_data);
      this.user_id = parsed?.u_id;
      let storage: any = this.localStorage.getItem('logindetails');
      this.signup = this.localStorage.getItem('signup');
      this.userdetails = JSON.parse(storage);
      if(!this.user_id){
        this.signout();
      }
    }
  //   if (!this.loginServ.isLoggedin()) {
  //     this.router.navigate(['/']);      
  //  }
  
  }
  ngOnDestroy(): void {
      // this.usageChecking.unsubscribe();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoading$ = this.loaderService.getLoadingState();
      this.changeDetectorRef.detectChanges();
    }
  }
ngOnInit(): void {
  if (isPlatformBrowser(this.platformId) || isPlatformServer(this.platformId)){
   
 
    this.titleServ.setTitle('resume formats 2024 available with cheap resume writing services' )
    this.metaTagService.updateTag({ name: 'keywords', content: 'best ai resume builder free, resumes for job seekers, best apps for resume writing, check ats score of resume online free, create ats friendly resume for free' })
    this.metaTagService.updateTag({ name: 'description', content: 'best ai resume builder free, with resumes for job seekers and kaamresume is best apps for resume writing, with us create ats friendly resume for free and get dream job' })
    this.metaTagService.updateTag({ name: 'robots', content: 'index, nofollow' })
    this.metaTagService.updateTag({ name: 'author', content: 'Gowri Shankar D' })
    this.metaTagService.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' })
    this.metaTagService.updateTag({ name: 'date', content: '2024-09-01', scheme: 'YYYY-MM-DD' })
    this.metaTagService.updateTag({ charset: 'UTF-8' })
    
    this.document = document;
    this.window = this.document.defaultView?.window;
  }
  if (isPlatformBrowser(this.platformId)) {
  this.trigger();
  this.sessionstart();
  this.usagechecker();
    this.browser = navigator.userAgent;
    this.location = navigator.geolocation;5
  }
}
  trigger() {
    if(isPlatformBrowser(this.platformId)){
      window.dispatchEvent(new Event('resize'));
    }
    
  }
  signout(): void {
    if (isPlatformBrowser(this.platformId)) {
      
   
    this.localStorage.removeItem('logindetails');
    this.sessionStorage.removeItem('sessiondetails');
    this.loginServ.logging(false);
      // this.router.navigate(['/']);
    window.location.href = '/';
      this.localStorage.clear();
    }
  }
  sessionstart() {
    if (isPlatformBrowser(this.platformId)) {
    const sessionStarted: any = this.sessionStorage.getItem('loggedin');
    const datenow = new Date();
    const datestring  = this.datepipe.transform(datenow, "yyyy-MM-dd hh:mm:ss")
    const localsessiondetails: any = JSON.parse(JSON.stringify(this.localStorage.getItem('sessiondetails')));
    const cond = !localsessiondetails?.datetime ? !localsessiondetails?.datetime : true;
    if (sessionStarted == "yes" && cond && isPlatformBrowser(this.platformId)) {
     
      //set localstorage if there is session
      this.location.getCurrentPosition((location: any) => {
        if (isPlatformBrowser(this.platformId)) {
        console.log(location, "eeeeeeeeeeeeeeeeeeeeeee");
        const object: any = JSON.stringify({ "locationDetails": location, "loggedin": true, "datetime": datestring });
        this.localStorage.setItem('sessiondetails', object);
        }
      }, (error: any) => {
        if (isPlatformBrowser(this.platformId)) {
        console.log(error, "wwwwwwwwwwwwwwwwwwwwww");
        const object: any = JSON.stringify({ "locationDetails": error.message, "loggedin": true, "datetime": datestring });
        this.localStorage.setItem('sessiondetails', object);
        }
      })

      //pass the session data to backend

    } else {
      //remove session localstorage if there is no session
      if (isPlatformBrowser(this.platformId)){
        this.localStorage.removeItem('sessiondetails');
      }
      
    }
  }
  }
    refreshToken(){ 
    // .then((tokenDetails:any)=>{
    //   console.log(tokenDetails,"TOKEN DETAILS FFFFFFFFFFFF")
    // });

  }
  usagechecker() {
    if (isPlatformBrowser(this.platformId)) {
  this.usageChecking =  this.payService.usagecheck(this.user_id).subscribe((data: any) => {
      if (isPlatformBrowser(this.platformId)) {
      console.log(data, "WWWWWWWWWWWWWWWWWWWWWW");
      if (data?.success ) {
        let data1 = data?.data;
        
        let counted = data?.plan == 'bronze' ? 5 : data?.plan == 'silver' ? 10 : 15 ;
        if (data1.used !== counted) {
          this.usable = true;
          this.usable_count = data1.used;
        }
      } else {
        this.usable = false;
        this.router.navigate(['/pro_area/dashboard'])
      }
    }
    }
  
  );
}
  }
  onSidenavClick(){
    if (isPlatformBrowser(this.platformId)) {
    this.isMenuOpen = false;
  }
}

  openpopup(condition: string) {
    if (isPlatformBrowser(this.platformId)) {
      //dummy comment
      if (condition == 'terms') {
        // let termsdialog = this.dialog.open(TermsandconditionsComponent, {

        // });

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
