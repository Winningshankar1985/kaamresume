import { DatePipe, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneratorService } from 'src/app/shared/generator/generator.service';
import { scrolltopcomponent } from './scrolltopcomponent';
import { resumesService } from 'src/app/shared/resume/resume.service';
import { Observable, catchError } from 'rxjs';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { ArrayserviceService } from 'src/app/shared/arrayservice/arrayservice.service';

import JSZip from 'jszip';
import { AnyNaptrRecord } from 'dns';
import { DomSanitizer } from '@angular/platform-browser';
// import { API_response } from './tempresp';
// https://stackblitz.com/edit/angular-form-from-json?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.component.html
//https://developer.adobe.com/developer-console/docs/guides/plugins/
//https://www.zoho.com/writer/help/api/v1/get-list-of-templates.html
@Component({
  selector: 'app-generateresume',
  templateUrl: './generateresume.component.html',
  styleUrls: ['./generateresume.component.scss']
})
export class GenerateresumeComponent implements OnInit {
  jsonResumeFormat: any;
  @ViewChild('pdfViewer', { static: true })
  pdfViewer!: ElementRef;
 


  resumeBuilderForm: FormGroup = this.fb.group({
    myskills: ['', Validators.required],
    fullname: ['', Validators.required],
    mydesiredposition: ['', Validators.required],
    totalExperience: [''],
    currentindustry: [''],
    desiredindustry: [''],
    dob: ['', Validators.required],
    work: this.fb.array([

    ]),
    email:['', Validators.required],
    phone: ['', Validators.required],
    volunteer: this.fb.array([]),
    publications: this.fb.array([]),
    photo:[''],
    location: this.fb.group({
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      countryCode: ['', Validators.required],
      region: ['', Validators.required]
    }),
    profiles: this.fb.array([]),
    languages: this.fb.array([]),
    fresher: [false],
    experienced: [false],
    education: this.fb.array([]),
    strengthandweakness: ['', Validators.required],
    personalinterest: [''],
    hobbies: [''],
    extracurricular_activity: [''],
    awardsandhonors: [''],
    projectwork: this.fb.array([]),
    references: this.fb.array([]),
  });
  questionBuilderForm1!: FormGroup;
  questionArr!: any;
  formvalues: any;
  questionsloop!: any;
  theme!: string;

  AIQuestions!: any;
  resumeAIResponse!: any;
  base64textString!: string;
  imagePath: any;
  experienced: boolean=false;
  fresher: boolean=false;
  indexOfPresent: number=-1;
  present: boolean = true;
  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private fb: FormBuilder,
    private datepipe: DatePipe,
    private resumeGen: GeneratorService,
    private router: Router,
    public dialog: MatDialog,
    private resumeserv: resumesService,
    private localStorage: LocalstorageService,
    private arrayserv: ArrayserviceService,
    private _sanitizer: DomSanitizer,
  ) {
    if (isPlatformBrowser(this.platformId)) {
    if (this.experienced) {
      this.resumeBuilderForm.get('totalExperience')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('totalExperience')?.updateValueAndValidity();
      this.resumeBuilderForm.get('currentindustry')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('currentindustry')?.updateValueAndValidity();
      this.resumeBuilderForm.get('desiredindustry')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('desiredindustry')?.updateValueAndValidity();
    }
    if (this.fresher) {

      this.resumeBuilderForm.get('strengthandweakness')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('strengthandweakness')?.updateValueAndValidity();
      this.resumeBuilderForm.get('personalinterest')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('personalinterest')?.updateValueAndValidity();
      this.resumeBuilderForm.get('hobbies')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('hobbies')?.updateValueAndValidity();
      this.resumeBuilderForm.get('extracurricular_activity')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('extracurricular_activity')?.updateValueAndValidity();
      this.resumeBuilderForm.get('awardsandhonors')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('awardsandhonors')?.updateValueAndValidity();
      this.resumeBuilderForm.get('projectwork')?.addValidators([Validators.required]);
      this.resumeBuilderForm.get('projectwork')?.updateValueAndValidity();
    }
    //  const pdfbuffer = JSON.parse(JSON.stringify(this.localStorage.getItem('AIjsonResponse')));
    //  this.handlePDFBuffer(pdfbuffer);
  }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.presentCompanyInExperience(0,{});


    }


  }
    toggleexp(){
      this.experienced=true;
      this.fresher=false;
    }
  togglefresher() {
    this.fresher=true;
    this.experienced=false;
  }
  experience(): FormArray {
    
    return this.resumeBuilderForm.get('work') as FormArray;
    
  }
  newExperience() {
    
    return this.fb.group({
      companyname: ['', Validators.required],
      positionname: ['', Validators.required],
      summary: ['', Validators.required],
      fromDate: ['', Validators.required],
      isCurrent:[true],
      website: ['', Validators.required],
      highlights: ['', Validators.required]
    });
    
  }
  addExperience() {
    if (isPlatformBrowser(this.platformId)) {
    this.experience().push(this.newExperience());
  }
  }
  deleteExperience(i: number) {
    if (isPlatformBrowser(this.platformId)) {
    this.experience().removeAt(i);
    }
  }
  presentCompanyInExperience(index:number,event:any={}){
    
    this.indexOfPresent = event?.checked?-1:index;
    const experience = this.experience().at(index) as FormGroup;
    if(!event?.checked){
     
      if (!experience?.contains('toDate')) {
        experience?.addControl('toDate', this.fb.control('', Validators.required));
      }
      }else{
      experience?.removeControl('toDate');
      
    }

  }
  checkTruthy(present:number,index:number){
    const check = present==index?true:false;
    
    return check;
  }
  nextStepper(stepper: any) {
    if (isPlatformBrowser(this.platformId)) {
    /*call the gptgenerator api and then populate it in the next stepper
     and when pressed continue it should again call this method and the same api only
     
     */
    if (!this.fresher && !this.experienced) {
      this.dialog.open(scrolltopcomponent);
    }
    this.resumeBuilderForm.markAllAsTouched();
    if (this.resumeBuilderForm.valid) {
      let prompt:string; 
      
      `
//      Based on the user responses from the Angular reactive form here ${JSON.stringify(this.resumeBuilderForm?.value)}, generate a set of targeted questions to gather additional information about the user's background, skills, and desired job position. These questions should be designed to elicit detailed and emotionally engaging responses. Ensure the questions address both freshers and experienced professionals appropriately. Present the questions as an array object like this plainly without any extra keys:

// [
//   { "question": "Can you provide details about your total work experience?" },
//   { "question": "Do you have any specific industry preferences for your desired position?" }
//   // Add more questions as needed
// ]

// Insert the user responses from the Angular form at relevant points in the questionnaire to provide context and personalize the questions. I, ChatGPT, will not include any conversations in my response.

//       `;
      if (this.resumeBuilderForm.get('experienced')?.value) {
        prompt = `I am a ${this.resumeBuilderForm.get('mydesiredposition')?.value} with ${this.resumeBuilderForm.get('totalExperience')?.value} years of experience in ${this.resumeBuilderForm.get('currentindustry')?.value}. I am looking for a position in ${this.resumeBuilderForm.get('desiredindustry')?.value} where I can use my skills and experience to make a positive impact.I have a strong track record of success in ${this.resumeBuilderForm.get('myskills')?.value} . In my role at these following companies i achieved the following results (since i'm getting this information from angular reactive form i'll pass it as a reactive form value kindly use it) ${JSON.stringify(this.resumeBuilderForm.get('experience')?.value)}. And i have a good educational record (which is again in angular reactive format that i want you to take in to consideration while building my resume) ${JSON.stringify(this.resumeBuilderForm.get('education')?.value)}
 I am a highly motivated and results-oriented individual with a strong work ethic. I am also a team player and I am always willing to go the extra mile.Please ask me the any 10-20 questions that'll help you identify my needs in a json array like this format,[{question: 'your 1st question to understand my needs'},{question: 'your 2nd question to understand my needs'},...,{question: 'your nth question to understand my needs'}], that can be split in the frontend and shown to the customer, and do not include any conversations or questions or to explain yourself  in your response as i have to seperate the questions and show it to my customers in angular reactive form and your questions or conversations make it hard to do it for me in the frontend so don't include anything other than the questions in your response. thanks for understanding`;
      } else {
        prompt = `You are a creative assistant tasked with creating a professional resume for a fresher. You have been provided with the following information from the user's Angular reactive form response:
        my skills and experiences: ${this.resumeBuilderForm.get('myskills')?.value}
        the desired position i'm looking for: ${this.resumeBuilderForm.get('mydesiredposition')?.value}
        my dob: ${this.resumeBuilderForm.get('dob')?.value}
        my education background: ${this.resumeBuilderForm.get('education')?.value}
        strength and weakness: ${this.resumeBuilderForm.get('strengthandwekness')?.value}
        personal interests: ${this.resumeBuilderForm.get('personalinterest')?.value}
        hobbies: ${this.resumeBuilderForm.get('hobbies')?.value}
        extracurricular activities: ${this.resumeBuilderForm.get('extracurricular_activity')?.value}
        awards and honors: ${this.resumeBuilderForm.get('awardsandhonors')?.value}
       
        and here is the whole response ${JSON.stringify(this.resumeBuilderForm.value)}
        
        Your task is to compare this information with the JSON resume format similar to the one provided below and remove any html characters from my response before adding it in your json resume format response. If any information is missing, please ask the user for clarification. 
        ${JSON.stringify(this.jsonResumeFormat)}
          
        Additionally, provide a list of questions in a JSON array format to ask the user for any missing information. For example:
        
        [
            { "question": "Can you provide details about your total work experience?" },
            { "question": "Do you have any specific industry preferences for your desired position?" },
            // Add more questions as needed
        ]
        
       ensure that list of questions is in doublequotes and don't include any conversations or jsonresume response format yet but only the questions in your response so that it can be splitted and shown as questions in the angular frontend for the customer to give you the answers.
        `;
      }

      
      this.localStorage.setItem('resumeform', JSON.stringify(this.resumeBuilderForm.value));
      console.log(this.resumeBuilderForm.value, "contents of form in resume module");
      this.resumeGen.openAiGenerates(prompt, this.resumeBuilderForm.value).subscribe((data: any) => {
        if (isPlatformBrowser(this.platformId)) {
        console.log(data, "9999999999999999999999",data.response.choices[0].message.content);
          let inputStr = data.response.choices[0].message.content;
          let cleanedStr:any;
          if (inputStr.includes('```Json')){
          cleanedStr= inputStr.replace(/```Json|```/g, '');
          }else if(inputStr.includes('```json')){
          cleanedStr = inputStr.replace(/```json|```/g, '');
          }else if(inputStr.includes('```JSON')){
          cleanedStr = inputStr.replace(/```JSON|```/g, '');
          }else{
            cleanedStr = inputStr;
          }
          
        
          
          
      this.AIQuestions = JSON.parse(cleanedStr);
          let questions = this.localStorage.setItem('AIQuestions', cleanedStr);
          console.log(cleanedStr, "000000000000000000000000", this.AIQuestions);
        if (this.localStorage.getItem('AIQuestions')) {
          this.AIQuestions = JSON.parse(cleanedStr);


          this.router.navigate(['/pro_area/ourquestions']);
        }
        }
      });

    } else {
      console.log(this.resumeBuilderForm.value, "contents of form in resume module");
      this.localStorage.removeItem('AIjsonResponse');
    }
    
  }
  }
  adddate(event: any, formControlName: string) {
    if (isPlatformBrowser(this.platformId)) {
    // this adds date in the main form
    let value = this.datepipe.transform(event.target.value, 'YYYY-MM-dd');
    this.resumeBuilderForm.get(formControlName)?.patchValue(value);
  }
  }
  changeDynamicDate(event: any, formControl: AbstractControl, formControlName: string) {
    if (isPlatformBrowser(this.platformId)) {
    //this adds date in to the dynamic form
    let value = this.datepipe.transform(event.target.value, 'YYYY-MM-dd');
    formControl.get(formControlName)?.patchValue(value);
    // console.log(formControl.get(formControlName)?.value,"HHHHHHHHHHHHHHHH")
  }
  }
 education():FormArray {
 
   return this.resumeBuilderForm.get('education') as FormArray;
}

  addEducation() {
    if (isPlatformBrowser(this.platformId)) {
    this.education().push(this.newEducation());
  }
}
  newEducation() {
    // if (isPlatformBrowser(this.platformId)) {
    return this.fb.group({
      institutionname: ['', Validators.required],
      certificationname: ['', Validators.required],
      institutionplace: ['', Validators.required],
      educationstartDate: ['', Validators.required],
      educationendDate: ['', Validators.required],
      studyType: ['', Validators.required],
      gpa: ['', Validators.required],
      courses: ['', Validators.required]
    });
  // }
  // return;
}
  deleteEducation(i: number) {
    if (isPlatformBrowser(this.platformId)) {
    this.education().removeAt(i);
  }
  }

  project(): FormArray {
    if (isPlatformBrowser(this.platformId)) {
    return this.resumeBuilderForm.get('projectwork') as FormArray;
  }
    return this.resumeBuilderForm.get('projectwork') as FormArray;
}
  addproject() {
 if (isPlatformBrowser(this.platformId)) {
    this.project().push(this.newproject());
  }
}
  newproject() {
 if (isPlatformBrowser(this.platformId)) {
    return this.fb.group({
      companyname: ['', Validators.required],
      titlename: ['', Validators.required],
      companyplace: ['', Validators.required],
      projectstartDate: ['', Validators.required],
      projectendDate: ['', Validators.required],
      findings: ['', Validators.required],
      suggestions: ['', Validators.required],
      
    });
  }
    return this.fb.group({
      companyname: ['', Validators.required],
      titlename: ['', Validators.required],
      companyplace: ['', Validators.required],
      projectstartDate: ['', Validators.required],
      projectendDate: ['', Validators.required],
      findings: ['', Validators.required],
      suggestions: ['', Validators.required],

    });
}
  deleteproject(i: number) {
    if (isPlatformBrowser(this.platformId)) {
    this.project().removeAt(i);
  }
}


  odd(i: number) {
     if (isPlatformBrowser(this.platformId)) {
    let isodd = (i % 2) === 0;
    return isodd;

}
return;
  }
  chosenTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
    this.localStorage.setItem('chosentheme', theme);
    this.theme = JSON.parse(JSON.stringify(this.localStorage.getItem('chosentheme')));
  }
}
  language(): FormArray {
    return this.resumeBuilderForm.get('languages') as FormArray;
  }
  newLanguage() {
 
    return this.fb.group({
      lang: ['', Validators.required],
      fluency: ['', Validators.required],
    });
 
}
  addLanguage() {
 
    this.language().push(this.newLanguage());
 
}
  deleteLanguage(i: number) {
    this.language().removeAt(i);
  }
  profile(): FormArray {
    return this.resumeBuilderForm.get('profiles') as FormArray;
  }
  newprofile() {

    return this.fb.group({
      network: ['', Validators.required],
      username: ['', Validators.required],
      url: ['', Validators.required],
    });
  }
  addprofile() {

    this.profile().push(this.newprofile());
  }
  deleteprofile(i: number) {
    this.profile().removeAt(i);
  }
  publications(): FormArray {
    return this.resumeBuilderForm.get('publications') as FormArray;
  }
  newpublications() {

    return this.fb.group({

      name: ['', Validators.required],
      publisher: [''],
      releaseDate: ['', Validators.required],
      website: [''],
      summary: ['', Validators.required],
    });
  }
  addpublications() {
 if (isPlatformBrowser(this.platformId)) {
    this.publications().push(this.newpublications());
  }
}
  deletepublications(i: number) {
    this.publications().removeAt(i);
  }

  volunteer(): FormArray {
    return this.resumeBuilderForm.get('volunteer') as FormArray;
  }
  newvolunteer() {

    return this.fb.group({

      // name: ['', Validators.required],
      organization: ['', Validators.required],
      position: ['', Validators.required],
      website: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      summary: ['', Validators.required],
      highlights: [
        ''
      ]
    });
  }
  addvolunteer() {
 if (isPlatformBrowser(this.platformId)) {
    this.volunteer().push(this.newvolunteer());
  }
}
  deletevolunteer(i: number) {
    this.volunteer().removeAt(i);
  }
  handleFileSelect(evt:any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt:any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.base64textString);
    console.log(btoa(binaryString));
    if (this.base64textString){
      this.localStorage.setItem('candidate_photo', JSON.stringify(this.base64textString));
    }
    
  //   this.resumeBuilderForm?.patchValue({
  //     photo: this.base64textString,
  // })
  }

  references(): FormArray {

    return this.resumeBuilderForm.get('references') as FormArray;

  }
  newreferences() {

    return this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],

    });

  }
  addReference() {
    if (isPlatformBrowser(this.platformId)) {
      this.references().push(this.newreferences());
    }
  }
  deleteReference(i: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.references().removeAt(i);
    }
  }
}
