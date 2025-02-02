import { CommonModule, DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterRender, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ChildcomponentModule } from '../../../childComponents/childcomponent/childcomponent.module';

@Component({
  selector: 'app-resumeatschecker-faq',
  standalone: true,
  imports: [CommonModule, ChildcomponentModule,NgbAccordionModule],
  templateUrl: './resumeatschecker-faq.component.html',
  styleUrl: './resumeatschecker-faq.component.scss'
})
export class ResumeatscheckerFAQComponent implements OnInit {
  FAQ: any = [
    { question: `What does KAAMRESUME do?`,
    answer: `KAAMRESUME is here to help you get hired for the job you want.Our AI resume builder will help you concentrate on Interview preparations while we let you create a ATS friendly resume that scores high with ATS and is easily scannable by HR’s.`
},
    {
      question: `Do You Ship?`,
      answer: `No KAAMRESUME is a resume generator service we don't ship physical product's`
    },
{
  question: `What do I get with Full Access ?`,
  answer: `<p>Joining a <a class='pointer' routerLink ='/login'> Full Access plan</a> on KAAMRESUME gives you the following benefits: </p>
    <ul>
    <li>▶ &nbsp;Save, download, and print resumes in PDF.</li>
      <li>▶ &nbsp; Use our professionally designed resume templates, suitable for every industry and job.</li>
`
},
{
  question: `What is a resume template ?`,
  answer: `<p>Resume templates serve as a foundation for your resume: </p>
    <ul>
    <li>▶ &nbsp;They provide a structure and layout for your resume.</li>
      <li>▶ &nbsp; They organize your professional information with employer - ready sections.</li>
        <li>▶ &nbsp; They give your resume a polished, streamlined look.</li>`
},
{
  question: `How do I use a resume template ?`,
  answer:`<p>Once you know what type of resume template fits your needs, in our Resume Builder, pick the template you want, and click next, section by section.On our builder then save the resume and download it.</p>`
},
{
  question: `Are KAAMRESUME templates recruiter - approved ?`,
  answer:`<p>KAAMRESUME’s resume templates are designed and created by certified professional resume writers.Any template you use is "employer - ready."</p>`
},
{
  question: `What is an applicant tracking system ?`,
  answer:`<p>Employers often use software called applicant tracking systems(also known as ATS) to scan resumes and cover letters.ATS searches for keywords and phrases that match what the job needs, and grades candidates based on how well their resumes and cover letters meet these requirements.</p>`
},
{
  question:`Are your resume templates capable of passing ATS ?`,
  answer:`<p>KAAMRESUME’s templates are professionally designed with ATS software in mind.Our resume templates are easy to scan, use headers and footers correctly, and employ appropriate and readable fonts, as well as clear margins.These elements make it easy for ATS programs to accept your resume.Use our ATS resume checker to get an instant resume score and actionable feedback to improve your score.</p>`
},
{
  question: `How long should a resume be ?`,
  answer:`<p>Resumes should be two pages long, at maximum.If you can communicate your most important qualifications and experiences within one page, this gives you an advantage, as recruiters and hiring managers usually spend less than a minute reviewing your information.The one major exception to the two - page rule: a resume for a job that requires extensive work history(e.g., over 10 years of experience).</p>`
},
{
  question:`How does your Resume Builder work ?`,
  answer:`<p>KAAMRESUME’s AI Resume Builder helps you create an eye - catching resume that earns you a job interview in minutes: </p>
    <ul>
    <li>▶ &nbsp;Choose a resume template </li>
      <li>▶ &nbsp; answer a few questions, such as how many years of work experience you have.</li>
        <li>▶ &nbsp; Fill out each section of the questionnare at your own pace.</li>
          <li>▶ &nbsp; Customize your resume to fit the job you want.</li>
            <li>▶ &nbsp; Preview, proofread and edit your document.</li>
              <li>▶ &nbsp; Save and download it.</li>
                <li>▶ &nbsp; Send it to the employer.</li>`
},
{
  question:`Do I need a different resume for each job ?`,
  answer:`<p>Yes! We always recommend that you create a new resume for every job you apply to.No two jobs are exactly alike — even a position with the same job title can be very different depending on the company.Customizing your resume for every job increases your chances of passing ATS, and featuring information that 
answers each employer’s specific requirements.</p>`
},
{
  question:`How long does it take to write a resume in your builder ?`,
  answer:`<p>It takes an average of 15 minutes to write a resume using our AI Resume Builder.</p>`,
},{
question:`Should I add my photo to my resume ?`,
answer:`<p>Typically, you don’t need to add a photo, and here’s why: <p>
  <ul>
  <li>▶ &nbsp;It’s not necessary.You’re usually better off using your resume space to detail your best traits and accomplishments, rather than taking up valuable space with a photo.</li>
    <li>▶ &nbsp; It’s distracting.You want hiring managers and recruiters to focus on your relevant skills and work experience, not your photo.</li>
      <li>▶ &nbsp; It can be used to discriminate.Whether intentional or not, a hiring manager might discriminate against you based on race, gender and age.In fact, many companies reject resumes with photos instantly to avoid accusations of discrimination down the line.</li>
        <li>▶ &nbsp; It’s not ATS - friendly.ATS can have a hard time with images, and if it claims it can’t read your otherwise perfect resume correctly, it hurts your chance to get the job.</li>`
},
{ 
  question: `Should I use graphics and fancy fonts to stand out ?`,
  answer: `<p>Your resume isn’t the place to use flashy graphics and fonts.Here’s why: </p>
    <ul>
    <li>▶ &nbsp;Applicant tracking systems(ATS) can have trouble scanning resumes filled with unusual design touches.</li>
      <li>▶ &nbsp; Some hiring managers may find "over - designed" resumes too showy or unprofessional, and might suspect all the visual flash is camouflaging a lack of good qualifications.</li>
        <li>▶ &nbsp; Graphics can distract from your content: Employers are often busy reviewing multiple applications, and need to be able to read your resume quickly, so don’t throw them off with extravagant visuals.
        </li>
          <p>Our resume templates and examples are designed to have some visual flair while also being readable and organized.</p>`
},
{
  question:`How do I determine the skills to show on my resume ?`,
  answer:`<p>Always start with the job description.Go through the job’s requirements and skills needed, and take note of abilities that match your own.Then include those skills on your resume, making sure to feature both soft(intangible) and hard(technical) resume skills </p>`
},
{
  question:`How many years of experience should I show on my resume ?`,
  answer:`<p>Limit your work history to the past 10 years, but you can go beyond that if you have relevant experience.But above all, keep your work history concise.</p>`
}
];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private metaTagService: Meta,
    private titleServ: Title,
  ) { 

   
 
  
  }

  ngOnInit(): void {
         if (isPlatformBrowser(this.platformId) || isPlatformServer(this.platformId)) {

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


}
