import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { resumesService } from 'src/app/shared/resume/resume.service';


@Component({
  selector: 'app-queries-page',
  templateUrl: './queries-page.component.html',
  styleUrls: ['./queries-page.component.scss']
})
export class QueriesPageComponent implements OnInit, OnDestroy{
  resumehistory!: any;
  html: any[]=[];
  noData: boolean=true;
  window: (Window & typeof globalThis) | any;
  loadResume!: any;
  signup: any;
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private domSanitizer: DomSanitizer,
    private resumeServ: resumesService,
    private http: HttpClient,
    private localStorage: LocalstorageService,
){
    if (isPlatformBrowser(this.platformId)) {
      this.signup = this.localStorage.getItem('signup');
    }
}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadresumehistory();
  }
}
ngOnDestroy():void{
  // this.loadResume.unsubscribe();
}
loadresumehistory(){
  if (isPlatformBrowser(this.platformId) && !this.signup) {
 this.loadResume = this.resumeServ.loadresume().subscribe((data:any)=>{
    if (isPlatformBrowser(this.platformId)) {
    if(data.success){
      this.resumehistory = data.data;
      let resumedata: any[] = [];
      this.resumehistory.filter((x: any) => {
        resumedata.push(JSON.parse(x?.html));
      });
      console.log(resumedata, "resumedata");
      this.html = resumedata;
      console.log(this.html);
      this.noData = false;
    
    }else{
      this.noData = true;
    }
    // console.log(JSON.parse(data),"KKKKKKKKKKKKKKKKKK");
  }
  });
}
}

downloadresume(data: any){
  if (isPlatformBrowser(this.platformId)) {
  let parsed: any = JSON.parse(data);
  console.log(parsed, "BUFFERVVVVVVVVVVVVVVV");
  // const buffer = JSON.parse(parsed.resume.data.pdfbuffer.data);

  // const base64String = Base64.encode(parsed.resume.data);

  // const textEncoder = new TextEncoder('utf-8');
  // const encoded = textEncoder.encode(Base64.decode(base64String)); // Encode string to ArrayBuffer
  const unit8Array = new Uint8Array(parsed?.data);
  console.log(parsed?.data, "encoded", unit8Array);
  // **Create a Blob from the Uint8Array**
  const blob = new Blob([unit8Array], { type: 'application/pdf' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Open the PDF in a new tab
    window.open(url);

  // Create a download link
  const link = document.createElement('a');
  link.href = url;
  link.download = 'document.pdf';
  link.click();
  }
}

// loadresume(data:any):any{
//   if (isPlatformBrowser(this.platformId)) {
//   // let TYPED_ARRAY = new Uint8Array(data);
//   // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
//   //   return data + String.fromCharCode(byte);
//   // }, '');
//   // let base64String = btoa(STRING_CHAR);
//   //   return this.domSanitizer.bypassSecurityTrustResourceUrl(('data:application/pdf;base64,' + base64String));
//   let dat:any = JSON.parse(data);
//     const unit8Array = new Uint8Array(dat?.data);
//     console.log(data, "encoded", unit8Array);
//     // **Create a Blob from the Uint8Array**
//     const blob = new Blob([unit8Array], { type: 'application/pdf' });

//     // Create a URL for the Blob
//     return this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
// }
// return;
// }
} 

