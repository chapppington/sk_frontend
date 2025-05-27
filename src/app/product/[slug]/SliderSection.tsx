"use client";

import { FC, useState, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import type SwiperType from "swiper";
import MainButton from "@/components/ui/MainButton";
import AnimatedText from "@/components/ui/textAnimation/AnimatedText";

// Mock data - with varied content and different images from public folder
const slides = [
  {
    id: 1,
    title: "Строительство объектов энергетики",
    description:
      "Крупный проект по энергообеспечению промышленного комплекса с применением современных технологий и автоматизированных систем управления. Включает полный цикл от проектирования до ввода в эксплуатацию.",
    year: "2024 год",
    image: "/construction_bg.webp",
    icon: "/item.png",
  },
  {
    id: 2,
    title: "Трансформаторные подстанции",
    description:
      "Модернизация энергосистем в городской среде с учетом повышенных требований к безопасности и надежности. Разработка и внедрение решений для стабильного электроснабжения с минимальным воздействием на окружающую среду.",
    year: "2023 год",
    image: "/transformer.webp",
    icon: "/item.png",
  },
  {
    id: 3,
    title: "Производственная база",
    description:
      "Масштабирование производственных мощностей с интеграцией цифровых решений для оптимизации производственного процесса. Внедрение автоматизированных линий и систем контроля качества продукции.",
    year: "2024 год",
    image: "/production_bg.webp",
    icon: "/item.png",
  },
  {
    id: 4,
    title: "Разработка новых технологий",
    description:
      "Инновационные решения для энергетического сектора, направленные на повышение энергоэффективности и снижение углеродного следа. Применение современных материалов и передовых инженерных разработок.",
    year: "2023 год",
    image: "/production_bg_new.webp",
    icon: "/item.png",
  },
  {
    id: 5,
    title: "Модернизация оборудования",
    description:
      "Внедрение современных стандартов производства с целью увеличения срока службы оборудования и снижения эксплуатационных затрат. Включает комплексную диагностику и замену устаревших компонентов.",
    year: "2022 год",
    image: "/news_bg2.webp",
    icon: "/item.png",
  },
  {
    id: 6,
    title: "Корпоративные клиенты",
    description:
      "Комплексные решения для бизнеса любого масштаба с учетом специфики отрасли и индивидуальных потребностей клиента. Разработка и внедрение энергетической инфраструктуры под ключ с последующим сервисным обслуживанием.",
    year: "2022 год",
    image: "/production_bg.webp",
    icon: "/item.png",
  },
  {
    id: 7,
    title: "Партнерская программа",
    description:
      "Сотрудничество с ведущими компаниями отрасли для создания интегрированных решений и обмена опытом. Совместная разработка инновационных продуктов и реализация масштабных проектов в энергетической сфере.",
    year: "2023 год",
    image: "/news_bg2.webp",
    icon: "/item.png",
  },
];

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
        {/* Header Section */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          {/* Column 1 - Category Label */}
          <div className="col-span-12 lg:col-span-3">
            <BracketsText>ГДЕ ПРИМЕНЯЛОСЬ</BracketsText>
          </div>

          {/* Column 2 - Main Title */}
          <div className="col-span-12 lg:col-span-5">
            <AnimatedText delay={0}>
              <GradientHeading>Кейсы применения оборудования</GradientHeading>
            </AnimatedText>
          </div>

          {/* Column 3 - Description */}
          <div className="col-span-12 lg:col-span-4">
            <AnimatedText delay={0}>
              <p className="text-white/70">
                Наша компания успешно реализовала множество проектов разного
                масштаба, от небольших локальных объектов до крупных
                промышленных комплексов.
              </p>
            </AnimatedText>
          </div>
        </div>

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
        .thumbsSwiper .swiper-slide {
          transition: all 0.3s ease;
        }

        .thumbsSwiper .swiper-slide-thumb-active img {
          opacity: 1;
        }

        .productSlider .swiper-slide {
          width: 100%;
          height: 600px;
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

export default SliderSection;
