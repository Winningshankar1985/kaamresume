import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { baseUrl, nodeUrl, nodeUrl0 } from 'src/environments/environment';
import { LocalstorageService } from '../localStorage/localstorage.service';
import { Observable, Subject } from 'rxjs';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { authCheck, registerlogin, tokencheck } from '../serverclientdatastate/transferkeys';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged:boolean=false;
  initiate=new Subject();
  loggedIn: Observable<any> = this.initiate.asObservable()
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private http: HttpserviceService,
    private localStorage: LocalstorageService
  ) { }
  logging(enter:boolean){
    this.initiate.next(enter);
    this.loggedIn.subscribe((bool:any)=>{
      console.log(bool,"jjjjjjjjjjjjjjjjjjj")
      this.isLogged=bool;
    })
    this.localStorage.setItem('activate', JSON.stringify(enter));
  }
  isLoggedin(){
    const loggedIn:any = JSON.parse(this.localStorage.getItem('activate')??'')
    return loggedIn;
  }
  registerlogin(details: any) {
    return this.http.post(registerlogin,nodeUrl0 + "registerlogin", details);
  }
  authCheck(data: any) {
    return this.http.post(authCheck,nodeUrl0 + 'resume/authcheck', data[0]);
  }
  tokencheck(data:any={}){
    let token:any;
    let data1:any;
    if (isPlatformBrowser(this.platformId)) {
    token = JSON.parse(this.localStorage.getItem('token')??'');
    let data1 = JSON.parse(this.localStorage.getItem('logindetails')??'');
   
      }
    return this.http.post(tokencheck, nodeUrl + 'resume/tokencheck', { token: `Bearer ${token}`, data: data ? data[0] : data1 });

      }
}
