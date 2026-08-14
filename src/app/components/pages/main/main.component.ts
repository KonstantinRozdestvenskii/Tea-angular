import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private swiper: {
    destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
  } | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initHeroSlider();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
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
