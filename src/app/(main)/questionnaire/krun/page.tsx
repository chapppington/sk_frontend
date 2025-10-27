import QuestionnairePage from "./QuestionnairePage";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/questionnaire/krun");
  return {
    title: seo?.title || "Опросный лист КРУН/ЯКНО | СибКомплект",
    description:
      seo?.description ||
      "Заполните опросный лист на изготовление комплектного распределительного устройства наружной установки (КРУН/ЯКНО). Профессиональный подбор оборудования.",
    keywords:
      seo?.keywords ||
      "опросный лист КРУН, заказ КРУН, ЯКНО, комплектное распределительное устройство, заказать КРУН",
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


