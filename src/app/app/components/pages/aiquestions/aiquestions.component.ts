import { DatePipe, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArrayserviceService } from 'src/app/shared/arrayservice/arrayservice.service';
import { GeneratorService } from 'src/app/shared/generator/generator.service';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { resumesService } from 'src/app/shared/resume/resume.service';
import { PaymentsService } from 'src/app/shared/payments/payments.service';
import { catchError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-aiquestions',
  templateUrl: './aiquestions.component.html',
  styleUrls: ['./aiquestions.component.scss']
})
export class AiquestionsComponent implements OnInit, AfterViewInit {
  @ViewChild('pdfViewer', { static: true })
  pdfViewer!: ElementRef;
  questionBuilderForm1!: FormGroup;
  questionArr!: any;
  formvalues: any;
  questionsloop!: any;
  theme: string = JSON.stringify(this.localStorage.getItem('chosentheme'));
  resumevalues: any = this.localStorage.getItem('resumeform');
  resumeBuilderForm: any = JSON.parse(this.resumevalues);
  AIQuestions!: any;
  resumeAIResponse!: any;
  jsonResumeFormat!: any;
  showpdf: boolean = false;
  databuffer: any;
  Message: string="";
  resumebase64:any="";
  MessageSuccess:string="";
  window: (Window & typeof globalThis) | any;
  constructor(


    private fb: FormBuilder,
    private datepipe: DatePipe,
    private resumeGen: GeneratorService,
    private router: Router,
    public dialog: MatDialog,
    private resumeserv: resumesService,
    private localStorage: LocalstorageService,
    private arrayserv: ArrayserviceService,
    private payServ: PaymentsService,
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
    const localdata: any = JSON.stringify(this.localStorage.getItem('AIresumeResponse'));
    this.resumeAIResponse = JSON.parse(JSON.parse(localdata));
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.newQuestions1();
      this.window = this.document.defaultView?.window;
    if (this.jsonResumeFormat) {
     
    }
  }

  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {

    }
  
  }

  newQuestions1() {
    if (isPlatformBrowser(this.platformId)) {
    let q: any = this.localStorage.getItem('AIQuestions');
      
      this.questionsloop = JSON.parse(q);
  
    console.log(this.questionsloop, "questions loop");
    const controls: any = {};
    this.questionsloop?.filter((elem: any, i: number) => {
      console.log(elem, "llllllllllllllllllll");
      controls[i] = ['', Validators.required];
    });
    this.questionBuilderForm1 = this.fb.group(controls);
  }
  }
  resume() {
    if (isPlatformBrowser(this.platformId)) {
      const response: any = this.localStorage.getItem('AIjsonresumeformat');
     
     
      this.jsonResumeFormat = JSON.parse(response);
      let q = this.jsonResumeFormat.response.choices[0].message.content;
     q = q.replace(/```json|```/g, '');
      q = q.replace(/```Json|```/g, '');
      q = q.replace(/```JSON|```/g, '');
      this.Message = this.verifyJson(q);
      let resumeData = JSON.parse(q);
      let candidate_photo:any = JSON.parse(this.localStorage.getItem('candidate_photo')||'');
      if(candidate_photo){
        resumeData.basics.image = candidate_photo;
      }
      
    console.log(resumeData, "8888888888888888888888888", this.theme);
    this.resumeserv.renderResume({ resumeData: resumeData , theme: this.theme }).subscribe((data: any) => {
      if (isPlatformBrowser(this.platformId)) {
      const data1: any = this.localStorage.setItem('AIjsonResponse', JSON.stringify(data));
      // const localdata:any = this.localStorage.getItem('AIjsonResponse') ;
      // this.resumeAIResponse= JSON.parse(localdata); 
      const localdata: any = this.localStorage.getItem('AIjsonResponse');
      const resumeAIResponse = JSON.parse(localdata);
      console.log(data, "resume render is ddddddddddddddddddddd", this.resumeAIResponse);
      
      if (data.success) {
        this.downloadResume({ html: data?.resume , created_at: JSON.stringify(resumeAIResponse?.data?.created_at)})
      }
    }
 }
);
    }
  }
  verifyJson(input:any) {
    try {
      JSON.parse(input);
    } catch (ex) {
      return `Sorry, something went wrong, <strong>Please redo the Questionnare.</strong>`; // Is invalid 
    }
    return `<strong>You'll be able to download your resume shortly</strong>`; // Is valid 
  }
reload(){
  if (isPlatformBrowser(this.platformId)) {
  history.back();
  }
}
downloadResume(data:any){
  if (isPlatformBrowser(this.platformId)) {
  
  this.resumeserv.generatePDF(data).subscribe((data:any)=>{
    if (isPlatformBrowser(this.platformId)) {
    console.log(data,"data", data?.data?.pdfbuffer);
    // this.localStorage.setItem('AIresumeResponse', JSON.stringify({resume:{data: data?.data}}))
    this.showpdf = true; 
      this.databuffer = data?.data.pdfbuffer.data;
      // this.download(this.databuffer);
      // this.loadresume(this.databuffer);
      this.gototop();
    }
  })
}
}



  download(databuffer:any={}) {
    if (isPlatformBrowser(this.platformId)) {
      
    // let data:any = this.localStorage.getItem('AIresumeResponse')
    let parsed: any = databuffer;
    console.log(parsed, "BUFFERVVVVVVVVVVVVVVV")
    // const buffer = JSON.parse(parsed.resume.data.pdfbuffer.data);
    
    // const base64String = Base64.encode(parsed.resume.data);

    // const textEncoder = new TextEncoder('utf-8');
    // const encoded = textEncoder.encode(Base64.decode(base64String)); // Encode string to ArrayBuffer
      const unit8Array = new Uint8Array(parsed);
    console.log(parsed,"encoded",unit8Array)
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
    this.MessageSuccess= `<strong>You can Download your resume in history page again after clicking the download button.</strong>`;
    link.click();
      this.usagedownloadcount();
    }
  }

  nextStepper1() {
    if (isPlatformBrowser(this.platformId)) {
      console.log(this.questionBuilderForm1.value,"QUESTION AND ANSWERS");
    // this.questionBuilderForm1.markAllAsTouched();
    // if (this.questionBuilderForm1.valid) {
      const prompt1: string = `You are a creative assistant tasked with creating a professional resume. You have been provided with the following information from the user's Angular reactive form response received previously,
      along with the responses to your questions but before that here is a quick recap of what happened, my customer initially gave the following response through angular reactive forms like this ${JSON.stringify(this.resumeBuilderForm)}
      to which you asked the following questions ${JSON.stringify(this.questionsloop)} and now my customer has answered with the following answers through a reactive form value as response taken from my website like this ${JSON.stringify(this.questionBuilderForm1.value)}
      now your task is to generate a json response in json resume format to which i give you a sample of a validated resume json format here ${this.jsonreumeformatsampla} for reference.

      And please include a objective for the candidate in your resume for both freshers and experienced. Note i haven't given such sections in my angular form for the candidate to write it so you have to write it in a creative and professional manner.

      If you are writing a resume for the fresher then use your creative side to write an about myself section in the resume that'll highlight the candidates proficiency in skills in at least a sentence. As it looks plain for a fresher resume without these things note if json resume format is not supportive of such sections then you have to put it inside a key that'll iterate them in the front page of the resume.

      Now you should create the jsonresume format response and remove any html characters from my response before adding it in your json resume format response. so i could loop it in my frontend and show it to my customer. And please don't include any conversations, extra characters outside json or any special characters other than double quotes like ${JSON.stringify("```")} or ${JSON.stringify("Json")} or ${JSON.stringify("```Json")}  or be explanatory in the response as i have to show it to my customers and it should be utf-8 compliant.
      `;
    //   const prompt1: string = `
    // After receiving user responses here ${JSON.stringify(this.resumeBuilderForm)}, and the user's answers with generated questions here ${JSON.stringify(this.questionBuilderForm1.value)}, I, ChatGPT, have to analyze the responses and rewrite them into an emotionally motivated JSONResume key-value pair format. Emphasize the user's strengths in a positive and professional manner, while disguising weaknesses as potential strengths.  And please include a objective for the candidate in your resume for both freshers and experienced. Note i haven't given such sections in my angular form for the candidate to write it so you have to write it on your own. Use a prideful and professional tone throughout the resume. Provide a sample JSONResume format here: [${this.jsonreumeformatsampla}]. I, ChatGPT, will not include any conversations or any extra parameters outside the jsonresume response and my transformed jsonResume response accuracy of user provided data will be 100% accurate.

    //   `; 
      this.resumeGen.openAiGenerates(prompt1).subscribe((data: any) => {
        if (isPlatformBrowser(this.platformId)) {
          if (data.response){

         
        const generatedresume: any = this.localStorage.setItem('AIjsonresumeformat', JSON.stringify(data));
        const response: any = this.localStorage.getItem('AIjsonresumeformat');
        this.jsonResumeFormat = JSON.parse(response);
        this.theme = JSON.parse(JSON.stringify(this.localStorage.getItem('chosentheme')));
        this.newQuestions1();
        if(this.jsonResumeFormat){
          this.resume();
        }
        
        }
        }
      });
    // }
  }
  }
  usagedownloadcount(){
    if (isPlatformBrowser(this.platformId)) {
    let user_id:any = JSON.parse(JSON.parse(JSON.stringify(this.localStorage.getItem('logindetails'))))
    console.log(user_id,"BBBBBBBBBBBBBBBBBBBBBBBBBBB");
    let data = {
      user_id: user_id?.u_id
    };
    this.payServ.usagedownloadcount(data).subscribe((data:any)=>{
      if (isPlatformBrowser(this.platformId)) {
        if(data.success){
          this.router.navigate(['/pro_area/dashboard']);
        }
        
      console.log(data,"AAAAAAAAAAAAAAAAAA");
}
    })
    }
  }

  gototop() {
    if (isPlatformBrowser(this.platformId)) {
      this.window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }

  loadresume(data: any): any {
    if (isPlatformBrowser(this.platformId)) {
  
      const unit8Array = new Uint8Array(data);
      console.log(data, "encoded", unit8Array);
      // **Create a Blob from the Uint8Array**
      const blob = new Blob([unit8Array], { type: 'application/pdf' });

      // Create a URL for the Blob
      this.resumebase64 = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    }
    
  }
  // jsonreumeformatsampla: any = {
  //   "basics": {
  //     "name": "Your first and last name",
  //     "label": "",
  //     "picture": "",
  //     "email": "Your email address",
  //     "phone": "A phone number, with any formatting you like. E.g. (555) 555-5555.",
  //     "degree": "",
  //     "website": "Your website URL",
  //     "summary": "A one-sentence to one-paragraph overview text. Do not include any line-breaks.",
  //     "location": {
  //       "address": "Your street address or mailing address",
  //       "postalCode": "Your postal code (ZIP in the U.S.)",
  //       "city": "Your city",
  //       "countryCode": "Your country (e.g. USA)",
  //       "region": "Your region (state in the U.S.)"
  //     },
  //     "profiles": [
  //       {
  //         "network": "A social media or other profile that you would like to include (e.g. LinkedIn, Twitter)",
  //         "username": "Your username on this network",
  //         "url": "A URL to your user profile page"
  //       }
  //     ]
  //   },
  //   "work": [
  //     {
  //       "company": "Your employer name",
  //       "position": "Your job title",
  //       "website": "The URL for the employer's website",
  //       "startDate": "Your start date, in YYYY-MM-DD format",
  //       "endDate": "Your end date, in YYY-MM-DD format (leave blank for a current position)",
  //       "summary": "A one-sentence to one-paragraph summary of this employer or position",
  //       "highlights": [
  //         "Bullet-point list items that you would like to include along with (or instead of) a summary paragraph."
  //       ]
  //     }
  //   ],
  //   "volunteer": [
  //     {
  //       "organization": "Your volunteer organization name",
  //       "position": "Your job title",
  //       "website": "The URL for the employer's website",
  //       "startDate": "Your start date, in YYYY-MM-DD format",
  //       "endDate": "Your end date, in YYY-MM-DD format (leave blank for a current position)",
  //       "summary": "A one-sentence to one-paragraph summary of this employer or position",
  //       "highlights": [
  //         "Bullet-point list items that you would like to include along with (or instead of) a summary paragraph."
  //       ]
  //     }
  //   ],
  //   "education": [
  //     {
  //       "institution": "Your school name",
  //       "area": "Your area of study or degree earned",
  //       "studyType": "",
  //       "startDate": "Your start date, in YYYY-MM-DD format",
  //       "endDate": "Your completion date, in YYYY-MM-DD format",
  //       "gpa": "",
  //       "courses": [
  //         ""
  //       ]
  //     }
  //   ],
  //   "awards": [
  //     {
  //       "title": "Your award title",
  //       "date": "Your date, in YYYY-MM-DD format you received the award",
  //       "awarder": "Your award given by",
  //       "summary": "A one-sentence to one-paragraph overview of this award"
  //     }
  //   ],
  //   "publications": [
  //     {
  //       "name": "Your publication title",
  //       "publisher": "Publisher name",
  //       "releaseDate": "Publication date, in YYYY-MM-DD format",
  //       "website": "The website URL for this publisher or book",
  //       "summary": "A one-sentence to one-paragraph overview of this publication"
  //     }
  //   ],
  //   "skills": [
  //     {
  //       "name": "A category of job skills (e.g. 'Programming Languages')",
  //       "level": "",
  //       "keywords": [
  //         "Keywords under this category (e.g. 'Java', 'C++', etc)"
  //       ]
  //     }
  //   ],
  //   "languages": [
  //     {
  //       "language": "Language name",
  //       "fluency": "Your language fluency"
  //     }
  //   ],
  //   "interests": [
  //     {
  //       "name": "A category of interests (e.g. 'Sports')",
  //       "keywords": [
  //         "Keywords under this category (e.g. 'Cricket', 'Football', 'Golf')"
  //       ]
  //     }
  //   ]
  // };
  jsonreumeformatsampla: any = {
    "basics": {
      "name": "John Doe",
      "label": "Programmer",
      "image": "",
      "email": "john@gmail.com",
      "phone": "(912) 555-4321",
      "url": "https://johndoe.com",
      "summary": "A summary of John Doe…",
      "location": {
        "address": "2712 Broadway St",
        "postalCode": "CA 94115",
        "city": "San Francisco",
        "countryCode": "US",
        "region": "California"
      },
      "profiles": [{
        "network": "Twitter",
        "username": "john",
        "url": "https://twitter.com/john"
      }]
    },
    "work": [{
      "name": "Company",
      "position": "President",
      "url": "https://company.com",
      "startDate": "2013-01-01",
      "endDate": "2014-01-01",
      "summary": "Description…",
      "highlights": [
        "Started the company"
      ]
    }],
    "volunteer": [{
      "organization": "Organization",
      "position": "Volunteer",
      "url": "https://organization.com/",
      "startDate": "2012-01-01",
      "endDate": "2013-01-01",
      "summary": "Description…",
      "highlights": [
        "Awarded 'Volunteer of the Month'"
      ]
    }],
    "education": [{
      "institution": "University",
      "url": "https://institution.com/",
      "area": "Software Development",
      "studyType": "Bachelor",
      "startDate": "2011-01-01",
      "endDate": "2013-01-01",
      "score": "4.0",
      "courses": [
        "DB1101 - Basic SQL"
      ]
    }],
    "awards": [{
      "title": "Award",
      "date": "2014-11-01",
      "awarder": "Company",
      "summary": "There is no spoon."
    }],
    "certificates": [{
      "name": "Certificate",
      "date": "2021-11-07",
      "issuer": "Company",
      "url": "https://certificate.com"
    }],
    "publications": [{
      "name": "Publication",
      "publisher": "Company",
      "releaseDate": "2014-10-01",
      "url": "https://publication.com",
      "summary": "Description…"
    }],
    "skills": [{
      "name": "Web Development",
      "level": "Master",
      "keywords": [
        "HTML",
        "CSS",
        "JavaScript"
      ]
    }],
    "languages": [{
      "language": "English",
      "fluency": "Native speaker"
    }],
    "interests": [{
      "name": "Wildlife",
      "keywords": [
        "Ferrets",
        "Unicorns"
      ]
    }],
    "references": [{
      "name": "Jane Doe",
      "reference": "Reference…"
    }],
    "projects": [{
      "name": "Project",
      "startDate": "2019-01-01",
      "endDate": "2021-01-01",
      "description": "Description...",
      "highlights": [
        "Won award at AIHacks 2016"
      ],
      "url": "https://project.com/"
    }]
  };
}