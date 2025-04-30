import { FC } from 'react';
import styles from './GradientHeading.module.css';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientHeading: FC<GradientHeadingProps> = ({ children, className }) => {
  return (
    <h2 className={`${styles.gradientHeading} ${className || ''} text-2xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-light text-white max-w-5xl mb-4`}>
      {children}
    </h2>
  );
};
