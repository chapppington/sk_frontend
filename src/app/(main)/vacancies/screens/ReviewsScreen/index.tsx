"use client";

import { FC, useState } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomSlider from "@/components/CustomSlider";
import BracketsText from "@/components/ui/BracketsText";
import ReviewPopup from "./components/ReviewPopup";
import ReviewItem from "./components/ReviewItem";
import { useLenis } from "lenis/react";

import { reviews as reviewsMock } from "./mock_data";
import { useVacanciesPageConfigPublic } from "@/hooks/useVacanciesPageConfigPublic";
import { UPLOADS_URL } from "@/constants";
import { Review } from "./types";

const ReviewsScreen: FC = () => {
  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const lenis = useLenis();
  const { config } = useVacanciesPageConfigPublic();

  const heading = config?.fifthScreen?.title || "Отзывы сотрудников";
  const subtitle =
    config?.fifthScreen?.subtitle ||
    "Наши сотрудники ценят стабильность, профессиональный рост и дружественную атмосферу в компании. Узнайте, что они говорят о работе в нашей команде.";

  const reviewsData: Review[] =
    config?.fifthScreen?.reviews && config.fifthScreen.reviews.length
      ? config.fifthScreen.reviews.map((r: Review) => ({
          name: r.name,
          position: r.position,
          shortText: r.shortText,
          image: r.image
            ? `${UPLOADS_URL}${r.image}`
            : "/avatar_placeholder.png",
          text: r.text,
        }))
      : reviewsMock;

  const openReviewPopup = (index: number) => {
    setIsClosing(false);
    setActiveReview(index);
    // Stop smooth scrolling when popup opens
    if (lenis) {
      lenis.stop();
    }
  };

  const closeReviewPopup = () => {
    if (!isClosing) {
      setIsClosing(true);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => {
        setActiveReview(null);
        setIsClosing(false);
        // Resume smooth scrolling when popup closes
        if (lenis) {
          lenis.start();
        }
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
            <GradientHeading>{heading}</GradientHeading>
            <p className="text-white/70 mt-6">{subtitle}</p>
          </div>
        </div>

        <CustomSlider
          autoplay={false}
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
          {reviewsData.map((review, index) => (
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
          review={reviewsData[activeReview]}
          isClosing={isClosing}
          onClose={closeReviewPopup}
        />
      )}
    </section>
  );
};

export default ReviewsScreen;
