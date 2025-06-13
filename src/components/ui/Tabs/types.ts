import { ReactNode } from "react";

export interface Tab {
  label: string;
  value: string;
  content: ReactNode;
}

export interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export interface TabsProps {
  children: ReactNode;
  defaultTab: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
}

export interface TabContentProps {
  children: ReactNode;
  value: string;
  label: string;
}
