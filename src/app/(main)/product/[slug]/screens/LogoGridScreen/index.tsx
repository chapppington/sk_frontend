"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import AnimatedText from "@/components/ui/AnimatedText";
import LogoGrid from "@/components/ui/LogoGrid";

import { samplePartners } from "./mock_data";

const LogoGridScreen: FC = () => {
  return (
    <CustomContainer className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <AnimatedText delay={0} animateOnScroll={false}>
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
