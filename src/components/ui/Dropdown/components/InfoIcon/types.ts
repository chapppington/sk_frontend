import { ReactNode } from "react";

export interface InfoIconProps {
  popoverContent: ReactNode;
  color?: "white" | "default";
  side?: "left" | "right";
}
