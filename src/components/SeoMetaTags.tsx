"use client";

import { useEffect } from "react";
import { useSeoSettings } from "@/hooks/useSeoSettings";

interface SeoMetaTagsProps {
  pagePath: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

export const SeoMetaTags = ({
  pagePath,
  defaultTitle = "СибКомплект - Производство и поставка электрооборудования",
  defaultDescription = "СибКомплект - ведущий производитель и поставщик электрооборудования в Сибири. КТП, КРУ, КСО, БМУ и другое электрооборудование высокого качества.",
}: SeoMetaTagsProps) => {
  const { data: seoSettings } = useSeoSettings(pagePath);

  useEffect(() => {
    if (seoSettings && seoSettings.isActive) {
      // Обновляем title
      document.title = seoSettings.title;

      // Обновляем meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", seoSettings.description);

      // Обновляем keywords
      if (seoSettings.keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement("meta");
          metaKeywords.setAttribute("name", "keywords");
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute("content", seoSettings.keywords);
      }

      // Обновляем Open Graph теги
      const ogTitle = seoSettings.ogTitle || seoSettings.title;
      const ogDescription =
        seoSettings.ogDescription || seoSettings.description;

      // OG Title
      let ogTitleMeta = document.querySelector('meta[property="og:title"]');
      if (!ogTitleMeta) {
        ogTitleMeta = document.createElement("meta");
        ogTitleMeta.setAttribute("property", "og:title");
        document.head.appendChild(ogTitleMeta);
      }
      ogTitleMeta.setAttribute("content", ogTitle);

      // OG Description
      let ogDescMeta = document.querySelector(
        'meta[property="og:description"]'
      );
      if (!ogDescMeta) {
        ogDescMeta = document.createElement("meta");
        ogDescMeta.setAttribute("property", "og:description");
        document.head.appendChild(ogDescMeta);
      }
      ogDescMeta.setAttribute("content", ogDescription);

      // OG Image
      if (seoSettings.ogImage) {
        let ogImageMeta = document.querySelector('meta[property="og:image"]');
        if (!ogImageMeta) {
          ogImageMeta = document.createElement("meta");
          ogImageMeta.setAttribute("property", "og:image");
          document.head.appendChild(ogImageMeta);
        }
        ogImageMeta.setAttribute("content", seoSettings.ogImage);
      }

      // OG URL
      let ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (!ogUrlMeta) {
        ogUrlMeta = document.createElement("meta");
        ogUrlMeta.setAttribute("property", "og:url");
        document.head.appendChild(ogUrlMeta);
      }
      ogUrlMeta.setAttribute("content", `${window.location.origin}${pagePath}`);

      // Canonical URL
      if (seoSettings.canonicalUrl) {
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
          canonicalLink = document.createElement("link");
          canonicalLink.setAttribute("rel", "canonical");
          document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute("href", seoSettings.canonicalUrl);
      }
    } else {
      // Возвращаем дефолтные значения
      document.title = defaultTitle;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", defaultDescription);
      }
    }
  }, [seoSettings, pagePath, defaultTitle, defaultDescription]);

  return null; // Этот компонент не рендерит ничего
};
