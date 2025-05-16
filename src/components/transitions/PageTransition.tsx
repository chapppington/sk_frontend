"use client";

import { FC, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import Stairs from "./Stairs";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition: FC<PageTransitionProps> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <Stairs>{children}</Stairs>
    </AnimatePresence>
  );
};

export default PageTransition;
