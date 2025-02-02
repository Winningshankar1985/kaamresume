import { Injectable, StateKey } from '@angular/core';
import { DatastateService } from '../serverclientdatastate/datastate.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor( 
     private dataserv: DatastateService,
    private http: HttpClient,

  ) { }

get(key:StateKey<void>, url:string,options:any={}){
return this.dataserv.checkAndGetData(key, this.http.get(url),options,[]);
}
post(key:StateKey<void>,url:string,body:any={},headers:any={}){
  return this.dataserv.checkAndGetData(key, this.http.post(url,body,headers), []);
}
put(key: StateKey<void>, url:string, body:any={}){
  return this.dataserv.checkAndGetData(key, this.http.put<any>(url,body),[])
}
patch(key:StateKey<void>,url:string,body:any={},options:any={}){
  return this.dataserv.checkAndGetData(key, this.http.patch<any>(url, body, options), []);
}
delete(key: StateKey<void>, url: string, body: any = {}) {
    return this.dataserv.checkAndGetData(key, this.http.delete(url, body), []);
}

}
