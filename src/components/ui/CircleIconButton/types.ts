import { ComponentPropsWithoutRef, MouseEvent } from "react";

export interface ICircleIconButtonProps extends Omit<ComponentPropsWithoutRef<"a">, "onClick"> {
  href: string;
  text?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}
