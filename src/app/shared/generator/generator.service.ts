import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { baseUrl, nodeUrl } from 'src/environments/environment';
import { LocalstorageService } from '../localStorage/localstorage.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpserviceService } from '../httpservice/httpservice.service';
import { openAiGenerates } from '../serverclientdatastate/transferkeys';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  header = new HttpHeaders()
    .set('Authorization', 'Bearer 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');
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private http: HttpserviceService,
    private localStorage: LocalstorageService
  ) { }

  openAiGenerates(prompt: string, form_values: any = []) {
    let form_val:any 
    let prompt0:any;
    if (isPlatformBrowser(this.platformId)) {
    form_val = JSON.parse(this.localStorage.getItem('resumeform') ?? '');
    prompt0= {
      "prompt": prompt,
      "form_values": JSON.stringify(form_values.length!=0?form_values:form_val),
    
    };
  }
    return this.http.post(openAiGenerates,nodeUrl + "history/resume/generate", prompt0, { headers: this.header });
  }

}
