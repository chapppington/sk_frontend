export interface NavigationButtonProps {
  direction: "prev" | "next";
  sliderId: string;
  onClick?: () => void;
  className?: string;
}
