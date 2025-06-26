"use client";

import { FC } from "react";

import { IGradientHeadingProps } from "@/components/ui/GradientHeading/types";
import styles from "./styles.module.css";

const GradientHeading: FC<IGradientHeadingProps> = ({
  children,
  className,
  ref,
}: IGradientHeadingProps) => {
  return (
    <h2
      ref={ref}
      className={`${className || ""} max-w-5xl`}
      style={{ overflow: "hidden" }}
    >
      <span className={`${styles.gradientHeading} ${styles.fluidHeading}`}>
        {children}
      </span>
    </h2>
  );
};

export default GradientHeading;
