import { useEffect, useRef } from "react";
import { Navigation, Autoplay } from "swiper/modules";
import Swiper from "swiper";
import type { Swiper as SwiperType } from "swiper";
import { UseSwiperProps } from "../types";

export const useSliderSetup = ({
  sliderId,
  autoplay,
  autoplayDelay,
  slidesPerView,
  spaceBetween,
  loop,
  breakpoints,
  onSlideChange,
  onInit,
}: UseSwiperProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (!swiperRef.current) {
      const swiperElement = document.querySelector(
        `.custom-swiper-${sliderId}`
      ) as HTMLElement;

      if (swiperElement) {
        swiperRef.current = new Swiper(swiperElement, {
          modules: [Navigation, Autoplay],
          spaceBetween,
          slidesPerView,
          loop,
          breakpoints,
          autoplay: autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
              }
            : false,
          navigation: {
            nextEl: `.slider-next-${sliderId}`,
            prevEl: `.slider-prev-${sliderId}`,
          },
          on: {
            slideChange: function (this: SwiperType) {
              onSlideChange?.(this);
            },
            init: function (this: SwiperType) {
              onInit?.(this);
            },
          },
        });
      }
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
    };
  }, [
    sliderId,
    autoplay,
    autoplayDelay,
    slidesPerView,
    spaceBetween,
    loop,
    breakpoints,
    onSlideChange,
    onInit,
  ]);

  return swiperRef;
};
