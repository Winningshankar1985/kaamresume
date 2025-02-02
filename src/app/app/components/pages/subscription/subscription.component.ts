import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DashboardService } from 'src/app/shared/dashboard/dashboard.service';
declare var AOS: any;
import { PaymentpopupComponent } from '../paymentpopup/paymentpopup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { PaymentsService } from 'src/app/shared/payments/payments.service';
import { load } from '@cashfreepayments/cashfree-js';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { cashfree_return_url, env_cashfree } from 'src/environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
declare var Cashfree: any; // Declare Cashfree to avoid TypeScript errors
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  host: {ngSkipHydration: "true"}
})
export class SubscriptionComponent implements OnInit, AfterViewInit{
  paymentdetails: any;
  historydata: any;
  user_id!: number;
  usable: boolean=false;
  usable_count!: number;
  user_data!: any;
  order_id!: string;
  paymentStatus!: boolean;
  paymentStatus_fail: boolean=true;
  paymentStatus_pending: boolean=true;
  cashfree!: any;
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private subsciptionServ: DashboardService,
    private dialog: MatDialog,
    private localStorage: LocalstorageService,
    private payService: PaymentsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private notification: NotificationsService,
    
  ) {
if (isPlatformBrowser(this.platformId)) {
  let user_data = JSON.parse(JSON.stringify(this.localStorage.getItem('logindetails')));
  let parsed = JSON.parse(user_data)
    this.user_id = parsed?.u_id;
    this.user_data = parsed;
    // console.log(parsed?.u_id,"HHHHHHHHHHHHHH",parsed)
   
  }
}
  ngOnInit(): void {
if (isPlatformBrowser(this.platformId)) {
    this.usagechecker();
    AOS.init();
  // this.initialiseSDK();
    // this.getHistory();
  }
}
ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
  this.activeRoute.queryParams.subscribe((params: any) => {
    console.log(params, "PARAMS");
    this.order_id = params?.myorder;
    if (this.order_id) {
      this.confirmPayment();
      setTimeout(() => {
        this.router.navigate(['/pro_area/settings/subscriptions']);
      }, 1500);
    }
  });
}
}

  getpaymentdetails() {
    if (isPlatformBrowser(this.platformId)) {
    this.subsciptionServ.getpaymentdetails().subscribe((res: any) => {
      console.log(res, "payment details");
      if(this.usable){
        this.paymentdetails = res.data[0];
      }else{
        this.paymentdetails = null;
      }
      
    });
  }
}
  usagechecker(){
    this.payService.usagecheck(this.user_id).subscribe((data:any)=>{
if (isPlatformBrowser(this.platformId)) {
      console.log(data,"WWWWWWWWWWWWWWWWWWWWWW");
      if(data.success){
        let data1 = data?.data;
        let counted = data?.plan == 'bronze' ? 5 : data?.plan == 'silver' ? 10 : 15;
        if(data1.used !==counted){
          this.usable = true;
          this.usable_count = data1.used;
        }
      }else{
        this.usable = false;
      }
      this.getpaymentdetails();
    }
    });
  }
  getHistory() {
    this.subsciptionServ.resumehistory().subscribe((res: any) => {
if (isPlatformBrowser(this.platformId)) {
      console.log(res.data, "history");
      this.historydata = res.data;
}
    });
  }
// paymentspopup(price:number){
//   this.dialog.open(PaymentpopupComponent,{
//     data:{
//       data: price
//     }
//   })
// }

paymentscashfree(amount:number,plan:string,phone:any){
  if (isPlatformBrowser(this.platformId)) {
    console.log(phone,"pppppppppppppppppppp");
    
  let data={
    cus_id: this.user_data?.u_id,
    cus_email: this.user_data?.email,
    amount: amount,
    cus_name: this.user_data?.fname+" "+this.user_data?.lname,
    cus_phone: phone
  };

  this.payService.cashfreecreateorder(data).subscribe((cashfreedata:any)=>{
if (isPlatformBrowser(this.platformId)) {
    console.log(cashfreedata,"JJJJJJJJJJJJJJJJJJJJ");
    this.localStorage.setItem('order', JSON.stringify(cashfreedata?.data));
    let data ={
      order_id: cashfreedata?.data.order_id,
      session: cashfreedata?.data.payment_session_id,

    };
    this.cashfreeRedirect(data);
  
  }

    
})
  }
}

// async cashfreeRedirect(data:any){
// if (isPlatformBrowser(this.platformId)) {
//   const {order_id,session}=data;
//   const cashfreee = await load({
//     mode: "production" //or production
//   });
//   let checkoutOptions = {
//     paymentSessionId: session,
//     returnUrl: cashfree_return_url + `/?myorder=${order_id}`

//   };
  
//   cashfreee.checkout(checkoutOptions).then(function (result:any) {

//     if (result.error) {
//       alert(result.error.message);
//     }
//     if (result.redirect) {
//       console.log(result,"Redirection",result.redirect);
//     }
  
//   });

// }
// }
async initialiseSDK(){
  // this.cashfree = await load({
  //     mode: "production" //or production
  //   });
  if (typeof Cashfree !== 'undefined') {
    // Initialize Cashfree
    this.cashfree = Cashfree({
      mode: "production" // or 'production'
    });
    console.log(this.cashfree,"Cashfree loaded");
    // Proceed with other SDK methods like initiating a payment
    // Example: cashfree.initiatePayment({...})
  } else {
    console.error('Cashfree SDK is not loaded!');
  }

}
  async cashfreeRedirect(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const cashfree = Cashfree({
      mode: "production" // or 'production'
    });
      const {order_id,session}=data;
      let checkoutOptions = {
    paymentSessionId: session,
    returnUrl: cashfree_return_url + `/?myorder=${order_id}`,
    // redirectTarget: "_self",
  };
  
  cashfree.checkout(checkoutOptions)
 }
  }

toast(){
if (isPlatformBrowser(this.platformId)) {
  this.notification.showAlert('Enter Phone Number to Enable payments.')
}
}
confirmPayment(){
          if (isPlatformBrowser(this.platformId)) {
 let order:any = JSON.parse(this.localStorage.getItem('order')||"");
 console.log(order,"IIIIIIIIIIIIIIIIIIIIIIII");
  this.payService.cashfreegetorderconfirmation({order_id: order?.order_id,user_id: this.user_id}).subscribe((data:any)=>{
if (isPlatformBrowser(this.platformId)) {
 
    console.log(data,"RRRRRRRRRRRRRRRRRRRRRRRRR")
    if (data.data[0].payment_status="SUCCESS"){
      this.paymentStatus = true;
    } else if (data.data[0].payment_status ="FAILURE"){
      this.paymentStatus_fail = false;
    } else if ((data.data[0].payment_status = "PENDING") || (data.data[0].payment_status = "NOT_ATTEMPTED")  || (data.order_status = "ACTIVE")){
      this.paymentStatus_pending = false;
    }
  }
  })
}
}
}
