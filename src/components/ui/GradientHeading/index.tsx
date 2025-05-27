"use client";

import { FC } from "react";

import { IGradientHeadingProps } from "@/components/ui/GradientHeading/interfaces";
import styles from "./GradientHeading.module.css";

const GradientHeading: FC<IGradientHeadingProps> = ({
  children,
  className,
  ref,
}: IGradientHeadingProps) => {
  return (
    <h2
      ref={ref}
      className={`${
        className || ""
      } text-2xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl max-w-5xl`}
      style={{ overflow: "hidden" }}
    >
      <span className={styles.gradientHeading}>{children}</span>
    </h2>
  );
};

export default GradientHeading;
