import { FC } from "react";

const CTAButton: FC = () => {
  return (
    <button className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group">
      <span className="relative z-10">Оставить заявку</span>
      <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </button>
  );
};

export default CTAButton;
