"use client";

import MainButton from "@/components/ui/MainButton";
import { FC } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats";
import GradientHeading from "@/components/ui/GradientHeading";
import styles from "./styles.module.css";
import headingStyles from "@/components/ui/GradientHeading/styles.module.css";
import Image from "next/image";

const FirstScreen: FC = () => {
  return (
    <header className="relative min-h-screen pt-32">
      {/* Main Content */}
      <CustomContainer className="flex flex-col justify-between" fullHeight>
        <GradientHeading
          className={`${headingStyles.fluidHeadingMain} z-10 pt-8 sm:pt-12 md:pt-16`}
          level={1}
        >
          Комплексные решения в сфере электроснабжения
        </GradientHeading>

        {/* Bottom Content */}
        <div className="flex mt-auto">
          {/* Bottom Left Text with Arrow */}
          <div className="flex flex-col justify-end max-w-full sm:max-w-md mb-[160px] sm:mb-[260px] md:mb-[280px] lg:mb-8">
            {/* Small block with image and text */}
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/medal.png"
                alt="Медаль"
                className={`w-10 h-10 object-contain rounded-full ${styles.medalImg}`}
                width={32}
                height={32}
              />
              <span className="text-xs sm:text-sm text-white/80">
                Лауреат конкурса <br /> "Всероссийская Марка. Знак качества ХХI
                века"
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-white/70 lg:max-w-[400px] 2xl:max-w-none">
              Производственно - инжиниринговая компания полного цикла - от
              разработки проекта до ввода в эксплуатацию
            </p>
            <div className="block md:hidden">
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <MainButton
                  text="Связаться с клиентским менеджером"
                  size="sm"
                />
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex gap-4 mt-4">
                <MainButton text="Связаться с клиентским менеджером" />
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>

      <BlackBoxWithStats
        transparent={true}
        stats={[
          {
            value: "20+",
            description: "лет на рынке электрооборудования",
            showOnMobile: true,
          },
          {
            value: "600+",
            description: "реализованных проектов",
            showOnMobile: false,
          },
          {
            value: "7 лет",
            description: "максимальный срок гарантии",
            showOnMobile: true,
          },
        ]}
      />
    </header>
  );
};

export default FirstScreen;
