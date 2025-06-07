import { ContactBlock, NavigationItem } from "./types";
import { PagesConfig } from "@/config/pages.config";

export const mobileNavigationItems: NavigationItem[] = [
  { name: "Каталог", link: PagesConfig.catalog },
  { name: "О компании", link: PagesConfig.about },
  { name: "О производстве", link: PagesConfig.production },
  { name: "Новости", link: PagesConfig.news },
  { name: "Сертификаты", link: PagesConfig.certificates },
  { name: "Вакансии", link: PagesConfig.vacancies },
  { name: "Контакты", link: PagesConfig.contacts },
];

export const desktopNavigationItems: NavigationItem[] = [
  { name: "О компании", link: PagesConfig.about },
  { name: "Сертификаты", link: PagesConfig.certificates },
  { name: "Вакансии", link: PagesConfig.vacancies },
  { name: "Контакты", link: PagesConfig.contacts },
];

export const contactBlocks: ContactBlock[] = [
  {
    title: "Отдел продаж",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
  {
    title: "Офис компании",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
  {
    title: "Конструкторский отдел",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
  {
    title: "Сервисная служба",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
];

export const companyAddress: string = "ул. Арбат, 26, Москва";
