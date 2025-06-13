export type ButtonSize = "sm" | "md" | "lg";

export interface TabButtonProps {
  value: string;
  label: string;
  isActive: boolean;
  onClick: (value: string) => void;
  size?: ButtonSize;
}
