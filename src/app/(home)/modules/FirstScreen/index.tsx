"use client";

import MainButton from "@/components/ui/MainButton";
import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import AnimatedText from "@/components/ui/AnimatedText";
import GradientHeading from "@/components/ui/GradientHeading";
import { EButtonSize } from "@/components/ui/MainButton/types";

const FirstScreen: FC = () => {
  return (
    <header className="relative min-h-screen pt-32">
      {/* Main Content */}
      <CustomContainer className="flex flex-col justify-between" fullHeight>
        <AnimatedText>
          <GradientHeading className="2xl:text-6xl z-10 pt-8 sm:pt-12 md:pt-16">
            Производство промышленного электротехнического оборудования
          </GradientHeading>
        </AnimatedText>

        {/* Bottom Content */}
        <div className="flex mt-auto">
          {/* Bottom Left Text with Arrow */}
          <div className="flex flex-col justify-end max-w-full sm:max-w-md mb-[160px] sm:mb-[260px] md:mb-[280px] lg:mb-8">
            <AnimatedText triggerStart="top 100%">
              <p className="text-sm sm:text-base md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-none">
                Являясь всего лишь частью общей картины, тщательные исследования
                конкурентов могут быть описаны максимально подробно.
              </p>
            </AnimatedText>
            <div className="block md:hidden">
              <MainButton
                text="Связаться с отделом продаж"
                size={EButtonSize.SM}
              />
            </div>
            <div className="hidden md:block">
              <MainButton text="Связаться с отделом продаж" />
            </div>
          </div>
        </div>
      </CustomContainer>

      <BlackBoxWithStats
        stats={[
          {
            value: "197",
            description: "Крупнейших городов России и Казахстана",
          },
          {
            value: "197",
            description: "Крупнейших городов России и Казахстана",
          },
        ]}
      />
    </header>
  );
};

export default FirstScreen;
