"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import { NavigationButton } from "@/components/ui/NavigationButton";
import AnimatedText from "@/components/ui/AnimatedText";

import { PagesConfig } from "@/config/pages.config";
import portfolioService from "@/services/portfolio.service";
import { UPLOADS_URL } from "@/constants";
import { IPortfolioItem } from "@/shared/types/portfolio.types";

const indicatorCount = 40;

const PortfolioSection = () => {
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgLoaded, setBgLoaded] = useState<Record<number, boolean>>({});
  const [indicatorState, setIndicatorState] = useState<number[]>(
    Array(indicatorCount).fill(4)
  );
  const buttonRef = useRef<HTMLDivElement>(null);

  const {
    data: portfolioItems = [],
    isLoading,
    isError,
  } = useQuery<IPortfolioItem[]>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const { data } = await portfolioService.fetchAll();
      return data;
    },
  });

  // Update indicators based on Swiper's realIndex
  const updatePortfolioIndicators = (realIndex: number) => {
    const slideCount = portfolioItems.length;
    if (slideCount === 0) return;
    const totalPositions = indicatorCount - 5;
    const progress = realIndex / (slideCount - 1);
    const position = Math.round(progress * totalPositions);
    const newState = Array(indicatorCount).fill(4);
    for (let i = position; i < position + 5; i++) {
      if (i >= 0 && i < indicatorCount) {
        const relativePos = i - position;
        if (relativePos === 2) newState[i] = 40;
        else if (relativePos === 1 || relativePos === 3) newState[i] = 20;
        else newState[i] = 6;
      }
    }
    setIndicatorState(newState);
  };

  // Sync indicator state on activeIndex change
  useEffect(() => {
    updatePortfolioIndicators(activeIndex);
  }, [activeIndex, portfolioItems.length]);

  useEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, { opacity: 0, y: 10 });
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        delay: 0.3,
        ease: "expo.out",
      });
    }
  }, [activeIndex]);

  if (isLoading) {
    return (
      <div className="text-center text-white py-24">Загрузка портфолио...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-24">
        Ошибка загрузки портфолио
      </div>
    );
  }

  if (!portfolioItems.length) {
    return (
      <div className="text-center text-white py-24">
        Нет реализованных проектов
      </div>
    );
  }

  return (
    <section
      id="portfolio_section"
      className="bg-transparent py-24 relative min-h-screen flex flex-col justify-end"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        {portfolioItems.map((item, idx) =>
          idx === activeIndex || bgLoaded[idx] ? (
            <div
              key={item.id}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: idx === activeIndex ? 1 : 0,
                zIndex: idx === activeIndex ? 2 : 1,
                transition: "opacity 0.6s",
              }}
            >
              <Image
                src={`${UPLOADS_URL}/uploads/portfolio/${item.poster}`}
                alt={item.name}
                fill
                className="object-cover"
                priority={idx === activeIndex}
                onLoad={() => {
                  setBgLoaded((prev) => ({ ...prev, [idx]: true }));
                }}
              />
            </div>
          ) : null
        )}
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-20"></div>
      </div>

      <CustomContainer className="relative z-10">
        {/* Section Title */}
        <div className="mb-8">
          <span className="text-white/40 text-sm tracking-wider">
            [ ЧТО РЕАЛИЗОВАЛИ ]
          </span>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col xl:flex-row gap-12 items-end">
          {/* Left side - Main content */}
          <div className="w-full xl:w-1/2 mb-8 xl:mb-0">
            <div className="portfolio-main-content">
              <div className="mb-6">
                <AnimatedText
                  key={`portfolio-title-${activeIndex}`}
                  animateOnScroll={false}
                  delay={0.1}
                >
                  <GradientHeading>
                    {portfolioItems[activeIndex].name}
                  </GradientHeading>
                </AnimatedText>
              </div>
              <AnimatedText
                key={`portfolio-desc-${activeIndex}`}
                animateOnScroll={false}
                delay={0}
              >
                <p className="text-white/60 text-lg mb-4 portfolio-description">
                  {portfolioItems[activeIndex].description}
                </p>
              </AnimatedText>
              <div
                ref={buttonRef}
                className="mt-6"
                key={`portfolio-btn-${activeIndex}`}
              >
                <MainButton
                  text="Узнать подробнее"
                  href={`${PagesConfig.portfolio.href}/${portfolioItems[activeIndex].slug}`}
                />
              </div>
            </div>
          </div>

          {/* Right side - Slider */}
          <div className="w-full xl:w-1/2">
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={20}
              loop={true}
              navigation={{
                nextEl: nextRef.current,
                prevEl: prevRef.current,
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              onInit={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.realIndex);
                // Ensure navigation refs are set after mount
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className="portfolioSwiper h-[220px] sm:h-[260px] md:h-[300px] w-full max-w-full"
            >
              {portfolioItems.map((item, idx) => (
                <SwiperSlide key={item.id}>
                  <div className="cursor-pointer group relative h-full">
                    <div className="relative h-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={`${UPLOADS_URL}/uploads/portfolio/${item.poster}`}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === activeIndex}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-white/60 text-sm mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-white text-xl font-light">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center space-x-3">
                <NavigationButton
                  ref={prevRef}
                  direction="prev"
                  sliderId="portfolio"
                  className="portfolio-prev"
                />
                <NavigationButton
                  ref={nextRef}
                  direction="next"
                  sliderId="portfolio"
                  className="portfolio-next"
                />
              </div>

              {/* Slider Indicators */}
              <div className="flex-1 relative ml-8">
                <div className="flex items-center justify-between w-full">
                  {indicatorState.map((height, i) => (
                    <div
                      key={i}
                      className="portfolio-indicator-bar bg-white transition-all duration-300 flex-1"
                      style={{
                        height: `${height}px`,
                        maxWidth: "1px",
                        width: "1px",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default PortfolioSection;
