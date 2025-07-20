import { FC } from "react";
import { useNavbarConfigPublic } from "@/hooks/useNavbarConfigPublic";

const CTAButton: FC = () => {
  const { config } = useNavbarConfigPublic();
  const text = config?.navbarCtaButtonText || "Оставить заявку";
  return (
    <button className="h-full px-8 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group">
      <span className="relative z-10">{text}</span>
      <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </button>
  );
};

export default CTAButton;
