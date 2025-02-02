import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nodeUrl } from 'src/environments/environment';
import { urlToHttpOptions } from 'url';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { addUpdateProfile, getprofile } from '../serverclientdatastate/transferkeys';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
 private http: HttpserviceService
  ) { }

  getprofile(u_id:number){
    return this.http.get(getprofile,nodeUrl +'profile/getprofile/'+u_id);
  }
  addUpdateProfile(data:any){
    return this.http.post(addUpdateProfile,nodeUrl +'profile/addupdate',data);
  }
}
