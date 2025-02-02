import { Component, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrl: './privacypolicy.component.scss'
})
export class PrivacypolicyComponent {
  constructor(
    private renderer: Renderer2,
    // public dialogRef: MatDialogRef<PrivacypolicyComponent>,
  ){

  }
  return(url: string) {
    const newTab = this.renderer.createElement('a');
    this.renderer.setAttribute(newTab, 'href', url);
    this.renderer.setAttribute(newTab, 'target', '_self');
    newTab.click();
  }
}
