import { Component, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-me',

  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

  constructor(
   private router: Router,
    private renderer: Renderer2
  ){

  }
back(url:string){
  const newTab = this.renderer.createElement('a');
  this.renderer.setAttribute(newTab, 'href', url);
  this.renderer.setAttribute(newTab, 'target', '_self');
  newTab.click();
}
}
