"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MainButton from "@/components/ui/MainButton";
import { FC, useState, useMemo } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import AnimatedText from "@/components/ui/AnimatedText";
import GradientHeading from "@/components/ui/GradientHeading";
import { EButtonSize } from "@/components/ui/MainButton/types";

const FirstScreen: FC = () => {
  // Added state management for the counter
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 7; // Set the total number of slides

  // Navigation handlers
  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  // Generate indicator bars
  const indicatorBars = useMemo(() => {
    const indicatorCount = 60;
    return Array.from({ length: indicatorCount }).map((_, index) => {
      // Calculate active position
      const totalPositions = indicatorCount - 5;
      const progress =
        totalSlides > 1 ? (currentSlide - 1) / (totalSlides - 1) : 0;
      const position = Math.min(
        Math.floor(progress * totalPositions),
        totalPositions
      );

      let height = "6px";
      if (index >= position && index < position + 5) {
        const relativePos = index - position;
        if (relativePos === 2) {
          height = "40px";
        } else if (relativePos === 1 || relativePos === 3) {
          height = "20px";
        } else {
          height = "4px";
        }
      }

      return (
        <div
          key={index}
          className="slider-indicator-bar transition-all duration-300 flex-1"
          style={{
            height,
            maxWidth: "1px",
            width: "1px",
            backgroundColor: "white",
          }}
        />
      );
    });
  }, [currentSlide, totalSlides]);

  return (
    <header className="relative max-h-[100svh]">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/", current: false },
          { label: "Каталог", href: "/catalog", current: true },
        ]}
      />

      {/* Main Content */}
      <CustomContainer className="flex flex-col justify-between" fullHeight>
        <div className="pt-8 sm:pt-12 md:pt-16">
          <AnimatedText>
            <GradientHeading className="2xl:text-6xl z-10">
              Каталог
              <br />
              продукции
            </GradientHeading>
          </AnimatedText>
        </div>

        {/* Bottom Content - Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end mt-auto mb-8">
          {/* Column 1: Text with Button (spans 4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-end mb-8 lg:mb-0">
            <AnimatedText triggerStart="top 100%">
              <p className="text-sm sm:text-base md:text-lg text-white/70">
                Являясь всего лишь частью общей картины, тщательные исследования
                конкурентов могут быть описаны максимально подробно.
              </p>
            </AnimatedText>
            <div className="block md:hidden mt-4">
              <MainButton text="Связаться с отделом продаж" size={EButtonSize.SM} />
            </div>
            <div className="hidden md:block mt-4">
              <MainButton text="Связаться с отделом продаж" size={EButtonSize.MD} />
            </div>
          </div>

          {/* Column 2: Counter and Navigation Buttons (spans 2 cols) */}
          <div className="lg:col-span-2 flex items-center">
            {/* Slide Counter */}
            <div className="mr-6 text-white text-2xl font-light">
              {currentSlide}/{totalSlides}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-3">
              <button
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors"
                onClick={handlePrev}
              >
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
                  ></path>
                </svg>
              </button>
              <button
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors"
                onClick={handleNext}
              >
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
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Column 3: Indicators (spans 6 cols) */}
          <div className="lg:col-span-6 hidden lg:block">
            <div
              id="slider-indicators-container"
              className="h-12 flex items-center"
            >
              <div
                id="slider-indicators"
                className="flex items-center justify-between w-full"
              >
                {indicatorBars}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>

      <style jsx global>{`
        #slider-indicators-container {
          height: 48px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        #slider-indicators {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 40px;
        }

        .slider-indicator-bar {
          height: 4px;
          background-color: white;
          transition: all 0.3s ease;
          flex: 1;
          max-width: 1px;
          width: 1px;
        }
      `}</style>
    </header>
  );
};

export default FirstScreen;
