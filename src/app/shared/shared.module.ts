/*
  This module was been created for the apps optimization und only one-time connection HttpClientModule
  Using this module we refuse a code duplication
*/
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { QuillModule } from 'ngx-quill'; //this module is using for representation and create post shape

@NgModule({
  imports:[
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports:[
    HttpClientModule,
    QuillModule
  ]
})
export class SharedModule{}
