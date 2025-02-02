import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ArrayserviceService {

  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
private fb: FormBuilder) { }

  formValues(questions:any){
    let form:any={};
  let qanda:any = [];
  let form1:any={};
  let values:any={};
  let valuesans:any={};
  let loop:any = [];
  const formvalues:any = questions.map((q:any,i:number)=>{
  let ques = 'question'+i;
  let a = 'answer'+i;
  //   form = {
  //     [ques]: new FormControl (q.question,Validators.required),
  //     [a]: new FormControl('',Validators.required)
  //  }
  // form={
    ques= q.question;
    
  // }
  // form1 ={
    let ans= new FormControl('',Validators.required)
    console.log(ques,"lllllllllllllll",a)
  // }
  //  values={[ques],[a]};
  //  valuesans = {...form1};
  loop.push(ques,ans);
  return loop[0][0]
  })

  return loop;

  }
  form(formarr:FormArray,values:any){
    let w:any=[];
    let a:any=[];
  let q1={}
  let q2={};
  let formval = values.filter((q:any,i:any)=>{

  const ques = `question${i}`;
  const ans = `answer${i}`;
  const odd = (i%2)===0;
  // console.log(odd,i,"qqqqqqqqqqqqqqqqqqqqqqqqqq",values[i])
 let ques1;
 let ans1;
  if(odd){
    ques1=values[i] 
    i = ques;
    q=ques1;
  }else{
   ans1 =values[i]
   i=ans;
   q=ans1;
  }
  q1={
    // 'qkey': `question${i}`,
    // 'akey': `answer${i}`,
    [ques]: ques1,
     
  };
 q2={
  [ans]:ans1
 }
 console.log(odd,i,"qqqqqqqqqqqqqqqqqqqqqqqqqq",values[i])
    w.push(q);
    return q;
  })
  console.log(formval,"22222222222222222222",w)
    formarr.push(this.fb.group(formval));
    return formarr;
  }
}
