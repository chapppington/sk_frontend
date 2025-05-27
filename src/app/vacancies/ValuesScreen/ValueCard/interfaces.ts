import { ReactNode } from "react";

export interface IValueData {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface IValueCardProps {
  data: IValueData;
  isActive?: boolean;
  variant?: "desktop" | "mobile";
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
