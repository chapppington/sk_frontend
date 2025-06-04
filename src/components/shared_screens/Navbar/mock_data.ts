import { IMenuItem, ContactSection } from "./types";
import { PagesConfig } from "@/config/pages.config";

export const menuItems: IMenuItem[] = [
  { href: PagesConfig.catalog, label: "Каталог" },
  { href: PagesConfig.production, label: "О производстве" },
  { href: PagesConfig.news, label: "Новости" },
  { href: PagesConfig.contacts, label: "Контакты" },
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
