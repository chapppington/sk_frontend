import { ReactNode } from "react";

export interface IDropdownProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  showInfoIcon?: boolean;
  popoverContent?: ReactNode;
  alwaysOpenOnMobile?: boolean;
  hidePlusButton?: boolean;
  infoIconColor?: "white" | "default";
  infoIconSide?: "left" | "right";
}
