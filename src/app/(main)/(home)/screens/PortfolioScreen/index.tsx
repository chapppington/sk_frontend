"use client";

import { useQuery } from "@tanstack/react-query";
import PortfolioCards from "./components/Cards";
import portfolioService from "@/services/portfolio.service";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { CardProps } from "./components/Card/types";
import { BACKEND_MAIN, UPLOADS_URL } from "@/constants";
import "./styles.css";

const PortfolioCardsScreen = () => {
  const {
    data: portfolioItems = [],
    isLoading,
    error,
  } = useQuery<IPortfolioItem[]>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await portfolioService.fetchAll();
      return data;
    },
  });

  // Transform API data to match CardProps format and take only first 4 items
  const transformedCards: CardProps[] = portfolioItems
    .slice(0, 4)
    .map((item: IPortfolioItem, index: number) => ({
      title: item.name,
      description: item.description,
      imageUrl: item.poster
        ? `${UPLOADS_URL}/uploads/portfolio/${item.poster}`
        : "/news_bg.webp",
      alt: item.name,
      slug: item.slug,
      hasMarquee: index === 0, // Только первый элемент имеет marquee
    }));

  if (isLoading) {
    return (
      <section className="section cards">
        <div className="text-center text-white">Загрузка портфолио...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section cards">
        <div className="text-center text-white">Ошибка загрузки портфолио</div>
      </section>
    );
  }

  return <PortfolioCards cards={transformedCards} />;
};

export default PortfolioCardsScreen;
