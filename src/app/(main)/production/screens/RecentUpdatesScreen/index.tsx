"use client";

import { FC } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomSlider from "@/components/CustomSlider";
import RecentUpdateSliderItem from "./components/RecentUpdateSliderItem";

import { newsItems }from "./mock_data";

interface IRecentUpdateItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const RecentUpdatesScreen: FC = () => {
  return (
    <section
      id="production_stages_section2"
      className="bg-transparent py-24 relative"
    >
      <CustomContainer>
        <SectionHeader
          bracketsText="ЧТО НОВОГО"
          heading={
            <>
              Последние
              <br />
              нововведения
            </>
          }
          description="Мы постоянно совершенствуем наши
производственные процессы, внедряя
инновационные технологии и оптимизируя каждый
этап работы."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        <CustomSlider
          autoplay={true}
          autoplayDelay={3000}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          showIndicators={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {newsItems.map((item: IRecentUpdateItem) => (
            <RecentUpdateSliderItem key={item.id} item={item} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default RecentUpdatesScreen;
