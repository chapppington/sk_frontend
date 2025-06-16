"use client";

import Image from "next/image";
import GradientHeading from "@/components/ui/GradientHeading";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomSlider from "@/components/CustomSlider";
import BracketsText from "@/components/ui/BracketsText";
import ReviewSlide from "./components/ReviewSlide";

import { reviews } from "./mock_data";

const CustomerReviewsScreen = () => {
  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>ЧТО ПРЕДЛАГАЕМ</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Мнение наших клиентов</GradientHeading>
            <p className="text-white/70 mt-6">
              Как уже неоднократно упомянуто, действия представителей оппозиции
              объявлены нарушающими общечеловеческие нормы этики и морали.
            </p>
          </div>
        </div>

        <CustomSlider
          autoplay={false}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {reviews.map((review, index) => (
            <ReviewSlide key={index} {...review} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default CustomerReviewsScreen;
