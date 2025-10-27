import QuestionnairePage from "./QuestionnairePage";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/questionnaire/ktp");
  return {
    title: seo?.title || "Опросный лист КТП | СибКомплект",
    description:
      seo?.description ||
      "Заполните опросный лист на изготовление комплектной трансформаторной подстанции (КТП). Точный расчет стоимости и технических характеристик под ваши требования.",
    keywords:
      seo?.keywords ||
      "опросный лист КТП, заказ КТП, расчет КТП, комплектная трансформаторная подстанция, заказать КТП",
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
  return <QuestionnairePage />;
}
