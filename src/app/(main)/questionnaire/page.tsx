import QuestionnaireListPage from "./QuestionnaireListPage";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/questionnaire");
  return {
    title: seo?.title || "Опросные листы | СибКомплект",
    description:
      seo?.description ||
      "Заполните опросный лист для точного расчета стоимости и характеристик электрооборудования. КТП, КРУН, КСО - быстрый подбор оборудования под ваши требования.",
    keywords:
      seo?.keywords ||
      "опросный лист, заказ КТП, заказ КРУН, расчет стоимости КТП, подбор электрооборудования, технические требования",
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

export default function Page() {
  return <QuestionnaireListPage />;
}


