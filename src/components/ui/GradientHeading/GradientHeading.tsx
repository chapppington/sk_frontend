import { FC, forwardRef } from "react";
import styles from "./GradientHeading.module.css";

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
  delay?: number;
}

export const GradientHeading = forwardRef<
  HTMLHeadingElement,
  GradientHeadingProps
>(({ children, className, animateOnScroll, delay }, ref) => {
  return (
    <h2
      ref={ref}
      className={`${
        className || ""
      } text-2xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl max-w-5xl mb-4`}
      style={{ overflow: "hidden" }}
    >
      <span className={styles.gradientHeading}>{children}</span>
    </h2>
  );
});

GradientHeading.displayName = "GradientHeading";
