"use client";

import { FC } from "react";
import Image from "next/image";

import GradientHeading from "@/components/ui/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import AnimatedText from "@/components/ui/AnimatedText";
import LogoGrid from "@/components/ui/LogoGrid";

import { gridItems, partners } from "./mock_data";

const EquipmentGridScreen: FC = () => {
  return (
    <section
      id="production_equipment_grid"
      className="bg-transparent py-24 relative"
    >
      <CustomContainer className="h-full flex flex-col relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-12 gap-8 mb-16">
          {/* Column 2 - Main Title */}
          <div className="col-span-5">
            <AnimatedText delay={0}>
              <GradientHeading>Используемое оборудование</GradientHeading>
            </AnimatedText>
          </div>

          {/* Column 3 - Description */}
          <div className="col-span-4">
            <AnimatedText delay={0}>
              <p className="text-white/70">
                Каждый из нас понимает очевидную вещь: начало повседневной
                работы по формированию позиции способствует повышению качества
                направлений прогрессивного развития.
              </p>
            </AnimatedText>
          </div>

          {/* Column 4 - Category Label */}
          <div className="col-span-3 text-right">
            <BracketsText>ОБОРУДОВАНИЕ</BracketsText>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-5 grid-rows-2 gap-6">
          {gridItems.map((item, index) => (
            <div
              key={index}
              className="relative overflow-hidden min-h-[400px]"
              style={{
                ...(item.clipPath ? { clipPath: item.clipPath } : {}),
                gridColumn: `span ${item.colSpan} / span ${item.colSpan}`,
              }}
            >
              <Image
                src={`/${item.image}`}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 2}
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/70"
                style={item.clipPath ? { clipPath: item.clipPath } : undefined}
              />
              <div className="relative h-full p-8 flex flex-col justify-end z-10">
                <h3 className="text-2xl text-white font-light leading-tight mb-4">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-white/70 text-sm">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Logo Grid */}
        <LogoGrid partners={partners} />
      </CustomContainer>
    </section>
  );
};

export default EquipmentGridScreen;
