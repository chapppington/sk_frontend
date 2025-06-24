"use client";

import React from "react";
import Image from "next/image";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import { IPortfolioItem } from "@/shared/types/portfolio.types";
import { UPLOADS_URL } from "@/constants";

interface Props {
  portfolio: IPortfolioItem;
}

export default function SolutionScreen({ portfolio }: Props) {
  return (
    <section className="py-24 relative text-white">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText className="text-white/60 mb-8">РЕШЕНИЕ</BracketsText>
          </div>

          {/* Main Content */}
          <div className="container mx-auto relative">
            <div className="flex flex-col mx-auto">
              <div className="pl-0">
                {/* Heading and Description */}
                <GradientHeading>{portfolio.solutionTitle}</GradientHeading>
                <p className="text-white/60 text-base my-12">
                  {portfolio.solutionDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Three-column section: full width of container */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-0 items-stretch mt-12">
          {/* Left image */}
          <div className="flex-[1.3] min-w-0">
            {portfolio.solutionImages?.[0] && (
              <Image
                src={`${UPLOADS_URL}/uploads/portfolio/${portfolio.solutionImages[0]}`}
                alt="Solution image 1"
                className="w-full h-[400px] object-cover"
                width={800}
                height={400}
              />
            )}
          </div>
          {/* Center card */}
          <div className="flex-1 min-w-0 flex flex-col justify-center p-8">
            <h2 className="text-white text-3xl font-light mb-6">
              {portfolio.solutionSubtitle}
            </h2>
            <div className="text-white/80 text-base leading-relaxed">
              {portfolio.solutionSubdescription}
            </div>
          </div>
          {/* Right image */}
          <div className="flex-[0.7] min-w-0">
            {portfolio.solutionImages?.[1] && (
              <Image
                src={`${UPLOADS_URL}/uploads/portfolio/${portfolio.solutionImages[1]}`}
                alt="Solution image 2"
                className="w-full h-[400px] object-cover"
                width={800}
                height={400}
              />
            )}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}
