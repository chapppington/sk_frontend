import Home from "./Home";
import { Metadata } from "next";
import { SeoMetaTags } from "@/components/SeoMetaTags";

export const metadata: Metadata = {
  title: "СибКомплект - Производство и поставка электрооборудования",
  description:
    "СибКомплект - ведущий производитель и поставщик электрооборудования в Сибири. КТП, КРУ, КСО, БМУ и другое электрооборудование высокого качества.",
};

export default function HomePage() {
  return (
    <>
      <SeoMetaTags pagePath="/" />
      <Home />
    </>
  );
}
