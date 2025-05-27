"use client";
import "swiper/css";
import "swiper/css/navigation";
import { FC, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";

interface HistoryEvent {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

const historyEvents: HistoryEvent[] = [
  {
    id: 1,
    number: "2020",
    title: "Основание компании",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 2,
    number: "2021",
    title: "Первый проект",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 3,
    number: "2022",
    title: "Расширение производства",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 4,
    number: "2023",
    title: "Новые технологии",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 5,
    number: "2024",
    title: "Инновации",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
];

const History: FC = () => {
  const [activeIndicator, setActiveIndicator] = useState(0);
  const swiperRef = useRef<any>(null);

  const updateIndicators = (swiper: any) => {
    const slideCount = swiper.slides.filter(
      (slide: any) => !slide.classList.contains("swiper-slide-duplicate")
    ).length;
    const currentIndex = swiper.realIndex % slideCount;
    const totalPositions = 60 - 5;
    const progress = currentIndex / (slideCount - 1);
    const position = Math.round(progress * totalPositions);
    setActiveIndicator(position);
  };

  return (
    <section id="history_section" className="bg-transparent py-24 relative">
      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      ></div>

      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText="Развитие"
          heading={<>История</>}
          description="Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует подготовке и реализации анализа существующих паттернов поведения."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />
        {/* Production Stages Slider */}
        <div className="relative pb-2">
          <Swiper
            className="historySwiper"
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".history-next",
              prevEl: ".history-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateIndicators(swiper);
            }}
            onSlideChange={(swiper) => {
              updateIndicators(swiper);
            }}
          >
            {historyEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <article className="group relative overflow-hidden">
                  <div
                    className="relative aspect-[3/4] overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      clipPath:
                        "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
                    }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                      fill
                    />
                    {/* Default overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 transition-opacity duration-300 ease-in-out"
                      style={{
                        clipPath:
                          "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
                      }}
                    ></div>

                    {/* Darker overlay that appears on hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-black/45 to-black/90 lg:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out lg:group-hover:opacity-100"
                      style={{
                        clipPath:
                          "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
                      }}
                    ></div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col z-10">
                      {/* Top content */}
                      <div>
                        <span className="inline-block px-4 py-4 bg-black/70 backdrop-blur-sm text-white text-5xl rounded-md font-light">
                          {event.number}
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="mt-auto lg:transition-transform lg:duration-300 lg:ease-in-out lg:group-hover:-translate-y-20">
                        <h3 className="text-2xl text-white font-light leading-tight lg:mb-0 mb-4">
                          {event.title}
                        </h3>

                        {/* Mobile/Tablet Description */}
                        <div className="block lg:hidden">
                          <p className="text-white/80 text-sm">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Desktop hover description */}
                      <div className="absolute bottom-2 left-6 right-6 transform translate-y-16 opacity-0 transition-all duration-300 ease-in-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 hidden lg:block">
                        <p className="text-white/80 text-sm mb-6">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Controls */}
          <div className="flex items-center mt-8">
            <div className="flex items-center space-x-3 mr-8">
              <button className="history-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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

              <button className="history-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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

            {/* Slider Indicators (hidden on mobile) */}
            <div className="flex-1 relative hidden sm:block">
              <div className="flex items-center justify-between w-full">
                {Array.from({ length: 60 }).map((_, index) => {
                  const isActive =
                    index >= activeIndicator && index < activeIndicator + 5;
                  const relativePos = index - activeIndicator;
                  let height = "6px";

                  if (isActive) {
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
                      className="history-indicator-bar bg-white transition-all duration-300 flex-1"
                      style={{
                        maxWidth: "1px",
                        width: "1px",
                        height: height,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default History;
