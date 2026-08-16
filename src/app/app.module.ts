import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { MainComponent } from './views/main/main.component';
import { ProductsComponent } from './views/products/products/products.component';
import { ProductComponent } from './views/products/product/product.component';
import { OrderComponent } from './views/order/order.component';
import { ProductCardComponent } from './views/products/product-card/product-card.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./shared/services/product.service";
import { SliceTextPipe } from './shared/pipes/slice-text.pipe';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './views/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCollapseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
