import FirstScreen from "@/app/(main)/vacancies/screens/FirstScreen";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

const VacanciesScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/VacanciesScreen")
);
const ValuesScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/ValuesScreen")
);
const AdvantagesScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/AdvantagesScreen")
);
const ReviewsScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/ReviewsScreen")
);
const FaqScreen = dynamic(
  () => import("@/app/(main)/vacancies/screens/FaqScreen")
);
const ContactUsScreen = dynamic(
  () => import("@/components/shared_screens/ContactUsScreen")
);

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/vacancies");
  return {
    title: seo?.title || "Вакансии | СибКомплект",
    description: seo?.description || "Вакансии компании СибКомплект...",
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

export default function VacanciesPage() {
  return (
    <main>
      <FirstScreen />
      <Suspense fallback={<div>Loading...</div>}>
        <VacanciesScreen />
      </Suspense>
      <ValuesScreen />
      <AdvantagesScreen />
      <ReviewsScreen />
      <FaqScreen />
      <ContactUsScreen variant="vacancy" />
    </main>
  );
}
