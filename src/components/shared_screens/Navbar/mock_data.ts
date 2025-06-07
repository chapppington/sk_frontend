import { PagesConfig } from "@/config/pages.config";
import { IMenuItem, ContactSection } from "./types";

export const menuItems: IMenuItem[] = [
  { label: "Каталог", href: PagesConfig.catalog },
  { label: "О производстве", href: PagesConfig.production },
  { label: "Новости", href: PagesConfig.news },
  { label: "Контакты", href: PagesConfig.contacts },
];

export const contactSections: ContactSection[] = [
  {
    title: "Отдел продаж",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
  {
    title: "Конструкторский отдел",
    phone: "8 (880) 990-00-00",
    email: "test@mail.ru",
  },
];
