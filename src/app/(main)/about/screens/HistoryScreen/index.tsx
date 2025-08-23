"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import CustomSlider from "@/components/CustomSlider";
import { historyEvents } from "./mock_data";
import HistorySlide from "./HistorySlide";

const HistoryScreen: FC = () => {
  return (
    <section id="history_section" className="bg-transparent py-24 relative">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      ></div>

      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText="Развитие"
          heading={
            <>
              История <br></br>компании
            </>
          }
          description="С 2006 года мы прошли путь от стартапа до предприятия полного цикла: собрали сильную команду, развернули масштабное производство и внедрили передовые технологии."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        <CustomSlider
          autoplay={false}
          spaceBetween={24}
          loop={true}
          showIndicators={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {historyEvents.map((event) => (
            <HistorySlide key={event.id} event={event} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default HistoryScreen;
