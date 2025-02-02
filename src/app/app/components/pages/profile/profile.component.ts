import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextEditorComponent } from 'src/app/childComponents/childcomponent/text-editor/text-editor.component';
import { LocalstorageService } from 'src/app/shared/localStorage/localstorage.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { ProfileService } from 'src/app/shared/profile/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  profileForm!: FormGroup;
  photourl: string="";
  profilebio: string="";
  userdetails!: any;

  constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,

    private fb: FormBuilder,
    private profileServ: ProfileService,
    private localstorage: LocalstorageService,
    private notify: NotificationsService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
    this.profileForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.email],
      bio: ['', Validators.required],
    })
    const storage:any = this.localstorage.getItem('logindetails')
    this.userdetails = JSON.parse(storage);
    
    this.photourl = this.userdetails.photourl;
  }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.getprofile();
  }
}
  getprofile(){
    const u_id = this.userdetails?.u_id;
    this.profileServ.getprofile(u_id).subscribe((res:any)=>{
      if (isPlatformBrowser(this.platformId)) {
      console.log(res?.data);
      this.profileForm.patchValue({
        fullname: res?.data?.profile.name ? res?.data?.profile.name: this.userdetails?.fname+" "+this.userdetails.lname,
        email: res?.data?.profile.email ? res?.data?.profile.email:this.userdetails?.email,
      
      })
      this.profilebio = res?.data?.profile.Bio;
    }
    })
  }
  submit(){
    console.log(this.profileForm.value);
    this.profileServ.addUpdateProfile({form_values:this.profileForm.value,u_id: this.userdetails?.u_id}).subscribe((res:any)=>{
      if (isPlatformBrowser(this.platformId)) {
      console.log(res);
      
      
      }
    })
  }
}

