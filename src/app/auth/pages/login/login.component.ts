
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { TermsandconditionsComponent } from '../termsandconditions/termsandconditions.component';
import { RefundpolicyComponent } from '../refundpolicy/refundpolicy.component';
import { PrivacypolicyComponent } from '../privacypolicy/privacypolicy.component';



declare var google: any;
declare var AOS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
 
  googleLoginOptions = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
  code!: string;
  
  constructor(
    private localStorage: LocalstorageService, 
    private router: Router,
    private signinServ: AuthService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,

  ) {
    this.activeRoute.queryParams.subscribe((routeParam:any)=>{
      console.log(routeParam,"Router events AAAAAAAAAAAAAAA")
      // if(routeParam instanceOf ActivationEnd){
      //   const code = routeParam.snapshot.queryParams.code;
      //    console.log(code,"Router events BBBBBBBBBBBBBBBBB")
        // this.tokencheck([routeParam['code']]);
      // }
      this.code = routeParam.code;
      if(routeParam.code){
        this.redirectWithHash()
      }
      
    })


  }

  ngOnInit(): void {

  

  }
  ngAfterViewInit(): void {

    
  }
  handleCredentialResponse(response: any,code: string) {
 console.log(response,"response for url isddddddddddddddddd")
    // Send the ID token to your server for verification
    this.sendtoserver(response,code);
  }
  


  sendtoserver(details: any={},code:string) {
    let data={
      data: details,
      code: code
    };
    this.signinServ.registerlogin(data).subscribe((response: any) => {
      console.log(response, "this is the response from backend for login/register");
      if (response?.success) {
        if(response?.url?.split(".")?.includes("google")){
          window.location.href = response?.url;
        }else{
        this.authCheck(response?.data);
        this.localStorage.setItem('logindetails', JSON.stringify(response?.data[0]));
        this.localStorage.setItem('token', response.data[0].jwt.toString());
        this.router.navigate(['/pro_area/dashboard']);
        }
        this.signinServ.logging(true);
      }
    });

  }
  redirectWithHash() {
    this.router.navigate(['/'], { queryParams: { code: this.code } });
    this.sendtoserver('', this.code);
  }
  authCheck(data: any) {
    this.signinServ.authCheck(data)
      .subscribe((response: any) => {
        console.log(response, "response from node is");
        if (response.success) {
          // this.tokencheck(data);
          this.router.navigate(['/pro_area/dashboard']);
        }
      });
  }
  tokencheck(data:any){
    this.signinServ.tokencheck(data).subscribe((data:any)=>{
      console.log(data);
    })
  }
  openpopup(condition:string){
    //dummy comment
    if(condition=='terms'){
      let termsdialog = this.dialog.open(TermsandconditionsComponent,{
        panelClass: 'h-100'
      })
    }else if(condition=='refunds'){
      let refundsdialog = this.dialog.open(RefundpolicyComponent, {
        panelClass: 'h-100'
      })
    }else{
      let privacydialog = this.dialog.open(PrivacypolicyComponent, {
        panelClass: 'h-100'
      })
    }
  }
}
