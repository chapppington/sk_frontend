import { RefObject } from "react";

export interface NavigationControlsProps {
  sliderId: string;
  indicatorsRef: RefObject<HTMLDivElement | null>;
  showIndicators: boolean;
  navigationClassName?: string;
}
