import { CommonModule, DOCUMENT, isPlatformBrowser, isPlatformServer, NgOptimizedImage } from '@angular/common'
import { afterRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { ChildcomponentModule } from '../../../childComponents/childcomponent/childcomponent.module'

@Component({
  selector: 'app-resumeatschecker',
  standalone: true,
  imports: [ChildcomponentModule, CommonModule, NgOptimizedImage,NgbAccordionModule, ],
  templateUrl: './resumeatschecker.component.html',
  styleUrl: './resumeatschecker.component.scss'
})
export class ResumeatscheckerComponent implements OnInit{
  // <li>▶ & nbsp
  FAQ: any = [{
    question:`What is the best ATS resume checker free online service?`,
    answer: `<p>We recommend using KAAMRESUME’s resume scanner free of charge to optimize your resume for the job you want. 
Our ATS - friendly resume checker is an excellent choice for ensuring your resume is customized and error - free.  </p>`
},
{
  question: `How can I tell if my resume is ATS compliant ?`,
  answer:`<p>Running your resume through an ATS - compliant resume checker is the best way to determine whether it meets the tracking system requirements.  </p>
    <p> Whether you upload an existing resume or build a new one from scratch, our  resume ATS scanner will help you improve your resume’s performance, ensuring it is optimized for ATS screening and hiring managers in your field.</p>`
},
{
  question: `What is a good ATS score for a resume ?`,
  answer: `<p>A good score on an ATS resume scan is 80 % or higher.This score will typically move your resume to a recruiter, who will review it and decide whether or not to contact you for an interview.</p>
    <p> You’ll need to craft an error - free and keyword - optimized resume highlighting your relevant skills and experience to make the cut.Run your resume through an ATS score checker to receive additional suggestions for improvement.</p>`
},
{
  question:`How can I check my resume score for free ?`,
  answer:`<p>just upload your resume and wait till you get a response </p>`
},
{
  question:`Which resume file format is best to use for ATS ?`,
  answer:`<p>ATS software will accept PDF, if they use layout, fonts and content optimized for parsing.Use easy - to - read fonts for your resume, such as Times New Roman, Arial or Helvetica.</p>
    <p> Your resume format should be clear and straightforward.Avoid overly complicated graphics, tables or design elements that might confuse the ATS and the recruiter who reads your resume. </p>
      <p> Using a resume checker online is a great way to test your resume format for ATS compliance. </p>`
}]
constructor(
  @Inject(DOCUMENT) private document: Document,
  @Inject(PLATFORM_ID) private platformId: Object,
  private metaTagService: Meta,
  private router: Router,
  private titleServ: Title,
) { 
  afterRender(() => {
   
  });
}

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)  || isPlatformServer(this.platformId)) {

      this.titleServ.setTitle("WE ARE THE BEST FREE RESUME ATS CHECKER AMONG TOP FREE RESUME CHECKERS");
      this.metaTagService.addTag({ name: "keywords", content: "resume ats, resume ats scanner, resume checker, ats checker, resume ai, resume score checker, free ats checker, free resume checker" });
      this.metaTagService.addTag({ name: "description", content: "If you are wondering what is the best resume ATS scanner among top resume ai builders then you are looking at kaamresume the best free resume checker in the whole web among other top resume score checkers. " });
      this.metaTagService.addTag({ name: "robots", content: "index, follow" });
      this.metaTagService.addTag({ name: "author", content: "Gowri Shankar D" });
      this.metaTagService.addTag({ name: "viewport", content: "width=device-width, initial-scale=1" });
      this.metaTagService.addTag({ name: "date", content: "2024-09-01", scheme: "YYYY-MM-DD" });
      this.metaTagService.addTag({ charset: "UTF-8" });

    } 
  }
  redirect(url:string){
    this.router.navigate([url]);
  }

}
