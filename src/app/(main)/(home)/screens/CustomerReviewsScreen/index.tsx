"use client";

import Image from "next/image";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomSlider from "@/components/CustomSlider";
import BracketsText from "@/components/ui/BracketsText";
import ReviewSlide from "./components/ReviewSlide";
import ReviewPopup from "./components/ReviewPopup";
import { useHomePageConfig } from "@/app/(admin)/dashboard/static/home/hooks/useHomePageConfig";
import { BACKEND_MAIN } from "@/constants";

import { useState } from "react";

const CustomerReviewsScreen = () => {
  const [activeReview, setActiveReview] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const { config, loading } = useHomePageConfig();
  const reviewsData = config?.reviewsScreen;
  const reviews = reviewsData?.reviews || [];

  console.log("Reviews data:", reviewsData);
  console.log("Reviews:", reviews);
  console.log("Active review:", activeReview);
  console.log(
    "Active review data:",
    activeReview !== null ? reviews[activeReview] : null
  );

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

  if (loading) {
    return (
      <section id="customer_reviews_section" className="bg-transparent py-24">
        <CustomContainer>
          <div className="text-center text-white/60">Загрузка отзывов...</div>
        </CustomContainer>
      </section>
    );
  }

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>ЧТО ПРЕДЛАГАЕМ</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>
              {reviewsData?.title || "Мнение наших клиентов"}
            </GradientHeading>
            <p className="text-white/70 mt-6">
              {reviewsData?.subtitle ||
                "Мы ценим обратную связь и всегда открыты к вашим предложениям. Ваши отзывы помогают нам развиваться и повышать качество нашей работы."}
            </p>
          </div>
        </div>

        {reviews.length > 0 ? (
          <>
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
                  title={review.title}
                  jobTitle={review.jobTitle}
                  image={`${BACKEND_MAIN}/uploads/home-page/${review.image}`}
                  contentPath={`${BACKEND_MAIN}/uploads/home-page/${review.content_path}`}
                  onClick={() => openReviewPopup(index)}
                />
              ))}
            </CustomSlider>

            {activeReview !== null && reviews[activeReview] && (
              <ReviewPopup
                image={`${BACKEND_MAIN}/uploads/home-page/${reviews[activeReview].content_path}`}
                isClosing={isClosing}
                onClose={closeReviewPopup}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12 text-white/60">
            <p>Отзывы не добавлены</p>
          </div>
        )}
      </CustomContainer>
    </section>
  );
};

export default CustomerReviewsScreen;
