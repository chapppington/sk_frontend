import { ReactNode } from "react";

export interface CustomSliderProps {
  children: ReactNode[];
  autoplay?: boolean;
  autoplayDelay?: number;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
  className?: string;
  navigationClassName?: string;
  showIndicators?: boolean;
  indicatorCount?: number;
  breakpoints?: Record<string, any>;
}

export interface UseSwiperProps {
  sliderId: string;
  autoplay: boolean;
  autoplayDelay: number;
  slidesPerView: number | "auto";
  spaceBetween: number;
  loop: boolean;
  breakpoints?: Record<string, any>;
  onSlideChange?: (swiper: any) => void;
  onInit?: (swiper: any) => void;
}

export interface NavigationButtonProps {
  direction: "prev" | "next";
  sliderId: string;
}
