import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { nodeUrl } from 'src/environments/environment';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { cashfreecreateorder, cashfreegetorderconfirmation, usagecheck, usagedownloadcount } from '../serverclientdatastate/transferkeys';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private http:HttpserviceService,
  ) { }

  // paymentIntents(data:any){
  //   return this.http.post(nodeUrl+"payments/payment-intent",data);
  // }
  // getclientsecret(){
  //   return this.http.get(nodeUrl +"payments/client-secret");
  // }
  // confirmPayment(data:any){
  //   return this.http.post(nodeUrl +"payments/confirm-payment",data);
  // }
  // getstoredcarddetails(user_id:number){
  //   return this.http.get(nodeUrl+'payments/storedcardapi/'+user_id);
  // }
  // paywithstoredcard(data:any){
  //   return this.http.post(nodeUrl + 'payments/storedcardpaymentsapi', data)
  // }
  // paywith3ds(data:any){
  //   return this.http.post(nodeUrl + 'payments/storedcardsresult', data)
  // }
  usagedownloadcount(data:any){
    return this.http.post(usagedownloadcount,nodeUrl +"history/resume/usagedownloadcount",data)
  }
  usagecheck(user_id:number){
    return this.http.get(usagecheck,nodeUrl +"history/resume/usagedownloadcheck/"+user_id)
  }

  /**=======================CASHFREE PAYMENTS STARTS ============================ */
  cashfreecreateorder(data:any){
    return this.http.post(cashfreecreateorder,nodeUrl+'cashfree/createorder/', data);
  }
// cashfree/getorderconfirmation
  cashfreegetorderconfirmation(order_id: any) {
    return this.http.post(cashfreegetorderconfirmation,nodeUrl + 'cashfree/getorderconfirmation',order_id);
  }
  /**=======================CASHFREE PAYMENTS ENDS ============================ */
}
