import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public searchQuery: string = '';
  private subscription: Subscription | null = null;
  public isMenuCollapsed: boolean = true;

  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    // Подписываемся на Subject, чтобы поле ввода обновлялось
    // при сбросе поиска из других мест приложения (hot observable)
    this.subscription = this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSearch(): void {
    // Hot Observable подход: сначала навигация (создается компонент каталога
    // и подписывается на Subject), затем эмитируем событие
    this.router.navigate(['/products']).then(() => {
      this.searchService.setSearchQuery(this.searchQuery);
    });
  }

  onReset(): void {
    this.searchQuery = '';
    this.router.navigate(['/products']).then(() => {
      this.searchService.setSearchQuery('');
    });
  }

  public collapseMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
