import { FC } from "react";

import AnimatedText from "@/components/ui/AnimatedText";
import { IBracketsTextProps } from "@/components/ui/BracketsText/types";

const BracketsText: FC<IBracketsTextProps> = ({ children, className = "" }) => {
  return (
    <div className={`${className}`}>
      <AnimatedText>
        <span className={`text-white/40 text-sm tracking-wider`}>
          [ {children} ]
        </span>
      </AnimatedText>
    </div>
  );
};

export default BracketsText;
