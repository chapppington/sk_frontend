import { RefObject } from "react";

export interface IUseColumnsReturn {
  columnsRef: RefObject<HTMLDivElement[]>;
  createColumns: () => void;
  cleanupColumns: () => void;
}

export interface IUseLogoReturn {
  logoRef: RefObject<HTMLDivElement>;
  createLogo: () => void;
  cleanupLogo: () => void;
}

export interface IUseAnimationsReturn {
  isAnimating: boolean;
  isAnimatingRef: RefObject<boolean>;
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
}

export interface ITransitionContextType {
  animateIn: () => Promise<void>;
  animateOut: () => Promise<void>;
  isAnimating: boolean;
}
