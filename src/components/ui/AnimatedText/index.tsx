"use client";

import React, { FC } from "react";
import { IAnimatedTextProps } from "@/components/ui/AnimatedText/types";
import { useTextAnimation } from "@/components/ui/AnimatedText/useTextAnimation";

const AnimatedText: FC<IAnimatedTextProps> = ({
  children,
  animateOnScroll = true,
  delay = 0.45,
  triggerStart = "top 80%",
  debug = false,
}) => {
  const { containerRef } = useTextAnimation({
    animateOnScroll,
    delay,
    triggerStart,
    debug,
  });

  if (React.Children.count(children) === 1) {
    return React.cloneElement(children, {
      ref: containerRef,
    });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default AnimatedText;
