"use client";

import { FC } from "react";

import CustomContainer from "@/components/ui/CustomContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import CustomSlider from "@/components/CustomSlider";
import HistorySlide from "./HistorySlide";
import { useAboutPageConfigPublic } from "@/hooks/useAboutPageConfigPublic";

const HistoryScreen: FC = () => {
  const { config, loading } = useAboutPageConfigPublic();

  if (loading || !config) {
    return (
      <section id="history_section" className="bg-transparent py-24 relative">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black to-transparent" style={{ zIndex: -1 }}></div>
        <CustomContainer className="h-full flex flex-col relative z-10">
          <div className="text-white text-center">Загрузка...</div>
        </CustomContainer>
      </section>
    );
  }

  const historyEvents = config.historyScreen.history_events.sort((a, b) => a.order - b.order);

  return (
    <section id="history_section" className="bg-transparent py-24 relative">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      ></div>

      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText={config.historyScreen.brackets_text}
          heading={<>{config.historyScreen.title}</>}
          description={config.historyScreen.description}
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />

        <CustomSlider
          autoplay={false}
          spaceBetween={24}
          loop={false}
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
          {historyEvents.map((event, index) => (
            <HistorySlide key={event.id} event={event} index={index} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  );
};

export default HistoryScreen;
