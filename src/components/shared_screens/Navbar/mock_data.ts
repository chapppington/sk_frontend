import { IMenuItem, ContactSection } from "./types";

export const menuItems: IMenuItem[] = [
  { href: "/catalog", label: "Каталог" },
  { href: "/production", label: "О производстве" },
  { href: "/news", label: "Новости" },
  { href: "/contacts", label: "Контакты" },
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
