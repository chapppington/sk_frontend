import { FC } from "react";

const BottomInfoWithIcon: FC = () => {
  return (
    <div className="flex items-center gap-12 max-w-xl mt-16 pt-12 border-t border-white/10">
      <div className="w-32 h-32">
        <svg
          className="w-full h-full text-white opacity-80"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path
            d="M12 2c-2.8 0-5 4.5-5 10s2.2 10 5 10 5-4.5 5-10-2.2-10-5-10z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path d="M2 12h20" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div>
        <p className="text-white/70 text-base">
          Мы создаем комфортные условия для профессионального роста и развития
          наших сотрудников, обеспечивая стабильность и внедряя инновационные
          подходы к работе.
        </p>
      </div>
    </div>
  );
};

export default BottomInfoWithIcon;
