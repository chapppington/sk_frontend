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
    title: "Офис компании",
    phone: "+7 (3852) 53-99-33",
    phoneRaw: "+73852539933",
    email: "info@sibkomplekt.ru",
  },
  {
    title: "Отдел продаж",
    phone: "+7 (800) 600-39-89",
    phoneRaw: "+78006003989",
    email: "sales@sibkomplekt.ru",
  },
  {
    title: "Сервисная служба",
    phone: "+7 (800) 700-26-91",
    phoneRaw: "+78007002691",
    email: "servise@sibkomplekt.ru",
  },
  {
    title: "Отдел снабжения",
    phone: "",
    phoneRaw: "",
    email: "snab@sibkomplekt.ru",
  },
];

export const companyAddress: string =
  "Россия, 656922, Алтайский край, г. Барнаул, ул. Попова, 248Е";
