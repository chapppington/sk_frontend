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
          <div
            className="relative  rounded-2xl"
            style={{
              background: `
                radial-gradient(
                  ellipse at center,
                  rgba(0, 0, 0, 0.8) 0%,
                  rgba(0, 0, 0, 0.6) 40%,
                  rgba(0, 0, 0, 0.4) 70%,
                  rgba(0, 0, 0, 0.2) 100%
                ),
                linear-gradient(
                  135deg,
                  rgba(15, 15, 15, 0.9) 0%,
                  rgba(25, 25, 25, 0.7) 25%,
                  rgba(35, 35, 35, 0.5) 50%,
                  rgba(25, 25, 25, 0.7) 75%,
                  rgba(15, 15, 15, 0.9) 100%
                )
              `,
            }}
          >
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
