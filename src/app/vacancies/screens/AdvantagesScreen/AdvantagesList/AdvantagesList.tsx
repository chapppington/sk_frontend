import { FC } from "react";
import { advantages } from "../mock_data";

interface AdvantageProps {
  text: string;
}

const Advantage: FC<AdvantageProps> = ({ text }) => {
  return (
    <div className="flex items-start w-full">
      <span className="text-white text-3xl mr-4 flex-shrink-0 hidden md:block">
        •
      </span>
      <p className="text-white/80 text-base md:text-lg w-full">{text}</p>
    </div>
  );
};

const AdvantagesList: FC = () => {
  return (
    <div className="w-full lg:w-1/2 relative z-10 order-last lg:order-first">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-16 w-full">
        {advantages.map((advantage) => (
          <Advantage key={advantage.id} text={advantage.text} />
        ))}
      </div>
    </div>
  );
};

export default AdvantagesList;
