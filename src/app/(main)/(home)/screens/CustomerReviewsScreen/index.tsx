"use client";

import Image from "next/image";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomSlider from "@/components/CustomSlider";
import BracketsText from "@/components/ui/BracketsText";
import ReviewSlide from "./components/ReviewSlide";
import ReviewPopup from "./components/ReviewPopup";

import { reviews } from "./mock_data";
import { useState } from "react";

const CustomerReviewsScreen = () => {
  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const openReviewPopup = (index: number) => {
    setIsClosing(false);
    setActiveReview(index);
  };

  const closeReviewPopup = () => {
    if (!isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        setActiveReview(null);
        setIsClosing(false);
      }, 300);
    }
  };

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>ОТЗЫВЫ</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Мнение наших клиентов</GradientHeading>
            <p className="text-white/70 mt-6">
              Мы ценим обратную связь и всегда открыты к вашим предложениям.
              Ваши отзывы помогают нам развиваться и повышать качество нашей
              работы.
            </p>
          </div>
        </div>

        <CustomSlider
          autoplay={false}
          breakpoints={{
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {reviews.map((review, index) => (
            <ReviewSlide
              key={index}
              company={review.company}
              title={review.title}
              jobTitle={review.jobTitle}
              image={review.image}
              onClick={() => openReviewPopup(index)}
            />
          ))}
        </CustomSlider>

        {activeReview !== null && (
          <ReviewPopup
            image={reviews[activeReview].image}
            isClosing={isClosing}
            onClose={closeReviewPopup}
          />
        )}
      </CustomContainer>
    </section>
  );
};

export default CustomerReviewsScreen;
