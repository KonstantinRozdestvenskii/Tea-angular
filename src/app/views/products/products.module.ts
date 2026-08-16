import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";
import {ProductCardComponent} from "./product-card/product-card.component";
import {SharedModule} from "../../shared/shared.module";
import {ProductService} from "../../shared/services/product.service";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ],
  exports: [
    ProductsRoutingModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
