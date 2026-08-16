import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import {MainComponent} from "./main.component";
import {NgbAccordionModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    NgbAccordionModule,
    MainRoutingModule
  ],
  exports: [
    MainRoutingModule
  ]
})
export class MainModule { }
