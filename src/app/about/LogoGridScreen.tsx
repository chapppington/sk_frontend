"use client";

import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";
import LogoGrid from "@/components/ui/LogoGrid";

const samplePartners = [
  "logo1.svg",
  "logo2.svg",
  "logo3.svg",
  "logo4.svg",
  "logo5.svg",
  "logo6.svg",
  "logo7.svg",
  "logo8.svg",
  "logo9.svg",
  "logo10.svg",
  "logo11.svg",
  "logo12.svg",
];

const LogoGridScreen: FC = () => {
  return (
    <CustomContainer className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <AnimatedText delay={0}>
          <GradientHeading className="text-center md:text-right">
            Нас уже выбрали
          </GradientHeading>
        </AnimatedText>
        <BracketsText className="md:mb-0 mb-2">ПАРТНЕРЫ</BracketsText>
      </div>
      <LogoGrid partners={samplePartners} />
    </CustomContainer>
  );
};

export default LogoGridScreen;
