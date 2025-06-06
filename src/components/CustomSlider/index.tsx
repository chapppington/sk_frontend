"use client";

import "swiper/css";
import "swiper/css/navigation";
import { CustomSliderProps } from "./types";
import { NavigationButton } from "./components/NavigationButton";
import { Indicators } from "./components/Indicators";
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
      {/* Main slider container using Swiper */}
      <div className={`swiper custom-swiper-${sliderId}`}>
        <div className="swiper-wrapper">
          {/* Map through children to create individual slides */}
          {children.map((child, index) => (
            <div key={index} className="swiper-slide">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation controls and indicators container */}
      <div className={`flex items-center mt-8 ${navigationClassName}`}>
        {/* Previous and Next navigation buttons */}
        <div className="flex items-center space-x-3 mr-8">
          <NavigationButton direction="prev" sliderId={sliderId} />
          <NavigationButton direction="next" sliderId={sliderId} />
        </div>

        {/* Progress indicators */}
        <Indicators
          indicatorsRef={indicatorsRef}
          showIndicators={showIndicators}
        />
      </div>
    </div>
  );
};

export default CustomSlider;
