"use client";

import { usePathname } from "next/navigation";
import MainScene from "./main";

export default function ConditionalMainScene() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) return <MainScene />;

  return null;
}
