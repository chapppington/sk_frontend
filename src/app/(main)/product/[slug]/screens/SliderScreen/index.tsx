"use client";
import Image from "next/image";
import { FC, useState, useRef, useMemo } from "react";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import type SwiperType from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";

import MainButton from "@/components/ui/MainButton";
import SectionHeader from "@/components/ui/SectionHeader";
import CustomContainer from "@/components/ui/CustomContainer";

import { slides } from "./mock_data";
import styles from "./styles.module.css";

const SliderSection: FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = slides.length;
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);

  // Custom navigation handlers
  const handleNext = () => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slidePrev();
    }
  };

  // Generate indicator bars (fixed implementation that won't cause stack overflow)
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
    <section className="bg-transparent py-24 relative">
      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText="ГДЕ ПРИМЕНЯЛОСЬ"
          heading={
            <>
              Кейсы применения <br />
              оборудования
            </>
          }
          description="Мы гордимся нашими реализованными проектами и готовы поделиться опытом внедрения оборудования в различных отраслях промышленности. Каждый кейс демонстрирует эффективность наших решений."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        {/* Slider Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Slider */}
          <div className="lg:col-span-9 overflow-hidden">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              loop={true}
              speed={300}
              className="productSlider"
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                try {
                  // Handle looped slides by using realIndex
                  const newSlide = (swiper.realIndex % totalSlides) + 1;
                  if (newSlide !== currentSlide) {
                    setCurrentSlide(newSlide);
                  }
                } catch (err) {
                  console.error("Error in main slider change:", err);
                }
              }}
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                      className="brightness-[0.7]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
                      <div className="flex items-center">
                        <button className="py-2 px-4 bg-white text-dark text-sm rounded-md">
                          Реализованный проект
                        </button>
                        <button className="py-2 px-4 ml-2 bg-white text-dark text-sm rounded-md">
                          {slide.year}
                        </button>
                      </div>

                      <div className="w-full">
                        <h3 className="text-4xl text-white font-normal mb-2 w-3/5">
                          {slide.title}
                        </h3>
                        <div className="flex items-center justify-between mt-6">
                          <p className="text-white/80 w-3/5">
                            {slide.description}
                          </p>
                          <MainButton
                            text="Смотреть кейс"
                            href={`/portfolio/${slide.id}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Vertical Product Slider - Styled like ProductsSlider */}
          <div className="hidden lg:block lg:col-span-3 h-[600px] relative">
            <div className="h-full overflow-hidden">
              <Swiper
                onSwiper={(swiper) => {
                  setThumbsSwiper(swiper);
                  thumbsSwiperRef.current = swiper;
                }}
                slidesPerView={3}
                spaceBetween={20}
                direction="vertical"
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="h-full thumbsSwiper"
                loop={true}
                speed={300}
              >
                {slides.map((slide) => (
                  <SwiperSlide key={`thumb-${slide.id}`}>
                    <div className="group h-full cursor-pointer">
                      <div className="relative h-[190px] overflow-hidden rounded-lg">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="text-white text-sm font-medium line-clamp-2">
                            {slide.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center mt-8">
          {/* Slide Counter */}
          <div className="mr-6 text-white text-2xl font-light">
            {currentSlide}/{totalSlides}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center space-x-3 mr-8">
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

          {/* Original Slider Indicators */}
          <div className="flex-1 relative hidden md:block">
            <div id="slider-indicators" className={styles.sliderIndicators}>
              {indicatorBars}
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default SliderSection;
