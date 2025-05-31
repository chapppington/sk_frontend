import { ContactBlock, NavigationItem } from "./types";

export const mobileNavigationItems: NavigationItem[] = [
  { name: "Каталог", link: "/catalog" },
  { name: "Проекты", link: "/projects" },
  { name: "О компании", link: "/about" },
  { name: "О производстве", link: "/production" },
  { name: "Сертификаты", link: "/certificates" },
  { name: "Вакансии", link: "/vacancies" },
  { name: "Контакты", link: "/contacts" },
];

export const desktopNavigationItems: NavigationItem[] = [
  { name: "О компании", link: "/about" },
  { name: "Сертификаты", link: "/certificates" },
  { name: "Вакансии", link: "/vacancies" },
  { name: "Контакты", link: "/contacts" },
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
