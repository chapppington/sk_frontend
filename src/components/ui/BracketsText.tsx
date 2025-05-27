import { FC } from "react";
import AnimatedText from "./AnimatedText";

interface BracketsTextProps {
  children: React.ReactNode;
  className?: string;
}

const BracketsText: FC<BracketsTextProps> = ({ children, className = "" }) => {
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
