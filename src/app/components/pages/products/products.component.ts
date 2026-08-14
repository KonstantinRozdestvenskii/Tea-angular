import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {Router} from "@angular/router";
import {ProductType} from "../../../types/product.type";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];
  private subscription: Subscription | null = null;
  public loading: boolean = false;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe(
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
