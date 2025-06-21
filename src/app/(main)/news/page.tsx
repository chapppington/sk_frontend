import FirstScreen from "@/app/(main)/news/screens/FirstScreen";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/news");
  return {
    title: seo?.title || "Новости | СибКомплект",
    description: seo?.description || "Новости компании СибКомплект...",
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

const NewsGrid = dynamic(
  () => import("@/app/(main)/news/screens/NewsGridScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export default function News() {
  return (
    <>
      <FirstScreen />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <NewsGrid />
      </Suspense>
      <ContactUsScreen />
    </>
  );
}
