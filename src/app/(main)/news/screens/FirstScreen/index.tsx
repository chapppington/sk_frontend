"use client";

import { FC, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import CustomContainer from "@/components/ui/CustomContainer";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import GradientHeading from "@/components/ui/GradientHeading";
import TransitionLink from "@/components/ui/TransitionLink";
import AnimatedText from "@/components/ui/AnimatedText";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { NavigationButton } from "@/components/ui/NavigationButton";
import CircleIconButton from "@/components/ui/CircleIconButton";
import Badge from "@/components/ui/Badge";

import useIsMobile from "@/hooks/useIsMobile";
import {
  useContentAnimation,
  useImageTransition,
} from "./hooks/useNewsAnimations";

import newsService from "@/services/news.service";
import { INews } from "@/shared/types/news.types";
import { INewsItem } from "./types";
import { UPLOADS_URL } from "@/constants";

const FirstScreen: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const [prevIndex, setPrevIndex] = useState(0);
  const [key, setKey] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fetch news from backend
  const {
    data: news = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data } = await newsService.fetchAll();
      return data;
    },
  });

  // Category mapping
  const categoryMap: Record<string, string> = {
    all: "Все",
    production: "Производство",
    technology: "Технологии",
    events: "События",
    interview: "Интервью",
    developments: "Разработки",
    useful: "Полезное",
    projects: "Наши проекты",
  };

  // Transform API data to match the expected format
  const newsItems: INewsItem[] = news.map((item: INews) => ({
    id: parseInt(item.id) || 0, // Fallback to 0 if parsing fails
    category: categoryMap[item.category] || item.category,
    date: new Date(item.createdAt).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: `${item.readingTime} мин`,
    title: item.title,
    description: item.shortContent || item.content.substring(0, 150) + "...",
    shortContent: item.shortContent,
    image: item.imageUrl ? `${UPLOADS_URL}/${item.imageUrl}` : "/news_bg.webp",
    alt: item.alt,
    slug: item.slug,
  }));

  // Use custom hooks for animations only when data is loaded
  const shouldRunAnimations = !isLoading && !error && newsItems.length > 0;

  // Always call hooks to maintain order, but pass shouldRunAnimations flag
  useContentAnimation(
    {
      contentRef,
      categoryRef,
      titleRef,
      metaRef,
      descriptionRef,
      buttonRef,
    },
    currentIndex,
    shouldRunAnimations
  );

  useImageTransition(imageRefs, currentIndex, prevIndex, shouldRunAnimations);

  const handlePrev = () => {
    if (!shouldRunAnimations) return;
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : newsItems.length - 1));
    setKey((prev) => prev + 1);
  };

  const handleNext = () => {
    if (!shouldRunAnimations) return;
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev < newsItems.length - 1 ? prev + 1 : 0));
    setKey((prev) => prev + 1);
  };

  // Show loading state
  if (isLoading) {
    return (
      <header className="relative h-[100svh] overflow-hidden">
        <div className="relative h-full bg-black/30">
          <CustomContainer className="h-[100svh] flex flex-col justify-center items-center">
            <div className="text-white text-xl">Загрузка новостей...</div>
          </CustomContainer>
        </div>
      </header>
    );
  }

  // Show error state
  if (error || newsItems.length === 0) {
    return (
      <header className="relative h-[100svh] overflow-hidden">
        <div className="relative h-full bg-black/30">
          <CustomContainer className="h-[100svh] flex flex-col justify-center items-center">
            <div className="text-white text-xl">
              {error ? "Ошибка загрузки новостей" : "Новости не найдены"}
            </div>
          </CustomContainer>
        </div>
      </header>
    );
  }

  const currentNews = newsItems[currentIndex];

  const content = (
    <>
      {/* Base Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-20"></div>

      {/* Image Stack with Parallax */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        {newsItems.map((news, index) => (
          <div
            key={`news-${news.slug}-${index}`}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 2 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <ParallaxImage
              src={news.image}
              alt={news.alt || news.title}
              priority={index === 0}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>

      {/* Mobile Navigation - Absolute Positioned */}
      <div className="md:hidden flex items-center justify-between absolute bottom-6 left-0 right-0 px-8 z-[31]">
        {/* Page Counter */}
        <div className="text-white text-lg news-counter-mobile">
          <span className="text-2xl current-page">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/60">
            /{String(newsItems.length).padStart(2, "0")}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-4">
          <NavigationButton
            direction="prev"
            sliderId="news-mobile"
            onClick={handlePrev}
          />
          <NavigationButton
            direction="next"
            sliderId="news-mobile"
            onClick={handleNext}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <CustomContainer className="h-[100svh] flex flex-col justify-end relative z-30">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Новости", href: "#", current: true },
          ]}
          disableContainer={true}
        />
        {/* Desktop Navigation - Absolute Positioned */}
        <div className="hidden md:flex items-center absolute bottom-20 right-10 lg:right-10 2xl:right-28 z-[50]">
          {/* Page Counter */}
          <div className="text-white text-xl news-counter">
            <span className="text-4xl current-page">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/60">
              /{String(newsItems.length).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex ml-5">
            <NavigationButton
              direction="prev"
              sliderId="news-desktop"
              onClick={handlePrev}
            />
            <NavigationButton
              direction="next"
              sliderId="news-desktop"
              className="ml-3"
              onClick={handleNext}
            />
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-end align-start z-30 mb-24 md:mb-6 lg:mb-18">
          <div ref={contentRef} className="md:mb-14 news-content">
            {/* Category */}
            <div ref={categoryRef} className="mb-8 lg:mb-10 news-category">
              <Badge variant="transparent">{currentNews.category}</Badge>
            </div>

            {/* Title */}
            <div ref={titleRef}>
              <TransitionLink
                href={`/news/${currentNews.slug}`}
                className="block hover:opacity-90 transition-opacity"
              >
                <div className="mb-4">
                  <AnimatedText
                    key={`title-${key}`}
                    animateOnScroll={false}
                    delay={0.1}
                  >
                    <GradientHeading>{currentNews.title}</GradientHeading>
                  </AnimatedText>
                </div>
              </TransitionLink>
            </div>

            {/* Meta Info */}
            <AnimatedText
              key={`meta-${key}`}
              animateOnScroll={false}
              delay={0.2}
            >
              <div
                ref={metaRef}
                className="flex items-center space-x-4 text-white/60 text-sm md:text-base lg:text-base news-meta"
              >
                <span>{currentNews.date}</span>
                <span className="px-2"> • </span>
                <span>{currentNews.readTime}</span>
              </div>
            </AnimatedText>

            {/* Description */}
            <AnimatedText
              key={`desc-${key}`}
              animateOnScroll={false}
              delay={0.4}
            >
              <p
                ref={descriptionRef}
                className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mt-4 news-description"
              >
                {currentNews.description}
              </p>
            </AnimatedText>

            {/* Read More Button */}
            <div ref={buttonRef} className="mt-6">
              <CircleIconButton
                href={`/news/${currentNews.slug}`}
                text="Читать"
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </>
  );

  return (
    <header className="relative h-[100svh] overflow-hidden">
      <div className="relative h-full">{content}</div>
    </header>
  );
};

export default FirstScreen;
