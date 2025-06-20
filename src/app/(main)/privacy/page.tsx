import PrivacyPolicyScreen from "@/app/(main)/privacy/screens/PrivacyPolicyScreen";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/privacy");
  return {
    title: seo?.title || "Политика конфиденциальности | СибКомплект",
    description:
      seo?.description ||
      "Политика обработки персональных данных компании СибКомплект...",
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyScreen />;
}
