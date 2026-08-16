import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./views/main/main.component";
import {ProductsComponent} from "./views/products/products/products.component";
import {ProductComponent} from "./views/products/product/product.component";
import {OrderComponent} from "./views/order/order.component";
import {LayoutComponent} from "./views/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./views/main/main.module').then((m) => m.MainModule)},
      {path: 'order', loadChildren: () => import('./views/order/order.module').then((m) => m.OrderModule)},
      {path: 'products', loadChildren: () => import('./views/products/products.module').then((m) => m.ProductsModule)}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
