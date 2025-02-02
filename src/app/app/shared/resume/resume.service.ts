import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nodeUrl, resumeApi } from 'src/environments/environment';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { generatePDF, loadresume, renderResume } from '../serverclientdatastate/transferkeys';

@Injectable({
  providedIn: 'root'
})
export class resumesService {

  constructor(
private http: HttpserviceService
) {}

renderResume(data:any){
  return this.http.post(renderResume,resumeApi+'/render',data);
}
loadresume(){
  return this.http.get(loadresume,nodeUrl + 'history/resume', { responseType: 'text' });
}
generatePDF(data:any={}){
  return this.http.post(generatePDF,nodeUrl + "history/resume/download",data);
}


}


