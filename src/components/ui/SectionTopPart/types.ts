import { ReactNode } from "react";

export interface ProductionHeaderProps {
  bracketsText: string;
  heading: ReactNode;
  description: string;
  desktopOrder?: {
    bracketsText: number;
    heading: number;
    description: number;
  };
}
