"use client";
import Image from "next/image";
import { FC, useState, useRef } from "react";
import { IProduct } from "@/shared/types/product.types";
import { BACKEND_MAIN } from "@/constants";

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
import { NavigationButton } from "@/components/ui/NavigationButton";

interface SliderSectionProps {
  product: IProduct;
}

const SliderSection: FC<SliderSectionProps> = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = product.portfolioItems.length;
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);
  const sliderId = "product-slider";

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

  // Handle slide change
  const handleSlideChange = (swiper: SwiperType) => {
    try {
      // Handle looped slides by using realIndex
      const newSlide = (swiper.realIndex % totalSlides) + 1;
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    } catch (err) {
      console.error("Error in main slider change:", err);
    }
  };

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
              onSlideChange={handleSlideChange}
            >
              {product.portfolioItems.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
                    <Image
                      src={`${BACKEND_MAIN}/uploads/portfolio/${slide.poster}`}
                      alt={slide.name}
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
                          {slide.name}
                        </h3>
                        <div className="flex items-center justify-between mt-6">
                          <p className="text-white/80 w-3/5">
                            {slide.description}
                          </p>
                          <MainButton
                            text="Смотреть кейс"
                            href={`/portfolio/${slide.slug}`}
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
                {product.portfolioItems.map((slide) => (
                  <SwiperSlide key={`thumb-${slide.id}`}>
                    <div className="group h-full cursor-pointer">
                      <div className="relative h-[190px] overflow-hidden rounded-lg">
                        <Image
                          src={`${BACKEND_MAIN}/uploads/portfolio/${slide.poster}`}
                          alt={slide.name}
                          fill
                          className="object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="text-white text-sm font-medium line-clamp-2">
                            {slide.name}
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

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <NavigationButton
            direction="prev"
            sliderId={sliderId}
            onClick={handlePrev}
          />

          <span className="text-white text-sm">
            {currentSlide} / {totalSlides}
          </span>

          <NavigationButton
            direction="next"
            sliderId={sliderId}
            onClick={handleNext}
          />
        </div>
      </CustomContainer>
    </section>
  );
};

export default SliderSection;
