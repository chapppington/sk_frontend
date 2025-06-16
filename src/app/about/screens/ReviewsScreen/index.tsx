"use client";

import { useRef, useState } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import { NavigationButton } from "@/components/ui/NavigationButton";
import ReviewItem from "./components/ReviewItem";
import BigComma from "./components/BigComma";
import { useReviewAnimation } from "./hooks/useReviewAnimation";

import { reviews } from "./mock_data";

const ReviewScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);

  const userInfoRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useReviewAnimation(userInfoRef, currentIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : reviews.length - 1));
    setKey((prev) => prev + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
    setKey((prev) => prev + 1);
  };

  const currentReview = reviews[currentIndex];

  return (
    <section ref={sectionRef} className="relative flex flex-col justify-center">
      {/* Main Content in CustomContainer */}
      <CustomContainer className="relative z-10 flex flex-col py-24">
        {/* Section Label - Left Aligned, On Top */}
        <div className="w-full flex justify-start">
          <BracketsText className="mb-8 md:mb-12">ОТЗЫВЫ</BracketsText>
        </div>
        {/* Main Row Content */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full">
          {/* Left: Gradient Heading */}
          <div className="flex-1">
            <GradientHeading className="leading-tight mb-0">
              Никто не вправе
              <br />
              осуждать глас грядущего
              <br />
              поколения
            </GradientHeading>
          </div>

          {/* Right: Testimonial */}
          <div className="flex-1 flex flex-col items-start">
            {/* Content Container with Fixed Height */}
            <div ref={contentRef} className="w-full">
              <BigComma />
              <ReviewItem
                ref={userInfoRef}
                review={currentReview}
                animationKey={key}
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center mt-8">
              {/* Page Counter */}
              <div className="text-white text-lg">
                <span className="text-2xl">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/60">
                  /{String(reviews.length).padStart(2, "0")}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex ml-5">
                <NavigationButton
                  direction="prev"
                  sliderId="reviews"
                  onClick={handlePrev}
                />
                <NavigationButton
                  direction="next"
                  sliderId="reviews"
                  className="ml-3"
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ReviewScreen;
