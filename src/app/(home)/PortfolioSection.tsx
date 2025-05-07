"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CustomContainer from "@/components/ui/CustomContainer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import MainButton from "@/components/ui/MainButton";

// Sample data for portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "Барнаульская ТЭЦ-3",
    description:
      "Модернизация системы электроснабжения и установка современного распределительного оборудования на одной из крупнейших теплоэлектроцентралей Алтайского края.",
    location: "Алтайский край",
    image: "/news_bg.webp",
  },
  {
    id: 2,
    title: "Бийская ТЭЦ",
    description:
      "Комплексная реконструкция распределительных устройств и внедрение автоматизированной системы управления технологическими процессами.",
    location: "Алтайский край",
    image: "/news_bg2.webp",
  },
  {
    id: 3,
    title: "Новосибирская ГЭС",
    description:
      "Модернизация системы релейной защиты и автоматики, замена силового оборудования на современные аналоги с повышенной надежностью.",
    location: "Новосибирская область",
    image: "/news_bg.webp",
  },
  {
    id: 4,
    title: "Красноярская ГРЭС-2",
    description:
      "Внедрение цифровой системы мониторинга и управления электрическими подстанциями, обеспечивающей повышенную надежность энергоснабжения.",
    location: "Красноярский край",
    image: "/news_bg2.webp",
  },
];

const indicatorCount = 40;

const PortfolioSection = () => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgLoaded, setBgLoaded] = useState<Record<number, boolean>>({});
  const [indicatorState, setIndicatorState] = useState<number[]>(
    Array(indicatorCount).fill(4)
  );

  // Update indicators based on Swiper's realIndex
  const updatePortfolioIndicators = (realIndex: number) => {
    const slideCount = portfolioItems.length;
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
  }, [activeIndex]);

  return (
    <section
      id="portfolio_section"
      className="bg-transparent py-24 relative min-h-screen flex flex-col justify-end"
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          {portfolioItems.map((item, idx) =>
            idx === activeIndex || bgLoaded[idx] ? (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: idx === activeIndex ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: idx === activeIndex ? 2 : 1 }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={idx === activeIndex}
                  onLoadingComplete={() => {
                    setBgLoaded((prev) => ({ ...prev, [idx]: true }));
                  }}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-5xl text-white font-light mb-8 portfolio-title">
                    {portfolioItems[activeIndex].title}
                  </h2>
                  <p className="text-white/60 text-lg mb-12 portfolio-description">
                    {portfolioItems[activeIndex].description}
                  </p>

                  <MainButton text="Узнать подробнее" />
                </motion.div>
              </AnimatePresence>
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
                nextEl: ".portfolio-next",
                prevEl: ".portfolio-prev",
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              onInit={(swiper) => {
                swiperRef.current = swiper;
                setActiveIndex(swiper.realIndex);
              }}
              className="portfolioSwiper h-[220px] sm:h-[260px] md:h-[300px] w-full max-w-full"
            >
              {portfolioItems.map((item, idx) => (
                <SwiperSlide key={item.id}>
                  <div className="cursor-pointer group relative h-full">
                    <div className="relative h-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={item.image}
                        alt="Portfolio Project"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx === activeIndex}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-white/60 text-sm mb-2">
                          {item.location}
                        </div>
                        <h3 className="text-white text-xl font-light">
                          {item.title}
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
                <button className="portfolio-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
                <button className="portfolio-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
