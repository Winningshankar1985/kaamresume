import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LocalstorageService } from '../localStorage/localstorage.service';
import { nodeUrl } from 'src/environments/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { getpaymentdetails, resumehistory } from '../serverclientdatastate/transferkeys';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private http: HttpserviceService,
    private localStorage: LocalstorageService,
  ) { }

getpaymentdetails(){
  let storage: any;
  let userID:any;
  if (isPlatformBrowser(this.platformId)) {
  storage = this.localStorage.getItem('logindetails');
  userID = JSON.parse(storage).u_id; 
  }
  return this.http.post(getpaymentdetails,nodeUrl + "details/getpayments", {user_id: userID});
}
resumehistory(){
  return this.http.get(resumehistory,nodeUrl +'history/resume');
}

}
