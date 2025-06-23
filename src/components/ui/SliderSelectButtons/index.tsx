"use client"
import React, { useState, useEffect,useRef, FC } from "react";
import { useScrollOffset } from "@/components/ProductsSlider3D/features/ScrollProviderOffset";
import { gsap } from "gsap";
import { ISectionHeaderProps } from "./types";
import { Power4 } from "gsap/all";
import { mockup } from "@/components/ProductsSlider3D/features/mockup";

const SliderSelectButtons: FC<ISectionHeaderProps> = ({currentSlide,setCurrentSlide}) => {
    const totalSlides = mockup.length;
    const {scrollOffset, setScrollOffset} = useScrollOffset();
    const tweenRef = useRef({ value: 0 });
    useEffect(() => {
        const newOffset = (currentSlide - 1) / (totalSlides);
        gsap.to(tweenRef.current, {
            value: newOffset,
            duration: 0.8,
            ease: Power4.easeOut,
            onUpdate: () => {
                setScrollOffset(tweenRef.current.value);
            }
        });
        
    }, [currentSlide, totalSlides, setScrollOffset]);


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
