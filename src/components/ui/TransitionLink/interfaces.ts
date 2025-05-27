import { CSSProperties, ReactNode, MouseEvent, Ref } from "react";

export interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  style?: CSSProperties;
  ref?: Ref<HTMLAnchorElement>;
}
