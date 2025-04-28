import { FC } from 'react';
import styles from './GradientHeading.module.css';

interface GradientHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientHeading: FC<GradientHeadingProps> = ({ children, className }) => {
  return (
    <h2 className={`${styles.gradientHeading} ${className || ''}`}>
      {children}
    </h2>
  );
};
