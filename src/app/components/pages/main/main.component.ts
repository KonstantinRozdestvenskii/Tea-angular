import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import type { SwiperOptions } from 'swiper/types';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private swiper: {
    destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
  } | null = null;

  constructor() {
    this.isPopupShow$ = new Observable<boolean>(observer => {
      const timeout = setTimeout(() => {
        observer.next(true);
      }, 10000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    })
  }

  public isPopupShow: boolean = false;
  private isPopupShow$: Observable<boolean>;

  closePopup() {
    this.isPopupShow = false;
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {

    this.subscription = this.isPopupShow$.subscribe({
      next: (param) => {
        this.isPopupShow = param;
      }
    })

  }

  ngAfterViewInit(): void {
    this.initHeroSlider();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    this.subscription?.unsubscribe()
  }


  // ===== Слайдер =====
  private initHeroSlider(): void {
    const sliderElement: HTMLElement | null =
      document.querySelector('.hero-slider');

    if (!sliderElement) {
      return;
    }

    if (typeof Swiper === 'undefined') {
      console.error(
        'Swiper JS не загружен. Проверь подключение swiper-bundle.min.js в angular.json'
      );
      return;
    }

    const config: SwiperOptions = {
      slidesPerView: 1,
      loop: true,
      speed: 500,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      autoHeight: true,
      navigation: {
        nextEl: '.hero-arrow--next',
        prevEl: '.hero-arrow--prev'
      }
    };

    this.swiper = new Swiper(sliderElement, config);
  }


}
