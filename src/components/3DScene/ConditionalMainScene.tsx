"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import MainScene from "./main";
import BackgroundGradient from "@/components/ui/BackgroundGradient";

export default function ConditionalMainScene() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Memoize the MainScene instance
  const memoizedScene = useMemo(() => <MainScene />, []);

  if (isHomePage) return memoizedScene;

  return null;
}
 