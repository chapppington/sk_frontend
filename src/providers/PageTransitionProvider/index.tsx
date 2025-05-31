"use client";

import { useLenis } from "lenis/react";
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

import { useColumns } from "@/providers/PageTransitionProvider/hooks/useColumns";
import { useLogo } from "@/providers/PageTransitionProvider/hooks/useLogo";
import { useAnimations } from "@/providers/PageTransitionProvider/hooks/useAnimations";

import { ITransitionContextType } from "./types";

const TransitionContext = createContext<ITransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

export const PageTransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const lenis = useLenis();

  const { columnsRef, createColumns, cleanupColumns } = useColumns();
  const { logoRef, createLogo, cleanupLogo } = useLogo();
  const { isAnimating, animateIn, animateOut } = useAnimations(
    columnsRef,
    logoRef,
    lenis
  );

  useEffect(() => {
    createColumns();
    createLogo();

    setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => {
      cleanupColumns();
      cleanupLogo();
      sessionStorage.removeItem("hasInitialized");
    };
  }, []);

  useEffect(() => {
    if (isReady) {
      const initialAnimation = async () => {
        if (lenis) {
          lenis.stop();
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
        }

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (lenis) {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
        await animateOut();

        if (lenis) {
          window.scrollTo(0, 0);
          lenis.scrollTo(0, { immediate: true });
          lenis.resize();
          lenis.start();
        }
      };
      initialAnimation();
    }
  }, [isReady]);

  return (
    <TransitionContext.Provider value={{ animateIn, animateOut, isAnimating }}>
      <div style={{ visibility: isReady ? "visible" : "hidden" }}>
        {children}
      </div>
    </TransitionContext.Provider>
  );
};
