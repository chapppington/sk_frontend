"use client";

import React from "react";
import { IProduct } from "@/shared/types/product.types";

import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";
import AnimatedText from "@/components/ui/AnimatedText";

import styles from "./styles.module.css";
import { stats } from "./mock_data";
import CustomContainer from "@/components/ui/CustomContainer";

interface NumbersSectionProps {
  product: IProduct;
}

const NumbersSection = ({ product }: NumbersSectionProps) => {
  return (
    <CustomContainer>
      <section className="w-full text-white py-24 ">
        <div className="max-w-5xl mx-auto text-center">
          <BracketsText>ПОЧЕМУ МЫ</BracketsText>
          <AnimatedText delay={0} animateOnScroll={false}>
            <GradientHeading className="mt-6">
              Нас выбирают потому, что
              <br />
              <span className="font-medium">СибКомплект – это</span>
            </GradientHeading>
          </AnimatedText>
          {/* Desktop version - visible on screens >= 1024px */}
          <div className="hidden xl:grid grid-cols-4 gap-8 mt-16">
            {stats.map((stat) => (
              <div
                className={`${styles.statsCard} ${styles.gradientBorder}`}
                style={{
                  marginTop: stat.height,
                }}
                key={stat.id}
              >
                <div className="flex flex-col justify-end pt-16 items-center w-full h-full rounded-xl bg-transparent p-0">
                  <div className="text-4xl mb-4">{stat.value}</div>
                  <div className="text-white/80 text-base whitespace-pre-line text-center">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile version - visible on screens < 1024px */}
          <div className="xl:hidden grid grid-cols-2 gap-3 mt-16">
            {stats.map((stat) => (
              <div className={styles.mobileCard} key={stat.id}>
                <div className={styles.mobileValue}>{stat.value}</div>
                <div className={styles.mobileDescription}>
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CustomContainer>
  );
};

export default NumbersSection;
