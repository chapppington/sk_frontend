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
          <div className="relative  rounded-2xl">
            <BracketsText className="mb-4">МИССИЯ КОМПАНИИ</BracketsText>

            <GradientHeading className="z-10 mb-6">
              Показать новые горизонты, превосходящие ожидания
            </GradientHeading>
            <p className="text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
              Непрерывно совершенствуясь, мы создаём эффективные технические
              решения, которые обеспечивают удобство эксплуатации и высокий
              уровень безопасности систем электроснабжения. Соблюдая
              договорённости и выполняя обязательства, мы остаёмся надёжным
              партнёром для наших заказчиков.
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
