"use client";

import BracketsText from "@/components/ui/BracketsText";
import GradientHeading from "@/components/ui/GradientHeading";
import React from "react";
import styles from "./NumbersSection.module.css";
import AnimatedText from "@/components/ui/AnimatedText";

const stats = [
  {
    id: 1,
    value: "24/7",
    description: "техническая\nподдержка",
    height: "128px",
  },
  {
    id: 2,
    value: "500+",
    description: "выполненных\nпроектов",
    height: "50px",
  },
  {
    id: 3,
    value: "34093",
    description: "реализованных единиц оборудования",
    height: "16px",
  },
  {
    id: 4,
    value: "до 7 лет",
    description: "гарантии на\nоборудование",
    height: "70px",
  },
];

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
