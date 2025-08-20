'use client'

import { FC } from "react";
import { useVacanciesPageConfigPublic } from "@/hooks/useVacanciesPageConfigPublic";
import IconRenderer from "@/shared/utils/iconRenderer";

interface AdvantageProps {
  icon: string;
  text: string;
}

type AdvantageItem = { icon: string; text: string };

const Advantage: FC<AdvantageProps> = ({ icon, text }) => {
  return (
    <div className="flex items-start w-full gap-3">
      <IconRenderer iconName={icon} className="w-8 h-8 text-white mt-1" />
      <p className="text-white/80 text-base md:text-lg w-full">{text}</p>
    </div>
  );
};

const AdvantagesList: FC = () => {
  const { config } = useVacanciesPageConfigPublic();
  const items = (config?.fourthScreen?.advantages ?? []) as AdvantageItem[];

  return (
    <div className="w-full lg:w-1/2 relative z-10 order-last lg:order-first">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-16 w-full">
        {items.map((adv, idx) => (
          <Advantage key={idx} icon={adv.icon} text={adv.text} />
        ))}
      </div>
    </div>
  );
};

export default AdvantagesList;
