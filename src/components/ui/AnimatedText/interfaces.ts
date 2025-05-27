import { ReactElement } from "react";

export default interface IAnimatedTextProps {
  children: ReactElement<any, any>;
  animateOnScroll?: boolean;
  delay?: number;
  triggerStart?: string;
  debug?: boolean;
}