import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SliceTextPipe} from "./pipes/slice-text.pipe";



@NgModule({
  declarations: [
    SliceTextPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SliceTextPipe
  ]
})
export class SharedModule { }
