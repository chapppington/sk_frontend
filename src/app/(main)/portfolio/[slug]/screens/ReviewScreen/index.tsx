"use client";

import Image from "next/image";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import BigFatCommaIcon from "@/shared/icons/BigFatCommaIcon";
import { UPLOADS_URL } from "@/constants";

interface Props {
  portfolio: IPortfolioItem;
}

const ReviewScreen = ({ portfolio }: Props) => {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden">
      {/* Main Content in CustomContainer */}
      <CustomContainer className="relative z-10 flex flex-col py-24">
        {/* Section Label - Left Aligned, On Top */}
        <div className="w-full flex justify-start">
          <BracketsText className="mb-8 md:mb-12">ОТЗЫВ</BracketsText>
        </div>
        {/* Main Row Content */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full">
          {/* Left: Gradient Heading */}
          <div className="flex-1">
            <GradientHeading className="leading-tight mb-0">
              {portfolio.reviewTitle || "Никто не вправе"}
            </GradientHeading>
          </div>

          {/* Right: Testimonial */}
          <div className="flex-1 flex flex-col items-start">
            {/* Big fat commas SVG */}
            <div className="mb-12">
              <BigFatCommaIcon />
            </div>
            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl text-gray-300 font-light mb-8 first-line:pl-8">
              {portfolio.reviewText ||
                "«Значимость этих проблем настолько очевидна, что сложившаяся структура организации в значительной степени обусловливает важность каксамодостаточных, так и внешне зависимых концептуальных решений»"}
            </blockquote>
            {/* User Info */}
            <div className="flex items-center gap-4 mt-6">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <div className="w-full h-full">
                  <Image
                    src={`${UPLOADS_URL}/uploads/portfolio/${portfolio.reviewImage}`}
                    alt="avatar"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="text-white font-semibold text-lg">
                  {portfolio.reviewName || "Иванов Иван Павлович"}
                </div>
                <div className="text-gray-400 text-sm">
                  {portfolio.reviewRole || "Клиент"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default ReviewScreen;
