export enum EButtonSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
  XXL = "2xl",
}

export interface IMainButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  size?: EButtonSize;
  href?: string;
}
