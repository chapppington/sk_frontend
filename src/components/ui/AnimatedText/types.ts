import { ReactElement } from "react";

export interface IAnimatedTextProps {
  children: ReactElement<any, any>;
  animateOnScroll?: boolean;
  delay?: number;
  triggerStart?: string;
  debug?: boolean;
}

export type UseTextAnimationProps = Omit<IAnimatedTextProps, "children">;
