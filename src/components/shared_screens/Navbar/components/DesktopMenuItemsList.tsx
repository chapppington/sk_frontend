import { FC, useMemo } from "react";
import TransitionLink from "@/components/ui/TransitionLink";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";
import { PagesConfig } from "@/config/pages.config";

const ALL_PAGES_LABELS: Record<string, string> = {
  home: "Главная",
  about: "О компании",
  catalog: "Каталог",
  portfolio: "Портфолио",
  news: "Новости",
  certificates: "Сертификаты",
  vacancies: "Вакансии",
  contacts: "Контакты",
  privacy: "Политика конфиденциальности",
  questionnaire: "Опросные листы",
  production: "Производство",
};

const DesktopMenu: FC = () => {
  const { config } = useNavbarConfigPublic();
  const links = config?.desktopNavbarConfig?.links_shown || [];
  const items = useMemo(
    () =>
      links
        .map((key: string) => {
          const href = (PagesConfig as any)[key]?.href;
          const label = ALL_PAGES_LABELS[key] || key;
          return href ? { href, label } : null;
        })
        .filter(Boolean),
    [links]
  );
  return (
    <div className="hidden 2xl:flex items-center space-x-10 px-12 h-full">
      {items.map((item: { href: string; label: string }) => (
        <TransitionLink
          key={item.href}
          href={item.href}
          className="text-white text-sm hover:text-white/80 transition-colors relative select-none group"
        >
          {item.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </TransitionLink>
      ))}
    </div>
  );
};

export default DesktopMenu;
