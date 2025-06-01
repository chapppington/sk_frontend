"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import CustomContainer from "@/components/ui/CustomContainer";
import MainButton from "@/components/ui/MainButton";
import GradientHeading from "@/components/ui/GradientHeading";
import AnimatedText from "@/components/ui/AnimatedText";

import { brands, products } from "./mock_data";

export default function ProductsSlider() {
  const swiperRef = useRef<any>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  const updateProductsIndicators = (swiper: any) => {
    if (!swiper || !swiper.slides) return;

    const slideCount = swiper.slides.filter(
      (slide: any) => !slide.classList.contains("swiper-slide-duplicate")
    ).length;
    if (slideCount === 0) return;

    const currentIndex = swiper.realIndex % slideCount;
    const totalPositions = 40 - 5;
    const progress = currentIndex / (slideCount - 1);
    const position = Math.round(progress * totalPositions);

    document
      .querySelectorAll(".products-indicator-bar")
      .forEach((indicator: any, index) => {
        indicator.style.width = "6px";

        if (index >= position && index < position + 5) {
          const relativePos = index - position;

          if (relativePos === 2) {
            indicator.style.width = "40px";
          } else if (relativePos === 1 || relativePos === 3) {
            indicator.style.width = "20px";
          } else {
            indicator.style.width = "4px";
          }
        }
      });
  };

  useEffect(() => {
    let isComponentMounted = true;

    // Clear any existing indicators before creating new ones
    if (indicatorsRef.current) {
      indicatorsRef.current.innerHTML = "";

      const indicatorCount = 40;
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div");
        indicator.className =
          "products-indicator-bar w-[4px] bg-white transition-all duration-300 flex-1";
        indicator.style.maxHeight = "1px";
        indicator.style.height = "1px";
        indicatorsRef.current.appendChild(indicator);
      }

      // Set initial state of indicators
      if (swiperRef.current && isComponentMounted) {
        updateProductsIndicators(swiperRef.current);
      }
    }

    // Refresh ScrollTrigger after component mounts
    if (isComponentMounted) {
      ScrollTrigger.refresh();
      // Add a small delay before showing the button to allow layout to settle
      setTimeout(() => {
        setShowButton(true);
      }, 100);
    }

    // Cleanup function
    return () => {
      isComponentMounted = false;
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
      if (indicatorsRef.current) {
        indicatorsRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section id="products_slider_section" className="bg-transparent py-24">
      <CustomContainer>
        <div className="mb-8">
          <span className="text-white/40 text-sm tracking-wider">
            [ МЫ ПРОИЗВОДИМ ]
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div
            className="flex-1 flex flex-col justify-end"
            style={{ transform: "translateZ(0)" }}
          >
            <AnimatedText delay={0}>
              <GradientHeading className="mb-6">
                Низковольтные
                <br /> комплектные устройства
              </GradientHeading>
            </AnimatedText>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-white/60 text-sm">
                Бренды оборудования:
              </span>
              <div className="flex flex-wrap gap-6">
                {brands.map((brand, index) => (
                  <Image
                    key={index}
                    src={brand.image}
                    alt={brand.name}
                    width={70}
                    height={50}
                    className="h-5 opacity-40 hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            <AnimatedText delay={0}>
              <p className="text-white/60 text-lg mb-4 max-w-2xl">
                Как уже неоднократно упомянуто, действия представителей
                оппозиции объявлены нарушающими общечеловеческие нормы этики и
                морали.
              </p>
            </AnimatedText>

            {showButton && <MainButton text="Узнать больше" />}

            <div className="flex items-center mt-12">
              <div className="flex items-center space-x-3">
                <button className="products-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
                <button className="products-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
          </div>

          <div className="w-full md:w-auto md:min-w-[500px] md:max-w-[500px] relative">
            <div className="flex items-center justify-end h-[600px] absolute right-0 top-0 z-10">
              <div
                ref={indicatorsRef}
                className="flex flex-col items-center justify-between h-full"
                style={{ width: "40px" }}
              />
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              direction="vertical"
              slidesPerView={5}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".products-next",
                prevEl: ".products-prev",
              }}
              onSlideChange={(swiper) => {
                if (swiper) {
                  updateProductsIndicators(swiper);
                }
              }}
              onInit={(swiper) => {
                if (swiper) {
                  swiperRef.current = swiper;
                  setTimeout(() => {
                    if (swiperRef.current) {
                      updateProductsIndicators(swiper);
                    }
                  }, 0);
                }
              }}
              className="h-[600px] w-full"
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="group h-full">
                    <div className="relative pt-4 h-full">
                      <div className="flex items-center h-full">
                        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] relative overflow-hidden flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain opacity-20"
                          />
                        </div>
                        <h3 className="text-base md:text-xl text-white font-light ml-4 md:ml-6 line-clamp-2">
                          {product.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}
