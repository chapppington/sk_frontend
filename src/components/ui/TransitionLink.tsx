"use client";

import { FC, ReactNode } from "react";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useTransition } from "../providers/TransitionProvider";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const TransitionLink: FC<TransitionLinkProps> = ({
  href,
  children,
  className,
}) => {
  const router = useTransitionRouter();
  const { animateIn, animateOut, isAnimating } = useTransition();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

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
  };

  return (
    <Link
      href={href}
      className={`${className} ${
        isAnimating ? "pointer-events-none cursor-default" : ""
      }`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
