"use client";

import "swiper/css";
import "swiper/css/navigation";
import { CustomSliderProps } from "./types";
import { SliderContent } from "./components/SliderContent";
import { NavigationControls } from "./components/NavigationControls";
import { useIndicators } from "./hooks/useIndicators";
import { useSliderSetup } from "./hooks/useSliderSetup";
import { useId } from "react";

const CustomSlider = ({
  children, // Array of elements to be displayed as slides
  autoplay = true, // Enable/disable automatic sliding
  autoplayDelay = 5000, // Delay between slides in milliseconds
  slidesPerView = 1, // Number of slides to show at once
  spaceBetween = 20, // Space between slides in pixels
  loop = true, // Enable/disable infinite loop
  className = "", // Additional CSS classes for the container
  navigationClassName = "", // Additional CSS classes for navigation controls
  showIndicators = true, // Show/hide progress indicators
  indicatorCount = 60, // Number of indicator dots to show
  breakpoints, // Responsive breakpoints configuration
}: CustomSliderProps) => {
  const sliderId = useId();

  // Hook to manage progress indicators state and updates
  const { indicatorsRef, updateIndicators } = useIndicators({
    showIndicators,
    indicatorCount,
    sliderId,
  });

  // Hook to initialize and configure the Swiper slider
  useSliderSetup({
    sliderId,
    autoplay,
    autoplayDelay,
    slidesPerView,
    spaceBetween,
    loop,
    breakpoints,
    onSlideChange: updateIndicators,
    onInit: updateIndicators,
  });

  return (
    <div className={`relative pb-2 ${className}`}>
      <SliderContent sliderId={sliderId}>{children}</SliderContent>

      <NavigationControls
        sliderId={sliderId}
        indicatorsRef={indicatorsRef}
        showIndicators={showIndicators}
        navigationClassName={navigationClassName}
      />
    </div>
  );
};

export default CustomSlider;
