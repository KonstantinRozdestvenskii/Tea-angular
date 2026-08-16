import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from "../../../shared/services/product.service";
import { Router } from "@angular/router";
import { ProductType } from "../../../types/product.type";
import { Subscription } from "rxjs";
import { SearchService } from "../../../shared/services/search.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: ProductType[] = [];
  private subscription: Subscription | null = null;
  public loading: boolean = false;
  public pageTitle: string = 'Наши чайные коллекции';
  public searchQuery: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    // При инициализации загружаем все товары (по умолчанию поиск пустой)
    this.loadProducts();

    // Подписываемся на hot observable — будем получать только будущие события
    this.subscription = this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    this.loading = true;
    this.products = [];

    if (this.searchQuery) {
      this.pageTitle = `Результаты поиска по запросу «${this.searchQuery}»`;
    } else {
      this.pageTitle = 'Наши чайные коллекции';
    }

    this.productService.getProducts(this.searchQuery)
      .subscribe({
        next: (data) => {
          this.products = data;
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
