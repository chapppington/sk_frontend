"use client"
import React, { useEffect, useState } from "react";
import { useScrollOffset } from "@/components/ProductsSlider3D/features/ScrollProviderOffset";
import { gsap } from "gsap";
const SliderSelectButtons = () => {
    // TODO: Сделать currentSLide пропсом чтобы можно было взаимодействовать с выбранным слайдом
    const totalSlides = 7; // Set the total number of slides
    const [currentSlide, setCurrentSlide] = useState(1);
    const {scrollOffset, setScrollOffset} = useScrollOffset();

    useEffect(() => {
      // Calculate target scroll offset based on the current slide
      const targetOffset = (currentSlide - 1) / totalSlides;
  
      // Animate scrollOffset using gsap
      gsap.to({ offset: scrollOffset }, {
        offset: targetOffset,
        duration: 0.5, // Duration of the animation in seconds
        ease: "power4.out", // Easing function
        onUpdate: function () {
          setScrollOffset(this.targets()[0].offset);
        },
      });
    }, [currentSlide, scrollOffset, setScrollOffset, totalSlides]);

  // Navigation handlers
  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
    
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };
    return (
        <div className="lg:col-span-2 flex items-center">
            {/* Slide Counter */}
            <div className="mr-6 text-white text-2xl font-light">
              {currentSlide}/{totalSlides}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center space-x-3">
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
          </div>

    )
}
export default SliderSelectButtons;
