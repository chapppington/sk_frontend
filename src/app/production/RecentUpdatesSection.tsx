"use client";

import { FC, useEffect, useRef, useCallback } from "react";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import BracketsText from "@/components/ui/BracketsText";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "Новая модель организационной",
    description:
      "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции способствует повышению качества направлений прогрессивного развития.",
    image: "/news_bg.webp",
  },
  {
    id: 2,
    title: "Новая модель организационной",
    description:
      "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции способствует повышению качества направлений прогрессивного развития.",
    image: "/news_bg.webp",
  },
  {
    id: 3,
    title: "Новая модель организационной",
    description:
      "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции способствует повышению качества направлений прогрессивного развития.",
    image: "/news_bg.webp",
  },
  {
    id: 4,
    title: "Новая модель организационной",
    description:
      "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции способствует повышению качества направлений прогрессивного развития.",
    image: "/news_bg.webp",
  },
];

export const RecentUpdatesSection: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  const updateProductionIndicators = useCallback((swiper: SwiperType) => {
    const slideCount = swiper.slides.filter(
      (slide) => !slide.classList.contains("swiper-slide-duplicate")
    ).length;
    const currentIndex = swiper.realIndex % slideCount;
    const totalPositions = 60 - 5;
    const progress = currentIndex / (slideCount - 1);
    const position = Math.round(progress * totalPositions);

    if (indicatorsRef.current) {
      const indicators = indicatorsRef.current.querySelectorAll(
        ".production-indicator-bar2"
      );
      indicators.forEach((indicator, index) => {
        const element = indicator as HTMLElement;
        element.style.height = "6px";

        if (index >= position && index < position + 5) {
          const relativePos = index - position;

          if (relativePos === 2) {
            element.style.height = "40px";
          } else if (relativePos === 1 || relativePos === 3) {
            element.style.height = "20px";
          } else {
            element.style.height = "4px";
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    // Generate indicator bars only once
    if (!isInitialized.current && indicatorsRef.current) {
      const indicatorCount = 60;
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div");
        indicator.className =
          "production-indicator-bar2 h-[4px] bg-white transition-all duration-300 flex-1";
        indicator.style.maxWidth = "1px";
        indicator.style.width = "1px";
        indicatorsRef.current.appendChild(indicator);
      }
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Initialize Swiper only once
    if (!swiperRef.current) {
      swiperRef.current = new Swiper(".productionSwiper2", {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".production-next",
          prevEl: ".production-prev",
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
        on: {
          slideChange: function (this: SwiperType) {
            updateProductionIndicators(this);
          },
          init: function (this: SwiperType) {
            updateProductionIndicators(this);
          },
        },
      });
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
    };
  }, [updateProductionIndicators]);

  return (
    <section
      id="production_stages_section2"
      className="bg-transparent py-24 relative"
    >
      <div className="container mx-auto px-4 lg:px-16 2xl:px-24 h-full flex flex-col relative z-10">
        {/* Top Section with 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 lg:justify-between">
          {/* Left column */}
          <div className="space-y-6 md:space-y-8 lg:space-y-6">
            <BracketsText>ЭТАПЫ</BracketsText>
            <div className="md:block lg:hidden">
              <GradientHeading>Этапы производства</GradientHeading>
            </div>
          </div>

          {/* Middle column with title - desktop only */}
          <div className="hidden lg:block md:mt-4 xl:mt-0">
            <GradientHeading>Последние нововведения</GradientHeading>
          </div>

          {/* Right column with description */}
          <div>
            <p className="text-white/70">
              Мы постоянно совершенствуем наши производственные процессы,
              внедряя инновационные технологии и оптимизируя каждый этап работы.
            </p>
          </div>
        </div>

        {/* Production Stages Slider */}
        <div className="relative pb-2">
          <div className="swiper productionSwiper2">
            <div className="swiper-wrapper">
              {newsItems.map((item) => (
                <div key={item.id} className="swiper-slide">
                  <article className="relative overflow-hidden">
                    <div className="relative aspect-[1/1] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/90"></div>

                      <div className="absolute inset-0 p-8 flex flex-col z-10">
                        <div>
                          <span className="inline-block p-4 border border-white/60 rounded-full">
                            <svg
                              className="w-8 h-8 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          </span>
                        </div>

                        <div className="mt-auto">
                          <h3 className="text-2xl text-white font-light leading-tight">
                            {item.title}
                          </h3>
                        </div>

                        <div className="mt-6">
                          <p className="text-white/80 text-sm font-light">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Controls */}
          <div className="flex items-center mt-8">
            <div className="flex items-center space-x-3 mr-8">
              <button className="production-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button className="production-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Slider Indicators */}
            <div className="flex-1 relative hidden sm:block">
              <div
                ref={indicatorsRef}
                className="flex items-center justify-between w-full"
              >
                {/* Indicator bars will be generated by JavaScript */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
