/**
 * Утилита для генерации JSON-LD разметки BreadcrumbList согласно Schema.org
 * @see https://schema.org/BreadcrumbList
 * 
 * @example
 * ```tsx
 * import Breadcrumbs from "@/components/ui/Breadcrumbs";
 * 
 * <Breadcrumbs
 *   items={[
 *     { label: "Главная", href: "/", current: false },
 *     { label: "Каталог", href: "/catalog", current: false },
 *     { label: "Товар", href: "/product/item", current: true },
 *   ]}
 * />
 * ```
 */

export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

/**
 * Генерирует JSON-LD разметку для BreadcrumbList
 * @param items - Массив элементов хлебных крошек
 * @param baseUrl - Базовый URL сайта (по умолчанию из переменной окружения)
 * @returns JSON-LD объект для BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl?: string
): object {
  const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://sibkomplekt.ru";

  // Фильтруем пустые элементы и нормализуем href
  const validItems = items
    .filter((item) => item.label && item.href)
    .map((item) => {
      // Убеждаемся, что href начинается с /
      const normalizedHref = item.href.startsWith("/") ? item.href : `/${item.href}`;
      // Формируем полный URL
      const fullUrl = `${siteUrl}${normalizedHref}`;
      return {
        ...item,
        href: normalizedHref,
        fullUrl,
      };
    });

  if (validItems.length === 0) {
    return {};
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: {
        "@id": item.fullUrl,
        name: item.label,
      },
    })),
  };
}

/**
 * Генерирует JSON-LD разметку как строку для вставки в script tag
 * @param items - Массив элементов хлебных крошек
 * @param baseUrl - Базовый URL сайта
 * @returns JSON-LD строка
 */
export function generateBreadcrumbSchemaString(
  items: BreadcrumbItem[],
  baseUrl?: string
): string {
  const schema = generateBreadcrumbSchema(items, baseUrl);
  return JSON.stringify(schema, null, 0);
}

