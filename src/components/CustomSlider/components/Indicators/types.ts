import { RefObject } from "react";

export interface IndicatorsProps {
  indicatorsRef: RefObject<HTMLDivElement | null>;
  showIndicators: boolean;
}
