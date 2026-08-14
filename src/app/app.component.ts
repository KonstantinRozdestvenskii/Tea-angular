import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import type { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Tea';

  private swiper: {
    destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
  } | null = null;

  ngAfterViewInit(): void {
    this.initHeroSlider();
    this.initOrderForm();
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }

    const formButton = document.getElementById('form-btn');
    if (formButton) {
      formButton.removeEventListener('click', this.onFormButtonClick);
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

  // ===== Форма заказа =====
  private initOrderForm(): void {
    const formButton: HTMLElement | null = document.getElementById('form-btn');
    const formSection: HTMLElement | null = document.getElementById('form');

    if (!formButton || !formSection) {
      return;
    }

    formButton.addEventListener('click', this.onFormButtonClick);
  }

  // Стрелочная функция, чтобы не терять this при передаче в addEventListener
  private onFormButtonClick = (event: Event): void => {
    event.preventDefault();

    const name = document.getElementById('name') as HTMLInputElement | null;
    const surname = document.getElementById('surname') as HTMLInputElement | null;
    const phone = document.getElementById('phone') as HTMLInputElement | null;
    const country = document.getElementById('country') as HTMLInputElement | null;
    const index = document.getElementById('index') as HTMLInputElement | null;
    const addres = document.getElementById('addres') as HTMLInputElement | null;
    const formSection = document.getElementById('form');

    if (!name || !surname || !phone || !country || !index || !addres || !formSection) {
      console.error('Не найдены некоторые элементы формы.');
      return;
    }

    if (!name.value.trim()) {
      alert('Введите имя!');
      name.focus();
      return;
    }

    if (!surname.value.trim()) {
      alert('Введите фамилию!');
      surname.focus();
      return;
    }

    if (!phone.value.trim()) {
      alert('Введите телефон!');
      phone.focus();
      return;
    }

    if (!country.value.trim()) {
      alert('Введите страну!');
      country.focus();
      return;
    }

    const indexValue: string = index.value.trim();

    if (!indexValue) {
      alert('Введите индекс!');
      index.focus();
      return;
    }

    if (indexValue.length !== 6) {
      alert('Индекс должен состоять из 6 символов!');
      index.focus();
      return;
    }

    if (!/^[0-9]+$/.test(indexValue)) {
      alert('Индекс должен состоять только из цифр!');
      index.focus();
      return;
    }

    if (!addres.value.trim()) {
      alert('Введите адрес!');
      addres.focus();
      return;
    }

    formSection.classList.add('d-none');
    alert('Спасибо за заказ. Мы свяжемся с вами в ближайшее время!');
  };
}
