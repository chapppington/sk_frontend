import { FC } from "react";
import { TrendingUp } from "lucide-react";

const BottomInfoWithIcon: FC = () => {
  return (
    <div className="flex items-center gap-12 max-w-xl mt-16 pt-12 border-t border-white/10">
      <div className="w-32 h-32 flex items-center justify-center">
        <TrendingUp
          className="w-20 h-20 text-white opacity-80"
          strokeWidth={1.2}
        />
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
