import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { afterRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/dashboard/dashboard.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { PaymentsService } from 'src/app/shared/payments/payments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})
export class DashboardComponent implements OnInit{
paymentdetails: any;
historydata: any;
  user_id!: any;
  usable: boolean=false;
  usable_count: any;
  signup: any;

constructor( private router: Router,
  private dashboardServ : DashboardService,
  private localStorage: LocalstorageService,
  private payService: PaymentsService,
  @Inject(DOCUMENT) private document: Document,
  @Inject(PLATFORM_ID) private platformId: Object
){
  this.signup = this.localStorage.getItem('signup');
}

ngOnInit(){
 
  let parsed:any;
  if (isPlatformBrowser(this.platformId)) {
    this.router.navigate([this.router.url]);
    let user_data = JSON.parse(JSON.stringify(this.localStorage.getItem('logindetails')));
    parsed = JSON.parse(user_data);
    this.user_id = parsed?.u_id;
    this.usagechecker();
    this.getHistory();
  
 
     }
  

}
generateResume(){
   if (isPlatformBrowser(this.platformId)) {
  this.router.navigate(['/pro_area/buildresume']);
   }
}
getpaymentdetails(){
   if (isPlatformBrowser(this.platformId)) {
  this.dashboardServ.getpaymentdetails().subscribe((res:any)=>{
    console.log(res,"payment details");
    this.paymentdetails = res.data[0];
    
    
    
  });
}
}
buyCredits(){
  this.router.navigate(['/pro_area/settings/subscriptions']);
}
getHistory(){
   if (isPlatformBrowser(this.platformId)) {
  this.dashboardServ.resumehistory().subscribe((res:any)=>{
    console.log(res?.data,"history");
    this.historydata = res?.data;
  });
   }
}
  usagechecker() {
     if (isPlatformBrowser(this.platformId)) {
    this.payService.usagecheck(this.user_id).subscribe((data: any) => {
      console.log(data, "WWWWWWWWWWWWWWWWWWWWWW");
      if (data.success) {
        let data1 = data?.data;
        let counted = data?.plan == 'bronze' ? 5 : data?.plan == 'silver' ? 10 :  15 ;
        if (data1.used !== counted) {
          this.usable = true;
          this.usable_count = data1.used;
        }
      } else {
        this.usable = false;
        // this.router.navigate(['/pro_area/settings/subscriptions']);
      }
      this.getpaymentdetails();
    });
  }
}
}
