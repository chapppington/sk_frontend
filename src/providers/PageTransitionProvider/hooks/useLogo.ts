import { useRef, useState } from "react";
import { IUseLogoReturn } from "../types";

export const useLogo = (): IUseLogoReturn => {
  const logoRef = useRef<HTMLDivElement>(null!);
  const [isVisible, setIsVisible] = useState(false);

  const createLogo = () => {
    setIsVisible(true);
  };

  const cleanupLogo = () => {
    setIsVisible(false);
  };

  return { logoRef, createLogo, cleanupLogo, isVisible };
};
