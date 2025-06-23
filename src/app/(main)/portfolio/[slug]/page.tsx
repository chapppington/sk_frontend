import { Metadata, ResolvingMetadata } from "next";
import PortfolioDetails from "./PortfolioDetails";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { API_URL } from "@/constants";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Получаем данные портфолио с сервера
    const response = await fetch(`${API_URL}/portfolio/slug/${slug}`, {
      next: { revalidate: 3600 }, // Кэшируем на 1 час
    });

    if (!response.ok) {
      throw new Error("Portfolio not found");
    }

    const portfolio: IPortfolioItem = await response.json();

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
