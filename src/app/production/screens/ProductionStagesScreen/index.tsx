"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/SectionHeader";
import CustomSlider from "@/components/CustomSlider";
import ProductionStageSliderItem from "./components/ProductionStageSliderItem";
import { productionStages } from "./mock_data";

const ProductionStagesScreen: FC = () => {
  return (
    <section
      id="production_stages_section"
      className="bg-transparent py-24 relative"
    >
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      ></div>

      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText="ЭТАПЫ"
          heading={
            <>
              Этапы
              <br />
              производства
            </>
          }
          description="Задача организации, в особенности же экономическая повестка сегодняшнего дня способствует подготовке и реализации анализа существующих паттернов поведения."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        {/* Production Stages Slider */}
        <CustomSlider
          autoplay={true}
          autoplayDelay={3000}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {productionStages.map((stage) => (
            <ProductionStageSliderItem key={stage.id} stage={stage} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default ProductionStagesScreen;
