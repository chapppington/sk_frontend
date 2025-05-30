"use client";

import React from "react";

import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";
import AnimatedText from "@/components/ui/AnimatedText";

import styles from "./NumbersSection.module.css";
import { stats } from "./mock_data";

const NumbersSection = () => {
  return (
    <section className="w-full text-white py-24 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <BracketsText>ПОЧЕМУ МЫ</BracketsText>
        <AnimatedText delay={0}>
          <GradientHeading className="mt-6">
            Нас выбирают потому, что
            <br />
            <span className="font-medium">Сибкомплект – это</span>
          </GradientHeading>
        </AnimatedText>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
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
      </div>
    </section>
  );
};

export default NumbersSection;