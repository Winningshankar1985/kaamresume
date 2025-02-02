import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { catchError } from 'rxjs';
import { LocalstorageService } from '../../../shared/localStorage/localstorage.service';
import { PaymentsService } from '../../../shared/payments/payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, AfterViewInit{
  customers_email!:string;
  cardHandler = this.onChange.bind(this);
  stripe: any;
  card: any;
  @ViewChild('cardInfo', { static: true }) cardInfo!: ElementRef;
  @ViewChild('addressInfo', { static: true }) addressInfo!: ElementRef;
  error: any;
  paymentForm: FormGroup =this.fb.group({
    price:[0],
    storedCard: [""],
    customer_email: ["", Validators.required],
    customerId: [""],
    
  });
  client_secret!: any;
  address!: any;
  name!: any;
  cards_list!: any;
  addhidecards: boolean=false;
  cardText: string = 'Add a New Card';
  hidemethods: boolean=true;
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private cd: ChangeDetectorRef,
    private stripeserv: AngularStripeService,
    private fb: FormBuilder,
    private payService: PaymentsService,
    private router: Router,
    private localstorage: LocalstorageService
  ) {

    if (this.paymentForm.get('value')?.value == 0) {
      this.hidemethods = false;
    } else {
      this.hidemethods = true;
    }
   }
  
  ngOnInit(): void {
    // this.payService.getclientsecret().subscribe((data: any) => {
    //   if (isPlatformBrowser(this.platformId)) {
    //   console.log(data, "NNNNNNNNNNNNNNNN");
    //   this.client_secret = data.clientSecret;
    //   }
    // });
    // this.getstoredcarddetails();
  }
  ngAfterViewInit(): void {
//     if (isPlatformBrowser(this.platformId)) {
//     this.stripeserv.setPublishableKey('pk_test_51OODACSIlX5eKJquLWNoSPyZvKHBwoL6J5Cg4v7w6bNCBWofCiAZeFOHIWpqsnHPnRrkKWzZbNEQjiUH3h1Mg10000KYFkmFhP').then(
//      async (stripe:any) => {
//         this.stripe = stripe;
//         const appearance = { /* appearance */ };// secret-key: rk_test_51OODACSIlX5eKJquEYxM3wlN3gUvVAuzfZSnpkYowmKu34kjvl7WtcKhmKbUZP5p3PEgMe5qAYNUQM6tdRRJILck00U2CttvRH
//         const options = {
//           mode: 'shipping',
//           amount: 1,
//           currency: 'inr',
//           payment_method_types: ['card'],
//           billing_details: {
//             name: 'John Doe', // Replace with the customer's name
//             address: {
//               line1: '123 Main Street', // Replace with the customer's address
//               city: 'Mumbai',
//               state: 'Maharashtra',
//               postal_code: '400001',
//               country: 'IN'
//             }
//           }
// };

//         // Initialize elements
//         const elements = this.stripe.elements({ clientSecret: this.client_secret });

//         // Create address element
//         const addressElement = elements.create('address', { mode: 'shipping' }); // Same mode as  element
//         addressElement.mount(this.addressInfo.nativeElement);
//         console.log(this.addressInfo.nativeElement,"GGGGGGGGGGGG",addressElement);
//         addressElement.on('change', (event:any)=>{
//           console.log(event,"JJJJJJJJJJJJJ");
//           this.address = event.value.address;
//           this.name = event.value.name;
//         })
//         // Create payment element
//         this.card = elements.create('card', {
//           ...options, // Your existing options
//           billing_details: {
//             address: this.address,// Reference previously created address element
//             name: this.name
//           }
//         });
//         this.card.mount(this.cardInfo.nativeElement);
//         this.card.addEventListener('change', this.cardHandler);
       
  
        
      
//     });
//   }
  }
  onChange({ error }:any) {
    if (isPlatformBrowser(this.platformId)) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  }
  async onSubmit(form: any) {
  //   if (isPlatformBrowser(this.platformId)) {
  //   // throw new Error('Method not implemented.');
  //   console.log(form, "KKKKKKKKKKKKKKKKKKK", parseInt(this.paymentForm.get('price')?.value));
  //   let amount = parseInt(this.paymentForm.get('price')?.value);
  //   await this.stripe.createPaymentMethod({
  //     type: 'card',
  //     card: this.card,
  //     billing_details: {
  //       address: this.address,// Reference previously created address element
  //       name: this.name
  //     }
  //   }).then((source:any)=>{
  //     console.log(source,"UUUUUUUUUUUUUUUUUUU");
      
  //    const url = window.location.href;
  //     const data = {
  //       payment_method: {
  //         type: 'card',
  //         card: source.paymentMethod.card
  //       },
  //       amount: amount,
  //       returnUrl: url,
  //       name: this.name,
  //       address: this.address,
  //       token: source,
  //       customer_email: this.paymentForm.get("customer_email")?.value
  //     };
  //     this.paymentIntent(data);
  //   }
  //   )
  // }
  }
 async paymentReq(secret:string){
  //  if (isPlatformBrowser(this.platformId)) {
  //  await this.stripe.confirmCardPayment(secret, {
  //    payment_method: {
  //      card: this.card
  //    },
  //    return_url: window.location.href,
  //  }
  //   )
  //   .then((res:any)=>{
  //     console.log(res,"result to confirm payment");
  //     this.payService.confirmPayment(res).subscribe((data:any)=>{
  //       if(data.success){
  //         alert("success");
  //         this.router.navigate([this.router.url]);
  //       }else{
  //         alert("couldn't confirm payment");
  //       }
  //     })
  //   },
  //   catchError(async (err:any)=>{
  //     console.log(err,"HHHHHHHHHHHHHHHH")
  //   })
    
  //   )
  // }
}

  paymentIntent(data:any){
    // this.payService.paymentIntents(data).subscribe((data:any)=>{
    //   if (isPlatformBrowser(this.platformId)) {
    //   console.log(data,"JJJJJJJJJJJJJJJJJJ11111111111");
     
    //   const { client_secret, status, id } = data.data;

    //   if (status =="requires_payment_method"){
    //     console.log(data, "JJJJJJJJJJJJJJJJJJ");
        
    //     this.paymentReq(client_secret);
    //   }
    // }
    // });
  }
  getstoredcarddetails(){
    // if (isPlatformBrowser(this.platformId)) {
    // let data:any = this.localstorage.getItem("logindetails");
    // let logindetails = JSON.parse(data);
    // let {u_id} = logindetails;
    // this.payService.getstoredcarddetails(u_id).subscribe((data:any)=>{
    //   if (isPlatformBrowser(this.platformId)) {
    //   this.cards_list = data.data;
    //   }
    // })
    // }
  }

  addhidecard(text: string) {
    if (isPlatformBrowser(this.platformId)) {
    if (text === 'Add a New Card') {
      this.cardText = 'Use An Existing Card';
      this.addhidecards = true;
    } else {
      this.cardText = 'Add a New Card';
      this.addhidecards = false;
    }
  }
  }
  storedVars(pm:string,ci:string){
    if (isPlatformBrowser(this.platformId)) {
    this.paymentForm.patchValue({
      customerId: ci,
     
    
    })
  }
  }
handlepayment(){
//   if (isPlatformBrowser(this.platformId)) {
//  let data={
//   customerId: this.paymentForm.get("customerId")?.value,
//   amount: this.paymentForm.get("price")?.value,
//    paymentMethodId: this.paymentForm.get("storedCard")?.value,
//    return_url: window.location.href,
//  };
 
//   this.payService.paywithstoredcard(data).subscribe((data)=>{
//     if (isPlatformBrowser(this.platformId)) {
//     console.log(data,"DATA CHARGE IS AS FOLLOWS AAAAAAAAAAAAAAAA");
//     }
//   })
// }
}

  }


