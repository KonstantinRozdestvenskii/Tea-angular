// Глобальные типы для библиотек, подключённых через angular.json (scripts)

declare const Swiper: new (
  selector: string | HTMLElement,
  options?: any
) => {
  destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;
};

