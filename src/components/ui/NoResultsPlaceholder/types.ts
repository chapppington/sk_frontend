import { ReactNode } from "react";

export interface NoResultsPlaceholderProps {
  icon: ReactNode;
  title: string;
  description: string;
  onReset?: () => void;
  resetButtonText?: string;
}
