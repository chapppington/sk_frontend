"use client";

import { FC } from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useTransition } from "@/components/providers/TransitionProvider";
import { TransitionLinkProps } from "@/components/ui/TransitionLink/interfaces";

const TransitionLink: FC<TransitionLinkProps> = ({
  href,
  children,
  className,
  onClick,
  style,
  ref,
}) => {
  const router = useTransitionRouter();
  const { animateIn, animateOut, isAnimating } = useTransition();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

    // Call the provided onClick handler if it exists
    if (onClick) {
      onClick(e);
    }

    // Start the slide-in animation
    await animateIn();

    // Start the page transition
    const transitionPromise = router.push(href);

    // Wait for both the page transition and slide-out animation
    await Promise.all([
      transitionPromise,
      // Add a small delay before starting slide-out to ensure page is ready
      new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
        animateOut()
      ),
    ]);

    // Dispatch the layout change event after transition completes
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("layoutchange"));
    }, 200);
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`${className} ${
        isAnimating ? "pointer-events-none cursor-default" : ""
      }`}
      onClick={handleClick}
      style={style}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
