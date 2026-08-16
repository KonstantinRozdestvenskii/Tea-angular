import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import {MainRoutingModule} from "../main/main-routing.module";
import {OrderComponent} from "./order.component";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    OrderRoutingModule
  ],
  exports: [
    MainRoutingModule
  ]
})
export class OrderModule { }
