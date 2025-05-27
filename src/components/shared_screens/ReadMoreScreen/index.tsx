"use client";

import { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomContainer from "@/components/ui/CustomContainer";
import TransitionLink from "@/components/ui/TransitionLink";

import { newsItems } from "./mock_data";
import SectionHeader from "@/components/ui/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const ReadMore: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Add ScrollTrigger refresh effect
  useEffect(() => {
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    // Refresh on load
    window.addEventListener("load", refreshScrollTrigger);

    // Refresh on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(refreshScrollTrigger, 100);
    };
    window.addEventListener("resize", handleResize);

    // Initial refresh
    refreshScrollTrigger();

    return () => {
      window.removeEventListener("load", refreshScrollTrigger);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    // Check if device is touch-enabled
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // Generate indicator bars only once
    const indicatorCount = 60;
    const indicatorsContainer = document.getElementById(
      "news-slider-indicators"
    );

    if (indicatorsContainer && indicatorsContainer.children.length === 0) {
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div");
        indicator.className =
          "news-indicator-bar h-[4px] bg-white transition-all duration-300 flex-1";
        indicator.style.maxWidth = "1px";
        indicator.style.width = "1px";
        indicatorsContainer.appendChild(indicator);
      }
    }

    // Update indicators function
    function updateNewsIndicators(swiper: SwiperType) {
      const slideCount = swiper.slides.filter(
        (slide: HTMLElement) =>
          !slide.classList.contains("swiper-slide-duplicate")
      ).length;
      const currentIndex = swiper.realIndex % slideCount;
      const totalPositions = indicatorCount - 5;
      const progress = currentIndex / (slideCount - 1);
      const position = Math.round(progress * totalPositions);

      document
        .querySelectorAll(".news-indicator-bar")
        .forEach((indicator, index) => {
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

    // Initialize Swiper
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", () => {
        updateNewsIndicators(swiperRef.current!);
      });
      swiperRef.current.on("init", () => {
        updateNewsIndicators(swiperRef.current!);
      });
    }

    // Cleanup function
    return () => {
      if (swiperRef.current) {
        swiperRef.current.off("slideChange");
        swiperRef.current.off("init");
      }
    };
  }, []); // Empty dependency array ensures this only runs once

  return (
    <section className="py-20">
      <CustomContainer>
        <SectionHeader
          bracketsText="НОВОСТИ"
          heading={<>Читайте также</>}
          description="Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует подготовке и реализации анализа существующих паттернов поведения."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        {/* Slider Container */}
        <div className="relative">
          <Swiper
            className="newsSwiper"
            modules={[Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: ".news-next",
              prevEl: ".news-prev",
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            autoplay={
              !isTouchDevice
                ? {
                    delay: 3000000,
                    disableOnInteraction: false,
                  }
                : false
            }
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {newsItems.map((item) => (
              <SwiperSlide key={item.id}>
                <TransitionLink href={item.link} className="block">
                  <article className="group relative overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-300 ease-in-out">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover ${
                          !isTouchDevice
                            ? "transition-transform duration-500 ease-in-out group-hover:scale-105"
                            : ""
                        }`}
                        fill
                      />
                      {/* Default overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 transition-opacity duration-300 ease-in-out"></div>

                      {/* Darker overlay that appears on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/90 ${
                          !isTouchDevice ? "opacity-100" : "opacity-100"
                        }`}
                      ></div>

                      {/* Content overlay */}
                      <div className="absolute inset-0 p-6 flex flex-col z-10">
                        {/* Top content */}
                        <div>
                          <span className="inline-block px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded font-light">
                            {item.category}
                          </span>
                        </div>

                        {/* Bottom content */}
                        <div
                          className={`mt-auto ${
                            !isTouchDevice
                              ? "transition-transform duration-300 ease-in-out group-hover:-translate-y-36"
                              : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3 text-white/80 text-sm mb-3">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.readTime}</span>
                          </div>
                          <h3 className="text-2xl text-white font-light leading-tight">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description and Button that appear on hover (desktop only) */}
                        <div
                          className={`absolute bottom-6 left-6 right-6 ${
                            !isTouchDevice
                              ? "transform translate-y-16 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
                              : "hidden"
                          }`}
                        >
                          <p className="text-white/80 text-sm mb-6">
                            {item.description.length > 80
                              ? `${item.description.slice(0, 80)}...`
                              : item.description}
                          </p>
                          <div className="inline-flex items-center group/news-button">
                            <div
                              className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center ${
                                !isTouchDevice
                                  ? "group-hover/news-button:border-white/60 transition-colors duration-300"
                                  : ""
                              }`}
                            >
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                ></path>
                              </svg>
                            </div>
                            <span
                              className={`ml-4 text-white text-lg border-b border-white/30 ${
                                !isTouchDevice
                                  ? "transition-colors duration-300 group-hover/news-button:border-white"
                                  : ""
                              }`}
                            >
                              Читать
                            </span>
                          </div>
                        </div>

                        {/* Button for touch devices */}
                        <div
                          className={`mt-6 ${
                            isTouchDevice ? "block" : "hidden"
                          }`}
                        >
                          <div className="inline-flex items-center group/news-button">
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                ></path>
                              </svg>
                            </div>
                            <span className="ml-4 text-white text-lg border-b border-white/30">
                              Читать
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </TransitionLink>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Controls Section */}
          <div className="flex items-center mt-8">
            {/* Navigation Arrows */}
            <div className="flex items-center space-x-3 mr-8">
              <button className="news-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
              <button className="news-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
            <div className="flex-1 relative hidden md:block">
              <div
                id="news-slider-indicators"
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

export default ReadMore;
