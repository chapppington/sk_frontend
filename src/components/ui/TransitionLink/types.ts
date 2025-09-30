import { CSSProperties, ReactNode, MouseEvent, Ref } from "react";

export interface ITransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  style?: CSSProperties;
  ref?: Ref<HTMLAnchorElement>;
  "aria-label"?: string;
}
