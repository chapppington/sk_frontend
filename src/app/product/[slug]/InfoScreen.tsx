"use client";

import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import Copy from "@/components/ui/textAnimation/Copy";
import Image from "next/image";
import { FC, useState } from "react";

const features = [
  {
    label: "Полная заводская готовность",
    icon: "img/icons/icon1.svg",
    image: "/production_bg.webp",
    description:
      "Поставляемого в сборе, а также блоков и узлов нетранспортабельного в сборе оборудования должна, как правило, исключать необходимость разборки и ревизии его в процессе монтажа.",
  },
  {
    label: "Сроки поставки от 14 дней",
    icon: "img/icons/icon2.svg",
    image: "/construction_bg.webp",
    description:
      "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции способствует повышению качества направлений прогрессивного развития.",
  },
  {
    label: "Высокая надежность конструктива",
    icon: "img/icons/icon3.svg",
    image: "/news_bg2.webp",
    description:
      "Высокий уровень надежности конструктивных элементов обеспечивает долговечность и бесперебойную работу оборудования даже в экстремальных условиях эксплуатации.",
  },
  {
    label: "Понятное прозрачное ценообразование",
    icon: "img/icons/icon4.svg",
    image: "/production_bg_new.webp",
    description:
      "Наша политика ценообразования построена на принципах прозрачности и честности, что позволяет клиентам получать максимальную выгоду при оптимальном соотношении цены и качества.",
  },
  {
    label: "Проектная экспертиза от типовых проектов до индивидуальных решений",
    icon: "img/icons/icon5.svg",
    image: "/news_bg.webp",
    description:
      "Наши специалисты обладают богатым опытом в разработке как типовых, так и уникальных проектных решений, что позволяет удовлетворить самые специфические требования заказчика.",
  },
];

const InfoScreen: FC = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  return (
    <section className="relative flex flex-col py-24">
      <CustomContainer className="flex flex-col md:flex-row w-full items-stretch">
        {/* Left Section */}
        <div className="w-full md:w-2/5 z-10 flex flex-col pr-4 relative justify-start">
          <BracketsText>ПРЕИМУЩЕСТВА</BracketsText>
          {/* Overlapping Heading */}
          <Copy delay={0}>
            <h1
              className="
                text-4xl md:text-5xl mt-8 text-white
                mb-12
                z-20
                md:w-[180%] md:max-w-none
                md:pr-32
                md:-mr-[40%]
                pointer-events-none
                relative
            "
          >
            Эффективное электроснабжение в условиях современных требований к
            надёжности и безопасности
          </h1>
          </Copy>
          <div className="flex flex-col gap-3 mt-2">
            {features.map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeatureIndex(idx)}
                className={`flex items-center px-4 py-3 rounded-lg border transition w-auto text-left self-start
                    ${
                      idx === activeFeatureIndex
                        ? "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:scale-[0.99] active:scale-[0.93]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:scale-[0.99] active:scale-[0.93]"
                    }`}
              >
                <Image src={`/${feature.icon}`} alt="" width={24} height={24} />
                <span className="text-base ml-4">{feature.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-3/5 flex flex-col">
          <div className="relative w-full h-full flex-1">
            <Image
              src={features[activeFeatureIndex].image}
              alt={features[activeFeatureIndex].label}
              fill
              className="object-cover rounded-lg"
              priority={activeFeatureIndex === 0}
            />
            <div className="absolute bottom-4 right-4 bg-black/80 text-white font-light rounded-lg p-6 max-w-md shadow-lg z-20">
              {features[activeFeatureIndex].description}
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default InfoScreen;
