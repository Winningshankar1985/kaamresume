import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildcomponentRoutingModule } from './childcomponent-routing.module';
import { InputComponent } from './input/input.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    InputComponent,
    TextEditorComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ChildcomponentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule
  ],
  exports: [
    InputComponent,
    TextEditorComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class ChildcomponentModule { }
