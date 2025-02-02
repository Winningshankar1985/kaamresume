import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SamplepopupComponent } from './samplepopup/samplepopup.component';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.scss'
})
export class SamplesComponent implements OnInit{

constructor(
  private dialog: MatDialog,
){

}

ngOnInit(): void {
    
}
chosenTheme(theme:string){
    this.dialog.open(SamplepopupComponent, {
      data: {
        theme: theme
      },
      panelClass: 'samples-popup-dialog-container'
    });
}

}
