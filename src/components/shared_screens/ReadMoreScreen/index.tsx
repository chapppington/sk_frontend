"use client";

import { FC, useEffect, useState } from "react";
import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import CustomSlider from "@/components/CustomSlider";
import NewsSliderItem from "./components/NewsSliderItem";
import { newsItems } from "./mock_data";

const ReadMoreScreen: FC = () => {
  return (
    <section className="py-20">
      <CustomContainer>
        <SectionHeader
          bracketsText="НОВОСТИ"
          heading={<>Читайте также</>}
          description="Будьте в курсе последних событий компании: важные обновления, достижения команды и интересные проекты, которые формируют наше будущее."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        <CustomSlider
          autoplay={false}
          spaceBetween={24}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {newsItems.map((item) => (
            <NewsSliderItem key={item.id} item={item} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default ReadMoreScreen;
