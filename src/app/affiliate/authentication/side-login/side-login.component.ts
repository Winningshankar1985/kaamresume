
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ], 
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  signIn: boolean=true;
  codeSent:boolean=false;
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });
 forgotPassEmail:string='';
 forgotPassCode:string='';
  missingForgotEmailMsg: string='';
  showMissingArg: boolean=false;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { 
    this.activeRoute.queryParams.subscribe((params:any)=>{
      this.missingForgotEmailMsg = params['email'] ? '' : 'Email is Not Set Resend Email'
      if(params['codesent']==="true"){
       
        this.codeSent = true;
        this.signIn = false;
        if(params['email']){
          localStorage.setItem('forgotPassEmail',params['email']);
        }else{
          this.showMissingArg = true;
        }
      }
      if(params['codesent']=='resend'){
        this.codeSent = false;
        this.signIn = false;
      }
    });
  }


  get f() {
    return this.form.controls;
  }



  ngOnInit(): void {
      
  }
  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/']);
  }
  sendCode(){
    this.codeSent=true;
    this.router.navigate(['/affiliate/login?email='+this.forgotPassEmail.trim()])
  }
  verifyCode(){

  }
}
