import Home from "./Home";
import type { Metadata } from "next";
import { fetchSeoSettingsSSR } from "@/shared/utils/fetchSeoSettingsSSR";
import { WebGLWarning } from "@/components/GpuDetector/ui/GPUWarning";


export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoSettingsSSR("/");
  return {
    title:
      seo?.title || "СибКомплект - Производство и поставка электрооборудования",
    description:
      seo?.description ||
      "СибКомплект - ведущий производитель и поставщик электрооборудования в Сибири. КТП, КРУ, КСО, БМУ и другое электрооборудование высокого качества.",
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

export default function HomePage() {
  return (
    <>
      <WebGLWarning/>
      <Home />
    </>
  );
}
