"use client";

import { FC } from "react";

import { PagesConfig } from "@/config/pages.config";

import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import CircleIconButton from "@/components/ui/CircleIconButton";
import { useHomePageConfigPublic } from "@/hooks/useHomePageConfigPublic";

const MissionScreen: FC = () => {
  const { config, loading } = useHomePageConfigPublic();

  const missionData = config?.missionScreen || {
    mission_title: "Показать новые горизонты, превосходящие ожидания",
    mission_text:
      "Непрерывно совершенствуясь, мы создаём эффективные технические решения, которые обеспечивают удобство эксплуатации и высокий уровень безопасности систем электроснабжения. Соблюдая договорённости и выполняя обязательства, мы остаёмся надёжным партнёром для наших заказчиков.",
    button_text: "Больше о компании",
  };

  if (loading) {
    return (
      <section id="mission_section" className="bg-transparent py-20">
        <CustomContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div></div>
            <div className="relative rounded-2xl">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-700 rounded mb-4 w-32"></div>
                <div className="h-12 bg-gray-700 rounded mb-6"></div>
                <div className="h-24 bg-gray-700 rounded mb-8"></div>
                <div className="h-10 bg-gray-700 rounded w-40"></div>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    );
  }

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
              {missionData.mission_title}
            </GradientHeading>
            <p className="text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
              {missionData.mission_text}
            </p>
            <CircleIconButton
              href={PagesConfig.about.href}
              text={missionData.button_text}
            />
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default MissionScreen;
