import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JsonEditorModule } from 'ng2-json-editor/ng2-json-editor';

import {AceEditorDirective, AceEditorComponent} from 'ng2-ace-editor';

@NgModule({
  declarations: [
    AppComponent,
    AceEditorDirective,
    AceEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
