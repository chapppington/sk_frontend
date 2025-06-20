import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

import FirstScreen from "@/app/(main)/catalog/screens/FirstScreen";
const CatalogSection = dynamic(
  () => import("@/app/(main)/catalog/screens/CatalogScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/catalog");
  return {
    title: seo?.title || "Каталог | СибКомплект",
    description:
      seo?.description || "Каталог продукции компании СибКомплект...",
    keywords: seo?.keywords,
    openGraph:
      seo?.ogTitle || seo?.ogDescription || seo?.ogImage
        ? {
            title: seo.ogTitle,
            description: seo.ogDescription,
            images: seo.ogImage ? [seo.ogImage] : undefined,
          }
        : undefined,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
  };
}

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <CatalogSection />
      <ContactUsScreen />
    </main>
  );
}
