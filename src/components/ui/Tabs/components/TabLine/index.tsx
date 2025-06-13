import { FC } from "react";
import { TabLineProps } from "./types";

export const TabLine: FC<TabLineProps> = ({ lineRef }) => {
  return (
    <div
      ref={lineRef}
      className="absolute bottom-0 h-0.5 bg-white transition-all duration-200"
    />
  );
};
