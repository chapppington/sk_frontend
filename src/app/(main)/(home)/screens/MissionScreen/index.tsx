"use client";

import { FC } from "react";

import { PagesConfig } from "@/config/pages.config";

import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import CircleIconButton from "@/components/ui/CircleIconButton";

const MissionScreen: FC = () => {
  return (
    <section id="mission_section" className="bg-transparent py-20">
      <CustomContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Right Column - Decorative element for larger screens */}
          <div></div>

          {/* Left Column - Content */}
          <div>
            <BracketsText className="mb-4">МИССИЯ КОМПАНИИ</BracketsText>

            <GradientHeading className="z-10 mb-6">
              Показать новые горизонты, превосходящие ожидания
            </GradientHeading>
            <p className="text-white/60 text-lg mb-8 max-w-2xl">
              Как уже неоднократно упомянуто, действия представителей оппозиции
              объявлены нарушающими общечеловеческие нормы этики и морали.
            </p>
            <CircleIconButton
              href={PagesConfig.about}
              text="Больше о компании"
            />
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default MissionScreen;
