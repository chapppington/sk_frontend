import QualityPolicyScreen from "@/app/(main)/quality/screens/QualityPolicyScreen";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/quality");
  return {
    title: seo?.title || "Политика качества | СибКомплект",
    description:
      seo?.description ||
      "Политика качества продукции компании СибКомплект...",
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

export default function QualityPolicyPage() {
  return <QualityPolicyScreen />;
}
