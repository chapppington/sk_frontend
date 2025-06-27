import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";

const RUSSIAN_LABELS: Record<string, string> = {
  profile: "Профиль",
  news: "Новости",
  portfolio: "Портфолио",
  products: "Товары",
  vacancy: "Вакансии",
  vacancies: "Вакансии",
  home: "Главная",
  "seo-settings": "SEO настройки",
  "global-settings": "Глобальные настройки",
  static: "Статичный контент",
  dynamic: "Динамический контент",
  about: "О компании",
  production: "О производстве",
  contacts: "Контакты",
  certificates: "Сертификаты",
  privacy: "Политика конфиденциальности",
};

function toTitleCase(str: string) {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getBreadcrumbLabel(seg: string, idx: number, arr: string[]) {
  // Если это Статичный контент, показываем только конкретное название раздела
  if (arr.includes("static")) {
    return RUSSIAN_LABELS[seg] || toTitleCase(seg);
  }

  // Для первого уровня (idx === 0) показываем тип контента
  if (idx === 0) {
    return "Динамический контент";
  }

  // Для второго уровня показываем конкретное название раздела
  return RUSSIAN_LABELS[seg] || toTitleCase(seg);
}

const AdminBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/");
  const adminIndex = segments.indexOf("(admin)");
  let pathSegments =
    adminIndex !== -1 ? segments.slice(adminIndex + 1) : segments;

  // Убираем dashboard из сегментов для статического контента
  if (pathSegments.includes("static")) {
    pathSegments = pathSegments.filter((seg) => seg !== "dashboard");
  }

  // Build breadcrumb items
  const items = pathSegments.map((seg, idx) => {
    // Для статического контента генерируем href правильно
    let href;
    if (pathSegments.includes("static")) {
      href =
        "/admin/static/" +
        pathSegments
          .slice(pathSegments.indexOf("static") + 1, idx + 1)
          .join("/");
    } else {
      href = "/admin/" + pathSegments.slice(0, idx + 1).join("/");
    }

    return {
      label: getBreadcrumbLabel(seg, idx, pathSegments),
      href,
      current: idx === pathSegments.length - 1,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-base text-gray-700 dark:text-white/80 whitespace-nowrap"
    >
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx !== 0 && (
            <ChevronRight className="mx-2 w-4 h-4 text-gray-500 dark:text-white/60" />
          )}
          {item.current ? (
            <span className="text-gray-900 dark:text-white font-medium whitespace-nowrap">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap text-gray-600 dark:text-white/80"
            >
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AdminBreadcrumbs;
