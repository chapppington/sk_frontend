"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import LogoGrid from "@/components/ui/LogoGrid";

import { samplePartners } from "./mock_data";

const LogoGridScreen: FC = () => {
  return (
    <CustomContainer className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <GradientHeading className="text-center md:text-right">
          Нас уже выбрали
        </GradientHeading>
        <BracketsText className="md:mb-0 mb-2">ПАРТНЕРЫ</BracketsText>
      </div>
      <LogoGrid partners={samplePartners} />
    </CustomContainer>
  );
};

export default LogoGridScreen;
