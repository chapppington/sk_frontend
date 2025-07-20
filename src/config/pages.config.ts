export type PageConfigItem = {
  href: string;
  label: string;
};

export const PagesConfigData = {
  home: { href: "/", label: "Главная" },
  about: { href: "/about", label: "О компании" },
  catalog: { href: "/catalog", label: "Каталог" },
  product: { href: "/product", label: "Продукт" },
  portfolio: { href: "/portfolio", label: "Портфолио" },
  news: { href: "/news", label: "Новости" },
  certificates: { href: "/certificates", label: "Сертификаты" },
  vacancies: { href: "/vacancies", label: "Вакансии" },
  contacts: { href: "/contacts", label: "Контакты" },
  privacy: { href: "/privacy", label: "Политика конфиденциальности" },
  questionnaire: { href: "/questionnaire", label: "Опросный лист" },
  production: { href: "/production", label: "О производстве" },
};

export type PagesConfigType = typeof PagesConfigData;

export const PagesConfig: PagesConfigType = PagesConfigData;
