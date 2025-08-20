"use client"

import { FC } from "react";
import { useVacanciesPageConfigPublic } from "@/hooks/useVacanciesPageConfigPublic";
import IconRenderer from "@/shared/utils/iconRenderer";

const BottomInfoWithIcon: FC = () => {
  const { config } = useVacanciesPageConfigPublic();
  const icon = config?.fourthScreen?.subtitle_icon || "";
  const subtitle =
    config?.fourthScreen?.subtitle ||
    "Мы создаем комфортные условия для профессионального роста и развития наших сотрудников, обеспечивая стабильность и внедряя инновационные подходы к работе.";

  return (
    <div className="flex items-center gap-12 max-w-xl mt-16 pt-12 border-t border-white/10">
      <div className="w-32 h-32 flex items-center justify-center">
        <IconRenderer
          iconName={icon}
          className="w-20 h-20 text-white opacity-80"
        />
      </div>
      <div>
        <p className="text-white/70 text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default BottomInfoWithIcon;
