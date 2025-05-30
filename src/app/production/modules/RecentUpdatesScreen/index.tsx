"use client";

import { FC, useEffect, useRef, useCallback } from "react";

import "swiper/css";
import "swiper/css/navigation";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import SectionHeader from "@/components/ui/SectionHeader";
import CustomContainer from "@/components/ui/CustomContainer";
import RecentUpdateSliderItem from "./components/RecentUpdateSliderItem";

import newsItems from "./mock_data";

const RecentUpdatesScreen: FC = () => {
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
      <CustomContainer>
        <SectionHeader
          bracketsText="ЧТО НОВОГО"
          heading={
            <>
              Последние
              <br />
              нововведения
            </>
          }
          description="Мы постоянно совершенствуем наши
производственные процессы, внедряя
инновационные технологии и оптимизируя каждый
этап работы."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        {/* Production Stages Slider */}
        <div className="relative pb-2">
          <div className="swiper productionSwiper2">
            <div className="swiper-wrapper">
              {newsItems.map((item) => (
                <div key={item.id} className="swiper-slide">
                  <RecentUpdateSliderItem item={item} />
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
      </CustomContainer>
    </section>
  );
};

export default RecentUpdatesScreen;
