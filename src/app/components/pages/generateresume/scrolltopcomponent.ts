import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";

@Component({
selector:`app-temp`,    
    template: `
    <div class="">
     <mat-card>
        <mat-card-header>
            <mat-card-title>Alert</mat-card-title>
            <!-- <mat-card-subtitle>subtitle</mat-card-subtitle> -->
        </mat-card-header>
        <mat-card-content>
       You have to select if you are a fresher or an Experienced candidate at the top of the page.
        </mat-card-content>
        <mat-card-actions>
            <button mat-raised-button color="primary" matDialogClose>Ok</button>
        </mat-card-actions>
     </mat-card>   
    </div>
    `
})

export class scrolltopcomponent implements OnInit{
    
    constructor(
 @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
) {
        
    }
    ngOnInit(): void {
        
    }
}