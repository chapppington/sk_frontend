"use client";

import { FC, useState, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import type SwiperType from "swiper";
import MainButton from "@/components/ui/MainButton";
import AnimatedText from "@/components/ui/AnimatedText";

// Mock data for other projects
const projects = [
  {
    id: 1,
    title: "Павловский деревообрабатывающий комбинат",
    year: "2024 год",
    image: "/construction_bg.webp",
  },
  {
    id: 2,
    title: "Барнаульская ТЭЦ-3",
    year: "2023 год",
    image: "/transformer.webp",
  },
  {
    id: 3,
    title: "Бийская ТЭЦ",
    year: "2024 год",
    image: "/production_bg.webp",
  },
  {
    id: 4,
    title: "Новосибирская ГЭС",
    year: "2023 год",
    image: "/production_bg_new.webp",
  },
];

const MoreProjectsScreen: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalItems = projects.length;
  const mainSwiperRef = useRef<SwiperType | null>(null);

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

  // Generate indicator bars
  const indicatorBars = useMemo(() => {
    const indicatorCount = 60;
    return Array.from({ length: indicatorCount }).map((_, index) => {
      // Calculate active position
      const totalPositions = indicatorCount - 5;
      const progress =
        totalItems > 1 ? (currentSlide - 1) / (totalItems - 1) : 0;
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
  }, [currentSlide, totalItems]);

  return (
    <section className="bg-transparent py-24 relative">
      <CustomContainer className="h-full flex flex-col relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          {/* Main Title (left) */}
          <div className="mb-4 lg:mb-0 lg:max-w-[60%]">
            <AnimatedText delay={0}>
              <GradientHeading>Другие проекты</GradientHeading>
            </AnimatedText>
          </div>

          {/* Category Label (right) */}
          <div className="self-end lg:self-start">
            <BracketsText>ОПЫТ</BracketsText>
          </div>
        </div>

        {/* Slider Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Projects Slider */}
          <div className="overflow-hidden">
            <Swiper
              spaceBetween={20}
              slidesPerView={2}
              loop={true}
              speed={300}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
              className="projectsSlider"
              onSwiper={(swiper) => {
                mainSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                try {
                  // Handle looped slides by using realIndex
                  const newSlide = swiper.realIndex + 1;
                  if (newSlide !== currentSlide) {
                    setCurrentSlide(newSlide);
                  }
                } catch (err) {
                  console.error("Error in main slider change:", err);
                }
              }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="relative h-[420px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                      className="brightness-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                    <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                      <div className="flex items-center">
                        <button className="py-2 px-4 bg-white text-dark text-sm rounded-md">
                          Что реализовали
                        </button>
                        <button className="py-2 px-4 ml-2 bg-white text-dark text-sm rounded-md">
                          {project.year}
                        </button>
                      </div>

                      <div className="w-full">
                        <h3 className="text-3xl text-white max-w-[66.67%]">
                          {project.title}
                        </h3>
                        <MainButton
                          text="Узнать подробнее"
                          href={`/portfolio/${project.id}`}
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex items-center mt-8">
          {/* Slide Counter - Now showing total items instead of slides */}
          <div className="mr-6 text-white text-2xl font-light">
            {currentSlide}/{projects.length}
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

          {/* Slider Indicators */}
          <div className="flex-1 relative hidden md:block">
            <div
              id="slider-indicators"
              className="flex items-center justify-between w-full"
            >
              {indicatorBars}
            </div>
          </div>
        </div>
      </CustomContainer>

      <style jsx global>{`
        .projectsSlider .swiper-slide {
          height: 420px;
        }

        #slider-indicators {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
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
    </section>
  );
};

export default MoreProjectsScreen;
