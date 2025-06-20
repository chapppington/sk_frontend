import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

import FirstScreen from "@/app/(main)/production/screens/FirstScreen";

const ProductionStagesScreen = dynamic(
  () => import("@/app/(main)/production/screens/ProductionStagesScreen")
);
const EquipmentGridScreen = dynamic(
  () => import("@/app/(main)/production/screens/EquipmentGridScreen")
);
const RecentUpdatesScreen = dynamic(
  () => import("@/app/(main)/production/screens/RecentUpdatesScreen")
);
const CertificatesScreen = dynamic(
  () => import("@/app/(main)/production/screens/CertificatesScreen")
);
const ReadMoreScreen = dynamic(
  () => import("@/components/shared_screens/ReadMoreScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/production");
  return {
    title: seo?.title || "Производство | СибКомплект",
    description: seo?.description || "Производство компании СибКомплект...",
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

export default function ProductionPage() {
  return (
    <main>
      <FirstScreen />
      <ProductionStagesScreen />
      <EquipmentGridScreen />
      <RecentUpdatesScreen />
      <CertificatesScreen />
      <ReadMoreScreen />
      <ContactUsScreen />
    </main>
  );
}
