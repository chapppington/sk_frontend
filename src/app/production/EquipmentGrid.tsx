"use client";

import { FC } from "react";
import Image from "next/image";
import { GradientHeading } from "@/components/ui/GradientHeading/GradientHeading";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";

interface GridItem {
  title: string;
  description?: string;
  image: string;
  colSpan: number;
  rowSpan: number;
  clipPath?: string;
}

const gridItems: GridItem[] = [
  {
    title: "Семантический разбор внешних противодействий продолжает удивлять",
    image: "transformer.webp",
    colSpan: 2,
    rowSpan: 1,
  },
  {
    title: "Звук клавиш печатной машинки",
    image: "transformer.webp",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Семантический разбор внешних противодействий",
    image: "transformer.webp",
    colSpan: 2,
    rowSpan: 1,
    clipPath: "polygon(0 0, 90% 0, 100% 15%, 100% 100%, 0 100%)",
  },
  {
    title: "Звук клавиш печатной машинки",
    image: "transformer.webp",
    colSpan: 1,
    rowSpan: 1,
  },
  {
    title: "Новая модель организационной деятельности сделала своё дело",
    description:
      "Каждый из нас понимает очевидную вещь: начало повседневной работы по формированию позиции способствует повышению качества направлений прогрессивного развития.",
    image: "transformer.webp",
    colSpan: 3,
    rowSpan: 1,
  },
  {
    title: "Звук клавиш печатной машинки",
    image: "transformer.webp",
    colSpan: 1,
    rowSpan: 1,
  },
];

const partners = [
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

const EquipmentGrid: FC = () => {
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
            <GradientHeading>Используемое оборудование</GradientHeading>
          </div>

          {/* Column 3 - Description */}
          <div className="col-span-4">
            <p className="text-white/70">
              Каждый из нас понимает очевидную вещь: начало повседневной работы
              по формированию позиции способствует повышению качества
              направлений прогрессивного развития.
            </p>
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
        <div className="mt-32">
          {/* Row 1 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 items-center">
            {partners.slice(0, 6).map((logo, index) => (
              <div
                key={index}
                className="grayscale opacity-50 hover:opacity-100 transition-all"
              >
                <Image
                  src={`/img/partners/${logo}`}
                  alt="Partner logo"
                  width={200}
                  height={50}
                  className="w-full h-[50px] object-contain"
                />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-16 items-center mt-16">
            {partners.slice(6).map((logo, index) => (
              <div
                key={index}
                className="grayscale opacity-50 hover:opacity-100 transition-all"
              >
                <Image
                  src={`/img/partners/${logo}`}
                  alt="Partner logo"
                  width={200}
                  height={50}
                  className="w-full h-[50px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default EquipmentGrid;
