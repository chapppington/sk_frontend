import CertificatesScreen from "@/app/(main)/certificates/screens/CertificatesScreen";
import ContactUsScreen from "@/components/shared_screens/ContactUsScreen";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export default function CertificatesPage() {
  return (
    <main>
      <CertificatesScreen />
      <ContactUsScreen />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/certificates");
  return {
    title: seo?.title || "Сертификаты | СибКомплект",
    description:
      seo?.description || "Сертификаты и лицензии компании СибКомплект...",
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
