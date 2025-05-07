"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";

const reviews = [
  {
    company: "sberbank.png",
    title: "Комплектные трансформаторные подстанции",
    text: "Приятно, граждане, наблюдать, как диаграммы связей, инициированные исключительно синтетически, представлены в исключительно положительном свете.",
  },
  // Duplicate the review 6 more times as per the original
  ...Array(6).fill({
    company: "sberbank.png",
    title: "Комплектные трансформаторные подстанции",
    text: "Приятно, граждане, наблюдать, как диаграммы связей, инициированные исключительно синтетически, представлены в исключительно положительном свете.",
  }),
];

const CustomerReviews = () => {
  const swiperRef = useRef<any>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (indicatorsRef.current) {
      // Generate indicator bars
      const indicatorCount = 60;
      for (let i = 0; i < indicatorCount; i++) {
        const indicator = document.createElement("div");
        indicator.className =
          "reviews-indicator-bar h-[4px] bg-white transition-all duration-300 flex-1";
        indicator.style.maxWidth = "1px";
        indicator.style.width = "1px";
        indicatorsRef.current.appendChild(indicator);
      }
    }
  }, []);

  const updateReviewsIndicators = (swiper: any) => {
    if (!indicatorsRef.current) return;

    const slideCount = swiper.slides.filter(
      (slide: any) => !slide.classList.contains("swiper-slide-duplicate")
    ).length;

    const currentIndex = swiper.realIndex % slideCount;
    const totalPositions = 60 - 5;
    const progress = currentIndex / (slideCount - 1);
    const position = Math.round(progress * totalPositions);

    const indicators = indicatorsRef.current.querySelectorAll(
      ".reviews-indicator-bar"
    );
    indicators.forEach((indicator: any, index: number) => {
      indicator.style.height = "6px";

      if (index >= position && index < position + 5) {
        const relativePos = index - position;

        if (relativePos === 2) {
          indicator.style.height = "40px";
        } else if (relativePos === 1 || relativePos === 3) {
          indicator.style.height = "20px";
        } else {
          indicator.style.height = "4px";
        }
      }
    });
  };

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <span className="text-white/40 text-sm tracking-wider">
              [ ЧТО ПРЕДЛАГАЕМ ]
            </span>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Мнение наших клиентов</GradientHeading>
            <p className="text-white/70 mt-6">
              Как уже неоднократно упомянуто, действия представителей оппозиции
              объявлены нарушающими общечеловеческие нормы этики и морали.
            </p>
          </div>
        </div>

        <div className="relative pb-2">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".reviews-next",
              prevEl: ".reviews-prev",
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            onSlideChange={(swiper) => updateReviewsIndicators(swiper)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateReviewsIndicators(swiper);
            }}
            className="reviewsSwiper"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="border border-white/20 p-10 backdrop-blur-sm h-full flex flex-col justify-around">
                  <div className="flex items-center">
                    <img
                      src={review.company}
                      alt="SBER BANK"
                      className="h-5 opacity-80"
                    />
                  </div>
                  <h3 className="text-xl text-white font-normal mt-6">
                    {review.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-6">{review.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center mt-8">
            <div className="flex items-center space-x-3 mr-8">
              <button className="reviews-prev w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
                  />
                </svg>
              </button>

              <button className="reviews-next w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-colors">
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
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 relative hidden sm:block">
              <div
                ref={indicatorsRef}
                className="flex items-center justify-between w-full"
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default CustomerReviews;
