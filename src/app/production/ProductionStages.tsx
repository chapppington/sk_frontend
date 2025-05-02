"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CustomContainer from "@/components/ui/CustomContainer";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";

interface ProductionStage {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

const productionStages: ProductionStage[] = [
  {
    id: 1,
    number: "01",
    title: "Первая стадия",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 2,
    number: "02",
    title: "Вторая стадия",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 3,
    number: "03",
    title: "Третья стадия",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 4,
    number: "04",
    title: "Четвертая стадия",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
  {
    id: 5,
    number: "05",
    title: "Пятая стадия",
    description:
      "Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует...",
    image: "/construction_bg.webp",
  },
];

const ProductionStages: FC = () => {
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
    <section
      id="production_stages_section"
      className="bg-transparent py-24 relative"
    >
      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      ></div>

      <CustomContainer className="h-full flex flex-col relative z-10">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-start mb-12 flex-wrap gap-y-6">
          <div className="text-white/60 md:w-full lg:w-auto">[ ЭТАПЫ ]</div>
          <GradientHeading>Этапы<br></br>производства</GradientHeading>
          <p className="text-white/60 max-w-md text-left md:w-full lg:w-auto lg:max-w-md">
            Задача организации, в особенности же экономическая повестка
            сегодняшнего дня способствует подготовке и реализации анализа
            существующих паттернов поведения.
          </p>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden mb-8">
          <div className="text-white/60 mb-2">[ ЭТАПЫ ]</div>
          <h2 className="text-3xl text-white font-light mt-3">Этапы<br></br>производства</h2>
          <p className="text-white/60 max-w-md text-left mt-5">
            Задача организации, в особенности же экономическая повестка
            сегодняшнего дня способствует подготовке и реализации анализа
            существующих паттернов поведения.
          </p>
        </div>

        {/* Production Stages Slider */}
        <div className="relative pb-2">
          <Swiper
            className="productionSwiper"
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".production-next",
              prevEl: ".production-prev",
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
            {productionStages.map((stage) => (
              <SwiperSlide key={stage.id}>
                <article className="group relative overflow-hidden">
                  <div
                    className="relative aspect-[3/4] overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      clipPath:
                        "polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)",
                    }}
                  >
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
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
                          {stage.number}
                        </span>
                      </div>

                      {/* Bottom content */}
                      <div className="mt-auto lg:transition-transform lg:duration-300 lg:ease-in-out lg:group-hover:-translate-y-20">
                        <h3 className="text-2xl text-white font-light leading-tight lg:mb-0 mb-4">
                          {stage.title}
                        </h3>

                        {/* Mobile/Tablet Description */}
                        <div className="block lg:hidden">
                          <p className="text-white/80 text-sm">
                            {stage.description}
                          </p>
                        </div>
                      </div>

                      {/* Desktop hover description */}
                      <div className="absolute bottom-2 left-6 right-6 transform translate-y-16 opacity-0 transition-all duration-300 ease-in-out lg:group-hover:translate-y-0 lg:group-hover:opacity-100 hidden lg:block">
                        <p className="text-white/80 text-sm mb-6">
                          {stage.description}
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
                  ></path>
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
                      className="production-indicator-bar bg-white transition-all duration-300 flex-1"
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

export default ProductionStages;
