import { FC } from 'react';

interface BracketsTextProps {
  children: React.ReactNode;
  className?: string;
}

const BracketsText: FC<BracketsTextProps> = ({ children, className = '' }) => {
  return (
    <div className={`${className}`}>
      <span className={`text-white/40 text-sm tracking-wider`}>
        [ {children} ]
      </span>
    </div>
  );
};

export default BracketsText;
