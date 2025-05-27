import { ReactNode } from "react";

export default interface IRevealAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  triggerStart?: string;
  className?: string;
  useScrollTrigger?: boolean;
}