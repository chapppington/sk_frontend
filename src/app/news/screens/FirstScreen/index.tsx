"use client";

import { FC, useState, useRef } from "react";

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

import { newsItems } from "@/app/news/screens/FirstScreen/mock_data";

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

  // Use custom hooks for animations
  useContentAnimation(
    {
      contentRef,
      categoryRef,
      titleRef,
      metaRef,
      descriptionRef,
      buttonRef,
    },
    currentIndex
  );

  useImageTransition(imageRefs, currentIndex, prevIndex);

  const handlePrev = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : newsItems.length - 1));
    setKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev < newsItems.length - 1 ? prev + 1 : 0));
    setKey((prev) => prev + 1);
  };

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
            key={news.id}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 2 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <ParallaxImage
              src={news.image}
              alt={news.title}
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
        <div className="hidden md:flex items-center absolute bottom-20 right-4 md:right-10 xl:right-24 z-[50]">
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
                <AnimatedText
                  key={`title-${key}`}
                  animateOnScroll={false}
                  delay={0.1}
                >
                  <GradientHeading className="mb-4">
                    {currentNews.title}
                  </GradientHeading>
                </AnimatedText>
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
