import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import type { SwiperOptions } from 'swiper/types';
import { Observable, Subscription } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  private swiper: {
    destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
  } | null = null;

  private subscription: Subscription | null = null;
  private modalRef: NgbModalRef | null = null;

  private isPopupShow$: Observable<boolean> = new Observable<boolean>(observer => {
    const timeout = setTimeout(() => {
      observer.next(true);
    }, 10000);

    return {
      unsubscribe() {
        clearTimeout(timeout);
      }
    }
  });

  @ViewChild('popup') popup!: TemplateRef<any>;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initHeroSlider();

    this.subscription = this.isPopupShow$.subscribe({
      next: (shouldShow) => {
        if (shouldShow && this.popup) {
          // Сохраняем ссылку на открытую модалку
          this.modalRef = this.modalService.open(this.popup, {
            centered: true,
            backdrop: 'static',
            keyboard: true
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    this.subscription?.unsubscribe();

    // Закрываем модалку при уничтожении компонента
    if (this.modalRef) {
      this.modalRef.dismiss('Component destroyed');
      this.modalRef = null;
    }
  }

  private initHeroSlider(): void {
    const sliderElement: HTMLElement | null =
      document.querySelector('.hero-slider');

    if (!sliderElement) return;

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
      fadeEffect: { crossFade: true },
      autoHeight: true,
      navigation: {
        nextEl: '.hero-arrow--next',
        prevEl: '.hero-arrow--prev'
      }
    };

    this.swiper = new Swiper(sliderElement, config);
  }
}
