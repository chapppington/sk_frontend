"use client";

import { usePathname } from "next/navigation";
import { generateBreadcrumbSchemaString } from "@/utils/breadcrumbSchema";
import type { BreadcrumbItem } from "@/utils/breadcrumbSchema";

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

/**
 * Компонент для добавления JSON-LD разметки BreadcrumbList в head страницы
 * Используется вместе с визуальным компонентом Breadcrumbs
 */
export default function BreadcrumbSchema({
  items,
  baseUrl,
}: BreadcrumbSchemaProps) {
  const pathname = usePathname();
  const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://sibkomplekt.ru";

  // Если нет элементов, не рендерим ничего
  if (!items || items.length === 0) {
    return null;
  }

  // Нормализуем items: заменяем "#" и пустые href на текущий путь
  const normalizedItems: BreadcrumbItem[] = items.map((item) => {
    if (!item.href || item.href === "#" || item.href === "") {
      return {
        ...item,
        href: pathname || "/",
      };
    }
    return item;
  });

  const schemaString = generateBreadcrumbSchemaString(normalizedItems, siteUrl);

  // Если схема пустая, не рендерим
  if (!schemaString || schemaString === "{}") {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaString }}
    />
  );
}

