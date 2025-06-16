"use client";

import { FC, useState } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomSlider from "@/components/CustomSlider";
import BracketsText from "@/components/ui/BracketsText";
import ReviewPopup from "./components/ReviewPopup";
import ReviewItem from "./components/ReviewItem";

import { reviews } from "./mock_data";

const ReviewsScreen: FC = () => {
  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const openReviewPopup = (index: number) => {
    setIsClosing(false);
    setActiveReview(index);
  };

  const closeReviewPopup = () => {
    if (!isClosing) {
      setIsClosing(true);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setActiveReview(null);
        setIsClosing(false);
      }, 300); // Match animation duration (0.3s)
    }
  };

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>О НАС</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Отзывы сотрудников</GradientHeading>
            <p className="text-white/70 mt-6">
              Наши сотрудники ценят стабильность, профессиональный рост и
              дружественную атмосферу в компании. Узнайте, что они говорят о
              работе в нашей команде.
            </p>
          </div>
        </div>

        <CustomSlider
          autoplay={true}
          autoplayDelay={5000}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
          }}
        >
          {reviews.map((review, index) => (
            <ReviewItem
              key={index}
              review={review}
              onClick={() => openReviewPopup(index)}
            />
          ))}
        </CustomSlider>
      </CustomContainer>

      {activeReview !== null && (
        <ReviewPopup
          review={reviews[activeReview]}
          isClosing={isClosing}
          onClose={closeReviewPopup}
        />
      )}
    </section>
  );
};

export default ReviewsScreen;
