import { Metadata, ResolvingMetadata } from "next";
import PortfolioDetails from "./PortfolioDetails";
import { instance } from "@/api/axios";
import { IPortfolioItem } from "@/shared/types/portfolio.types";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Получаем данные портфолио с сервера
    const { data: portfolio } = await instance.get<IPortfolioItem>(
      `/portfolio/slug/${slug}`
    );

    return {
      title: `${portfolio.name} | СибКомплект`,
      description: portfolio.description,
    };
  } catch (error) {
    // Fallback если портфолио не найдено
    return {
      title: `Проект ${slug} | СибКомплект`,
      description: "Подробная информация о проекте и его реализации",
    };
  }
}

interface PortfolioPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PortfolioPage = async ({ params }: PortfolioPageProps) => {
  const { slug } = await params;

  return <PortfolioDetails slug={slug} />;
};

export default PortfolioPage;
