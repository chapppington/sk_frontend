import { FC } from "react";
import Copy from "./textAnimation/Copy";

interface BracketsTextProps {
  children: React.ReactNode;
  className?: string;
}

const BracketsText: FC<BracketsTextProps> = ({ children, className = "" }) => {
  return (
    <div className={`${className}`}>
      <Copy>
        <span className={`text-white/40 text-sm tracking-wider`}>
          [ {children} ]
        </span>
      </Copy>
    </div>
  );
};

export default BracketsText;
