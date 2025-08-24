import { ReactNode } from "react";

export interface IPopoverProps {
  content: ReactNode;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
  side?: "left" | "right";
}
