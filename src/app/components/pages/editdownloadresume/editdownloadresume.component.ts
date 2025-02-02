import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { resumesService } from '../../../shared/resume/resume.service';
import { LocalstorageService } from '../../../shared/localStorage/localstorage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
@Component({
    selector: 'app-editdownloadresume',
  
    templateUrl: './editdownloadresume.component.html',
    styleUrl: './editdownloadresume.component.scss',
   
})
export class EditdownloadresumeComponent implements OnInit{
  resumeAIResponse!: any;
  data2edit!: any;
  editresumeform: FormGroup = this.fb.group({
    resume: ['',Validators.required],
  })
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private resumeServ: resumesService,
    private localStorage: LocalstorageService,
    private fb: FormBuilder
  ) { 
    const localdata: any = JSON.stringify(this.localStorage.getItem('AIjsonResponse'));
    this.resumeAIResponse = JSON.parse(JSON.parse(localdata));
  }

  ngOnInit(): void {
    this.loadResume();
  }
  loadResume(){
  
    this.resumeServ.loadresume().subscribe((data:any)=>{
      const localdata: any = this.localStorage.getItem('resumerendereddata');
      const resumegendata = JSON.parse(localdata);
      const date = resumegendata?.created_at;
      console.log(date, "date is", resumegendata);
      
      this.data2edit = JSON.parse(JSON.stringify(resumegendata?.output));
      
      data?.data?.filter((x:any)=>{
        if (x.created_at==date){
          return x;
        }else{
          return null;
        }
        
      });
      console.log("DATA FROM RESUME  RENDER IS", JSON.parse(JSON.stringify(resumegendata?.output)))
      this.editresumeform.patchValue({
        resume: JSON.stringify(JSON.parse(JSON.stringify(resumegendata?.output)))
      })
    })
  }
  // this.showpdf = true;


  download() {
    const pdfBuffer = JSON.parse(JSON.parse(JSON.stringify(this.localStorage.getItem('AIjsonResponse'))));
    const unit8Array = new Uint8Array(pdfBuffer.resume.data);
    console.log(pdfBuffer, "gggggggggggggggggggggggg");
    // Create a Blob from the PDF buffer
    const blob = new Blob([unit8Array], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.pdf';
    // link.textContent = 'Download PDF';
    link.click();
    // Append the download link to the document body or any other desired element
    // document.body.appendChild(link);
  }
  json_resume: any = { "basics": { "name": "gowri shankar", "label": "Angular Developer", "email": "", "phone": "", "summary": "Passionate Angular Developer with expertise in a variety of technologies including Angular, HTML, CSS, and more. Strong problem-solving skills and a dedicated work ethic. Experienced in UI/UX design and always eager to learn and adapt to new technologies.", "location": { "address": "no 4, 18th main, BTM 1st stage,", "postalCode": "560029", "city": "Bangalore", "countryCode": "India", "region": "Karnataka" }, "profiles": [{ "network": "Linkedin", "url": "www.linkedin.com/in/gsshanker3" }] }, "work": [], "volunteer": [{ "organization": "IIT-G", "position": "UI/UX helper", "website": "www.iit-g.ac.in", "startDate": "2022-06-07", "endDate": "2022-11-16", "summary": "Helped with UI related work and participated in UX brainstorming sessions.", "highlights": "UI related work in figma, UX notes taking during brainstorming sessions" }], "education": [{ "institution": "Indian Institute of Technology - Guwahati", "area": "EICT IIT-G Advanced Certification in UI UX", "studyType": "I studied UI/UX concepts and was the best in my class.", "startDate": "2022-05-09", "endDate": "2022-12-22", "gpa": "A+", "courses": "UI/UX, Figma" }, { "institution": "Maharajah Arts and Science College", "area": "M.BA", "studyType": "Scored 72% in finals", "startDate": "2010-05-10", "endDate": "2013-06-19", "gpa": "72%", "courses": "HR, Marketing, Org Development, Operations Research" }], "skills": [{ "name": "Template: Skills and Experience", "keywords": ["Content Writing", "SEO (Search Engine Optimisation)", "SEM (Search Engine Marketing)", "SMO (Social Media Optimisation)", "SMM (Social Media Marketing)", "PHP", "MYSQL", "jQuery", "Well versed in CENTOS and Ubuntu Terminal commands", "HTML", "CSS", "Angular", "Angular Material", "Bootstrap"] }], "languages": [{ "language": "Tamil", "fluency": "Native" }, { "language": "English", "fluency": "Business Level" }], "interests": { "personal": ["Gardening", "Books"], "hobbies": ["Gardening", "Cooking"], "extracurricular_activity": ["Boxing", "Biking"] }, "awards": ["Won 1st prize in cricket", "Won 2nd prize in GK"], "projects": [{ "name": "Entomophagy", "company": "Self", "location": "Madurai - self", "startDate": "2010-07-14", "endDate": "2011-11-16", "findings": "blah!blah!blah!blah!blah!blah!blah!blah!blah!blah!blah!blah!blah!blah!", "suggestions": "blah!" }], "strengths": { "list": ["Adaptability: I have a strong ability to adapt to new technologies, tools, and environments. In the rapidly evolving field of web development, this adaptability allows me to stay current with the latest trends and integrate new techniques into my work efficiently. Whether it’s learning a new framework, working with a new team, or tackling unfamiliar challenges, I’m quick to adjust and find the best way forward.", "Problem-Solving Skills: I excel at breaking down complex problems into manageable parts and finding effective solutions. My background in web development, particularly with Angular, has honed my analytical skills and my ability to troubleshoot issues methodically. I approach challenges with a calm and logical mindset, often turning obstacles into opportunities for innovation.", "Strong Work Ethic: I am known for my dedication and persistence. I take pride in delivering high-quality work and am willing to put in the extra effort to meet deadlines and exceed expectations. This strong work ethic is reflected in my ability to manage multiple projects simultaneously and maintain a high standard of performance across all tasks.", "Interpersonal Skills: My ability to communicate effectively and collaborate with others is one of my key strengths. I work well in team settings, where I can leverage the diverse strengths of my colleagues to achieve common goals. I’m also good at building positive relationships, both within and outside the workplace, which helps create a productive and supportive work environment."] }, "weaknesses": { "list": ["Perfectionism: One of my weaknesses is a tendency towards perfectionism. While this can lead to high-quality work, it can also sometimes cause delays as I may spend too much time refining details that others might consider “good enough.” I’ve been working on balancing my attention to detail with the need for efficiency, learning to prioritize tasks and recognize when a project is ready to move forward.", "Reluctance to Delegate: I sometimes find it challenging to delegate tasks because I’m very hands-on and prefer to ensure that things are done a certain way. This can lead to an increased workload and can slow down project progress. I’m actively working on improving my delegation skills by trusting my team members’ abilities and providing clear instructions, which allows me to focus on higher-level tasks and strategy.", "Taking on Too Much: My eagerness to contribute and take on new challenges can sometimes lead me to overcommit. This can stretch me thin and impact my ability to focus deeply on individual tasks. I’m learning to manage this by setting clearer boundaries, prioritizing my workload, and being more strategic in the projects I choose to undertake."] }, "objectives": { "fresher": "A highly motivated and talented fresher with a strong proficiency in Angular, HTML, CSS, and various other technologies. Eager to utilize skills in a dynamic work environment and contribute to innovative projects.", "experienced": "An experienced Angular Developer with a proven track record in Angular, problem-solving, and a strong work ethic. Looking to leverage expertise in web development to drive growth in a challenging and rewarding role." } } 
}
