import { ButtonHTMLAttributes, ReactNode, Ref } from "react";

export interface ICategoryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}
