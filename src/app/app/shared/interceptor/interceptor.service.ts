import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ChangeDetectorRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, finalize,catchError,map, throwError, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { LocalstorageService } from '../localStorage/localstorage.service';
import { request } from 'http'; 
import { Router } from '@angular/router';
import {AuthService} from "../auth/auth.service"
import {NotificationsService} from "../notifications/notifications.service";
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
 @Inject(DOCUMENT) private document: Document,
   private loaderService: LoaderService,
    private localStorage: LocalstorageService, 
    private router: Router,
    private loginService: AuthService,
    private notification: NotificationsService,
    @Inject(PLATFORM_ID) private platformid: Object,
   
  ) { }
  intercept(
    req: HttpRequest<any>,
    next:HttpHandler 
  ): Observable<HttpEvent<any>>|any{
  //   if(req.headers){
     
  //     let token = req.headers.get("Authorization");
  //     console.log(req.headers, "INTERCEPTOR HEADERS NEW",token);
  //     if(token){
  //       console.log(token,"INTERCEPTOR HEADERS NEW TOKEN");
  //       // let splittoken = token.split(" ");
  //       // let newtoken = splittoken[1];
  //       // this.localStorage.setItem('token',JSON.stringify(newtoken));
  //     }else{
  //       console.log("INTERCEPTOR HEADERS NEW TOKEN NOT FOUND");
  //     }
  //   }
    this.loaderService.open();
    if(req.url.includes('login')){
      return next.handle(req.clone({
        setHeaders:{
          'Access-Control-Allow-Origin': '*'
        }
      })).pipe(
        
        finalize(()=>{
        this.loaderService.close();
      }));
    }
    let jwt: any;
    if (isPlatformBrowser(this.platformid)){
     const token_jwt = this.localStorage.getItem('token') || "";
      // const token: any = JSON.stringify(token_jwt);
      // jwt = JSON.parse(token);
      jwt=token_jwt;
    }
   
  
    // console.log(token,"<<==================INTERCEPTOR TOKEN is --------------->",('Bearer '+ jwt));
    const authReq = req.clone({
      // setHeaders: {
      //   Authorization: `Bearer ${JSON.parse(jwt)}`
      // }
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + jwt
      )
    });
    const corsHeader: HttpRequest<any> = authReq.clone({
      setHeaders: {
        'Access-Control-Allow-Origin': '*'
      }
    });

    return next.handle(corsHeader)
      .pipe(
      
        map((event:HttpEvent<any>)=>{
          if(event instanceof HttpResponse){
             const headers = event.headers.keys();
            console.log(event, "KKKKKKKKKKKKKKKKK", headers.includes('authorization'));
            if (headers.includes('authorization')) {
              const token: any = event.headers.get('authorization');
              console.log('parsed, Token:', token.split(" "));
              // Use the token for subsequent requests or store it in local storage
             
              const split = token.split(" ");
              if(isPlatformBrowser(this.platformid)){
                this.localStorage.setItem('token', split[1]);
              }
              
            }
           console.log(event,"JJJJJJJJJJJJJJJJJ");
            if(event.status==200){

              this.notification.showAlert(event?.body?.message);
            } else if (event.status ==205) {
              this.notification.showAlert(event?.body?.message);
            } else if(event.status==422){
              this.notification.showAlert(event?.body?.message);
            }else{
              this.notification.showAlert(event?.body?.message);
            }
          }
          return event;
        }),
        finalize(() => {
          this.loaderService.close();
        }),
        catchError(async (err:HttpResponse<any>)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status==401 ){
              console.log(err,"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
              this.loginService.tokencheck().subscribe((data:any)=>{
                console.log(data,"INTERCEPTOR 401 STATUS RSPONSE FROM NODE IS")
              });
              this.notification.showAlert(err?.body?.message);
            }
           
          }
           return throwError(err?.body?.message);
        })
      )
      ;
  }
}
